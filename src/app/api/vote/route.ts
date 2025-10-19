// src/app/api/vote/route.ts
export const runtime = 'nodejs' // Node runtime so we can use crypto

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { hashIpForDay } from '@/lib/hash'

type Mood = 'good' | 'neutral' | 'bad'

const HASH_SECRET = process.env.HASH_SECRET || 'dev-secret'

function getClientIp(xff: string | null): string {
  // x-forwarded-for may be: "ip1, ip2, ip3"
  if (!xff) return '127.0.0.1'
  const first = xff.split(',')[0]?.trim()
  return first || '127.0.0.1'
}

function todayUTCISODate(): string {
  // "YYYY-MM-DD" in UTC
  return new Date().toISOString().slice(0, 10)
}

async function readMoodFromBody(req: Request): Promise<Mood | undefined> {
  try {
    const data: unknown = await req.json()
    if (typeof data === 'object' && data !== null) {
      const moodVal = (data as Record<string, unknown>).mood
      if (moodVal === 'good' || moodVal === 'neutral' || moodVal === 'bad') {
        return moodVal
      }
    }
  } catch {
    // ignore parse errors; we'll return undefined
  }
  return undefined
}

export async function POST(req: Request) {
  try {
    const mood = await readMoodFromBody(req)
    if (!mood) {
      return NextResponse.json({ error: 'Invalid mood' }, { status: 400 })
    }

    // Get client IP from headers
    const xff = req.headers.get('x-forwarded-for')
    const ip = getClientIp(xff)

    // Compute day + hash
    const day = todayUTCISODate()
    const ip_hash = hashIpForDay(ip, day, HASH_SECRET)

    // Insert into DB (vote_day enforces one/day/IP via unique index)
    const { error } = await supabaseAdmin.from('votes').insert({
      ip_hash,
      mood,
      vote_day: day,
    })

    if (error) {
      // PostgrestError has optional code; '23505' is unique_violation
      if (error.code === '23505') {
        return NextResponse.json(
          { ok: false, message: 'You already voted today.' },
          { status: 200 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Vote recorded.' }, { status: 201 })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

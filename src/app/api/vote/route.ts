// src/app/api/vote/route.ts
export const runtime = 'nodejs' // use Node runtime so we can use crypto easily

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { hashIpForDay } from '@/lib/hash'

const HASH_SECRET = process.env.HASH_SECRET || 'dev-secret' // set in .env.local for real

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

export async function POST(req: Request) {
  try {
    const { mood } = await req.json().catch(() => ({} as any))
    if (!mood || !['good', 'neutral', 'bad'].includes(mood)) {
      return NextResponse.json({ error: 'Invalid mood' }, { status: 400 })
    }

    // Get client IP from headers
    const xff = req.headers.get('x-forwarded-for')
    const ip = getClientIp(xff)

    // Compute day + hash
    const day = todayUTCISODate()
    const ip_hash = hashIpForDay(ip, day, HASH_SECRET)

    // Insert into DB (vote_day helps enforce one/day/IP via unique index)
    const { error } = await supabaseAdmin.from('votes').insert({
      ip_hash,
      mood,
      vote_day: day,
    })

    if (error) {
      // Unique violation => already voted today
      // Supabase/Postgres often uses code '23505' for unique constraint errors
      if ((error as any).code === '23505') {
        return NextResponse.json({ ok: false, message: 'You already voted today.' }, { status: 200 })
      }
      // Other DB error
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Vote recorded.' }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unexpected error' }, { status: 500 })
  }
}

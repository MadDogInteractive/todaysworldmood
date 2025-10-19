// src/app/api/mood/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'edge' // fast read-only route

function todayUTCISODate(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function GET() {
  const today = todayUTCISODate()

  const { data, error } = await supabaseAdmin
    .from('votes')
    .select('mood')
    .eq('vote_day', today)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const counts = { good: 0, neutral: 0, bad: 0 }
  data?.forEach((row) => {
    counts[row.mood as keyof typeof counts]++
  })

  return NextResponse.json({ date: today, counts })
}

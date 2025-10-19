// src/app/api/stats/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'

function todayUTCISODate(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function GET() {
  try {
    const today = todayUTCISODate()

    // Count helper for a mood on today's date (uses COUNT with head:true for speed)
    async function countMood(mood: 'good' | 'neutral' | 'bad'): Promise<number> {
      const { count, error } = await supabaseAdmin
        .from('votes')
        .select('id', { count: 'exact', head: true })
        .eq('vote_day', today)
        .eq('mood', mood)
      if (error) throw error
      return count ?? 0
    }

    // Parallelize the 3 mood counts
    const [good, neutral, bad] = await Promise.all([
      countMood('good'),
      countMood('neutral'),
      countMood('bad'),
    ])

    // Today total (could also be good+neutral+bad, but keep the DB truth as well)
    const { count: todayTotal, error: todayErr } = await supabaseAdmin
      .from('votes')
      .select('id', { count: 'exact', head: true })
      .eq('vote_day', today)
    if (todayErr) throw todayErr

    // Lifetime total
    const { count: lifetimeTotal, error: lifeErr } = await supabaseAdmin
      .from('votes')
      .select('id', { count: 'exact', head: true })
    if (lifeErr) throw lifeErr

    // Decide the leader; on any tie, prefer 'neutral'
    // (So equal top counts => neutral)
    let leader: 'good' | 'neutral' | 'bad' = 'neutral'
    const top = Math.max(good, neutral, bad)
    if (top > 0) {
      if (good === top && neutral === top && bad === top) {
        leader = 'neutral'
      } else if (good === top && neutral === top) {
        leader = 'neutral'
      } else if (neutral === top && bad === top) {
        leader = 'neutral'
      } else if (good === top && bad === top) {
        leader = 'neutral'
      } else if (good === top) {
        leader = 'good'
      } else if (neutral === top) {
        leader = 'neutral'
      } else if (bad === top) {
        leader = 'bad'
      }
    } else {
      // No votes yet today = neutral face
      leader = 'neutral'
    }

    return NextResponse.json({
      date: today,
      todayTotal: todayTotal ?? 0,
      lifetimeTotal: lifetimeTotal ?? 0,
      todayCounts: { good, neutral, bad },
      leader,
    })
    } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json(
      { error: message ?? 'Unexpected server error' },
      { status: 500 }
    )
  }

}

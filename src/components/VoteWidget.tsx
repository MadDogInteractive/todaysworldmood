'use client'

import { useEffect, useState } from 'react'

type Stats = {
  todayTotal: number
  lifetimeTotal: number
  todayCounts?: { good: number; neutral: number; bad: number }
  leader?: 'good' | 'neutral' | 'bad'
}

const MOOD_EMOJI: Record<'good' | 'neutral' | 'bad', string> = {
  good: '🙂',
  neutral: '😐',
  bad: '🙁',
}

export default function VoteWidget() {
  const [stats, setStats] = useState<Stats>({
    todayTotal: 0,
    lifetimeTotal: 0,
    todayCounts: { good: 0, neutral: 0, bad: 0 },
    leader: 'neutral',
  })
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const [votedToday, setVotedToday] = useState(false)

  async function refreshStats() {
    setLoading(true)
    try {
      const res = await fetch('/api/stats', { cache: 'no-store' })
      const data = await res.json()
      if (typeof data?.todayTotal === 'number') {
        setStats({
          todayTotal: data.todayTotal,
          lifetimeTotal: data.lifetimeTotal ?? 0,
          todayCounts: data.todayCounts ?? { good: 0, neutral: 0, bad: 0 },
          leader: (data.leader as Stats['leader']) ?? 'neutral',
        })
      }
    } catch (e) {
      // keep quiet in UI; console for devs
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshStats()
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  async function sendVote(mood: 'good' | 'neutral' | 'bad') {
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      })
      const data = await res.json()
      if (data?.ok) {
        showToast('Thanks for voting! ✨')
        setVotedToday(true)
        await refreshStats()
      } else if (data?.message) {
        showToast(data.message)
        setVotedToday(true)
      } else if (data?.error) {
        showToast(`Error: ${data.error}`)
      } else {
        showToast('Something went wrong.')
      }
        } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Network error'
      showToast(`Error: ${message}`)
        }
  }

  const leader = stats.leader ?? 'neutral'
  const leaderEmoji = MOOD_EMOJI[leader]

  return (
    <div className="space-y-8">
      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          className="rounded-xl px-5 py-3 border hover:bg-white-50 active:scale-[0.98] transition disabled:opacity-50"
          disabled={votedToday}
          onClick={() => sendVote('good')}
        >
          <span className="mr-1 text-green">🙂</span> I feel Good
        </button>
        <button
          className="rounded-xl px-5 py-3 border hover:bg-white-50 active:scale-[0.98] transition disabled:opacity-50"
          disabled={votedToday}
          onClick={() => sendVote('neutral')}
        >
          <span className="mr-1 text-white">😐</span> I feel Neutral
        </button>
        <button
          className="rounded-xl px-5 py-3 border hover:bg-white-50 active:scale-[0.98] transition disabled:opacity-50"
          disabled={votedToday}
          onClick={() => sendVote('bad')}
        >
          <span className="mr-1 text-red">🙁</span> I feel Bad
        </button>
      </div>

      {/* Big emoji vibe */}
      {!loading && (
        <div className="text-center">
          <div className="text-7xl md:text-8xl leading-none">{leaderEmoji}</div>
          <div className="mt-2 text-sm text-white-600">
            Today’s mood: <span className="font-medium capitalize">{leader}</span>
          </div>
        </div>
      )}

      {/* Today total only */}
      <div className="text-center">
        <h2 className="font-semibold mb-2">
            {loading ? 'Loading today’s total…' : 'Today’s Total Votes'}
        </h2>

        {!loading && (
            <div className="flex justify-center">
            {/* inline-block means the box width equals the number’s width */}
            <div className="inline-block rounded-2xl border px-8 py-6 shadow-sm">
                <div className="text-5xl md:text-6xl font-extrabold tabular-nums">
                {stats.todayTotal.toLocaleString()}
                </div>
            </div>
            </div>
        )}
        </div>


      {/* Toast */}
      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="rounded-full bg-black text-white px-4 py-2 text-sm shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  )
}

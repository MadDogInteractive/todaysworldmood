'use client'

import { useEffect, useState } from 'react'

type Stats = {
  date?: string
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

const votedKey = (isoDate: string) => `twm_voted_${isoDate}`

export default function VoteWidget() {
  const [stats, setStats] = useState<Stats>({
    date: undefined,
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
          date: data.date,
          todayTotal: data.todayTotal,
          lifetimeTotal: data.lifetimeTotal ?? 0,
          todayCounts: data.todayCounts ?? { good: 0, neutral: 0, bad: 0 },
          leader: (data.leader as Stats['leader']) ?? 'neutral',
        })
        if (typeof window !== 'undefined' && data?.date) {
          setVotedToday(!!localStorage.getItem(votedKey(data.date)))
        }
      }
    } catch (e) {
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

  function markVotedForToday() {
    if (typeof window !== 'undefined' && stats.date) {
      localStorage.setItem(votedKey(stats.date), '1')
    }
    setVotedToday(true)
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
        markVotedForToday()
        await refreshStats()
      } else if (data?.message) {
        showToast(data.message)
        markVotedForToday()
      } else if (data?.error) {
        showToast(`Error: ${data.error}`)
      } else {
        showToast('Something went wrong.')
      }
    } catch {
      showToast('Network error')
    }
  }

  const leader = stats.leader ?? 'neutral'
  const leaderEmoji = MOOD_EMOJI[leader]

  return (
    <div className="space-y-10">
      {/* Buttons or “come back tomorrow” */}
      {!votedToday ? (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            className="rounded-2xl px-5 py-3 text-white bg-gradient-to-r from-fuchsia-500 to-indigo-500 shadow-lg shadow-fuchsia-500/20 hover:brightness-110 active:scale-[0.98] transition"
            onClick={() => sendVote('good')}
          >
            <span className="mr-1">🙂</span> I feel Good
          </button>
          <button
            className="rounded-2xl px-5 py-3 text-white bg-gradient-to-r from-amber-500 to-pink-500 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition"
            onClick={() => sendVote('neutral')}
          >
            <span className="mr-1">😐</span> I feel Neutral
          </button>
          <button
            className="rounded-2xl px-5 py-3 text-white bg-gradient-to-r from-sky-500 to-violet-500 shadow-lg shadow-sky-500/20 hover:brightness-110 active:scale-[0.98] transition"
            onClick={() => sendVote('bad')}
          >
            <span className="mr-1">🙁</span> I feel Bad
          </button>
        </div>
      ) : (
        <p className="text-center text-sm text-black-700">
          Check Back Tomorrow to Vote Again
        </p>
      )}

      {/* Big emoji vibe with soft glow */}
      {!loading && (
        <div className="text-center">
          <div className="text-7xl md:text-8xl leading-none drop-shadow-[0_10px_24px_rgba(99,102,241,0.35)]">
            {leaderEmoji}
          </div>
          <div className="mt-2 text-sm text-black-700">
            Today’s leading mood:{' '}
            <span className="font-semibold capitalize">{leader}</span>
          </div>
        </div>
      )}

      {/* Today total only, auto-sizing box */}
      <div className="text-center">
        <h2 className="font-semibold text-black mb-2">
          {loading ? 'Loading today’s total…' : 'Today’s Total Votes'}
        </h2>
        {!loading && (
          <div className="flex justify-center">
            <div className="inline-block rounded-2xl border border-black/100 bg-white/70 backdrop-blur px-8 py-6 shadow-md">
              <div className="font-extrabold tabular-nums text-black text-[clamp(2.5rem,8vw,4rem)]">
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

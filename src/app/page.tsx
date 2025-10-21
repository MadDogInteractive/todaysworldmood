'use client'

import { useEffect, useState } from 'react'
import VoteWidget from '@/components/VoteWidget'
import ShareButton from '@/components/ShareButton'


export default function Page() {
  const [lifetime, setLifetime] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/stats', { cache: 'no-store' })
        const data = await res.json()
        if (typeof data?.lifetimeTotal === 'number') {
          setLifetime(data.lifetimeTotal)
          const span = document.getElementById('lifetimeCount')
          if (span) span.textContent = data.lifetimeTotal.toLocaleString()
        }
      } catch {
        // ignore silently
      }
    }
    load()
    const interval = setInterval(load, 15000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <main className="min-h-dvh bg-gradient-to-b from-indigo-50 via-fuchsia-50 to-white flex items-center justify-center px-4 py-16">
      <section className="max-w-3xl w-full rounded-3xl border border-black/100 bg-gradient-to-br from-indigo-50/70 via-fuchsia-50/70 to-white/70 backdrop-blur-md shadow-xl p-8 text-gray-700">
        {/* Title */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800">
            Today’s World Mood
          </h1>
          <p className="text-lg text-black-700">
            How do you feel about the world today?
          </p>
        </div>

            <div className="mt-8">
              <VoteWidget />
            </div>

            {/* Mission Statement Section */}
            <div className="mt-12 text-center border-t border-black/60 pt-8 space-y-6">
              <div>
                <p className="text-base leading-relaxed text-black-700/90 max-w-2xl mx-auto">
                  Today’s World Mood exists to capture the collective pulse of human emotion — one click
                  at a time. We believe that seeing how people feel across the world fosters empathy and
                  connection.
                  <br></br>
                  Share a moment of human feeling.
                  <br></br>
                  <br></br>
                  <ShareButton />
                </p>
              </div>

              {/* Lifetime Votes */}
              <p className="text-sm text-black-700">
                <span className="font-semibold">Lifetime Votes:</span>{' '}
                <span className="tabular-nums">{lifetime?.toLocaleString() ?? '—'}</span>
              </p>

              {/* Legal Links */}
              <div className="text-sm space-x-6">
                <a
                  href="/privacy"
                  className="text-indigo-600 hover:text-fuchsia-600 transition font-medium hover:underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-indigo-600 hover:text-fuchsia-600 transition font-medium hover:underline"
                >
                  Terms & Conditions
                </a>
                <a
                  href="/copyright"
                  className="text-indigo-600 hover:text-fuchsia-600 transition font-medium hover:underline"
                >
                  Copyright Notice
                </a>
              </div>
              <p className="text-xs text-black-400">
                © {new Date().getFullYear()} Today’s World Mood
              </p>
            </div>
      </section>
    </main>
  )
}

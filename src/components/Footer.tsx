'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [lifetime, setLifetime] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const res = await fetch('/api/stats', { cache: 'no-store' })
        const data = await res.json()
        if (active && typeof data?.lifetimeTotal === 'number') {
          setLifetime(data.lifetimeTotal)
        }
      } catch {
        // ignore errors silently
      }
    }
    load()
    const interval = setInterval(load, 15000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-3xl px-4 py-6 text-center text-gray-600">
        <p className="text-sm mb-3">
          <span className="font-semibold">Lifetime Votes:</span>{' '}
          <span className="tabular-nums">{lifetime ?? '—'}</span>
        </p>

        <nav className="space-x-4 text-sm">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/copyright" className="hover:underline">
            Copyright Notice
          </Link>
        </nav>

        <p className="mt-3 text-xs text-gray-400">
          © {new Date().getFullYear()} Today’s World Mood
        </p>
      </div>
    </footer>
  )
}

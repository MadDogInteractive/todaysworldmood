'use client'

import { useRef, useState } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const sharingRef = useRef(false) // re-entry guard

  async function shareOnce() {
    if (sharingRef.current || busy) return // prevent double-fire
    sharingRef.current = true
    setBusy(true)

    try {
      const url = 'https://todaysworldmood.com'
      const title = "Today’s World Mood"
      const text = "How’s the world feeling today? Cast your vote."

      if (navigator.share) {
        // Optional: check payload support on some browsers
        if (navigator.canShare ? navigator.canShare({ title, text, url }) : true) {
          await navigator.share({ title, text, url })
          return
        }
      }

      // Fallback: copy
      //await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback fallback: legacy copy trick
      try {
        const url =
          typeof window !== 'undefined'
            ? window.location.origin
            : 'https://todaysworldmood.com'
        const ta = document.createElement('textarea')
        ta.value = url
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        // give up silently
      }
    } finally {
      // small delay so double taps don't re-fire immediately
      setTimeout(() => {
        sharingRef.current = false
        setBusy(false)
      }, 400)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={shareOnce}
        disabled={busy}
        className="rounded-2xl px-5 py-3 text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-lg hover:brightness-110 active:scale-[0.98] transition text-sm font-medium disabled:opacity-60"
        aria-busy={busy}
      >
        {copied ? 'Link Copied ✅' : busy ? 'Sharing…' : 'Share this'}
      </button>
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = typeof window !== 'undefined' ? window.location.origin : 'https://todaysworldmood.com'
    const title = "Today’s World Mood"
    const text = "How’s the world feeling today? Cast your vote."

    // Web Share API (mobile & some desktop)
    // if (navigator.share) {
    //   try {
    //     await navigator.share({url})
    //     return
    //   } catch {
    //     /* fall through to copy */
    //   }
    // }


    if (navigator.share) {
        navigator.share({
            title,
            text,
            url,
        })
        .then(() => console.log('Content shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        console.log('Web Sharing is not supported in this browser')
    }

    
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // very old browsers
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={share}
        className="rounded-2xl px-5 py-3 text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-lg hover:brightness-110 active:scale-[0.98] transition text-sm font-medium"
      >
        {copied ? 'Link Copied ✅' : 'Share this'}
      </button>
    </div>
  )
}

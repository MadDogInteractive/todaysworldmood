'use client'

import ReturnButton from '@/components/ReturnButton'

export default function CopyrightPage() {
  const year = new Date().getFullYear()

  return (
    <main className="min-h-dvh bg-gradient-to-b from-indigo-50 via-fuchsia-50 to-white flex items-center justify-center px-4 py-16">
      <section className="max-w-3xl w-full rounded-3xl border border-black/100 bg-gradient-to-br from-indigo-50/70 via-fuchsia-50/70 to-white/70 backdrop-blur-md shadow-xl p-8 text-gray-700 text-center space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Copyright Notice
        </h1>
        <p>© {year} Today’s World Mood. All rights reserved.</p>
        <p>
          The design, layout, and concept of this site are protected by copyright and
          intellectual property laws. No part may be copied or reused without written
          permission.
        </p>
        <p>
          “Today’s World Mood” and its associated marks are trademarks of the owner.
          Unauthorized reproduction or distribution is prohibited.
        </p>

        <ReturnButton />
      </section>
    </main>
  )
}

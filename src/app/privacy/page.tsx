'use client'

import ReturnButton from '@/components/ReturnButton'

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-indigo-50 via-fuchsia-50 to-white flex items-center justify-center px-4 py-16">
      <section className="max-w-3xl w-full rounded-3xl border border-black/100 bg-gradient-to-br from-indigo-50/70 via-fuchsia-50/70 to-white/70 backdrop-blur-md shadow-xl p-8 space-y-6 text-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Privacy Policy
        </h1>
        <p>
          At <strong>Today’s World Mood</strong>, your privacy matters. We do not collect
          personally identifiable information, set cookies, or track users.
        </p>
        <p>
          Your vote is stored anonymously using a one-way hashed identifier to ensure
          one vote per day. This identifier cannot be linked to any individual.
        </p>
        <p>
          We use a small <code>localStorage</code> key to remember if you’ve already voted today.
          This data stays entirely on your device and never leaves your browser.
        </p>
        <p>
          Aggregated statistics such as total vote counts may be displayed publicly to
          show global trends. These contain no personal data.
        </p>
        <p>
          By using this site, you agree to this Privacy Policy. Any updates will be posted here.
        </p>

        <ReturnButton />
      </section>
    </main>
  )
}


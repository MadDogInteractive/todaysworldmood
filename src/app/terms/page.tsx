'use client'

import ReturnButton from '@/components/ReturnButton'

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-indigo-50 via-fuchsia-50 to-white flex items-center justify-center px-4 py-16">
      <section className="max-w-3xl w-full rounded-3xl border border-black/100 bg-gradient-to-br from-indigo-50/70 via-fuchsia-50/70 to-white/70 backdrop-blur-md shadow-xl p-8 space-y-6 text-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Terms and Conditions
        </h1>
        <p>
          By accessing <strong>Today’s World Mood</strong>, you agree to use this website
          for lawful, ethical purposes and to refrain from activities that could disrupt
          or damage its services or data.
        </p>
        <p>
          The service is provided “as is,” with no warranties or guarantees. We make no
          representations regarding uptime, accuracy, or continued availability.
        </p>
        <p>
          We reserve the right to update, suspend, or discontinue this site at any time
          without prior notice.
        </p>
        <p>
          Continued use of this site constitutes your acceptance of these Terms and any
          modifications published here.
        </p>

        <ReturnButton />
      </section>
    </main>
  )
}

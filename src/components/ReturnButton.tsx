'use client'

import { useRouter } from 'next/navigation'

export default function ReturnButton() {
  const router = useRouter()

  return (
    <div className="text-center mt-8">
      <button
        onClick={() => router.push('/')}
        className="px-5 py-2.5 rounded-xl border border-black-100 hover:bg-gray-50 transition text-sm font-medium text-gray-700"
      >
        ← Back to being Moody!
      </button>
    </div>
  )
}

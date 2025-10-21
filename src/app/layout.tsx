import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Today's World Mood",
  description: 'Tracking the pulse of global emotion in real-time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gradient-to-b from-fuchsia-50 via-white to-indigo-50 flex flex-col">
        <main className="flex-grow">
          {children}
          <Analytics />
          </main>
      </body>
    </html>
  )
}

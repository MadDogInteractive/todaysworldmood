import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from 'next'
import './globals.css'

/* export const metadata: Metadata = {
  title: "Today's World Mood",
  description: 'Tracking the pulse of global emotion in real-time.',
} */

export const metadata: Metadata = {
  title: "Today's World Mood",
  description: 'Tracking the pulse of global emotion in real-time.',
  metadataBase: new URL('https://todaysworldmood.com'), 
  openGraph: {
    title: "Today’s World Mood",
    description: 'Tracking the pulse of global emotion in real-time.',
    url: 'https://todaysworldmood.com',
    siteName: "Today’s World Mood",
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: "Today's World Mood" },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Today’s World Mood",
    description: 'Tracking the pulse of global emotion in real-time.',
    images: ['/og-image.png'],
  },
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

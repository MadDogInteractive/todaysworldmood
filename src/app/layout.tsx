import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Today's World Mood",
  description: 'Tap how you feel — see today’s totals update live.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gradient-to-b from-fuchsia-50 via-white to-indigo-50 flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

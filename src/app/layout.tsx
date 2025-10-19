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
      <body className="bg-white flex flex-col min-h-dvh">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import VoteWidget from '@/components/VoteWidget'

export default function Page() {
  return (
    <main className="min-h-dvh bg-white">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border p-8 shadow-sm bg-black">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Today’s World Mood
            </h1>
            <p className="text-lg text-white-600">
              How do you feel about the world today?
            </p>
          </div>

          <div className="mt-8">
            <VoteWidget />
          </div>
          
          {/* Mission Statement Section */}
          <div className="mt-12 text-center border-t pt-8 text-white-700">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-base leading-relaxed text-white-600 max-w-2xl mx-auto">
                Today’s World Mood exists to capture the collective pulse of human
                emotion — one click at a time. We believe that seeing how people feel
                across the world fosters empathy and connection. No accounts. No tracking.
                Just a shared moment of human feeling.
              </p>
          </div>

        </div>
      </section>
    </main>
  )
}

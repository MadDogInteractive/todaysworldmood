import VoteWidget from '@/components/VoteWidget'

export default function Page() {
  return (
    <main className="min-h-dvh">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md shadow-xl">
          <div className="px-8 py-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Today’s World Mood
              </h1>
              <p className="text-lg text-gray-700">
                How do you feel about the world today?
              </p>
            </div>

            <div className="mt-8">
              <VoteWidget />
            </div>

            {/* Mission Statement Section */}
            <div className="mt-12 text-center border-t border-white/60 pt-8 text-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-3">Our Mission</h2>
              <p className="text-base leading-relaxed text-gray-700/90 max-w-2xl mx-auto">
                Today’s World Mood exists to capture the collective pulse of human
                emotion — one click at a time. We believe that seeing how people feel
                across the world fosters empathy and connection. 
                <br></br>
                Share a moment of human feeling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

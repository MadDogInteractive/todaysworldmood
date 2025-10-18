export default function Page() {
  return (
    <main className="min-h-dvh grid place-items-center">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Today’s World Mood
        </h1>
        <p className="text-lg text-gray-500">
          Lightning-fast prototype. Voting & API coming next.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="rounded-xl px-5 py-3 border">
            I feel Good 🙂
          </button>
          <button className="rounded-xl px-5 py-3 border">
            I feel Neutral 😐
          </button>
          <button className="rounded-xl px-5 py-3 border">
            I feel Bad 🙁
          </button>
        </div>
      </section>
    </main>
  )
}

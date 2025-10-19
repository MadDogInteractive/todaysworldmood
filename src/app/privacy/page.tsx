import ReturnButton from '@/components/ReturnButton'


export default function PrivacyPage() {
  return (
    <main className="min-h-dvh grid place-items-center bg-white px-4 py-16">
      <section className="max-w-3xl text-gray-700 space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4">Privacy Policy</h1>
            <p>
            At <strong>Today’s World Mood</strong>, we value your privacy. We do not collect
            personal information, create user accounts, or store identifiable data.
            Votes are recorded anonymously using a hashed, non-reversible identifier
            that cannot be linked to any individual.
            </p>
            <p>
            We may collect aggregated statistics (such as total votes) to display
            global trends. This data contains no personal identifiers and is used
            solely to improve and maintain our service.
            </p>
            <p>
            By using this website, you consent to this Privacy Policy. We may update
            this policy periodically, and all updates will be reflected on this page.
            </p>
        <ReturnButton />
      </section>
    </main>
  )
}

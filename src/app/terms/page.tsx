import ReturnButton from '@/components/ReturnButton'

export default function TermsPage() {
  return (
    <main className="min-h-dvh grid place-items-center bg-white px-4 py-16">
      <section className="max-w-3xl text-gray-700 space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4">Terms and Conditions</h1>
            <p>
                By accessing <strong>Today’s World Mood</strong>, you agree to use this
                service for lawful purposes only. You must not attempt to compromise the
                functionality, security, or integrity of the site or its data.
            </p>
            <p>
                The service is provided “as is” without warranties of any kind, express or
                implied. We make no guarantees about uptime, accuracy, or the availability
                of data and reserve the right to modify or discontinue the service at any
                time without notice.
            </p>
            <p>
                Your continued use of this website constitutes acceptance of these Terms.
            </p>
        <ReturnButton />
      </section>
    </main>
  )
}

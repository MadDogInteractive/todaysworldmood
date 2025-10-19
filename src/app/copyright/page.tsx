import ReturnButton from '@/components/ReturnButton'

export default function CopyrightPage() {
  const year = new Date().getFullYear()

  return (
    <main className="min-h-dvh grid place-items-center bg-white px-4 py-16">
      <section className="max-w-3xl text-gray-700 space-y-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Copyright Notice</h1>
            <p>
            © {year} Today’s World Mood. All rights reserved.
            </p>
            <p>
            The content, design, and concept of this website are protected under
            applicable copyright and intellectual property laws. No part of this site
            may be reproduced, distributed, or transmitted in any form or by any means
            without prior written permission from the site owner.
            </p>
            <p>
            “Today’s World Mood” and its associated visuals are trademarks of the site
            owner. Unauthorized use is strictly prohibited.
            </p>
        <ReturnButton />
      </section>
    </main>
  )
}

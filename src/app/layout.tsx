import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '../index.css'
import '../styles/wordpress-forms.css'
import '../styles/animations.css'
import '../styles/landing.css'

export const metadata: Metadata = {
  title: 'Friendly Marketer - Digital Marketing Agency',
  description: 'Transform your digital presence with our dedicated team of digital experts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans text-charcoal">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
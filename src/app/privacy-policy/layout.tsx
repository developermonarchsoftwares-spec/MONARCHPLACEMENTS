import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Monarch Placements',
  description: 'How Monarch Placements collects, uses and protects personal information shared through its website and enquiry forms.',
  alternates: {
    canonical: 'https://www.monarchplacements.in/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Monarch Placements',
    description: 'How Monarch Placements collects, uses and protects personal information shared through its website and enquiry forms.',
    url: 'https://www.monarchplacements.in/privacy-policy',
    siteName: 'Monarch Placements',
    images: [{ url: '/logo.png', width: 800, height: 600, alt: 'Monarch Placements' }],
    type: 'website',
  },
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

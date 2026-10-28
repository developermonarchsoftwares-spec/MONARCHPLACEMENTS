import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Monarch Placements',
  description: 'Terms of Service governing your access and use of Monarch Placements website, training programs, internships, and placement assistance services.',
  alternates: {
    canonical: 'https://www.monarchplacements.in/terms-of-service',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

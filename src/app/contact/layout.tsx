import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Monarch Training & Placements | Coimbatore',
  description: 'Connect with Monarch Training & Placements. Enquire about admissions, internship tracks, batch schedules, or institutional college partnerships.',
  alternates: {
    canonical: 'https://www.monarchplacements.in/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monarch Placements',
  description: 'Connect with suitable IT freshers and experienced professionals through Monarch Placements. Explore talent sourcing, IT staffing, and requirement-based training coordination with free standard recruitment support for companies.',
  keywords: 'IT Staffing Coimbatore, IT Recruitment Support, Hire Software Developers, Fresher IT Talent Sourcing, Experienced Tech Recruitment, Technical Staff Augmentation India, Zero Employer Recruitment Fees',
  alternates: {
    canonical: 'https://www.monarchplacements.in/it-staffing',
  },
  openGraph: {
    title: 'Monarch Placements',
    description: 'Connect with suitable IT freshers and experienced professionals through Monarch Placements. Explore talent sourcing, IT staffing, and requirement-based training coordination with free standard recruitment support for companies.',
    url: 'https://www.monarchplacements.in/it-staffing',
    siteName: 'Monarch Placements',
    images: [{ url: '/logo.png', width: 800, height: 600, alt: 'Monarch Placements IT Staffing & Recruitment' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monarch Placements',
    description: 'Connect with suitable IT freshers and experienced professionals through Monarch Placements. Standard recruitment support at no cost to employers.',
    images: ['/logo.png'],
  },
}

export default function ITStaffingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

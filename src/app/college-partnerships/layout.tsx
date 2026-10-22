import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'College Partnerships & Institutional Training | Monarch Placements',
  description: 'Collaborate with Monarch for on-campus college workshops, department technical bootcamps, customized courses, and industry guest lectures.',
  keywords: 'College Workshops Coimbatore, Department Technical Training, Campus Bootcamps, Industry Guest Lectures, Institutional Training Tamil Nadu',
  alternates: {
    canonical: 'https://www.monarchplacements.in/college-partnerships',
  },
  openGraph: {
    title: 'College Partnerships & Institutional Training | Monarch Placements',
    description: 'Practical tech workshops, customized syllabi, and pre-placement bootcamps for colleges and academic departments.',
    url: 'https://www.monarchplacements.in/college-partnerships',
    siteName: 'Monarch Placements',
    images: [{ url: '/logo.png', width: 800, height: 600, alt: 'Monarch College Partnerships' }],
    type: 'website',
  },
}

export default function CollegePartnershipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

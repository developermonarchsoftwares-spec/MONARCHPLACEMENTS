import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project-Based Internships (15 Days - 6 Months) | Monarch Placements',
  description: 'Apply for project-based technical internships in Full-Stack Web Development, Python & Data, AI/ML, and Java. Flexible 15-day to 6-month durations with verified certification.',
  keywords: 'Technical Internships Coimbatore, Full Stack Internship, Python Internship, Web Development Internship 2026, College Project Internship, Monarch Placements',
  alternates: {
    canonical: 'https://www.monarchplacements.in/internships',
  },
  openGraph: {
    title: 'Project-Based Internships | Monarch Placements',
    description: 'Hands-on project deliverables, domain syllabus, flexible durations, and mentor guidance for engineering students.',
    url: 'https://www.monarchplacements.in/internships',
    siteName: 'Monarch Placements',
    images: [{ url: '/logo.png', width: 800, height: 600, alt: 'Monarch Internships' }],
    type: 'website',
  },
}

export default function InternshipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

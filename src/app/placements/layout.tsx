import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Placement Support & Career Preparation | Monarch Placements',
  description: 'Interview preparation, ATS resume building, technical mock interview drills, and recruitment opportunity alerts with complete transparency.',
  keywords: 'Placement Support Coimbatore, ATS Resume Optimization, Mock Technical Interviews, Campus Placement Assistance, IT Job Guidance',
  alternates: {
    canonical: 'https://www.monarchplacements.in/placements',
  },
}

export default function PlacementsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

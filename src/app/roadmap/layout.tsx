import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3-Month Career Transformation Roadmap | Monarch Placements',
  description: 'Explore the monthly progression from aptitude and technical foundations to placement readiness and mock interview simulations.',
  alternates: {
    canonical: 'https://www.monarchplacements.in/roadmap',
  },
}

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

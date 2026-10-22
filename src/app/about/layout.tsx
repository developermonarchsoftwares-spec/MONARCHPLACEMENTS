import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Monarch Training & Placements',
  description: 'Learn about Monarch Training & Placements. Our mission is bridging the gap between education and employment through industry-focused technical training.',
  alternates: {
    canonical: 'https://www.monarchplacements.in/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

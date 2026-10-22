import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3-Month Comprehensive Training Program | Monarch Placements',
  description: 'Master in-demand software skills, technical problem-solving, aptitude, and communication through structured 3-month industry training.',
  keywords: 'Software Development Course Coimbatore, Aptitude Training, Placement Preparation, MERN Stack Course, Full Stack Training',
  alternates: {
    canonical: 'https://www.monarchplacements.in/training',
  },
}

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundEffects from '@/components/BackgroundEffects'
import WhatsAppWidget from '@/components/WhatsAppWidget'

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Monarch Training & Placements - Career Transformation Program',
  description: 'Join Monarch Training & Placements. Get 3 months of comprehensive training in technical skills, aptitude development, communication enhancement, mock interviews and placement support.',
  keywords: 'Monarch Placements, Technical Training, Aptitude Skills, Soft Skills Training, Coimbatore Placements, Software Development Courses, Job Placements',
  icons: {
    icon: '/logo.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="min-h-full flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black bg-black text-white">
        <BackgroundEffects />
        <Navbar />
        <main className="flex-grow relative z-10">
          {/* Scroll progress indicator for desktop */}
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/20 origin-left z-50 pointer-events-none" />
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import './glass.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundEffects from '@/components/BackgroundEffects'
import WhatsAppWidget from '@/components/WhatsAppWidget'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.monarchplacements.in'),
  title: 'Monarch Training & Placements - Career Transformation Program',
  description: 'Join Monarch Training & Placements. Get 3 months of comprehensive training in technical skills, aptitude development, communication enhancement, mock interviews and placement support.',
  keywords: 'Monarch Placements, Technical Training, Aptitude Skills, Soft Skills Training, Coimbatore Placements, Software Development Courses, Job Placements',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black bg-black text-white" suppressHydrationWarning>
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

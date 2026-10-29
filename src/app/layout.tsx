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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Monarch Placements',
    url: '/',
    title: 'Monarch Training & Placements - Career Transformation Program',
    description: 'Join Monarch Training & Placements. Get 3 months of comprehensive training in technical skills, aptitude development, communication enhancement, mock interviews and placement support.',
    images: [{ url: '/logo.png', width: 800, height: 600, alt: 'Monarch Placements' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monarch Training & Placements - Career Transformation Program',
    description: 'Join Monarch Training & Placements. Get 3 months of comprehensive training in technical skills, aptitude development, communication enhancement, mock interviews and placement support.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.monarchplacements.in/#organization',
      name: 'Monarch Placements',
      url: 'https://www.monarchplacements.in',
      logo: 'https://www.monarchplacements.in/logo.png',
      email: 'hr@monarchplacements.in',
      telephone: '+916385753874',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Monarch Softwares, Kovilpalayam',
        addressLocality: 'Coimbatore',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.linkedin.com/company/monarch-placements/',
        'https://www.instagram.com/monarchplacements',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.monarchplacements.in/#website',
      url: 'https://www.monarchplacements.in',
      name: 'Monarch Placements',
      publisher: { '@id': 'https://www.monarchplacements.in/#organization' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black bg-black text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
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

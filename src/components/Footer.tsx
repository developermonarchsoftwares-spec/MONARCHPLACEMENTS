"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import PolicyModal, { PolicyModalType } from './PolicyModal'

const headingClass = 'text-xs leading-5 uppercase tracking-widest font-semibold text-white/95'
const linkClass = 'text-xs leading-5 text-white/60 hover:text-white transition-colors w-fit'

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState<PolicyModalType>(null)

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-policy-trigger]')
      if (target) {
        e.preventDefault()
        const policyType = target.getAttribute('data-policy-trigger') as PolicyModalType
        if (policyType) setActivePolicy(policyType)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])
  return (
    <footer className="relative lg:border-t lg:border-white/5 bg-transparent pt-12 sm:pt-14 md:pt-16 pb-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <Reveal className="w-full px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.1fr_1.1fr_1.3fr] xl:grid-cols-[1.32fr_1.1fr_1.21fr_1fr_1.43fr] lg:pr-6 xl:pr-10 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 mb-10 lg:mb-12 items-start">
          {/* 1. Brand Info */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center group w-fit -ml-2 sm:ml-0">
              <img
                src="/logo.png"
                alt="Monarch Placements Logo"
                className="h-12 md:h-14 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-all duration-300"
              />
            </Link>
            <p className="text-xs leading-5 text-white/60 max-w-[28ch] pl-3 sm:pl-5 md:pl-6">
              Bridging the gap between education and employment.
            </p>
            <div className="flex items-center gap-3 pl-3 sm:pl-5 md:pl-6">
              <a 
                href="https://www.linkedin.com/company/monarch-placements/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/monarchplacements?igsh=MWZpbWgyeWJ4cno0NA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a 
                href="mailto:hr@monarchplacements.in" 
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="Email hr@monarchplacements.in"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a 
                href="tel:+916385753874" 
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="Call +91 63857 53874"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col gap-4 lg:gap-5 pl-3 sm:pl-5 md:pl-6 lg:pl-0">
            <h4 className={headingClass}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className={linkClass}>Home</Link>
              <Link href="/it-staffing" className={linkClass}>IT Staffing & Sourcing</Link>
              <Link href="/internships" className={linkClass}>Internships</Link>
              <Link href="/training" className={linkClass}>Training</Link>
              <Link href="/college-partnerships" className={linkClass}>College Partnerships</Link>
              <Link href="/placements" className={linkClass}>Placements</Link>
              <Link href="/roadmap" className={linkClass}>Roadmap</Link>
              <Link href="/about" className={linkClass}>About Us</Link>
              <Link href="/contact" className={linkClass}>Contact</Link>
            </div>
          </div>

          {/* 3. Programs & Services */}
          <div className="flex flex-col gap-4 lg:gap-5 pl-3 sm:pl-5 md:pl-6 lg:pl-0">
            <h4 className={headingClass}>Programs & Services</h4>
            <div className="flex flex-col gap-2">
              <Link href="/it-staffing" className={linkClass}>IT Staff Augmentation</Link>
              <Link href="/it-staffing" className={linkClass}>Free Employer Recruitment</Link>
              <Link href="/internships" className={linkClass}>Project Internships (15d - 6m)</Link>
              <Link href="/training" className={linkClass}>3-Month Training Program</Link>
              <Link href="/college-partnerships" className={linkClass}>College Bootcamps & Workshops</Link>
              <Link href="/placements" className={linkClass}>Placement Support</Link>
            </div>
          </div>

          {/* 4. Contact */}
          <div className="flex flex-col gap-4 lg:gap-5 pl-3 sm:pl-5 md:pl-6 lg:pl-0">
            <h4 className={headingClass}>Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:hr@monarchplacements.in" className={linkClass}>hr@monarchplacements.in</a>
              <a href="tel:+916385753874" className={linkClass}>+91 63857 53874</a>
              <address className="not-italic text-xs leading-5 text-white/60 max-w-[26ch]">Monarch Softwares, Kovilpalayam, Coimbatore, India</address>
            </div>
          </div>

          {/* 5. Location (separate map column) */}
          <div className="flex flex-col gap-4 lg:gap-5 pl-3 sm:pl-5 md:pl-6 lg:pl-0">
            <h4 className={headingClass}>Location</h4>
            <div className="flex flex-col gap-3">
              <div className="relative w-full h-36 rounded-lg overflow-hidden border border-white/10 bg-white/5 group">
                <iframe
                  title="Monarch Softwares Location Map"
                  src="https://maps.google.com/maps?q=Monarch%20Softwares%2C%20Kovilpalayam%2C%20Coimbatore&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(1.15)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Monarch+Softwares/@11.136104,77.035489,16z/data=!4m6!3m5!1s0x3ba8f9157bae6c0f:0x9334f7f73fb022a8!8m2!3d11.1361042!4d77.0354892!16s%2Fg%2F11zgt523tm?hl=en-US&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs leading-5 text-white/60 hover:text-white transition-colors group w-fit"
              >
                <span>View on Google Maps</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pt-2 lg:pt-6 pl-3 sm:pl-5 md:pl-6 lg:pl-0 pr-0 sm:pr-20 lg:border-t lg:border-white/5 text-xs leading-5 text-white/50 tracking-wider">
          <p>© 2026 <a href="https://www.monarchsoftwares.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/10 underline-offset-2">Monarch Softwares</a>. All Rights Reserved.</p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setActivePolicy('privacy')}
              className="hover:text-white transition-colors cursor-pointer text-xs leading-5 text-white/50 focus-visible:outline-none focus-visible:underline"
              suppressHydrationWarning
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActivePolicy('terms')}
              className="hover:text-white transition-colors cursor-pointer text-xs leading-5 text-white/50 focus-visible:outline-none focus-visible:underline"
              suppressHydrationWarning
            >
              Terms of Service
            </button>
          </div>
        </div>
      </Reveal>

      {/* Privacy Policy & Terms of Service Centered Modal */}
      <PolicyModal
        isOpen={activePolicy !== null}
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </footer>
  )
}

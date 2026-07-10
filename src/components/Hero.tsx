"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  title: React.ReactNode
  description: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  bgText: string
  bgImage?: string
  overlayImage?: string
}

export default function Hero({
  title,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  bgText,
  bgImage = "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/ee9b32bb-e72d-47cb-a983-ddf26a66cef2_1600w.jpg",
  overlayImage = "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/c06498e9-85e2-4173-a1f6-86b1267897f0_1600w.jpg"
}: HeroProps) {
  return (
    <section
      className="relative z-10 w-full max-w-7xl mx-auto pt-36 pb-16 px-6 min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Brand name positioned at left to align with header text */}
        {bgText && (
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute bottom-6 left-6 animate-fadeIn animation-delay-600 opacity-[0.03]"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span
              className="block leading-none"
              style={{ fontWeight: 600, fontSize: 'min(20vw, 280px)', lineHeight: 0.8, color: 'rgba(255, 255, 255, 0.25)' }}
            >
              {bgText}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center w-full z-10">
        {/* Left: Headline */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="text-[40px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter animate-fadeInLeft animation-delay-300">
            {title}
          </h1>
        </div>

        {/* Right: Copy + CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-center pt-2 sm:pt-4 lg:pt-0">
          <p className="sm:text-base text-sm text-neutral-300 max-w-[42ch] animate-fadeInRight animation-delay-400 font-light leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 animate-fadeInUp animation-delay-500 mt-5 items-center">
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <Link
                href={primaryCtaLink}
                className="group relative flex items-center justify-center p-[3px] rounded-lg text-sm text-white font-medium select-none cursor-pointer h-[50px] w-auto"
                style={{
                  backgroundImage: 'linear-gradient(144deg, rgb(175, 64, 255), rgb(91, 66, 243) 50%, rgb(0, 221, 235))',
                  boxShadow: 'rgba(151, 65, 252, 0.2) 0px 15px 30px -5px',
                  boxSizing: 'border-box'
                }}
              >
                <span className="bg-[#05062d] group-hover:bg-transparent px-6 py-4 rounded-[6px] h-full w-full flex items-center justify-center gap-2 transition-all duration-300">
                  {primaryCtaText}
                </span>
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            {secondaryCtaText && secondaryCtaLink && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4"
              >
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center justify-center p-[1px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white font-medium select-none cursor-pointer h-[50px] w-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all"
                >
                  <span className="px-6 py-4 rounded-[6px] flex items-center justify-center gap-2">
                    {secondaryCtaText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

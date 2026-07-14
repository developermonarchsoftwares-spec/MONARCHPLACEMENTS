"use client"

import React from 'react'
import Link from 'next/link'
import { CheckCircle, Award, Users, Briefcase } from 'lucide-react'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'

const Ferrofluid = dynamic(() => import('@/components/Ferrofluid'), { ssr: false })

export default function Placements() {
  const steps = [
    {
      num: '01',
      title: 'Career Guidance',
      desc: 'We help candidates understand their strengths, interests, and career goals through personalized mentoring sessions.'
    },
    {
      num: '02',
      title: 'ATS Resume Building',
      desc: 'Build professional resumes optimized for applicant tracking systems and recruiter expectations.'
    },
    {
      num: '03',
      title: 'Mock Interviews',
      desc: 'Practice technical and HR interviews with industry professionals to build confidence and reduce anxiety.'
    },
    {
      num: '04',
      title: 'Placement Drives',
      desc: 'Participate in exclusive placement drives and connection opportunities organized for our students.'
    },
    {
      num: '05',
      title: 'Interview Feedback',
      desc: 'Receive continuous performance reviews and structured improvements following each interview session.'
    },
    {
      num: '06',
      title: 'Continuous Support',
      desc: 'Get mentorship and guidance until you land your dream job, even after completing the program.'
    }
  ]

  const stats = [
    {
      num: '50+',
      label: 'Students Trained',
      desc: '50+ students transformed into industry-ready professionals through our comprehensive training programs',
      icon: <Users className="w-5 h-5 text-white/80" />
    },
    {
      num: '100+',
      label: 'Hiring Partners',
      desc: '100+ top companies partner with us for campus recruitment and hiring',
      icon: <Award className="w-5 h-5 text-white/80" />
    },
    {
      num: '95%',
      label: 'Placement Rate',
      desc: '95% of our students secure placements within 3 months of program completion',
      icon: <Briefcase className="w-5 h-5 text-white/80" />
    }
  ]

  const partners = [
    'Cognizant', 'Accenture', 'TCS', 'Wipro', 'Infosys', 'Zoho', 'Capgemini', 'Tech Mahindra'
  ]

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section Container */}
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Ferrofluid Background component */}
        <div className="absolute inset-0 -z-10">
          <Ferrofluid
            colors={["#ffffff","#ffffff","#ffffff"]}
            speed={0.5}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            rimWidth={0.2}
            sharpness={2.5}
            shimmer={1.5}
            glow={1}
            flowDirection="down"
            opacity={0.5}
            mouseInteraction
            mouseStrength={1}
            mouseRadius={0.35}
          />
        </div>

        <Hero
          title={
            <>
              Placement Support <br className="hidden md:inline" />{" "}
              <span className="text-glow font-bold">
                That Goes Beyond Training
              </span>
            </>
          }
          description="We guide candidates through every stage of the recruitment process and help them confidently pursue career opportunities."
          primaryCtaText="Explore Program"
          primaryCtaLink="/training"
          secondaryCtaText="Contact Us"
          secondaryCtaLink="/contact"
          bgText=""
        />
      </div>

      {/* Placement Process Journey */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">OUR PROCESS</span>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">Our Placement Support</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="glass-card glass-card-hover rounded p-6 flex flex-col justify-between border-glow-white relative group overflow-hidden"
              >
                {/* Number Watermark */}
                <div className="absolute right-4 top-4 text-white/[0.02] font-display font-bold text-5xl group-hover:text-white/[0.04] transition-colors">
                  {step.num}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-4 h-4 text-white/60" />
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-white/95">{step.title}</h3>
                  </div>
                  <p className="text-xs text-white/50 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">OUR IMPACT</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Our Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="glass-card glass-card-hover rounded p-6 border border-white/5 group cursor-default"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-glow transition-all">{stat.num}</span>
                  <div className="p-1.5 border border-white/10 rounded bg-white/5">{stat.icon}</div>
                </div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-2">{stat.label}</h3>
                <p className="text-xs text-white/40 font-light leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Marquee */}
      <section className="py-24 border-t border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">HIRING PARTNERS</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Companies We Prepare You For</h2>
        </div>

        <div className="w-full flex flex-col gap-6 relative">
          <div className="flex gap-0 py-3 overflow-hidden select-none w-full relative">
            <div className="flex gap-16 justify-around min-w-full shrink-0 animate-marquee flex-row">
              {partners.map((partner, idx) => (
                <span key={idx} className="text-lg md:text-2xl font-display uppercase tracking-[0.2em] font-light text-white/20 hover:text-white/60 transition-colors duration-300 cursor-default">
                  {partner}
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="flex gap-16 justify-around min-w-full shrink-0 animate-marquee flex-row">
              {partners.map((partner, idx) => (
                <span key={idx} className="text-lg md:text-2xl font-display uppercase tracking-[0.2em] font-light text-white/20 hover:text-white/60 transition-colors duration-300 cursor-default">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-black flex flex-col justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-4">Your Career Journey Starts Here</h2>
          <p className="text-xs text-white/60 font-light max-w-xl mx-auto mb-3">
            Join Monarch Placements and become interview-ready with dedicated placement support.
          </p>
          <p className="text-xs text-emerald-400 font-semibold mb-8 uppercase tracking-wider animate-pulse">
            ★ Limited Time Offer: Not placed in 3 months? Get your money refunded ★
          </p>
          <Link
            href="/contact"
            className="px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded inline-block"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </div>
  )
}

"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Award, Users, BookOpen, Briefcase } from 'lucide-react'
import SpotlightCard from '@/components/SpotlightCard'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'

const ThreeGlobe = dynamic(() => import('@/components/ThreeGlobe'), { ssr: false })
const CardSwap = dynamic(() => import('@/components/CardSwap'), { ssr: false })
const Card = dynamic(() => import('@/components/CardSwap').then(mod => mod.Card), { ssr: false })

// Simple count-up component for stats
function Counter({ target, suffix = "" }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = target
    const duration = 2000 // ms
    const incrementTime = Math.max(Math.floor(duration / end), 15)
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100)
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-display font-bold text-white group-hover:text-glow transition-all">
      {count}{suffix}
    </span>
  )
}

export default function Home() {
  const [seatsLeft, setSeatsLeft] = useState(25)
  const [loadSpline, setLoadSpline] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadSpline(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => (prev > 7 ? prev - 1 : prev))
    }, 45000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  }

  const stats = [
    {
      target: 100,
      suffix: '+',
      label: 'Students Trained',
      desc: '100+ students transformed into industry-ready professionals through our comprehensive training programs',
      icon: <Users className="w-5 h-5 text-white/80" />
    },
    {
      target: 100,
      suffix: '+',
      label: 'Hiring Partners',
      desc: '100+ top companies partner with us for campus recruitment and hiring',
      icon: <Award className="w-5 h-5 text-white/80" />
    },
    {
      target: 95,
      suffix: '%',
      label: 'Placement Rate',
      desc: "95% of our students secure placements within 3 months of program completion",
      icon: <Briefcase className="w-5 h-5 text-white/80" />
    },
    {
      target: 3,
      suffix: ' Months',
      label: 'Month Program',
      desc: 'Intensive 3-month industry-focused curriculum designed for rapid skill development',
      icon: <BookOpen className="w-5 h-5 text-white/80" />
    }
  ]

  const features = [
    {
      title: 'Industry-Aligned Curriculum',
      brief: 'Curriculum designed with hiring partners to match current job requirements',
      detail: 'Our curriculum is co-created with 100+ hiring partners to ensure every skill taught matches what companies are actively hiring for right now.'
    },
    {
      title: 'Expert Mentors',
      brief: 'Learn from industry veterans with 10+ years at top tech companies',
      detail: 'Our mentors are senior engineers and hiring managers from FAANG and top product companies who bring real-world experience to every session.'
    },
    {
      title: 'Real Projects',
      brief: 'Build 3+ production-grade projects for your portfolio',
      detail: 'Work on end-to-end projects that simulate real workplace scenarios. Build a portfolio that proves you can deliver production-ready code.'
    },
    {
      title: 'Mock Interviews',
      brief: 'Weekly mock interviews with hiring managers from partner companies',
      detail: 'Practice with real hiring managers from our partner companies. Get detailed feedback on technical and behavioral rounds before the real thing.'
    },
    {
      title: 'Resume & LinkedIn',
      brief: 'Professional resume building and LinkedIn optimization sessions',
      detail: 'Get your resume reviewed by recruiters. Optimize your LinkedIn profile to attract hiring managers. Stand out in applicant tracking systems.'
    },
    {
      title: 'Placement Support',
      brief: 'Dedicated placement support until you land your dream role',
      detail: "We don't just train you—we stay with you until you're placed. Unlimited interview opportunities, referral network access, and career counseling."
    }
  ]

  const modules = [
    {
      title: 'Aptitude Training',
      desc: 'Logical Reasoning, Quantitative Aptitude and Problem Solving',
      tag: '40 Hours',
      bullets: [
        'Logical Reasoning & Puzzles',
        'Quantitative Aptitude',
        'Data Interpretation',
        'Speed Math Techniques',
        'Weekly Assessment Tests'
      ]
    },
    {
      title: 'Technical Skills',
      desc: 'Programming Fundamentals, Projects and Industry Technologies',
      tag: '60 Hours',
      bullets: [
        'DSA in Python/Java/C++',
        'Web Development (MERN)',
        'Database Design & SQL',
        'System Design Basics',
        '3 Capstone Projects'
      ]
    },
    {
      title: 'Communication Skills',
      desc: 'Professional Communication and Confidence Building',
      tag: '20 Hours',
      bullets: [
        'Business Communication',
        'Email & Report Writing',
        'Presentation Skills',
        'Group Discussions',
        'Confidence Building'
      ]
    },
    {
      title: 'Resume Building',
      desc: 'Resume Creation and LinkedIn Profile Optimization',
      tag: '15 Hours',
      bullets: [
        'ATS-Friendly Resume',
        'LinkedIn Optimization',
        'GitHub Portfolio Setup',
        'Cover Letter Writing',
        'Personal Branding'
      ]
    },
    {
      title: 'Mock Interviews',
      desc: 'Technical and HR Interview Preparation Sessions',
      tag: '25 Hours',
      bullets: [
        'Technical Round Practice',
        'System Design Mock',
        'HR/Behavioral Rounds',
        'FAANG-Style Interviews',
        'Detailed Feedback Reports'
      ]
    },
    {
      title: 'Placement Support',
      desc: 'Career Guidance, Job Alerts and Application Support',
      tag: 'Ongoing',
      bullets: [
        'Job Referral Network',
        'Weekly Job Alerts',
        'Application Tracking',
        'Salary Negotiation'
      ]
    }
  ]

  const partners = [
    'Cognizant', 'Accenture', 'TCS', 'Wipro', 'Infosys', 'Zoho', 'Capgemini', 'Tech Mahindra'
  ]

  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* 1. ENTERPRISE HERO WITH 3D GLOBE */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Interactive Spline 3D Scene with Dark Gradient Masks to preserve text legibility */}
        <div className="spline-container absolute inset-0 -z-10 overflow-hidden bg-black pointer-events-none">
          {loadSpline && (
            <iframe
              src="https://my.spline.design/nexbotrobotcharacterconcept-kLwr8f6hgKgaa5gmU6oB00Si"
              frameBorder="0"
              width="100%"
              height="100%"
              id="aura-spline"
              className="w-full h-full scale-[1.02] origin-center opacity-90 pointer-events-none"
            ></iframe>
          )}
          {/* Black ambient masks to protect text contrast and blend iframe edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
        </div>

        <Hero
          title={
            <>
              Train for What <br className="hidden md:inline" />{" "}
              <span className="text-glow font-bold">
                Companies Hire For
              </span>
            </>
          }
          description="3 Months of Industry-Focused Training, Interview Preparation and Placement Support. Get trained based on current company requirements and become placement-ready."
          primaryCtaText="Explore Program"
          primaryCtaLink="/training"
          secondaryCtaText="Enroll Today"
          secondaryCtaLink="/contact"
          bgText=""
        />

        {/* Hero Grid Stats using SpotlightCard */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-12 border-t border-white/5 pt-12 relative z-10"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <SpotlightCard className="p-6 h-full flex flex-col justify-between group">
                <div className="flex justify-between items-start mb-3">
                  <Counter target={stat.target} suffix={stat.suffix} />
                  <div className="p-1.5 border border-white/10 rounded bg-white/5 group-hover:border-white/20 transition-all">{stat.icon}</div>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2 font-medium">{stat.label}</p>
                <p className="text-[10px] text-white/40 leading-relaxed font-light mt-1">{stat.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 2. ADMISSION BANNER */}
      <section className="px-6 py-12 border-t border-b border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black relative">
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[9px] tracking-widest uppercase text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>ADMISSIONS OPEN 2026</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border border-emerald-500/20 bg-emerald-500/5 rounded-full text-[9px] tracking-widest uppercase text-emerald-400 font-semibold">
              <span>LIMITED TIME OFFER: 100% REFUND POLICY</span>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase text-white mb-2">Limited Seats Available</h3>
          <p className="text-xs text-white/60 font-light max-w-xl mb-3">
            Only <span className="text-white font-medium underline decoration-white/20 decoration-2 underline-offset-4">{seatsLeft}</span> Seats Left for the upcoming batch. Secure your place before registrations close.
          </p>
          <p className="text-xs text-emerald-400 font-medium mb-6 uppercase tracking-wider">
            ★ NOT PLACED IN 3 MONTHS? GET YOUR MONEY REFUNDED ★
          </p>

          <div className="flex items-center gap-2 mb-8 text-[10px] tracking-wider text-white/40 uppercase font-light">
            <span className="w-2 h-2 rounded-full border border-white/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
            <span>Registrations Active Now</span>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 border border-white text-xs uppercase tracking-widest text-black bg-white hover:bg-black hover:text-white transition-all duration-300 font-medium rounded"
          >
            Claim Your Seat Now
          </Link>
        </div>
      </section>

      {/* 3. WHY MONARCH */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3">WHY MONARCH</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-white mb-8">
              Why Choose Monarch?
            </h2>
            <div className="space-y-6 text-xs text-white/60 font-light leading-relaxed">
              <p>At Monarch Training & Placements, we focus on bridging the gap between education and employment through industry-focused training, practical learning and placement support. Our programs are designed to help students and job seekers develop technical expertise, communication skills and professional confidence required to succeed in today&apos;s competitive job market.</p>
              <p>With expert guidance, hands-on learning and career-oriented preparation, we empower individuals to become industry-ready professionals and achieve long-term career success.</p>
            </div>
          </div>

          {/* Right Cards stack using CardSwap */}
          <div className="lg:col-span-7 flex justify-center items-center py-12 md:py-24 relative overflow-visible min-h-[500px]">
            <CardSwap
              width={420}
              height={260}
              cardDistance={24}
              verticalDistance={28}
              delay={3500}
              pauseOnHover={true}
            >
              {features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="p-8 flex flex-col justify-between select-none cursor-default border border-white/15"
                >
                  <div>
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-white mb-3 tracking-[0.1em]">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light leading-relaxed mb-4">
                      {feature.brief}
                    </p>
                    <p className="text-[11px] text-white/55 font-light leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>
                  <div className="text-[10px] text-white/45 font-display mt-4 tracking-widest">
                    0{idx + 1}
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </section>

      {/* 4. CURRICULUM */}
      <section className="py-24 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">CURRICULUM</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">What You Will Learn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, idx) => (
              <SpotlightCard 
                key={idx}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] text-white/30 font-display tracking-widest">MODULE 0{idx + 1}</span>
                    <span className="px-2 py-0.5 border border-white/10 bg-white/5 rounded text-[9px] uppercase tracking-widest text-white/60 font-medium">
                      {mod.tag}
                    </span>
                  </div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white mb-2">{mod.title}</h3>
                  <p className="text-xs text-white/50 font-light leading-relaxed mb-6 border-b border-white/5 pb-4">{mod.desc}</p>
                  
                  <ul className="space-y-2.5">
                    {mod.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-white/70 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/45 mt-1.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARTNER COMPANIES */}
      <section className="py-24 border-t border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">HIRING PARTNERS</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Trusted by Industry Leaders</h2>
        </div>

        {/* Typographic Infinite Scrolling Marquee */}
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

      {/* 6. CTA SECTION */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-black flex flex-col justify-center items-center">
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-glow text-white mb-6 leading-tight">Ready To Start Your Career?</h2>
          <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed max-w-xl mx-auto mb-10">
            Join Monarch Training & Placements and become industry-ready through structured training, interview preparation and placement support.
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

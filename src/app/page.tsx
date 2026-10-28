"use client"

import { RevealSection } from '@/components/Reveal'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Award, Users, BookOpen, Briefcase, GraduationCap, Building2, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react'
import SpotlightCard from '@/components/SpotlightCard'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'
import { trackEvent } from '@/lib/analytics'
import RevealGrid from '@/components/RevealGrid'

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
    const duration = 1800 // ms
    const incrementTime = Math.max(Math.floor(duration / end), 20)
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 80)
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
    <span ref={ref} className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-white group-hover:text-glow transition-all">
      {count}{suffix}
    </span>
  )
}

export default function Home() {
  const [openCommitmentIndex, setOpenCommitmentIndex] = useState<number | null>(0)

  const commitments = [
    {
      num: '01',
      title: 'Hands-on Training vs Employment',
      desc: 'We provide practical training, real project guidance, and intensive mock interviews. While we provide placement assistance and recruiter connection opportunities, hiring decisions rest solely with company recruiters based on candidate merit.',
    },
    {
      num: '02',
      title: 'Genuine Project Deliverables',
      desc: 'Every internship candidate is required to complete code deliverables and submit working repositories. Certificate eligibility requires meeting attendance benchmarks and completing approved evaluation projects.',
    },
    {
      num: '03',
      title: 'Institutional Collaboration',
      desc: 'We collaborate closely with colleges and academic departments to deliver syllabus-aligned technical workshops, bootcamps, and faculty-approved project evaluation.',
    },
  ]

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

  // Verified, genuine credibility statistics
  const stats = [
    {
      target: 100,
      suffix: '%',
      label: 'Practical Training',
      desc: 'Hands-on assignments, production-grade projects, and mentor-led technical sessions.',
      icon: <Users className="w-5 h-5 text-white/80" />
    },
    {
      target: 5,
      suffix: ' Tracks',
      label: 'Flexible Durations',
      desc: 'Project internships ranging from 15 days to 6 months with verified certificate eligibility.',
      icon: <Award className="w-5 h-5 text-white/80" />
    },
    {
      target: 3,
      suffix: ' Months',
      label: 'Flagship Training',
      desc: 'Structured curriculum spanning aptitude, programming, system concepts, and interview practice.',
      icon: <BookOpen className="w-5 h-5 text-white/80" />
    },
    {
      target: 1,
      suffix: '-on-1',
      label: 'Career Guidance',
      desc: 'Individual resume review, mock interviews, and career counseling for placement readiness.',
      icon: <Briefcase className="w-5 h-5 text-white/80" />
    }
  ]

  const features = [
    {
      title: 'Industry-Aligned Curriculum',
      brief: 'Curriculum structured according to current engineering and recruitment standards',
      detail: 'Our curriculum focuses on modern technologies, practical problem solving, and workplace standards actively sought across software development teams.'
    },
    {
      title: 'Expert Mentors',
      brief: 'Learn from experienced developers and industry professionals',
      detail: 'Our trainers and mentors bring real-world software engineering experience to guide students through code reviews, system design, and best practices.'
    },
    {
      title: 'Real Projects',
      brief: 'Build production-grade projects for your technical portfolio',
      detail: 'Work on end-to-end applications that simulate real workplace requirements, giving you demonstrable code and deployment experience.'
    },
    {
      title: 'Mock Interviews',
      brief: 'Technical problem-solving and HR behavioral preparation',
      detail: 'Practice structured technical problem-solving rounds, coding assessments, and behavioral questions with comprehensive feedback reports.'
    },
    {
      title: 'Resume & LinkedIn',
      brief: 'Professional resume building and LinkedIn optimization',
      detail: 'Craft ATS-compliant resumes and optimize your technical profile to effectively highlight projects, technical skills, and accomplishments.'
    },
    {
      title: 'Placement Assistance',
      brief: 'Career guidance, opportunity alerts, and interview preparation',
      detail: 'Comprehensive support including job search guidance, referral opportunities, interview debriefs, and ongoing career counseling.'
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
        'Coding Round Drills',
        'Detailed Feedback Reports'
      ]
    },
    {
      title: 'Placement Support',
      desc: 'Career Guidance, Opportunity Alerts and Application Review',
      tag: 'Ongoing',
      bullets: [
        'Recruitment Drives Guidance',
        'Weekly Opportunity Alerts',
        'Application & Portfolio Review',
        'Interview Debrief Sessions'
      ]
    }
  ]

  const partners = [
    'Cognizant', 'Accenture', 'TCS', 'Wipro', 'Infosys', 'Zoho', 'Capgemini', 'Tech Mahindra'
  ]

  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* 1. ENTERPRISE HERO WITH 3D SPLINE SCENE */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 w-full overflow-hidden">
        {/* Interactive Spline 3D Scene with Dark Gradient Masks to preserve text legibility */}
        <div className="spline-container absolute inset-x-0 top-16 h-[72svh] min-h-[480px] sm:top-12 sm:h-[82svh] md:inset-0 md:h-full md:min-h-0 -z-10 overflow-hidden bg-black pointer-events-none">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-kLwr8f6hgKgaa5gmU6oB00Si"
            frameBorder="0"
            width="100%"
            height="100%"
            id="aura-spline"
            className="relative left-1/2 -top-[9%] -translate-x-1/2 w-[135%] h-[118%] scale-[0.86] sm:left-0 sm:top-0 sm:translate-x-0 sm:w-full sm:h-full sm:scale-95 md:scale-[1.02] origin-center opacity-70 sm:opacity-80 md:opacity-90 pointer-events-none"
          ></iframe>
          {/* Black ambient masks to protect text contrast and blend iframe edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 md:via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-0 md:px-6 flex flex-col items-center">
          <Hero
            title={
              <>
                Learn Skills. <br className="hidden md:inline" />{" "}
                <span className="text-glow font-bold">
                  Build Projects. Get Industry-Ready.
                </span>
              </>
            }
            description="Practical training, project-based internships, and career guidance designed to help students connect what they learn with what the industry expects."
            primaryCtaText="Explore Internships"
            primaryCtaLink="/internships"
            secondaryCtaText="College Partnerships"
            secondaryCtaLink="/college-partnerships"
            bgText=""
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero Grid Stats using SpotlightCard */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-8 sm:mt-12 pt-8 sm:pt-12 relative z-10"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <SpotlightCard className="p-4 sm:p-6 h-full flex flex-col justify-between group">
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
        </div>
      </section>

      {/* 2. ADMISSION & BATCH NOTICE */}
      <RevealSection className="px-6 py-12 border-t border-b border-white/5 bg-transparent relative">
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[9px] tracking-widest uppercase text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>UPCOMING COHORTS • 2026</span>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase text-white mb-2">Hands-on Technical Training & Internships</h3>
          <p className="text-xs text-white/60 font-light max-w-xl mb-4 leading-relaxed">
            Weekday and weekend batch admissions are actively enrolling across Full-Stack, Python, and AI tracks. Reserve your batch or consult our academic team.
          </p>

          <div className="block md:flex items-center gap-2 mb-6 text-[10px] tracking-wider text-white/40 uppercase font-light">
            <span className="inline-flex md:flex w-2 h-2 rounded-full border border-white/20 items-center justify-center align-middle mr-2 md:mr-0 -translate-y-[1px] md:translate-y-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
            <span>Online, Offline (Coimbatore), & Hybrid Formats Available</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/internships"
              onClick={() => trackEvent('internship_cta_click', { source: 'banner' })}
              className="px-6 py-3 border border-white text-xs uppercase tracking-widest text-black bg-white hover:bg-black hover:text-white transition-all duration-300 font-medium rounded"
            >
              View Internship Tracks
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/20 text-xs uppercase tracking-widest text-white hover:border-white transition-all duration-300 font-medium rounded"
            >
              Enquire for Schedule
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* 3. TWO AUDIENCE PATHWAYS: STUDENTS VS COLLEGES */}
      <RevealSection className="py-20 px-6 max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-2 block">TAILORED PATHWAYS</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">Choose Your Journey</h2>
          <p className="text-xs text-white/50 max-w-xl mx-auto mt-2 font-light">
            Dedicated programs designed for aspiring professionals and institutional partners.
          </p>
        </div>

        <RevealGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Pathway 1: For Students */}
          <SpotlightCard className="p-5 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">For Students & Graduates</span>
              <h3 className="text-xl font-display font-bold text-white mt-1 mb-3">Project Internships & Training</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                Connect academic learning with real industry standards. Gain hands-on project experience, mentorship from software engineers, and placement preparation.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-white/70 font-light">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Flexible durations: 15 Days, 1M, 2M, 3M, or 6M</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Production-grade portfolio project deliverables</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Aptitude, technical coding, and mock HR interviews</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Verified internship & course completion certification</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
              <Link
                href="/internships"
                className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-medium rounded hover:bg-white/90 transition-all flex items-center gap-2"
              >
                Explore Internships <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/training"
                className="px-5 py-2.5 border border-white/20 text-white text-xs uppercase tracking-widest font-medium rounded hover:border-white transition-all"
              >
                3-Month Program
              </Link>
            </div>
          </SpotlightCard>

          {/* Pathway 2: For Colleges */}
          <SpotlightCard className="p-5 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">For Colleges & Institutions</span>
              <h3 className="text-xl font-display font-bold text-white mt-1 mb-3">Institutional Training & Workshops</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                Partner with Monarch to elevate student technical capabilities through customized campus bootcamps, departmental workshops, and industry guest lectures.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-white/70 font-light">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Department-level technical training & short courses</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Hands-on campus workshops & technical bootcamps</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Industry guest lectures by experienced tech practitioners</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Tailored syllabi aligned with institutional schedules</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
              <Link
                href="/college-partnerships"
                className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-medium rounded hover:bg-white/90 transition-all flex items-center gap-2"
              >
                College Partnerships <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/college-partnerships#proposal"
                className="px-5 py-2.5 border border-white/20 text-white text-xs uppercase tracking-widest font-medium rounded hover:border-white transition-all"
              >
                Request Proposal
              </Link>
            </div>
          </SpotlightCard>
        </RevealGrid>
      </RevealSection>

      {/* 4. WHY MONARCH (PRESERVED CARDSWAP COMPONENT) */}
      <RevealSection className="py-24 border-t border-white/5 relative w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Text */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs tracking-widest uppercase text-white/40 mb-3">WHY MONARCH</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-white mb-8">
                Why Choose Monarch?
              </h2>
              <div className="space-y-6 text-xs text-white/60 font-light leading-relaxed">
                <p>At Monarch Training & Placements, we focus on bridging the gap between education and employment through industry-focused training, practical learning and placement support. Our programs are designed to help students and job seekers develop technical expertise, communication skills and professional confidence required to succeed in today&apos;s competitive job market.</p>
                <p>With structured guidance, hands-on learning and career-oriented preparation, we empower individuals to become industry-ready professionals and achieve long-term career success.</p>
              </div>
            </div>

            {/* Right Cards stack using CardSwap */}
            <div className="lg:col-span-7 flex justify-center items-center py-8 sm:py-12 md:py-24 relative overflow-hidden sm:overflow-visible min-h-[380px] sm:min-h-[500px] w-full max-w-full">
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
        </div>
      </RevealSection>

      {/* 5. CURRICULUM */}
      <RevealSection className="py-24 border-t border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">CURRICULUM</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">What You Will Learn</h2>
          </div>

          <RevealGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </RevealGrid>
        </div>
      </RevealSection>

      {/* 6. TARGET TECH STANDARDS MARQUEE */}
      <RevealSection className="py-24 border-t border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">TARGET RECRUITMENT STANDARDS</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Prepared for Modern Enterprise Stacks</h2>
          <p className="text-xs text-white/50 max-w-xl mx-auto mt-2 font-light">
            Training and projects aligned with technical interview rounds and requirements at leading technology enterprises.
          </p>
        </div>

        {/* Typographic Infinite Scrolling Marquee */}
        <div className="w-full flex flex-col gap-6 relative">
          <div className="flex gap-0 py-3 overflow-hidden select-none w-full relative">
            <div className="flex gap-16 justify-around min-w-full shrink-0 animate-marquee flex-row pr-16">
              {partners.map((partner, idx) => (
                <span key={idx} className="text-lg md:text-2xl font-display uppercase tracking-[0.2em] font-light text-white/20 hover:text-white/60 transition-colors duration-300 cursor-default">
                  {partner}
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="flex gap-16 justify-around min-w-full shrink-0 animate-marquee flex-row pr-16">
              {partners.map((partner, idx) => (
                <span key={idx} className="text-lg md:text-2xl font-display uppercase tracking-[0.2em] font-light text-white/20 hover:text-white/60 transition-colors duration-300 cursor-default">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 7. TRANSPARENCY & TRUST SECTION */}
      <RevealSection className="py-20 border-t border-white/5 w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-2 block">TRANSPARENCY & INTEGRITY</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Our Placement & Training Commitment</h2>
            <p className="text-xs text-white/50 max-w-2xl mx-auto mt-2 font-light leading-relaxed">
              We believe in honest communication regarding what we provide, what we require from students, and how recruitment works.
            </p>
          </div>

          {/* Numbered Minimalist Accordion */}
          <div className="max-w-4xl mx-auto border-y border-white/10 divide-y divide-white/10">
            {commitments.map((item, idx) => {
              const isOpen = openCommitmentIndex === idx
              return (
                <div key={item.num} className="transition-colors duration-200">
                  <button
                    type="button"
                    onClick={() => setOpenCommitmentIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    suppressHydrationWarning
                    className="w-full py-6 sm:py-7 flex items-center justify-between gap-4 text-left group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-5 sm:gap-8 min-w-0">
                      <span className="font-mono text-sm sm:text-base text-white/40 tracking-wider group-hover:text-white/70 transition-colors shrink-0">
                        {item.num}
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg font-display font-semibold uppercase tracking-wider text-white group-hover:text-white/90 transition-colors text-left break-words">
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'border-white/40 bg-white/10 text-white'
                          : 'border-white/15 bg-white/[0.02] text-white/60 group-hover:border-white/30 group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 pb-7'
                        : 'grid-rows-[0fr] opacity-0 pb-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed pl-6 sm:pl-14 pr-2 sm:pr-14">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </RevealSection>

      {/* 8. CTA SECTION */}
      <RevealSection className="py-24 border-t border-white/5 relative overflow-hidden bg-transparent flex flex-col justify-center items-center">
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-glow text-white mb-6 leading-tight">Ready To Build Your Tech Career?</h2>
          <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed max-w-xl mx-auto mb-10">
            Join Monarch Training & Placements to master practical coding, develop production projects, and prepare thoroughly for industry recruitment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/internships"
              className="px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded inline-block"
            >
              Explore Internships
            </Link>
            <Link
              href="/college-partnerships"
              className="px-8 py-3.5 border border-white/20 bg-transparent text-white text-xs uppercase tracking-widest font-semibold hover:border-white transition-all duration-500 rounded inline-block"
            >
              College Partnerships
            </Link>
          </div>
        </div>
      </RevealSection>
    </div>
  )
}

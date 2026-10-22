"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Award, Users, BookOpen, Briefcase, GraduationCap, Building2, CheckCircle2, ArrowRight } from 'lucide-react'
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
    <span ref={ref} className="text-3xl md:text-4xl font-display font-bold text-white group-hover:text-glow transition-all">
      {count}{suffix}
    </span>
  )
}

export default function Home() {
  const [loadSpline, setLoadSpline] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadSpline(true)
    }, 1500)
    return () => clearTimeout(timer)
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

      {/* 2. ADMISSION & BATCH NOTICE */}
      <section className="px-6 py-12 border-t border-b border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black relative">
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

          <div className="flex items-center gap-2 mb-6 text-[10px] tracking-wider text-white/40 uppercase font-light">
            <span className="w-2 h-2 rounded-full border border-white/20 flex items-center justify-center">
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
      </section>

      {/* 3. TWO AUDIENCE PATHWAYS: STUDENTS VS COLLEGES */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-2 block">TAILORED PATHWAYS</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">Choose Your Journey</h2>
          <p className="text-xs text-white/50 max-w-xl mx-auto mt-2 font-light">
            Dedicated programs designed for aspiring professionals and institutional partners.
          </p>
        </div>

        <RevealGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pathway 1: For Students */}
          <SpotlightCard className="p-8 flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all group">
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
          <SpotlightCard className="p-8 flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all group">
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
      </section>

      {/* 4. WHY MONARCH (PRESERVED CARDSWAP COMPONENT) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/5">
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

      {/* 5. CURRICULUM */}
      <section className="py-24 border-t border-white/5 bg-black/40">
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
      </section>

      {/* 6. TARGET TECH STANDARDS MARQUEE */}
      <section className="py-24 border-t border-white/5 overflow-hidden relative">
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

      {/* 7. TRANSPARENCY & TRUST SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-2 block">TRANSPARENCY & INTEGRITY</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Our Placement & Training Commitment</h2>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mt-2 font-light leading-relaxed">
            We believe in honest communication regarding what we provide, what we require from students, and how recruitment works.
          </p>
        </div>

        <RevealGrid hoverLift className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded border border-white/10">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-2">1. Hands-on Training vs Employment</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              We provide practical training, real project guidance, and intensive mock interviews. While we provide placement assistance and recruiter connection opportunities, hiring decisions rest solely with company recruiters based on candidate merit.
            </p>
          </div>
          <div className="glass-card p-6 rounded border border-white/10">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-2">2. Genuine Project Deliverables</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Every internship candidate is required to complete code deliverables and submit working repositories. Certificate eligibility requires meeting attendance benchmarks and completing approved evaluation projects.
            </p>
          </div>
          <div className="glass-card p-6 rounded border border-white/10">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-2">3. Institutional Collaboration</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              We collaborate closely with colleges and academic departments to deliver syllabus-aligned technical workshops, bootcamps, and faculty-approved project evaluation.
            </p>
          </div>
        </RevealGrid>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-black flex flex-col justify-center items-center">
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
      </section>
    </div>
  )
}

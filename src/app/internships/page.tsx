"use client"

import { RevealSection } from '@/components/Reveal'
import RevealGrid from '@/components/RevealGrid'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Code2, 
  CheckCircle2, 
  Layers, 
  BookOpen, 
  Award, 
  Send, 
  Users2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Database,
  BrainCircuit,
  Server,
  PanelsTopLeft
} from 'lucide-react'
import confetti from 'canvas-confetti'
import Hero from '@/components/Hero'
import LiquidGlassCard from '@/components/LiquidGlassCard'
import DomainDetailsModal from '@/components/DomainDetailsModal'
import EditorialInternshipExperience from '@/components/EditorialInternshipExperience'
import dynamic from 'next/dynamic'
import { trackEvent } from '@/lib/analytics'

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false })
const FLOATING_WAVES = ['middle', 'bottom', 'top']

export interface DomainItem {
  id: string
  num: string
  category: string
  name: string
  formDomainValue: string
  shortTech: string
  techBadges: string[]
  overview: string
  outcome: string
  icon: React.ComponentType<{ className?: string }>
  keyModules: {
    title: string
    topic: string
  }[]
}

export default function InternshipsPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const [selectedDuration, setSelectedDuration] = useState<string>('1 Month')
  const [selectedDomain, setSelectedDomain] = useState<string>('Full-Stack Web Development')
  
  // Domain Details Modal State
  const [selectedDomainModal, setSelectedDomainModal] = useState<DomainItem | null>(null)
  const modalTriggerRef = useRef<HTMLButtonElement | null>(null)

  const handleApplyFromModal = (dom: DomainItem) => {
    setSelectedDomainModal(null)
    const formValue = dom.formDomainValue || dom.name
    setSelectedDomain(formValue)
    setFormData(prev => ({ ...prev, preferredDomain: formValue }))
    trackEvent('internship_modal_apply_click', { domain: dom.name })
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    collegeName: '',
    courseAndYear: '',
    preferredDomain: 'Full-Stack Web Development',
    preferredDuration: '1 Month',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState<string>('')

  // FAQ interactive hover & touch state
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const scrollToApply = (duration?: string, domain?: string) => {
    if (duration) {
      setSelectedDuration(duration)
      setFormData(prev => ({ ...prev, preferredDuration: duration }))
    }
    if (domain) {
      setSelectedDomain(domain)
      setFormData(prev => ({ ...prev, preferredDomain: domain }))
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    trackEvent('internship_cta_click', { duration: duration || 'default' })
  }

  // Horizontal scrolling refs & state for Duration section
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const isPointerDown = useRef(false)
  const dragStartX = useRef(0)
  const initialScrollLeft = useRef(0)
  const hasDragged = useRef(false)
  const isInteracting = useRef(false)
  const isAutoScrolling = useRef(true)
  const scrollDirection = useRef<1 | -1>(1)
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null)
  const animationFrameId = useRef<number | null>(null)

  const pauseAutoScroll = () => {
    isInteracting.current = true
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
  }

  const resumeAutoScrollAfterDelay = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    resumeTimeout.current = setTimeout(() => {
      isInteracting.current = false
      isAutoScrolling.current = true
    }, 2500)
  }

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const maxScroll = container.scrollWidth - container.clientWidth
    if (maxScroll <= 0) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }
    const atStart = container.scrollLeft <= 2
    const atEnd = container.scrollLeft >= maxScroll - 2

    setCanScrollLeft(prev => (prev === !atStart ? prev : !atStart))
    setCanScrollRight(prev => (prev === !atEnd ? prev : !atEnd))
  }

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return
    pauseAutoScroll()
    resumeAutoScrollAfterDelay()

    const firstCard = container.querySelector<HTMLElement>('[data-duration-card]')
    const cardWidth = firstCard ? firstCard.offsetWidth : 394
    const scrollStep = cardWidth + 24 // card width + gap-6 (24px)

    const maxScroll = container.scrollWidth - container.clientWidth
    let target = direction === 'left' ? container.scrollLeft - scrollStep : container.scrollLeft + scrollStep

    if (target < 0) target = 0
    if (target > maxScroll) target = maxScroll

    container.scrollTo({
      left: target,
      behavior: 'smooth',
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current
    if (!container) return
    isPointerDown.current = true
    hasDragged.current = false
    dragStartX.current = e.pageX - container.offsetLeft
    initialScrollLeft.current = container.scrollLeft
    pauseAutoScroll()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDown.current) return
    const container = scrollContainerRef.current
    if (!container) return
    const currentX = e.pageX - container.offsetLeft
    const diff = currentX - dragStartX.current
    if (Math.abs(diff) > 5) {
      hasDragged.current = true
    }
    container.scrollLeft = initialScrollLeft.current - diff
  }

  const handleMouseUp = () => {
    isPointerDown.current = false
    resumeAutoScrollAfterDelay()
    setTimeout(() => {
      hasDragged.current = false
    }, 80)
  }

  const handleMouseLeave = () => {
    if (isPointerDown.current) {
      isPointerDown.current = false
      resumeAutoScrollAfterDelay()
      setTimeout(() => {
        hasDragged.current = false
      }, 80)
    }
  }

  const handleTouchStart = () => {
    pauseAutoScroll()
  }

  const handleTouchEnd = () => {
    resumeAutoScrollAfterDelay()
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Ensure carousel starts cleanly at the first card on mount
    container.scrollLeft = 0
    updateScrollButtons()

    const onScrollHandler = () => {
      updateScrollButtons()
    }
    container.addEventListener('scroll', onScrollHandler, { passive: true })

    const onResizeHandler = () => {
      updateScrollButtons()
    }
    window.addEventListener('resize', onResizeHandler, { passive: true })

    // Wheel event listener: handle horizontal scrolling and prevent page scroll trap
    const onWheelHandler = (e: WheelEvent) => {
      pauseAutoScroll()
      resumeAutoScrollAfterDelay()

      // Trackpad or shift-key horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return
      }

      // Vertical mouse wheel translated to horizontal scroll when within scroll bounds
      const maxScroll = container.scrollWidth - container.clientWidth
      const canScrollRight = e.deltaY > 0 && container.scrollLeft < maxScroll - 1
      const canScrollLeft = e.deltaY < 0 && container.scrollLeft > 1

      if (canScrollRight || canScrollLeft) {
        container.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }

    container.addEventListener('wheel', onWheelHandler, { passive: false })

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      isAutoScrolling.current = false
      return () => {
        container.removeEventListener('wheel', onWheelHandler)
        container.removeEventListener('scroll', onScrollHandler)
        window.removeEventListener('resize', onResizeHandler)
      }
    }

    let lastTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - lastTime
      lastTime = now

      if (container && !isInteracting.current && isAutoScrolling.current) {
        const maxScroll = container.scrollWidth - container.clientWidth

        if (maxScroll > 0) {
          const delta = (elapsed / 16.67) * 0.5 * scrollDirection.current
          container.scrollLeft += delta

          if (container.scrollLeft >= maxScroll - 1) {
            container.scrollLeft = maxScroll
            scrollDirection.current = -1
            isAutoScrolling.current = false
            setTimeout(() => {
              if (!isInteracting.current) isAutoScrolling.current = true
            }, 2000)
          } else if (container.scrollLeft <= 1) {
            container.scrollLeft = 0
            scrollDirection.current = 1
            isAutoScrolling.current = false
            setTimeout(() => {
              if (!isInteracting.current) isAutoScrolling.current = true
            }, 2000)
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(step)
    }

    animationFrameId.current = requestAnimationFrame(step)

    return () => {
      container.removeEventListener('wheel', onWheelHandler)
      container.removeEventListener('scroll', onScrollHandler)
      window.removeEventListener('resize', onResizeHandler)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    }
  }, [])

  // Duration options with distinct deliverables & depth
  const durationOptions = [
    {
      title: '15 Days',
      badge: 'Fast Track',
      hours: '30+ Hours',
      level: 'Foundation & Mini-Project',
      description: 'Ideal for semester break exposure. Covers core concepts, basic architecture, and an individual guided mini-project.',
      deliverable: '1 Functional Mini-Project & Git Repository',
      outcomes: ['Fundamental syntax & workflows', 'Git version control setup', 'Mini project deployment'],
      suitability: '1st & 2nd Year Students needing quick academic internship credits.',
    },
    {
      title: '1 Month',
      badge: 'Most Popular',
      hours: '60+ Hours',
      level: 'Intermediate Practical Track',
      description: 'Comprehensive hands-on training with database integration, API development, and a complete full-featured project.',
      deliverable: '1 Deployed Full-Stack Project with Documentation',
      outcomes: ['CRUD architecture & REST APIs', 'Database schema modeling', 'Live cloud hosting & presentation'],
      suitability: '2nd & 3rd Year Students fulfilling academic internship requirements.',
    },
    {
      title: '2 Months',
      badge: 'Deep Dive',
      hours: '120+ Hours',
      level: 'Advanced Project Track',
      description: 'Deep dive into complex domain patterns, state management, security, and a multi-tier capstone project.',
      deliverable: '2 Complete Technical Projects (Client & Server)',
      outcomes: ['Authentication & authorization', 'State management & optimization', 'Code review & testing basics'],
      suitability: 'Pre-final Year Students building strong technical portfolios.',
    },
    {
      title: '3 Months',
      badge: 'Placement Track',
      hours: '180+ Hours',
      level: 'Industry Readiness & Projects',
      description: 'Comprehensive engineering curriculum with advanced coding challenges, mock interviews, and 2 production capstones.',
      deliverable: '2 Production Capstones + ATS Portfolio',
      outcomes: ['System design & clean code', 'Weekly coding assessments', 'Mock technical & HR interview drills'],
      suitability: 'Final Year Students preparing actively for campus & off-campus hiring.',
    },
    {
      title: '6 Months',
      badge: 'Comprehensive',
      hours: '360+ Hours',
      level: 'Extended Apprenticeship Track',
      description: 'End-to-end industry preparation simulating full workplace engineering sprints, complex architecture, and team workflows.',
      deliverable: 'Enterprise-Grade Production App with CI/CD',
      outcomes: ['Microservices / Cloud basics', 'CI/CD pipeline deployment', 'Extensive interview debriefs & mentoring'],
      suitability: 'Graduates & Final Semester Students seeking comprehensive tech immersion.',
    },
  ]

  // Available Domains with Compact Structure & 5 Concise Key Modules
  const domains: DomainItem[] = [
    {
      id: 'fullstack',
      num: '01',
      category: 'Web Engineering',
      icon: Code2,
      name: 'Full-Stack Web Development',
      formDomainValue: 'Full-Stack Web Development',
      shortTech: 'React, Node.js, Express, MongoDB & Tailwind CSS',
      techBadges: ['React.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind'],
      overview: 'Build end-to-end web applications with modern client-server architecture, database persistence, and cloud deployment.',
      outcome: 'Full-Stack Web Application with DB & Auth',
      keyModules: [
        { title: 'Web Fundamentals & Modern CSS', topic: 'HTML5, Responsive UI, Tailwind' },
        { title: 'Modern JavaScript & DOM APIs', topic: 'ES6+, Async/Await, Events' },
        { title: 'React Architecture & State', topic: 'Components, Hooks, Context' },
        { title: 'Node.js & RESTful APIs', topic: 'Express, Routing, Middleware' },
        { title: 'Database & Cloud Deployment', topic: 'MongoDB/SQL, JWT, Vercel' },
      ],
    },
    {
      id: 'python-data',
      num: '02',
      category: 'Data Engineering',
      icon: Database,
      name: 'Python & Data Engineering',
      formDomainValue: 'Python & Data Engineering Foundations',
      shortTech: 'Python, Pandas, NumPy, SQL, FastAPI & Streamlit',
      techBadges: ['Python', 'Pandas', 'NumPy', 'PostgreSQL', 'FastAPI', 'Streamlit'],
      overview: 'Master programmatic data manipulation, automated ingestion pipelines, SQL querying, and interactive analytics dashboards.',
      outcome: 'Automated Data Pipeline & Analytics Dashboard',
      keyModules: [
        { title: 'Core Python & Object-Oriented Logic', topic: 'Data Structures, OOP, File I/O' },
        { title: 'Data Analysis with Pandas & NumPy', topic: 'Data Cleaning, Transformations' },
        { title: 'Relational Databases & SQL', topic: 'JOINs, Indexing, Aggregations' },
        { title: 'Lightweight APIs with FastAPI', topic: 'REST Endpoints, Pydantic' },
        { title: 'Interactive Dashboards with Streamlit', topic: 'KPI Dashboards, Real-time' },
      ],
    },
    {
      id: 'ai-ml',
      num: '03',
      category: 'Machine Learning & AI',
      icon: BrainCircuit,
      name: 'AI & Machine Learning',
      formDomainValue: 'AI & Machine Learning Foundations',
      shortTech: 'Python, Scikit-learn, PyTorch & LLM APIs',
      techBadges: ['Python', 'Scikit-learn', 'PyTorch', 'HuggingFace', 'OpenAI APIs'],
      overview: 'Develop machine learning models, feature engineering pipelines, neural network basics, and modern LLM API integrations.',
      outcome: 'Predictive ML Model & AI Inference App',
      keyModules: [
        { title: 'Math Foundations & Scientific Python', topic: 'Linear Algebra, NumPy, Matrix' },
        { title: 'Feature Engineering & EDA', topic: 'Data Prep, Scaling, Encodings' },
        { title: 'Supervised & Unsupervised Models', topic: 'Regression, Trees, Clustering' },
        { title: 'Model Evaluation & Optimization', topic: 'Metrics, Hyperparameters, Tuning' },
        { title: 'Deep Learning & LLM Integration', topic: 'PyTorch Basics, HuggingFace APIs' },
      ],
    },
    {
      id: 'java-backend',
      num: '04',
      category: 'Enterprise Backend',
      icon: Server,
      name: 'Java & Backend Development',
      formDomainValue: 'Java & Backend Architecture',
      shortTech: 'Java 17, Spring Boot, Hibernate, MySQL & Docker',
      techBadges: ['Java 17', 'Spring Boot', 'Hibernate', 'MySQL', 'Docker Basics'],
      overview: 'Engineer enterprise-grade backend services with object-oriented best practices, Spring Boot, JPA persistence, and Docker.',
      outcome: 'Secure Spring Boot Microservice API',
      keyModules: [
        { title: 'Core Java & Advanced OOP', topic: 'Collections, Streams, Concurrency' },
        { title: 'Spring Boot Framework Architecture', topic: 'IoC Container, Dependency Injection' },
        { title: 'RESTful Web Services & Validation', topic: 'Controllers, DTOs, Exception Handling' },
        { title: 'Persistence with Hibernate & SQL', topic: 'Spring Data JPA, Entity Mapping' },
        { title: 'Security (JWT) & Containerization', topic: 'Spring Security, Docker, Swagger' },
      ],
    },
    {
      id: 'frontend-ui',
      num: '05',
      category: 'Frontend Engineering',
      icon: PanelsTopLeft,
      name: 'Frontend UI/UX & React',
      formDomainValue: 'Frontend UI/UX & React Engineering',
      shortTech: 'Next.js, React, TypeScript, Tailwind & Motion',
      techBadges: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'Framer Motion'],
      overview: 'Craft high-performance, accessible web applications with modern Next.js conventions, TypeScript, and cinematic Framer Motion.',
      outcome: 'Cinematic Production Next.js Web App',
      keyModules: [
        { title: 'Design Systems & Modern CSS', topic: 'Semantic HTML, Tailwind Patterns' },
        { title: 'TypeScript for Component Architecture', topic: 'Interfaces, Generics, Event Typing' },
        { title: 'Advanced React Hooks & Performance', topic: 'Custom Hooks, Context, Optimization' },
        { title: 'Next.js App Router & Server Components', topic: 'Dynamic Routing, Layouts, SSR' },
        { title: 'Micro-Interactions & Production Deploy', topic: 'Framer Motion, Core Web Vitals' },
      ],
    },
  ]

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.'
    }

    const cleanPhone = formData.contactNumber.replace(/[\s-]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.contactNumber = 'Please enter a valid 10-digit WhatsApp number.'
    }

    if (!formData.collegeName.trim() || formData.collegeName.trim().length < 2) {
      errors.collegeName = 'Please enter your college or institution name.'
    }

    if (!formData.courseAndYear.trim() || formData.courseAndYear.trim().length < 2) {
      errors.courseAndYear = 'Please specify your degree & year of study (e.g. B.E CSE 3rd Year).'
    }

    if (!formData.preferredDuration) {
      errors.preferredDuration = 'Please select a preferred duration.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus('submitting')
    setServerMessage('')

    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setServerMessage(data.message || 'Application received successfully.')
        trackEvent('internship_form_submission', { 
          domain: formData.preferredDomain,
          duration: formData.preferredDuration 
        })
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#aaaaaa', '#444444'],
        })
      } else {
        setStatus('error')
        setServerMessage(data.error || 'Failed to submit application. Please verify details and retry.')
      }
    } catch {
      setStatus('error')
      setServerMessage('Network connection error. Please try again or reach out on WhatsApp.')
    }
  }

  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <FloatingLines 
            enabledWaves={FLOATING_WAVES}
            lineCount={5}
            lineDistance={10}
            bendRadius={8}
            bendStrength={-3}
            interactive={false}
            parallax={true}
            animationSpeed={0.8}
            gradientStart="#ffffff"
            gradientMid="#000000"
            gradientEnd="#000000"
            opacity={0.25}
          />
        </div>

        <Hero
          title={
            <>
              Project-Based <br className="hidden md:inline" />{" "}
              <span className="text-glow font-bold">
                Technical Internships
              </span>
            </>
          }
          description="Build verified production code, master industry workflows, and complete hands-on project deliverables with structured mentor guidance."
          primaryCtaText="Apply for Internship"
          primaryCtaLink="#apply"
          secondaryCtaText="Explore Durations"
          secondaryCtaLink="#durations"
          bgText=""
        />
      </div>

      {/* 2. DURATION OPTIONS (15 Days to 6 Months) */}
      <RevealSection id="durations" className="py-24 w-full border-t border-white/5 relative overflow-hidden">
        <div className="text-center mb-16 px-6 max-w-7xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">FLEXIBLE TIMELINES</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">Choose Your Duration</h2>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            Every duration tier includes direct mentor support and verified completion certificates. Learning depth and project scope scale directly with program length.
          </p>
        </div>

        {/* Carousel Outer Wrapper with Left and Right Circular Arrows - Full Width */}
        <div className="relative flex items-center w-full">
          {/* Circular Left Arrow Button */}
          <button suppressHydrationWarning
            type="button"
            onClick={() => scrollByCard('left')}
            disabled={!canScrollLeft}
            aria-label="Previous internship card"
            className="absolute left-2 sm:left-4 md:left-6 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07] hover:border-white/25 text-white/60 hover:text-white/85 flex items-center justify-center transition-all duration-200 disabled:opacity-15 disabled:cursor-not-allowed hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-1 focus:ring-white/20 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-current" />
          </button>

          {/* Single-Row Horizontal Scrolling Container */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing py-4 select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex flex-row gap-6 w-max px-4 sm:px-6 md:px-8">
              {durationOptions.map((opt, idx) => (
                <div
                  key={idx}
                  data-duration-card
                  className="w-[calc(100vw-5.5rem)] max-w-[394px] sm:w-[385px] md:w-[394px] shrink-0 flex flex-col"
                >
                  <LiquidGlassCard
                    selected={selectedDuration === opt.title}
                    className="h-full"
                  >
                    <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xl font-display font-bold text-white">{opt.title}</span>
                        <span className="px-2.5 py-0.5 border border-white/20 bg-white/5 text-[9px] uppercase tracking-widest text-white/80 rounded font-mono">
                          {opt.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-white/40 mb-4 font-mono">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {opt.hours}</span>
                        <span>•</span>
                        <span>{opt.level}</span>
                      </div>
                      <p className="text-xs text-white/60 font-light leading-relaxed mb-5">
                        {opt.description}
                      </p>

                      <div className="lg-inset p-3 mb-4">
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block mb-1 font-mono">Key Deliverable</span>
                        <p className="text-xs font-medium text-white/90">{opt.deliverable}</p>
                      </div>

                      <div className="space-y-2 mb-6">
                        {opt.outcomes.map((item, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2 text-[11px] text-white/70 font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[10px] text-white/40 italic mb-6 border-t border-white/5 pt-3">
                        Suitability: {opt.suitability}
                      </p>
                    </div>

                    <button suppressHydrationWarning
                      onClick={(e) => {
                        if (hasDragged.current) {
                          e.preventDefault()
                          return
                        }
                        scrollToApply(opt.title)
                      }}
                      className={`lg-btn w-full py-2.5 text-xs uppercase tracking-widest font-medium ${
                        selectedDuration === opt.title
                          ? 'lg-btn--selected font-semibold'
                          : 'text-white'
                      }`}
                    >
                      Select & Apply
                    </button>
                    </div>
                  </LiquidGlassCard>
                </div>
              ))}
            </div>
          </div>

          {/* Circular Right Arrow Button */}
          <button suppressHydrationWarning
            type="button"
            onClick={() => scrollByCard('right')}
            disabled={!canScrollRight}
            aria-label="Next internship card"
            className="absolute right-2 sm:right-4 md:right-6 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07] hover:border-white/25 text-white/60 hover:text-white/85 flex items-center justify-center transition-all duration-200 disabled:opacity-15 disabled:cursor-not-allowed hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-1 focus:ring-white/20 z-20 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-current" />
          </button>
        </div>
      </RevealSection>

      {/* 3. AVAILABLE DOMAINS & CURRICULUM */}
      <RevealSection className="py-24 border-t border-white/5 w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block font-mono">
            SPECIALIZED DOMAINS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">
            Internship Domains & Syllabus
          </h2>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            Gain verified, production-level engineering experience across 5 in-demand technical tracks. Explore full curriculum modules and practical capstone deliverables.
          </p>
        </div>

        {/* Five Domain Cards: Responsive Grid across Mobile/Tablet, Single Row on Desktop */}
        <RevealGrid hoverLift className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-4 xl:gap-5 pt-4 pb-4 select-none">
          {domains.map((dom) => {
            const IconComponent = dom.icon
            return (
              <div
                key={dom.id}
                className="w-full flex flex-col justify-between glass-card p-5 lg:p-4 xl:p-5 rounded-xl border border-white/10 hover:border-white/40 bg-black/40 hover:bg-white/[0.04] transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] min-h-[260px] sm:min-h-[290px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-white/40 tracking-widest group-hover:text-white transition-colors">
                      {dom.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-black/60 border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/50 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-all duration-300">
                      <IconComponent className="w-4 h-4 stroke-[1.75]" />
                    </div>
                  </div>

                  <span className="text-[9px] uppercase tracking-widest font-mono text-white/40 mb-1 block">
                    {dom.category}
                  </span>
                  <h3 className="text-sm font-display font-bold text-white leading-snug group-hover:text-glow">
                    {dom.name}
                  </h3>
                  <p className="text-[11px] text-white/50 font-light mt-2 leading-relaxed">
                    {dom.shortTech}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10">
                  <button suppressHydrationWarning
                    type="button"
                    onClick={(e) => {
                      modalTriggerRef.current = e.currentTarget
                      setSelectedDomainModal(dom)
                      trackEvent('internship_view_domain_modal', { domain: dom.name })
                    }}
                    className="w-full py-2 px-3 rounded-lg border border-white/15 bg-white/[0.03] hover:bg-white text-white hover:text-black text-[11px] font-mono tracking-wider uppercase font-medium transition-all duration-200 flex items-center justify-center cursor-pointer"
                  >
                    <span>View</span>
                  </button>
                </div>
              </div>
            )
          })}
        </RevealGrid>
        </div>
      </RevealSection>

      {/* DOMAIN DETAILS MODAL (shared by every domain) */}
      <AnimatePresence>
        {selectedDomainModal && (
          <DomainDetailsModal
            key={selectedDomainModal.id}
            domain={selectedDomainModal}
            onClose={() => {
              setSelectedDomainModal(null)
              modalTriggerRef.current?.focus()
            }}
            onApply={() => handleApplyFromModal(selectedDomainModal)}
          />
        )}
      </AnimatePresence>

      {/* 4. DELIVERY FORMAT, SCHEDULE & CRITERIA */}
      <EditorialInternshipExperience />

      {/* 5. MENTORSHIP & INDUSTRY SESSIONS */}
      <RevealSection className="py-20 border-t border-white/5 w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-2 block">FACULTY & GUEST MENTORS</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Mentorship & Guidance</h2>
        </div>

        <RevealGrid hoverLift className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <span className="text-[10px] uppercase font-mono text-white/40">Technical Mentors</span>
            <h4 className="text-sm font-semibold text-white mt-1 mb-2">Software Engineering Faculty</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Trainers with hands-on enterprise development backgrounds in React, Node.js, Python, and cloud deployments who conduct daily code reviews.
            </p>
          </div>
          <div className="glass-card p-6">
            <span className="text-[10px] uppercase font-mono text-white/40">Guest Sessions</span>
            <h4 className="text-sm font-semibold text-white mt-1 mb-2">Industry Tech Practitioners</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Interactive guest lectures and Q&A sessions on real-world system architecture, Git branching strategies, and tech interview standards.
            </p>
          </div>
          <div className="glass-card p-6">
            <span className="text-[10px] uppercase font-mono text-white/40">Career Guidance</span>
            <h4 className="text-sm font-semibold text-white mt-1 mb-2">Portfolio & Resume Advising</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Structured assistance with building ATS-ready resumes, presenting project architectures effectively, and preparing for HR screenings.
            </p>
          </div>
        </RevealGrid>
        </div>
      </RevealSection>

      {/* 6. INTERNSHIP APPLICATION FORM */}
      <RevealSection ref={formRef} id="apply" className="py-24 px-6 border-t border-white/5 bg-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[9px] tracking-widest uppercase text-white/70 mb-4">
              <span>ONLINE APPLICATION • BATCH 2026</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-3">Apply for Internship</h2>
            <p className="text-xs text-white/60 font-light leading-relaxed max-w-lg mx-auto">
              Complete your application below. Our academic team will review your domain preference and contact you via WhatsApp/email with orientation details.
            </p>
          </div>

          <div className="glass-card rounded p-5 sm:p-8 border border-white/15">
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-white" />
                <h3 className="text-lg uppercase tracking-widest font-bold text-white">Application Received Successfully</h3>
                <p className="text-xs text-white/70 font-light max-w-md leading-relaxed">
                  {serverMessage || 'Your internship application has been stored in our system. An academic coordinator will contact you via WhatsApp or email within 24 to 48 business hours with batch schedules and onboarding instructions.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button suppressHydrationWarning
                    onClick={() => {
                      setStatus('idle')
                      setFormData({
                        fullName: '',
                        contactNumber: '',
                        email: '',
                        collegeName: '',
                        courseAndYear: '',
                        preferredDomain: 'Full-Stack Web Development',
                        preferredDuration: '1 Month',
                      })
                    }}
                    className="px-6 py-2.5 border border-white/20 text-xs uppercase tracking-widest text-white hover:border-white transition-all rounded"
                  >
                    Submit Another Application
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-medium rounded hover:bg-white/90 transition-all"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 border border-red-500/30 bg-red-500/10 rounded flex items-start gap-3 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                    <span>{serverMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="fullName">
                      Full Name <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value })
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' })
                      }}
                      className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                        formErrors.fullName ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {formErrors.fullName && <span className="text-[10px] text-red-400">{formErrors.fullName}</span>}
                  </div>

                  {/* WhatsApp / Contact Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="contactNumber">
                      WhatsApp / Contact Number <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="contactNumber"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.contactNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, contactNumber: e.target.value })
                        if (formErrors.contactNumber) setFormErrors({ ...formErrors, contactNumber: '' })
                      }}
                      className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                        formErrors.contactNumber ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {formErrors.contactNumber && <span className="text-[10px] text-red-400">{formErrors.contactNumber}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="email">
                      Email Address <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' })
                      }}
                      className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                        formErrors.email ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {formErrors.email && <span className="text-[10px] text-red-400">{formErrors.email}</span>}
                  </div>

                  {/* College Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="collegeName">
                      College / Institution Name <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="collegeName"
                      type="text"
                      required
                      placeholder="e.g. PSG College of Technology"
                      value={formData.collegeName}
                      onChange={(e) => {
                        setFormData({ ...formData, collegeName: e.target.value })
                        if (formErrors.collegeName) setFormErrors({ ...formErrors, collegeName: '' })
                      }}
                      className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                        formErrors.collegeName ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {formErrors.collegeName && <span className="text-[10px] text-red-400">{formErrors.collegeName}</span>}
                  </div>
                </div>

                {/* Course and Year of Study */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="courseAndYear">
                    Course and Year of Study <span className="text-white">*</span>
                  </label>
                  <input suppressHydrationWarning
                    id="courseAndYear"
                    type="text"
                    required
                    placeholder="e.g. B.Tech IT, 3rd Year (2025-2026 Batch)"
                    value={formData.courseAndYear}
                    onChange={(e) => {
                      setFormData({ ...formData, courseAndYear: e.target.value })
                      if (formErrors.courseAndYear) setFormErrors({ ...formErrors, courseAndYear: '' })
                    }}
                    className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                      formErrors.courseAndYear ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                    }`}
                  />
                  {formErrors.courseAndYear && <span className="text-[10px] text-red-400">{formErrors.courseAndYear}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Preferred Domain */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="preferredDomain">
                      Preferred Domain <span className="text-white">*</span>
                    </label>
                    <select suppressHydrationWarning
                      id="preferredDomain"
                      required
                      value={formData.preferredDomain}
                      onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="Full-Stack Web Development">Full-Stack Web Development (MERN)</option>
                      <option value="Python & Data Engineering Foundations">Python & Data Engineering Foundations</option>
                      <option value="AI & Machine Learning Foundations">AI & Machine Learning Foundations</option>
                      <option value="Java & Backend Architecture">Java & Backend Architecture</option>
                      <option value="Frontend UI/UX & React Engineering">Frontend UI/UX & React Engineering</option>
                    </select>
                  </div>

                  {/* Preferred Duration (Required) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="preferredDuration">
                      Preferred Duration <span className="text-white">*</span>
                    </label>
                    <select suppressHydrationWarning
                      id="preferredDuration"
                      required
                      value={formData.preferredDuration}
                      onChange={(e) => setFormData({ ...formData, preferredDuration: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="15 Days">15 Days (Fast-Track Mini-Project)</option>
                      <option value="1 Month">1 Month (Intermediate Practical Track)</option>
                      <option value="2 Months">2 Months (Advanced Project Track)</option>
                      <option value="3 Months">3 Months (Placement & Capstone Track)</option>
                      <option value="6 Months">6 Months (Extended Apprenticeship Track)</option>
                    </select>
                    {formErrors.preferredDuration && <span className="text-[10px] text-red-400">{formErrors.preferredDuration}</span>}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-[10px] text-white/40 font-light">
                    No documents or payment required for this initial application.
                  </p>
                  <button suppressHydrationWarning
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-8 py-3.5 border border-white bg-white text-black hover:bg-black hover:text-white text-xs uppercase tracking-widest font-semibold disabled:opacity-50 transition-all duration-300 rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </RevealSection>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <RevealSection className="py-20 border-t border-white/5 w-full bg-transparent">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-2 block">INTERNSHIP FAQS</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Common Questions</h2>
          </div>

        <div className="space-y-4">
          {[
            {
              question: 'Can college students undergo internships during academic semesters?',
              answer: 'Yes. Batches are structured with flexible schedules (weekday evenings and weekend lab hours) specifically so students can maintain regular college attendance.',
            },
            {
              question: 'Are certificates recognized for academic credit requirements?',
              answer: 'Yes. Completion certificates include student details, verified project credentials, duration, and assessment evaluation, suitable for submission to college internship coordinators.',
            },
            {
              question: 'What is the distinction between internships and placement support?',
              answer: 'Internships focus on skill mastery and project deliverables. While internship candidates receive career guidance and interview debriefing, dedicated ongoing placement connection drives are centered around the 3-month comprehensive placement training program.',
            },
            {
              question: 'How fast will I be contacted after applying?',
              answer: 'Our academic coordinator typically connects within 24 to 48 business hours via WhatsApp or email with the confirmed batch start dates and curriculum syllabus.',
            },
          ].map((faq, idx) => {
            const isOpen = hoveredFaq === idx || activeFaq === idx
            return (
              <div
                key={idx}
                tabIndex={0}
                role="region"
                aria-expanded={isOpen}
                onMouseEnter={() => setHoveredFaq(idx)}
                onMouseLeave={() => setHoveredFaq(null)}
                onClick={() => setActiveFaq(prev => prev === idx ? null : idx)}
                onFocus={() => setActiveFaq(idx)}
                onBlur={() => setActiveFaq(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveFaq(prev => prev === idx ? null : idx)
                  }
                }}
                className={`glass-card p-5 rounded border transition-all duration-300 outline-none cursor-pointer select-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                  isOpen
                    ? 'border-white/40 bg-white/[0.04] shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                    : 'border-white/10 hover:border-white/30 bg-white/[0.01]'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
                    {faq.question}
                  </h4>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-3'
                      : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                  }`}
                >
                  <div
                    className={`overflow-hidden transition-all duration-300 motion-reduce:transition-none ${
                      isOpen ? 'translate-y-0' : '-translate-y-1.5'
                    }`}
                  >
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </RevealSection>
    </div>
  )
}

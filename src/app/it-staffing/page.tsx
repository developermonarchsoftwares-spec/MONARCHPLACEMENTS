"use client"

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  Building2, 
  Code2, 
  Layers, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Clock, 
  Award,
  ChevronRight
} from 'lucide-react'
import confetti from 'canvas-confetti'
import Hero from '@/components/Hero'
import SpotlightCard from '@/components/SpotlightCard'
import RevealGrid from '@/components/RevealGrid'
import { trackEvent } from '@/lib/analytics'

// Dynamic background effect consistent with site aesthetic
const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false })

// Supported role categories
const ROLE_CATEGORIES = [
  { name: 'Software Developers', desc: 'Backend, core engineering & system logic' },
  { name: 'Full Stack Developers', desc: 'End-to-end web & application development' },
  { name: 'Python Developers', desc: 'Django, FastAPI, scripting & automation' },
  { name: 'Java Developers', desc: 'Enterprise Spring Boot & microservices' },
  { name: 'Frontend Developers', desc: 'React, Next.js, modern UI/UX architecture' },
  { name: 'Data Analysts', desc: 'SQL, Python, visualization & reporting' },
  { name: 'AI/ML Candidates', desc: 'Applied machine learning & model integration' },
  { name: 'Software Testers', desc: 'Manual, automation & quality assurance' },
  { name: 'Technical Support Engineers', desc: 'L1/L2 application & infrastructure support' },
  { name: 'Other IT Roles', desc: 'Specialised technical positions per specification' },
]

// 6-step recruitment process
const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Share Your Requirement',
    desc: 'Submit the job description, number of openings, required skills, experience level, work location, and expected joining date.',
  },
  {
    num: '02',
    title: 'Candidate Sourcing',
    desc: 'We search for candidates whose skills and experience align with the role from our vetted talent network.',
  },
  {
    num: '03',
    title: 'Screening & Skill Alignment',
    desc: 'We review available profiles against your requirements and identify potential skill gaps and domain strengths.',
  },
  {
    num: '04',
    title: 'Training, If Required',
    desc: 'Where feasible, we coordinate role-specific preparation based on the agreed requirements prior to interviews.',
  },
  {
    num: '05',
    title: 'Interview & Selection',
    desc: 'Your team interviews shortlisted candidates and makes the final hiring decision according to your standards.',
  },
  {
    num: '06',
    title: 'Hiring Coordination',
    desc: 'We support communication and interview coordination throughout the process until candidates successfully onboard.',
  },
]

// Target business audiences
const TARGET_AUDIENCES = [
  {
    title: 'IT & Software Development Firms',
    desc: 'Engineering teams scaling project capacity with ready-to-deploy developers and testers.',
    icon: <Code2 className="w-5 h-5 text-white/80" />,
  },
  {
    title: 'Startups & Growing Businesses',
    desc: 'Agile teams needing cost-effective technical talent without recruitment agency overheads.',
    icon: <Sparkles className="w-5 h-5 text-white/80" />,
  },
  {
    title: 'Technology Service Providers',
    desc: 'Consultancies delivering client milestones requiring specific language or framework proficiency.',
    icon: <Layers className="w-5 h-5 text-white/80" />,
  },
  {
    title: 'Internal Corporate IT Teams',
    desc: 'Enterprises expanding internal software development, systems support, and analytics capabilities.',
    icon: <Building2 className="w-5 h-5 text-white/80" />,
  },
  {
    title: 'Project-Specific Technical Teams',
    desc: 'Businesses with defined project cycles looking for dedicated fresher or experienced talent.',
    icon: <Briefcase className="w-5 h-5 text-white/80" />,
  },
  {
    title: 'Organisations Hiring Freshers & Experienced',
    desc: 'Companies building structured junior talent pipelines alongside lateral technical hires.',
    icon: <Users className="w-5 h-5 text-white/80" />,
  },
]

// Shared layout for the four services. Odd services carry the large number on the left,
// even services mirror it to the far right. The number is decorative, so it is hidden from
// assistive technology and sits outside the reading order of the content.
const serviceStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const serviceItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

function ServiceSection({
  number,
  flip = false,
  main,
  aside,
}: {
  number: string
  flip?: boolean
  main: React.ReactNode[]
  aside: React.ReactNode[]
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      variants={serviceStagger}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col gap-6 py-12 md:py-16 lg:flex-row lg:items-center lg:gap-10 xl:gap-14"
    >
      <motion.div
        variants={serviceItem}
        aria-hidden="true"
        className={`select-none whitespace-nowrap font-display font-bold leading-none text-white/[0.07] text-6xl sm:text-7xl lg:w-40 lg:shrink-0 lg:text-center lg:text-8xl xl:w-56 xl:text-[11rem] ${flip ? 'lg:order-last' : ''}`}
      >
        {number}
      </motion.div>

      <motion.div variants={serviceStagger} className="space-y-5 lg:flex-1">
        {main.map((node, i) => (
          <motion.div key={i} variants={serviceItem}>
            {node}
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={serviceStagger} className="space-y-5 lg:w-[36%] lg:shrink-0">
        {aside.map((node, i) => (
          <motion.div key={i} variants={serviceItem}>
            {node}
          </motion.div>
        ))}
      </motion.div>
    </motion.article>
  )
}

export default function ITStaffingPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    officialEmail: '',
    phoneNumber: '',
    jobTitle: '',
    numberOfOpenings: '1',
    requiredSkills: '',
    candidatePreference: 'Fresher' as 'Fresher' | 'Experienced' | 'Both',
    experienceRange: '0-1 Years',
    workLocation: '',
    workMode: 'On-site' as 'On-site' | 'Hybrid' | 'Remote',
    joiningTimeline: 'Immediate (< 15 Days)',
    jobDescription: '',
    additionalRequirements: '',
    consent: false,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [referenceId, setReferenceId] = useState('')

  const scrollToForm = (prefilledRole?: string) => {
    if (prefilledRole) {
      setFormData(prev => ({
        ...prev,
        jobTitle: prefilledRole,
        requiredSkills: prev.requiredSkills ? prev.requiredSkills : prefilledRole,
      }))
    }
    trackEvent('hiring_cta_click', { target: 'hiring_form', role: prefilledRole || 'general' })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      errors.companyName = 'Company name is required.'
    }

    if (!formData.contactPerson.trim() || formData.contactPerson.trim().length < 2) {
      errors.contactPerson = 'Contact person name is required.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.officialEmail.trim() || !emailRegex.test(formData.officialEmail.trim())) {
      errors.officialEmail = 'Please provide a valid official work email.'
    }

    const cleanPhone = formData.phoneNumber.replace(/[\s-]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phoneNumber = 'Please enter a valid phone number (at least 10 digits).'
    }

    if (!formData.jobTitle.trim() || formData.jobTitle.trim().length < 2) {
      errors.jobTitle = 'Job title / role is required.'
    }

    const openings = Number(formData.numberOfOpenings)
    if (isNaN(openings) || openings <= 0) {
      errors.numberOfOpenings = 'Openings must be at least 1.'
    }

    if (!formData.requiredSkills.trim() || formData.requiredSkills.trim().length < 2) {
      errors.requiredSkills = 'Please specify key technical skills required.'
    }

    if (!formData.workLocation.trim() || formData.workLocation.trim().length < 2) {
      errors.workLocation = 'Work location / city is required.'
    }

    if (!formData.consent) {
      errors.consent = 'Please confirm authorization to submit this hiring requirement.'
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
      const response = await fetch('/api/hiring-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setReferenceId(data.id || '')
        setServerMessage(data.message || 'Hiring requirement submitted successfully.')
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#888888', '#333333'],
        })
        trackEvent('hiring_form_submission', {
          company: formData.companyName,
          role: formData.jobTitle,
          preference: formData.candidatePreference,
        })
      } else {
        setStatus('error')
        setServerMessage(data.error || 'Failed to submit requirement. Please check your fields and try again.')
      }
    } catch {
      setStatus('error')
      setServerMessage('Network connection error. Please contact hr@monarchplacements.in directly.')
    }
  }

  const resetForm = () => {
    setFormData({
      companyName: '',
      contactPerson: '',
      designation: '',
      officialEmail: '',
      phoneNumber: '',
      jobTitle: '',
      numberOfOpenings: '1',
      requiredSkills: '',
      candidatePreference: 'Fresher',
      experienceRange: '0-1 Years',
      workLocation: '',
      workMode: 'On-site',
      joiningTimeline: 'Immediate (< 15 Days)',
      jobDescription: '',
      additionalRequirements: '',
      consent: false,
    })
    setFormErrors({})
    setStatus('idle')
    setServerMessage('')
    setReferenceId('')
  }

  return (
    <div className="relative z-10 w-full min-h-screen bg-black text-white" suppressHydrationWarning>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Monarch Placements IT Staffing & Talent Sourcing',
            description:
              'IT staffing, technical talent sourcing, candidate screening, and requirement-specific training coordination with zero standard recruitment fees for employers.',
            url: 'https://www.monarchplacements.in/it-staffing',
            telephone: '+916385753874',
            email: 'hr@monarchplacements.in',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Monarch Softwares, Kovilpalayam',
              addressLocality: 'Coimbatore',
              addressRegion: 'Tamil Nadu',
              addressCountry: 'India',
            },
            priceRange: '₹0 for standard employer recruitment support',
            serviceType: [
              'IT Staff Augmentation',
              'Fresher IT Talent Sourcing',
              'Experienced IT Recruitment',
              'Requirement-Based IT Training',
            ],
          }),
        }}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Dynamic FloatingLines background consistent with site aesthetic */}
        <div className="absolute inset-0 -z-10">
          <FloatingLines 
            enabledWaves={["middle","bottom","top"]}
            lineCount={6}
            lineDistance={8}
            bendRadius={8}
            bendStrength={-4}
            interactive={false}
            parallax={true}
            animationSpeed={1}
            gradientStart="#ffffff"
            gradientMid="#000000"
            gradientEnd="#000000"
            opacity={0.3}
          />
        </div>

        <Hero
          title={
            <>
              Find the Right IT Talent. <br className="hidden md:inline" />{" "}
              <span className="text-glow font-bold">
                Build the Right Team.
              </span>
            </>
          }
          description="Monarch Placements helps companies connect with trained freshers and experienced IT professionals across a range of technical roles. From sourcing suitable candidates for existing vacancies to preparing talent according to specific requirements, we help simplify the hiring process. Standard recruitment support is completely free of charge for companies."
          primaryCtaText="Share Requirement"
          primaryCtaLink="#hiring-form"
          secondaryCtaText="Explore Solutions"
          secondaryCtaLink="#hiring-solutions"
          bgText=""
        />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: HIRING SOLUTIONS                                               */}
      {/* ========================================================================= */}
      <section
        id="hiring-solutions"
        ref={solutionsRef}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 scroll-mt-24"
      >
        <div className="text-center mb-14">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">COLLABORATIVE HIRING</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">
            IT Hiring Solutions
          </h2>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            Flexible recruitment support for technical teams, growing businesses, and project-specific hiring requirements.
          </p>
        </div>

        {/* Four services: one shared layout, number on the left for odd and on the right for even */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {/* Service 01: IT Staff Augmentation */}
          <ServiceSection
            number="01"
            main={[
              <p key="label" className="text-xs tracking-widest uppercase text-white/40">Service 01</p>,
              <h3 key="title" className="text-xl font-display font-bold text-white md:text-2xl">IT Staff Augmentation</h3>,
              <p key="desc" className="text-xs md:text-sm font-light leading-relaxed text-white/60">
                Strengthen your existing team with suitable IT professionals based on your project requirements, technical needs, and preferred timelines. We help businesses identify candidates for short-term projects, ongoing development work, and growing technical teams.
              </p>,
              <button
                key="cta"
                type="button"
                suppressHydrationWarning
                onClick={() => scrollToForm('IT Staff Augmentation')}
                className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <span>Request Staff Augmentation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>,
            ]}
            aside={[
              <h4 key="head" className="text-xs uppercase tracking-widest font-semibold text-white">Included Capabilities</h4>,
              <ul key="list" className="space-y-3">
                {[
                  'Technical talent sourcing',
                  'Project-based staffing support',
                  'Fresher and experienced candidates',
                  'Skills-based candidate matching',
                  'Immediate and planned hiring support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs font-light leading-relaxed text-white/70">
                    <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>,
              <p key="note" className="border-l border-white/15 pl-4 text-xs font-light leading-relaxed text-white/50">
                <span className="font-medium text-white/80">Notice on Availability:</span> Sourcing timelines and candidate readiness are aligned with role criteria and active talent pipelines. We tailor sourcing transparently to individual specifications.
              </p>,
            ]}
          />

          {/* Service 02: Fresher & Experienced Talent Sourcing */}
          <ServiceSection
            number="02"
            flip
            main={[
              <p key="label" className="text-xs tracking-widest uppercase text-white/40">Service 02</p>,
              <h3 key="title" className="text-xl font-display font-bold text-white md:text-2xl">Fresher & Experienced Talent Sourcing</h3>,
              <p key="desc" className="text-xs md:text-sm font-light leading-relaxed text-white/60">
                Access candidates across multiple IT domains, from entry-level talent to professionals with relevant industry experience. We work to match candidate skills, experience, and career interests with your company&apos;s requirements.
              </p>,
              <p key="note" className="border-l border-white/15 pl-4 text-xs font-light leading-relaxed text-white/50">
                <span className="font-medium text-white/80">Important Note:</span> Candidate availability depends on the role, required skills, experience, and current talent pool. These represent technical domain competencies rather than pre-confirmed vacancies.
              </p>,
            ]}
            aside={[
              <h4 key="head" className="text-xs uppercase tracking-widest font-semibold text-white">Supported Technical Specialisations</h4>,
              <ul key="list" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {ROLE_CATEGORIES.map((role) => (
                  <li key={role.name} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => scrollToForm(role.name)}
                      className="group/role flex w-full items-start justify-between gap-3 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <span>
                        <span className="block text-xs font-display font-bold text-white">{role.name}</span>
                        <span className="mt-1 block text-[11px] font-light leading-relaxed text-white/50">{role.desc}</span>
                      </span>
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover/role:text-white" />
                    </button>
                  </li>
                ))}
              </ul>,
            ]}
          />

          {/* Service 03: Requirement-Based Hiring & Training */}
          <ServiceSection
            number="03"
            main={[
              <p key="label" className="text-xs tracking-widest uppercase text-white/40">Service 03</p>,
              <h3 key="title" className="text-xl font-display font-bold leading-snug text-white md:text-2xl">
                Can&apos;t find candidates with the exact skills your team needs?
              </h3>,
              <p key="sub" className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Requirement-Based Hiring & Training Coordination
              </p>,
              <p key="desc" className="text-xs md:text-sm font-light leading-relaxed text-white/60">
                Share your job description, technical requirements, and hiring timeline. Monarch Placements can help identify suitable candidates and, where feasible, coordinate focused training to address relevant skill gaps before candidates are presented for consideration.
              </p>,
              <p key="note" className="border-l border-white/15 pl-4 text-xs font-light leading-relaxed text-white/50">
                <span className="font-medium text-white/80">Training Terms:</span> Training plans and timelines are agreed according to the role, feasibility, and candidate readiness. Training coordination is conditional and structured per mutual agreement, not automatic or guaranteed.
              </p>,
            ]}
            aside={[
              <ol key="steps">
                {[
                  { step: '01', name: 'Understand', text: 'Review the job description, skills, experience, and hiring timeline.' },
                  { step: '02', name: 'Source', text: 'Identify candidates who match the requirements.' },
                  { step: '03', name: 'Assess', text: 'Screen candidates against the agreed role criteria.' },
                  { step: '04', name: 'Train', text: 'Coordinate requirement-based training where needed and agreed.' },
                  { step: '05', name: 'Present', text: 'Share suitable profiles for review and interviews.' },
                  { step: '06', name: 'Support', text: 'Coordinate interview scheduling and hiring communication.' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-5 border-b border-white/10 py-4 first:pt-0 last:border-b-0">
                    <span className="w-6 shrink-0 text-xs font-display font-bold text-white/40">{item.step}</span>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-white">{item.name}</h4>
                      <p className="mt-1.5 text-xs font-light leading-relaxed text-white/60">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>,
            ]}
          />

          {/* Service 04: Free Recruitment Support for Companies */}
          <ServiceSection
            number="04"
            flip
            main={[
              <p key="label" className="text-xs tracking-widest uppercase text-white/40">Service 04 · Zero Cost Employer Model</p>,
              <h3 key="title" className="text-2xl font-display font-bold leading-snug text-white md:text-3xl">
                Recruitment Support Without Employer Recruitment Fees
              </h3>,
              <p key="desc" className="text-xs md:text-sm font-light leading-relaxed text-white/60">
                We aim to make recruitment more accessible for businesses seeking IT talent. By removing traditional placement consultancy fee barriers, we enable companies of all scales to source technical talent efficiently.
              </p>,
              <div key="cta" className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => scrollToForm()}
                  className="flex items-center justify-center gap-2 rounded bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <span>Share Your Requirement</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <a
                  href="#hiring-process"
                  className="rounded border border-white/20 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-widest text-white transition-all hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  View Hiring Process
                </a>
              </div>,
            ]}
            aside={[
              <ul key="list" className="space-y-3">
                {[
                  'No standard recruitment service fee for companies.',
                  'No candidate-sourcing charge.',
                  'Support for fresher and experienced hiring.',
                  'Requirement-based sourcing and training coordination.',
                  'Candidate profiles shared according to role suitability.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs font-light leading-relaxed text-white/80">
                    <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-white/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>,
              <p key="note" className="border-l border-white/15 pl-4 text-xs font-light leading-relaxed text-white/60">
                <span className="font-medium text-white">Transparent Disclaimer:</span> No recruitment service fee is charged to companies for our standard recruitment support. Any separately agreed training or additional bespoke services must be discussed transparently before work begins.
              </p>,
            ]}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HIRING PROCESS                                                 */}
      {/* ========================================================================= */}
      <section id="hiring-process" className="py-24 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">HOW IT WORKS</span>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">
              A Clear Process. From Requirement to Interview.
            </h2>
            <p className="text-xs text-white/50 max-w-xl mx-auto mt-3 font-light leading-relaxed">
              A structured six-step recruitment workflow delivering transparent communication, verified screening, and seamless interview scheduling.
            </p>
          </div>

          <RevealGrid hoverLift className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="glass-card glass-card-hover rounded p-6 border border-white/5 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-white/30 font-display tracking-widest">STEP</span>
                    <span className="text-xs font-display font-bold text-white/40 group-hover:text-white transition-colors">{step.num}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-white/90">{step.title}</h3>
                  </div>
                  <p className="text-xs text-white/50 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHO WE WORK WITH                                               */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">COLLABORATIVE ECOSYSTEM</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">
            Built for Businesses That Need IT Talent
          </h2>
          <p className="text-xs text-white/50 max-w-xl mx-auto mt-3 font-light leading-relaxed">
            Whether you have one opening or multiple technical vacancies, share your requirements with us for an initial discussion.
          </p>
        </div>

        <RevealGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TARGET_AUDIENCES.map((audience, idx) => (
            <SpotlightCard key={idx} className="p-6 border border-white/10 group">
              <div className="flex h-full flex-col">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 border border-white/10 bg-white/5 rounded text-white group-hover:scale-105 transition-transform">
                    {audience.icon}
                  </div>
                  <span className="px-2 py-0.5 border border-white/15 bg-white/5 rounded text-[9px] uppercase tracking-widest text-white/60 font-mono">
                    Segment {idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-display font-bold text-white mb-2">{audience.title}</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                  {audience.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => scrollToForm(audience.title)}
                  className="w-full py-2 border border-white/15 bg-white/5 text-white hover:bg-white hover:text-black transition-all rounded text-[11px] uppercase tracking-widest font-medium flex items-center justify-center gap-1.5"
                >
                  <span>Discuss Requirement</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              </div>
            </SpotlightCard>
          ))}
        </RevealGrid>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: HIRING REQUIREMENT FORM (PRIMARY CONVERSION)                   */}
      {/* ========================================================================= */}
      <section ref={formRef} id="hiring-form" className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[9px] tracking-widest uppercase text-white/70 mb-4 font-mono">
              <span>EMPLOYER TALENT PORTAL</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-3">
              Looking for IT Talent?
            </h2>
            <p className="text-xs text-white/60 font-light leading-relaxed max-w-lg mx-auto">
              Tell us what your company needs. We'll review your requirements and discuss suitable sourcing and training options.
            </p>
          </div>

          <div className="glass-card rounded p-6 sm:p-10 border border-white/15">
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-white" />
                <h3 className="text-lg uppercase tracking-widest font-bold text-white">Requirement Received</h3>
                <p className="text-xs text-white/70 font-light max-w-md leading-relaxed">
                  {serverMessage || 'Thank you for submitting your hiring requirement. Our technical recruitment team will review the details and contact you within 24 business hours.'}
                </p>
                {referenceId && (
                  <div className="px-4 py-2 rounded border border-white/10 bg-white/5 font-mono text-xs text-white/90">
                    Reference ID: <span className="font-semibold text-white">{referenceId}</span>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  <button
                    suppressHydrationWarning
                    onClick={resetForm}
                    className="px-6 py-2.5 border border-white/20 text-xs uppercase tracking-widest text-white hover:border-white transition-all rounded"
                  >
                    Submit Another Requirement
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-medium rounded hover:bg-white/90 transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6" suppressHydrationWarning>
                {status === 'error' && (
                  <div className="p-4 border border-red-500/30 bg-red-500/10 rounded flex items-start gap-3 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                    <span>{serverMessage}</span>
                  </div>
                )}

                {/* Sub-group 1: Company & Contact */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block pb-2 border-b border-white/5 mb-4">
                    1. Company & Contact Details
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Company Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="companyName">
                        Company Name <span className="text-white">*</span>
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. Acme Technologies Pvt Ltd"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.companyName ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.companyName && <span className="text-[10px] text-red-400">{formErrors.companyName}</span>}
                    </div>

                    {/* Contact Person */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="contactPerson">
                        Contact Person <span className="text-white">*</span>
                      </label>
                      <input
                        id="contactPerson"
                        name="contactPerson"
                        type="text"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.contactPerson ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.contactPerson && <span className="text-[10px] text-red-400">{formErrors.contactPerson}</span>}
                    </div>

                    {/* Designation */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="designation">
                        Designation <span className="text-white/30">(Optional)</span>
                      </label>
                      <input
                        id="designation"
                        name="designation"
                        type="text"
                        suppressHydrationWarning
                        placeholder="e.g. HR Manager / Lead Engineer"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Official Work Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="officialEmail">
                        Official Work Email <span className="text-white">*</span>
                      </label>
                      <input
                        id="officialEmail"
                        name="officialEmail"
                        type="email"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. hiring@acmetech.com"
                        value={formData.officialEmail}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.officialEmail ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.officialEmail && <span className="text-[10px] text-red-400">{formErrors.officialEmail}</span>}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="phoneNumber">
                        Phone Number <span className="text-white">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.phoneNumber ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.phoneNumber && <span className="text-[10px] text-red-400">{formErrors.phoneNumber}</span>}
                    </div>
                  </div>
                </div>

                {/* Sub-group 2: Role Specifications */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block pb-2 border-b border-white/5 mb-4">
                    2. Role & Technical Requirements
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Job Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="jobTitle">
                        Job Title / Position <span className="text-white">*</span>
                      </label>
                      <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. Full Stack Developer"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.jobTitle ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.jobTitle && <span className="text-[10px] text-red-400">{formErrors.jobTitle}</span>}
                    </div>

                    {/* Number of Openings */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="numberOfOpenings">
                        Number of Openings <span className="text-white">*</span>
                      </label>
                      <input
                        id="numberOfOpenings"
                        name="numberOfOpenings"
                        type="number"
                        min="1"
                        required
                        suppressHydrationWarning
                        value={formData.numberOfOpenings}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.numberOfOpenings ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.numberOfOpenings && <span className="text-[10px] text-red-400">{formErrors.numberOfOpenings}</span>}
                    </div>

                    {/* Required Technical Skills */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="requiredSkills">
                        Required Technical Skills <span className="text-white">*</span>
                      </label>
                      <input
                        id="requiredSkills"
                        name="requiredSkills"
                        type="text"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. React, Node.js, Next.js, PostgreSQL, Git, REST APIs"
                        value={formData.requiredSkills}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.requiredSkills ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.requiredSkills && <span className="text-[10px] text-red-400">{formErrors.requiredSkills}</span>}
                    </div>

                    {/* Candidate Preference */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
                        Candidate Preference <span className="text-white">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Fresher', 'Experienced', 'Both'] as const).map(pref => (
                          <button
                            key={pref}
                            type="button"
                            suppressHydrationWarning
                            onClick={() => setFormData(prev => ({ ...prev, candidatePreference: pref }))}
                            className={`py-2.5 px-2 rounded text-[11px] uppercase tracking-wider font-medium border transition-all text-center ${
                              formData.candidatePreference === pref
                                ? 'border-white bg-white text-black font-semibold'
                                : 'border-white/10 bg-black/60 text-white/60 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Range */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="experienceRange">
                        Experience Range {formData.candidatePreference === 'Fresher' && <span className="text-white/30">(Not required)</span>}
                      </label>
                      <select
                        id="experienceRange"
                        name="experienceRange"
                        value={formData.experienceRange}
                        onChange={handleInputChange}
                        disabled={formData.candidatePreference === 'Fresher'}
                        suppressHydrationWarning
                        className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white/80 focus:border-white/40 focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <option value="0-1 Years">0 - 1 Years</option>
                        <option value="1-3 Years">1 - 3 Years</option>
                        <option value="3-5 Years">3 - 5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>

                    {/* Work Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="workLocation">
                        Work Location / City <span className="text-white">*</span>
                      </label>
                      <input
                        id="workLocation"
                        name="workLocation"
                        type="text"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. Coimbatore, Bengaluru, Chennai"
                        value={formData.workLocation}
                        onChange={handleInputChange}
                        className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                          formErrors.workLocation ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {formErrors.workLocation && <span className="text-[10px] text-red-400">{formErrors.workLocation}</span>}
                    </div>

                    {/* Work Mode */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
                        Work Mode <span className="text-white">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['On-site', 'Hybrid', 'Remote'] as const).map(mode => (
                          <button
                            key={mode}
                            type="button"
                            suppressHydrationWarning
                            onClick={() => setFormData(prev => ({ ...prev, workMode: mode }))}
                            className={`py-2.5 px-2 rounded text-[11px] uppercase tracking-wider font-medium border transition-all text-center ${
                              formData.workMode === mode
                                ? 'border-white bg-white text-black font-semibold'
                                : 'border-white/10 bg-black/60 text-white/60 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Expected Joining Timeline */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="joiningTimeline">
                        Expected Joining Timeline <span className="text-white">*</span>
                      </label>
                      <select
                        id="joiningTimeline"
                        name="joiningTimeline"
                        value={formData.joiningTimeline}
                        onChange={handleInputChange}
                        suppressHydrationWarning
                        className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white/80 focus:border-white/40 focus:outline-none transition-colors"
                      >
                        <option value="Immediate (< 15 Days)">Immediate (within 15 Days)</option>
                        <option value="15 to 30 Days">15 to 30 Days</option>
                        <option value="1 to 2 Months">1 to 2 Months</option>
                        <option value="Flexible / Pipeline Building">Flexible / Pipeline Building</option>
                      </select>
                    </div>

                    {/* Job Description */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="jobDescription">
                        Job Description / Key Responsibilities <span className="text-white/30">(Optional)</span>
                      </label>
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        rows={4}
                        suppressHydrationWarning
                        placeholder="Paste job description, specific frameworks, educational criteria, or day-to-day responsibilities..."
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Additional Requirements */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="additionalRequirements">
                        Additional Requirements / Notes <span className="text-white/30">(Optional)</span>
                      </label>
                      <textarea
                        id="additionalRequirements"
                        name="additionalRequirements"
                        rows={2}
                        suppressHydrationWarning
                        placeholder="Any specific shift requirements, notice period preferences, or questions..."
                        value={formData.additionalRequirements}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      suppressHydrationWarning
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/60 text-white focus:ring-0 focus:ring-offset-0 accent-white cursor-pointer"
                    />
                    <span className="text-[11px] text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors">
                      I confirm that I am authorised to submit this hiring requirement on behalf of our organisation and agree to Monarch Placements contacting our recruitment team regarding candidate sourcing and screening.
                    </span>
                  </label>
                  {formErrors.consent && (
                    <span className="text-[10px] text-red-400 block mt-1 ml-7">{formErrors.consent}</span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-white/50 font-light text-center sm:text-left">
                    Standard recruitment support is provided at no service fee to employers.
                  </span>

                  <button
                    type="submit"
                    suppressHydrationWarning
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Requirement...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Hiring Requirement</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: FINAL CTA                                                      */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.02] to-black">
        <div className="max-w-5xl mx-auto glass-card rounded p-8 md:p-14 border border-white/15 text-center">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block mb-3">GET STARTED</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-4">
            Your Next Hire Starts With a Conversation.
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Share your technical hiring requirements with Monarch Placements. We'll review the details and discuss suitable sourcing and training options based on your needs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scrollToForm()}
              className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white border border-white transition-all duration-300 rounded flex items-center gap-2"
            >
              <span>Share Your Hiring Requirement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:border-white transition-all duration-300 rounded"
            >
              Contact Our Office
            </Link>
          </div>

          {/* Direct channels */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 pt-8 border-t border-white/5 font-light">
            <a href="mailto:hr@monarchplacements.in" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>hr@monarchplacements.in</span>
            </a>
            <a href="tel:+916385753874" className="hover:text-white transition-colors flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 63857 53874</span>
            </a>
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kovilpalayam, Coimbatore, India</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

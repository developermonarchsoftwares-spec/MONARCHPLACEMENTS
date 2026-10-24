"use client"

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  BookOpen, 
  Cpu, 
  GraduationCap, 
  Users, 
  Award, 
  Send, 
  CheckCircle2, 
  Download, 
  Printer, 
  X, 
  FileText, 
  Calendar,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import confetti from 'canvas-confetti'
import Hero from '@/components/Hero'
import SpotlightCard from '@/components/SpotlightCard'
import ShapeGrid from '@/components/ShapeGrid'
import { trackEvent } from '@/lib/analytics'
import RevealGrid from '@/components/RevealGrid'



export default function CollegePartnershipsPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const [showProposalModal, setShowProposalModal] = useState(false)
  
  // Institutional Form State
  const [formData, setFormData] = useState({
    contactPerson: '',
    collegeName: '',
    officialEmail: '',
    contactNumber: '',
    department: '',
    trainingProgram: 'Technical Bootcamp',
    preferredSchedule: '2 to 3 Days Intensive Workshop',
    additionalRequirements: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const scrollToProposal = (programName?: string) => {
    if (programName) {
      setFormData(prev => ({ ...prev, trainingProgram: programName }))
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    trackEvent('college_proposal_request', { program: programName || 'general' })
  }

  // Institutional Services
  const services = [
    {
      title: 'College Workshops',
      icon: <Cpu className="w-5 h-5 text-white/80" />,
      tag: '1-3 Days Intensive',
      desc: 'Hands-on practical workshops introducing students to modern web architectures, AI development basics, or cloud tools with instant project builds.',
      deliverables: ['Live coding labs', 'Mini capstone build', 'Attendance & participation certificate'],
    },
    {
      title: 'Department Technical Training',
      icon: <Building2 className="w-5 h-5 text-white/80" />,
      tag: 'Semester Integrated',
      desc: 'Customized modular training embedded alongside regular department curriculum to cover modern tech stacks not deeply addressed in textbooks.',
      deliverables: ['Curriculum-aligned syllabus', 'Weekly code reviews', 'Faculty milestone reporting'],
    },
    {
      title: 'Short-Term Certificate Courses',
      icon: <Award className="w-5 h-5 text-white/80" />,
      tag: '30-45 Hours',
      desc: 'Comprehensive certificate courses focused on MERN stack, Python data engineering, or Java backend development designed for 2nd and 3rd year students.',
      deliverables: ['Structured assessments', 'Individual portfolio capstones', 'Verified course completion credentials'],
    },
    {
      title: 'Technical Bootcamps',
      icon: <Sparkles className="w-5 h-5 text-white/80" />,
      tag: 'Pre-Placement Sprint',
      desc: 'High-intensity coding, problem solving, and aptitude bootcamps designed to prepare final and pre-final year cohorts for campus recruitment drives.',
      deliverables: ['DSA coding drills', 'ATS resume review', 'Mock technical and behavioral rounds'],
    },
    {
      title: 'Industry Guest Lectures',
      icon: <Users className="w-5 h-5 text-white/80" />,
      tag: 'Single / Multi-Session',
      desc: 'Interactive expert sessions delivered by active software engineers on cloud native practices, AI deployment workflows, and technical recruitment trends.',
      deliverables: ['Q&A with tech practitioners', 'Real architecture case studies', 'Industry career orientation'],
    },
    {
      title: 'Customized Training Programs',
      icon: <GraduationCap className="w-5 h-5 text-white/80" />,
      tag: 'Bespoke Format',
      desc: 'Programs designed around specific institutional needs, autonomous syllabus requirements, or college center-of-excellence initiatives.',
      deliverables: ['Custom syllabus design', 'Flexible hybrid scheduling', 'Custom evaluation metrics'],
    },
  ]

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.contactPerson.trim() || formData.contactPerson.trim().length < 2) {
      errors.contactPerson = 'Please enter contact person name and designation.'
    }

    if (!formData.collegeName.trim() || formData.collegeName.trim().length < 2) {
      errors.collegeName = 'Please enter college / institution name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.officialEmail.trim() || !emailRegex.test(formData.officialEmail.trim())) {
      errors.officialEmail = 'Please provide a valid official/institutional email address.'
    }

    const cleanPhone = formData.contactNumber.replace(/[\s-]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.contactNumber = 'Please enter a valid 10-digit contact number.'
    }

    if (!formData.department.trim() || formData.department.trim().length < 2) {
      errors.department = 'Please specify the department(s) (e.g. CSE, IT, ECE).'
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
      const res = await fetch('/api/college-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setServerMessage(data.message)
        trackEvent('college_proposal_request', { college: formData.collegeName, program: formData.trainingProgram })
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#888888', '#333333'],
        })
      } else {
        setStatus('error')
        setServerMessage(data.error || 'Failed to submit proposal request. Please retry.')
      }
    } catch (err) {
      setStatus('error')
      setServerMessage('Network connection error. Please try again.')
    }
  }

  const handlePrintProposal = () => {
    window.print()
  }

  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <ShapeGrid
            shape="square"
            direction="none"
            speed={0}
            lineColor="#252525"
            hoverColor="#ffffff"
            hoverFillColor="#ffffff"
            fillOpacity={0.08}
            cellSize={40}
            rainbow={false}
            glow={0.25}
            twinkle={0}
            introInterval={2000}
          />
        </div>

        <Hero
          title={
            <>
              Institutional <br className="hidden md:inline" />{" "}
              <span className="text-glow font-bold">
                College Partnerships
              </span>
            </>
          }
          description="Elevate student technical competencies through hands-on campus workshops, department-level technical bootcamps, and industry guest lectures."
          primaryCtaText="Request Proposal"
          primaryCtaLink="#proposal"
          secondaryCtaText="View Proposal Sample"
          secondaryCtaLink="#overview"
          bgText=""
        />
      </div>

      {/* 2. SERVICES OVERVIEW */}
      <section id="overview" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">COLLABORATIVE OFFERINGS</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">Institutional Services</h2>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            Tailored programs structured for college departments to bridge the gap between classroom theory and industry expectations.
          </p>
        </div>

        <RevealGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <SpotlightCard key={idx} className="p-6 flex flex-col justify-between border border-white/10 group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 border border-white/10 bg-white/5 rounded text-white group-hover:scale-105 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="px-2.5 py-0.5 border border-white/15 bg-white/5 rounded text-[9px] uppercase tracking-widest text-white/70 font-mono">
                    {srv.tag}
                  </span>
                </div>
                <h3 className="text-base font-display font-bold text-white mb-2">{srv.title}</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                  {srv.desc}
                </p>

                <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                  {srv.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-white/70 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button suppressHydrationWarning
                onClick={() => scrollToProposal(srv.title)}
                className="w-full py-2.5 border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all rounded text-xs uppercase tracking-widest font-medium"
              >
                Request Proposal
              </button>
            </SpotlightCard>
          ))}
        </RevealGrid>
      </section>

      {/* 3. PROPOSAL OVERVIEW & DOWNLOAD CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="glass-card rounded p-8 md:p-12 border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block mb-2">Institutional Readiness</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Structured Training Proposal Framework</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
              We provide formal academic proposals covering syllabus customization, faculty credentials, lab infrastructure prerequisites, evaluation rubrics, and transparent institutional terms.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-white/80 font-light">
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-white/40" /> Verified Syllabus</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-white/40" /> Flexible On-Campus Schedules</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-white/40" /> Institutional Certification</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button suppressHydrationWarning
              onClick={() => setShowProposalModal(true)}
              className="px-6 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-white/90 transition-all rounded flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> View Proposal Spec
            </button>
            <a
              href="#proposal"
              className="px-6 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:border-white transition-all rounded"
            >
              Custom Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* 4. INSTITUTIONAL ENQUIRY FORM */}
      <section ref={formRef} id="proposal" className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[9px] tracking-widest uppercase text-white/70 mb-4">
              <span>OFFICIAL INSTITUTIONAL ENQUIRY</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-3">Request a Training Proposal</h2>
            <p className="text-xs text-white/60 font-light leading-relaxed max-w-lg mx-auto">
              Submit your college or departmental training requirements. Our institutional coordinator will prepare a tailored syllabus and commercial proposal.
            </p>
          </div>

          <div className="glass-card rounded p-8 border border-white/15">
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-white" />
                <h3 className="text-lg uppercase tracking-widest font-bold text-white">Enquiry Received</h3>
                <p className="text-xs text-white/70 font-light max-w-md leading-relaxed">
                  {serverMessage || 'Thank you for your institutional enquiry. Our academic partnership team will review your requirements and share a formal proposal along with custom curriculum options within 1 to 2 business days.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button suppressHydrationWarning
                    onClick={() => {
                      setStatus('idle')
                      setFormData({
                        contactPerson: '',
                        collegeName: '',
                        officialEmail: '',
                        contactNumber: '',
                        department: '',
                        trainingProgram: 'Technical Bootcamp',
                        preferredSchedule: '2 to 3 Days Intensive Workshop',
                        additionalRequirements: '',
                      })
                    }}
                    className="px-6 py-2.5 border border-white/20 text-xs uppercase tracking-widest text-white hover:border-white transition-all rounded"
                  >
                    Submit Another Request
                  </button>
                  <button suppressHydrationWarning
                    onClick={() => setShowProposalModal(true)}
                    className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-medium rounded hover:bg-white/90 transition-all"
                  >
                    View Proposal Details
                  </button>
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
                  {/* Contact Person Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="contactPerson">
                      Contact Person & Designation <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="contactPerson"
                      type="text"
                      required
                      placeholder="e.g. Dr. K. Ramanathan, HOD / Placement Officer"
                      value={formData.contactPerson}
                      onChange={(e) => {
                        setFormData({ ...formData, contactPerson: e.target.value })
                        if (formErrors.contactPerson) setFormErrors({ ...formErrors, contactPerson: '' })
                      }}
                      className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                        formErrors.contactPerson ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {formErrors.contactPerson && <span className="text-[10px] text-red-400">{formErrors.contactPerson}</span>}
                  </div>

                  {/* College / Institution Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="collegeName">
                      College / Institution Name <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="collegeName"
                      type="text"
                      required
                      placeholder="e.g. Sri Krishna College of Engineering"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Official Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="officialEmail">
                      Official / Institution Email <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="officialEmail"
                      type="email"
                      required
                      placeholder="e.g. hod.cse@college.edu.in"
                      value={formData.officialEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, officialEmail: e.target.value })
                        if (formErrors.officialEmail) setFormErrors({ ...formErrors, officialEmail: '' })
                      }}
                      className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                        formErrors.officialEmail ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {formErrors.officialEmail && <span className="text-[10px] text-red-400">{formErrors.officialEmail}</span>}
                  </div>

                  {/* Contact Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="contactNumber">
                      Contact Number <span className="text-white">*</span>
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
                  {/* Department */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="department">
                      Department / Faculty <span className="text-white">*</span>
                    </label>
                    <input suppressHydrationWarning
                      id="department"
                      type="text"
                      required
                      placeholder="e.g. Computer Science & Engineering / IT"
                      value={formData.department}
                      onChange={(e) => {
                        setFormData({ ...formData, department: e.target.value })
                        if (formErrors.department) setFormErrors({ ...formErrors, department: '' })
                      }}
                      className={`w-full bg-black/60 border rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors ${
                        formErrors.department ? 'border-red-500' : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {formErrors.department && <span className="text-[10px] text-red-400">{formErrors.department}</span>}
                  </div>

                  {/* Interested Training Program */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="trainingProgram">
                      Interested Training Program <span className="text-white">*</span>
                    </label>
                    <select suppressHydrationWarning
                      id="trainingProgram"
                      required
                      value={formData.trainingProgram}
                      onChange={(e) => setFormData({ ...formData, trainingProgram: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="College Workshops">Hands-on College Workshop (1-3 Days)</option>
                      <option value="Department Technical Training">Department Technical Training (Semester Modular)</option>
                      <option value="Short-Term Courses">Short-Term Certificate Course (30-45 Hours)</option>
                      <option value="Technical Bootcamps">Pre-Placement Technical Bootcamp</option>
                      <option value="Industry Guest Lectures">Industry Guest Lecture Series</option>
                      <option value="Customized Training Programs">Customized Campus Training Program</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Schedule or Duration */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="preferredSchedule">
                    Preferred Schedule or Duration <span className="text-white">*</span>
                  </label>
                  <select suppressHydrationWarning
                    id="preferredSchedule"
                    required
                    value={formData.preferredSchedule}
                    onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="2 to 3 Days Intensive Workshop">2 to 3 Days Intensive Workshop</option>
                    <option value="1 Week Practical Bootcamp">1 Week Practical Bootcamp (30 Hours)</option>
                    <option value="Weekend Modular Training">Weekend Modular Training (Across 4-6 Weeks)</option>
                    <option value="Semester-Long Integrated Program">Semester-Long Integrated Program (40-60 Hours)</option>
                    <option value="Flexible / To Be Discussed">Flexible / To Be Discussed with Academic Coordinator</option>
                  </select>
                </div>

                {/* Additional Requirements */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/60 font-semibold" htmlFor="additionalRequirements">
                    Additional Details / Expected Student Count
                  </label>
                  <textarea suppressHydrationWarning
                    id="additionalRequirements"
                    rows={3}
                    placeholder="e.g. Expected batch size ~120 students; focus on Full-Stack MERN and cloud deployment basics."
                    value={formData.additionalRequirements}
                    onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-[10px] text-white/40 font-light">
                    Official proposals are prepared with transparent pricing & syllabi upon verification.
                  </p>
                  <button suppressHydrationWarning
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-white/90 disabled:opacity-50 transition-all rounded flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Proposal Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. MODAL: TRAINING PROPOSAL SPECIFICATION */}
      <AnimatePresence>
        {showProposalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black border border-white/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-white/50">Institutional Specification</span>
                  <h3 className="text-lg font-display font-bold text-white mt-0.5">Monarch Academic Training Proposal Structure</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button suppressHydrationWarning
                    onClick={handlePrintProposal}
                    className="p-2 border border-white/20 rounded hover:bg-white/10 text-white transition-colors"
                    title="Print Proposal"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button suppressHydrationWarning
                    onClick={() => setShowProposalModal(false)}
                    className="p-2 border border-white/20 rounded hover:bg-white/10 text-white transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6 text-xs text-white/80 font-light leading-relaxed">
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white mb-2">1. Training Objectives</h4>
                  <p className="text-white/60">
                    To equip undergraduate and postgraduate students with practical software engineering skills, architectural thinking, and clean code practices directly aligned with current hiring requirements in modern technology teams.
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white mb-2">2. Proposed Modular Curriculum</h4>
                  <ul className="list-disc pl-5 space-y-1 text-white/60">
                    <li>Core Foundation: Modern ECMAScript / Python Essentials & Version Control with Git/GitHub.</li>
                    <li>Frontend Architecture: Component hierarchies, responsive UI layout, and state management.</li>
                    <li>Backend & API Engineering: RESTful endpoints, asynchronous handlers, authentication, and database querying.</li>
                    <li>Deployment & DevOps Basics: Cloud hosting platforms, environment management, and production debugging.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white mb-2">3. Trainer Experience Framework</h4>
                  <p className="text-white/60">
                    All modules are led by senior technical instructors and software developers with demonstrable full-stack enterprise backgrounds. Faculty credentials and detailed resumes are provided for formal institutional approval.
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white mb-2">4. Learning Outcomes & Project Deliverables</h4>
                  <p className="text-white/60">
                    Every participating student constructs a working technical project, commits code to a public GitHub repository, and completes an assessment review. Certificates of Completion are issued under joint institutional guidelines.
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white mb-2">5. Commercial & Operational Terms</h4>
                  <p className="text-white/60">
                    Transparent per-student or per-batch institutional pricing based on duration and lab requirements. On-campus compute infrastructure is coordinated with the host institution&apos;s IT lab administrators.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
                <span className="text-[10px] text-white/40">
                  Monarch Softwares • Kovilpalayam, Coimbatore • hr@monarchplacements.in
                </span>
                <button suppressHydrationWarning
                  onClick={() => {
                    setShowProposalModal(false)
                    scrollToProposal()
                  }}
                  className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded hover:bg-white/90"
                >
                  Proceed with Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

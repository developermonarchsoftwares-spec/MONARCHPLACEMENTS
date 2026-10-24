"use client"

import RevealGrid from '@/components/RevealGrid'
import React from 'react'
import Link from 'next/link'
import { CheckCircle, Award, Users, Briefcase, FileCheck, ShieldCheck, HelpCircle } from 'lucide-react'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'

const Ferrofluid = dynamic(() => import('@/components/Ferrofluid'), { ssr: false })

export default function Placements() {
  const steps = [
    {
      num: '01',
      title: 'Career Assessment',
      desc: 'We evaluate candidates to understand technical strengths, problem-solving skills, and career interests through personalized advising sessions.'
    },
    {
      num: '02',
      title: 'ATS Resume Building',
      desc: 'Build professional resumes tailored for applicant tracking systems with structured project highlights and GitHub repository links.'
    },
    {
      num: '03',
      title: 'Mock Technical & HR Drills',
      desc: 'Practice technical problem-solving and HR behavioral rounds with industry professionals to build confidence and reduce interview anxiety.'
    },
    {
      num: '04',
      title: 'Opportunity Alerts & Drives',
      desc: 'Receive curated notifications regarding campus and off-campus recruitment opportunities, hiring patterns, and domain tests.'
    },
    {
      num: '05',
      title: 'Structured Interview Debriefs',
      desc: 'Receive continuous performance reviews and structured improvements following each interview session to refine your approach.'
    },
    {
      num: '06',
      title: 'Career Guidance',
      desc: 'Ongoing mentorship on technical growth, salary benchmarks, and workplace onboarding throughout your hiring preparation.'
    }
  ]

  const stats = [
    {
      num: '100%',
      label: 'Practical Preparation',
      desc: 'Hands-on coding drills, real workplace project portfolio, and behavioral coaching.',
      icon: <Users className="w-5 h-5 text-white/80" />
    },
    {
      num: '6',
      label: 'Support Pillars',
      desc: 'Resume building, technical drills, HR simulation, company alerts, debriefs, and mentoring.',
      icon: <Award className="w-5 h-5 text-white/80" />
    },
    {
      num: '1-on-1',
      label: 'Mentor Reviews',
      desc: 'Personalized feedback reports and actionable debriefs following technical mock sessions.',
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
          description="We guide candidates through every stage of the recruitment process and help them confidently prepare for career opportunities."
          primaryCtaText="Explore Program"
          primaryCtaLink="/training"
          secondaryCtaText="Contact Us"
          secondaryCtaLink="/contact"
          bgText=""
        />
      </div>

      {/* Placement Process Journey */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">OUR PROCESS</span>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">Our Placement Support</h2>
          </div>

          <RevealGrid hoverLift className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
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

      {/* Stats Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">PREPARATION STANDARDS</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Rigorous Career Readiness</h2>
          </div>

          <RevealGrid hoverLift className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </RevealGrid>
        </div>
      </section>

      {/* Trust & Transparency: Assistance vs Guarantee */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="glass-card p-8 rounded border border-white/15">
          <div className="flex items-center gap-2 mb-4 text-white">
            <ShieldCheck className="w-5 h-5 text-white/80" />
            <h3 className="text-sm uppercase tracking-widest font-bold">Understanding Placement Assistance & Transparency</h3>
          </div>
          <div className="space-y-4 text-xs text-white/70 font-light leading-relaxed">
            <p>
              At Monarch Training & Placements, we are committed to complete transparency regarding our career services. We provide comprehensive interview preparation, ATS-compliant resume building, coding problem-solving drills, and recruitment opportunity alerts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pt-2">
              <div className="p-4 bg-white/[0.02] border border-white/10 rounded">
                <span className="text-[10px] uppercase tracking-wider text-white font-mono block mb-1">What We Guarantee</span>
                <p className="text-[11px] text-white/60">
                  High-quality, hands-on instruction, real project portfolio builds, verified certificates upon completion, individual feedback on mock interviews, and dedicated career guidance.
                </p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/10 rounded">
                <span className="text-[10px] uppercase tracking-wider text-white font-mono block mb-1">What We Do Not Guarantee</span>
                <p className="text-[11px] text-white/60">
                  We do not promise guaranteed jobs or fabricated hiring claims. Employment offers are strictly decided by recruiting companies based on individual merit, academic criteria, and technical interview performance.
                </p>
              </div>
            </div>
            <p className="text-[11px] text-white/50 italic">
              Our aim is to empower students with the technical depth and professional confidence required to compete effectively in modern tech hiring rounds.
            </p>
          </div>
        </div>
      </section>

      {/* Companies Marquee */}
      <section className="py-24 border-t border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">TARGET RECRUITMENT PROFILES</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Target Tech Profiles</h2>
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
          <p className="text-xs text-white/60 font-light max-w-xl mx-auto mb-8">
            Join Monarch Placements and become interview-ready through structured training, production project builds, and mock interview coaching.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/internships"
              className="px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded inline-block"
            >
              Explore Internships
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-white/20 bg-transparent text-white text-xs uppercase tracking-widest font-semibold hover:border-white transition-all duration-500 rounded inline-block"
            >
              Enquire Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

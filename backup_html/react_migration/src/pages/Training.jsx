import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Award, Users, Briefcase, ChevronRight } from 'lucide-react'

export default function Training() {
  const learningSteps = [
    {
      num: '01',
      title: 'Aptitude Training',
      desc: 'Quantitative Aptitude, Logical Reasoning, Verbal Ability and Problem Solving.'
    },
    {
      num: '02',
      title: 'Technical Skills',
      desc: 'Programming Fundamentals, Projects and Industry Technologies.'
    },
    {
      num: '03',
      title: 'Communication Skills',
      desc: 'Professional Communication, Soft Skills and Confidence Building.'
    },
    {
      num: '04',
      title: 'Resume Building',
      desc: 'Resume Creation and LinkedIn Profile Optimization.'
    },
    {
      num: '05',
      title: 'Mock Interviews',
      desc: 'Technical and HR Interview Preparation Sessions.'
    },
    {
      num: '06',
      title: 'Placement Support',
      desc: 'Career Guidance, Job Alerts and Application Support.'
    }
  ]

  const outcomes = [
    {
      stat: '500+',
      label: 'Students Trained',
      desc: '500+ students transformed into industry-ready professionals through our comprehensive training programs',
      icon: <Users className="w-5 h-5 text-white/80" />
    },
    {
      stat: '50+',
      label: 'Partner Companies',
      desc: '50+ top companies partner with us for campus recruitment and hiring',
      icon: <Award className="w-5 h-5 text-white/80" />
    },
    {
      stat: '95%',
      label: 'Placement Assistance',
      desc: '95% of our students secure placements within 3 months of program completion',
      icon: <Briefcase className="w-5 h-5 text-white/80" />
    }
  ]

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-white/40 mb-3"
        >
          INDUSTRY-FOCUSED TRAINING PROGRAM
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-3xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 uppercase max-w-4xl"
        >
          Our 3-Month <br />
          <span className="text-glow underline decoration-white/20 underline-offset-8">Training Program</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs md:text-sm text-white/60 max-w-2xl font-light leading-relaxed mb-8"
        >
          Gain the skills companies actively look for through aptitude training, technical development, communication enhancement and interview preparation.
        </motion.p>
      </section>

      {/* Learning Journey Timeline */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">CURRICULUM</span>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">What You Will Learn</h2>
          </div>

          {/* Chronological Learning Track */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line for desktop timeline */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 pointer-events-none" />

            <div className="space-y-12">
              {learningSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot marker */}
                  <div className="absolute left-6 md:left-1/2 top-6 w-9 h-9 border border-white/10 rounded bg-black flex items-center justify-center -translate-x-1/2 z-10 shadow-glow-sm">
                    <span className="text-xs font-display font-bold text-white/80">{step.num}</span>
                  </div>

                  {/* Left spacing for desktop */}
                  <div className="hidden md:block w-1/2 px-12" />

                  {/* Content card */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                    <div className="glass-card rounded p-6 border-glow-white hover:border-white/20 transition-all duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-white/60" />
                        <h3 className="text-sm md:text-base uppercase tracking-widest font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-xs text-white/60 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Outcomes Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">OUTCOMES</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">Program Outcomes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outcomes.map((out, idx) => (
              <div 
                key={idx}
                className="glass-card rounded p-6 border border-white/5 hover:border-white/25 transition-all duration-500 group cursor-default"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-glow transition-all">{out.stat}</span>
                  <div className="p-1.5 border border-white/10 rounded bg-white/5">{out.icon}</div>
                </div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-2">{out.label}</h3>
                <p className="text-xs text-white/40 font-light leading-relaxed">{out.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-black flex flex-col justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-4">Ready To Begin?</h2>
          <p className="text-xs text-white/60 font-light max-w-xl mx-auto mb-8">
            Enroll today and become industry-ready with Monarch Placements.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded inline-block"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </div>
  )
}

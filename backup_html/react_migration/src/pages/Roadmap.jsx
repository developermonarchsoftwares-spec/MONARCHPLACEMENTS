import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, ChevronRight } from 'lucide-react'

export default function Roadmap() {
  const months = [
    {
      num: '1',
      title: 'Month 1',
      subtitle: 'Foundation & Career Preparation',
      bullets: [
        'Quantitative Aptitude',
        'Logical Reasoning',
        'Verbal Ability',
        'Communication Skills',
        'Professional Etiquette'
      ]
    },
    {
      num: '2',
      title: 'Month 2',
      subtitle: 'Technical Skill Development',
      bullets: [
        'Programming Fundamentals',
        'Industry Technologies',
        'Practical Assignments',
        'Problem Solving',
        'Project-Based Learning'
      ]
    },
    {
      num: '3',
      title: 'Month 3',
      subtitle: 'Placement Readiness',
      bullets: [
        'Resume Building',
        'LinkedIn Optimization',
        'Mock Interviews',
        'Technical Preparation',
        'HR Interview Training'
      ]
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
          TRAINING ROADMAP
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-3xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 uppercase max-w-4xl"
        >
          Your 3-Month <br />
          <span className="text-glow underline decoration-white/20 underline-offset-8">Career Transformation Journey</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs md:text-sm text-white/60 max-w-2xl font-light leading-relaxed mb-8"
        >
          A structured roadmap designed to build aptitude, technical expertise and placement readiness.
        </motion.p>
      </section>

      {/* Timeline Grid Section */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">TIMELINE</span>
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white">Training Timeline</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {months.map((month, idx) => (
              <div 
                key={idx}
                className="glass-card rounded p-8 flex flex-col justify-between border-glow-white hover:border-white/20 transition-all duration-500 relative overflow-hidden group"
              >
                {/* Accent Watermark */}
                <div className="absolute -right-6 -bottom-6 text-white/[0.01] font-display font-bold text-9xl pointer-events-none group-hover:text-white/[0.02] transition-colors duration-500">
                  {month.num}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded border border-white/10 flex items-center justify-center bg-white/5">
                      <Calendar className="w-4 h-4 text-white/80" />
                    </div>
                    <span className="text-[10px] text-white/40 tracking-widest font-semibold uppercase">{month.title}</span>
                  </div>

                  <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-2">{month.subtitle}</h3>
                  <div className="h-[1px] w-12 bg-white/10 my-4" />

                  <ul className="space-y-3.5 mt-6">
                    {month.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-white/70 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/45 mt-1.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-black flex flex-col justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-4">Start Your Journey Today</h2>
          <p className="text-xs text-white/60 font-light max-w-xl mx-auto mb-8">
            Take the next step toward a successful career with Monarch Training & Placements.
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

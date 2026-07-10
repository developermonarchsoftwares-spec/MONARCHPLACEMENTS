import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Eye, Quote, ArrowRight } from 'lucide-react'

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const showcases = [
    {
      tag: 'TRAINING',
      title: 'Industry-Focused Training',
      desc: 'Learn technical, aptitude and communication skills designed according to current industry requirements.',
      img: './training.jpg',
      num: '01'
    },
    {
      tag: 'PLACEMENTS',
      title: 'Placement Preparation',
      desc: 'Resume building, mock interviews and recruitment preparation to maximize opportunities.',
      img: './interview.jpg',
      num: '02'
    },
    {
      tag: 'CAREER GROWTH',
      title: 'Future Ready Professionals',
      desc: 'Build confidence, communication and workplace skills for long-term career success.',
      img: './career.jpg',
      num: '03'
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
          ABOUT MONARCH
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-3xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 uppercase max-w-4xl"
        >
          Empowering Careers Through <br />
          <span className="text-glow underline decoration-white/20 underline-offset-8">Industry-Focused Training</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs md:text-sm text-white/60 max-w-2xl font-light leading-relaxed mb-8"
        >
          Monarch Training & Placements bridges the gap between education and employment by providing practical, industry-oriented training and placement support.
        </motion.p>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">WHO WE ARE</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white mb-6">
            Building Careers Through Practical Learning
          </h2>
          <p className="text-sm text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            Monarch Training & Placements bridges the gap between education and employment through practical training, career guidance and placement support.
          </p>
        </div>
      </section>

      {/* Showcase Cards with Modern High-End Layout */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-16">
          {showcases.map((show, idx) => (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image box - clean glass frame */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-1 border border-white/10 rounded group-hover:border-white/25 transition-all duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10" />
                
                {/* Fallback image container with outline styling if local images are missing */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-black-card border border-white/5 rounded">
                  {show.img ? (
                    <img
                      src={show.img}
                      alt={show.title}
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 filter grayscale"
                      onError={(e) => {
                        e.target.style.display = 'none'; // hide broken image tag
                      }}
                    />
                  ) : null}
                  {/* Decorative modern graphic placeholder overlay if img fails/missing */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 pointer-events-none border border-white/5">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
                      <span className="text-[10px] text-white/50">{show.num}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text box */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/40 tracking-widest font-semibold">{show.tag}</span>
                  <div className="h-[1px] w-8 bg-white/20" />
                </div>
                <h2 className="text-xl md:text-2xl uppercase tracking-widest font-bold text-white">{show.title}</h2>
                <p className="text-xs text-white/60 font-light leading-relaxed max-w-lg">{show.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 border-t border-white/5 bg-black/40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="glass-card rounded p-8 relative overflow-hidden group border-glow-white">
            <div className="absolute -right-4 -bottom-4 text-white/[0.02] font-display font-bold text-8xl pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500">
              MISSION
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border border-white/10 rounded bg-white/5">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-white/50">OUR MISSION</span>
            </div>
            <h3 className="text-lg uppercase tracking-widest font-bold text-white mb-4">Empowering Candidates With Practical Skills</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              To equip candidates with industry-relevant knowledge, technical expertise and professional confidence through high-quality training and placement support.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-card rounded p-8 relative overflow-hidden group border-glow-white">
            <div className="absolute -right-4 -bottom-4 text-white/[0.02] font-display font-bold text-8xl pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500">
              VISION
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border border-white/10 rounded bg-white/5">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-white/50">OUR VISION</span>
            </div>
            <h3 className="text-lg uppercase tracking-widest font-bold text-white mb-4">Building A Future Of Career Success</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              To become a trusted training and placement partner, helping thousands of students and professionals achieve long-term career growth.
            </p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-28 px-6 text-center max-w-4xl mx-auto border-t border-white/5 relative">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white/[0.02] pointer-events-none">
          <Quote className="w-20 h-20" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-glow text-white tracking-wider relative z-10 leading-tight">
          Building Careers. <br />
          <span className="text-white/40">Creating Opportunities.</span>
        </h2>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-black flex flex-col justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-4">Start Your Career Journey Today</h2>
          <p className="text-xs text-white/60 font-light max-w-xl mx-auto mb-8">
            Join Monarch Training & Placements and become industry-ready with expert guidance and placement support.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

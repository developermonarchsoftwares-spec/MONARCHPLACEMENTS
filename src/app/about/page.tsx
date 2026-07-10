"use client"

import React from 'react'
import Link from 'next/link'
import { Target, Eye, Quote } from 'lucide-react'
import Hero from '@/components/Hero'
import Lightfall from '@/components/Lightfall'

export default function About() {
  const showcases = [
    {
      tag: 'TRAINING',
      title: 'Industry-Focused Training',
      desc: 'Learn technical, aptitude and communication skills designed according to current industry requirements.',
      img: '/training.jpg',
      num: '01'
    },
    {
      tag: 'PLACEMENTS',
      title: 'Placement Preparation',
      desc: 'Resume building, mock interviews and recruitment preparation to maximize opportunities.',
      img: '/interview.jpg',
      num: '02'
    },
    {
      tag: 'CAREER GROWTH',
      title: 'Future Ready Professionals',
      desc: 'Build confidence, communication and workplace skills for long-term career success.',
      img: '/career.jpg',
      num: '03'
    }
  ]

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section Container */}
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Lightfall Background component */}
        <div className="absolute inset-0 -z-10">
          <Lightfall
            colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
            backgroundColor="#000000"
            speed={0.3}
            streakCount={1}
            streakWidth={0.6}
            streakLength={1.3}
            glow={0.4}
            density={0.6}
            twinkle={0.2}
            zoom={3.5}
            backgroundGlow={0.5}
            opacity={1}
            mouseInteraction={false}
            mouseStrength={0.5}
            mouseRadius={1}
          />
        </div>

        <Hero
          title={
            <>
              Empowering Careers <br className="hidden md:inline" />{" "}
              <span className="text-glow font-bold">
                Through Industry-Focused Training
              </span>
            </>
          }
          description="Monarch Training & Placements bridges the gap between education and employment by providing practical, industry-oriented training and placement support."
          primaryCtaText="Explore Program"
          primaryCtaLink="/training"
          secondaryCtaText="Contact Us"
          secondaryCtaLink="/contact"
          bgText=""
        />
      </div>

      {/* Who We Are */}
      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-3 block">WHO WE ARE</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-white mb-6">
            Building Careers Through Practical Learning
          </h2>
          <p className="text-xs text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
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
                
                {/* Image container */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-black-card border border-white/5 rounded relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={show.img}
                    alt={show.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 filter grayscale"
                  />
                  {/* Decorative modern graphic overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none border border-white/5">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
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
                <h2 className="text-lg md:text-xl uppercase tracking-widest font-bold text-white">{show.title}</h2>
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
          <div className="glass-card glass-card-hover rounded p-8 relative overflow-hidden group border-glow-white">
            <div className="absolute -right-4 -bottom-4 text-white/[0.02] font-display font-bold text-8xl pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500">
              MISSION
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border border-white/10 rounded bg-white/5">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-white/50">OUR MISSION</span>
            </div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-4">Empowering Candidates With Practical Skills</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              To equip candidates with industry-relevant knowledge, technical expertise and professional confidence through high-quality training and placement support.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-card glass-card-hover rounded p-8 relative overflow-hidden group border-glow-white">
            <div className="absolute -right-4 -bottom-4 text-white/[0.02] font-display font-bold text-8xl pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500">
              VISION
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border border-white/10 rounded bg-white/5">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-white/50">OUR VISION</span>
            </div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-4">Building A Future Of Career Success</h3>
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
          <p className="text-xs text-white/60 font-light max-w-xl mx-auto mb-3">
            Join Monarch Training & Placements and become industry-ready with expert guidance and placement support.
          </p>
          <p className="text-xs text-emerald-400 font-semibold mb-8 uppercase tracking-wider animate-pulse">
            ★ Limited Time Offer: Not placed in 3 months? Get your money refunded ★
          </p>
          <Link
            href="/contact"
            className="px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

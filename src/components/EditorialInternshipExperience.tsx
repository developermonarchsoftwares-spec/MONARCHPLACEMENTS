import React from 'react'
import { Laptop, Clock, FileCheck, ShieldCheck } from 'lucide-react'

const timelineItems = [
  {
    num: '01',
    title: 'DELIVERY MODES',
    Icon: Laptop,
    description:
      'Available in Online (interactive virtual live lab sessions), Offline (classroom at Kovilpalayam, Coimbatore), or Hybrid modes.',
  },
  {
    num: '02',
    title: 'SCHEDULE & HOURS',
    Icon: Clock,
    description:
      'Flexible weekday evening batches and weekend cohorts. Commitment of approximately 15 to 20 hours per week, including code lab sessions.',
  },
  {
    num: '03',
    title: 'CERTIFICATE CRITERIA',
    Icon: FileCheck,
    description:
      'Issued upon achieving 80%+ attendance, completing all required weekly milestone tasks, and submitting a working GitHub project repository.',
  },
  {
    num: '04',
    title: 'TERMS & POLICY',
    Icon: ShieldCheck,
    description:
      'Registration adjustments permitted up to 48 hours prior to batch orientation. Academic admissions team responds within 24 to 48 business hours.',
  },
]

// Static star field: tiny radial-gradient dots, no animation.
const stars = [
  'radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.7), transparent)',
  'radial-gradient(1px 1px at 28% 62%, rgba(255,255,255,0.5), transparent)',
  'radial-gradient(1.5px 1.5px at 41% 28%, rgba(255,255,255,0.6), transparent)',
  'radial-gradient(1px 1px at 8% 80%, rgba(255,255,255,0.45), transparent)',
  'radial-gradient(1px 1px at 55% 12%, rgba(255,255,255,0.5), transparent)',
  'radial-gradient(1px 1px at 72% 48%, rgba(255,255,255,0.35), transparent)',
  'radial-gradient(1.5px 1.5px at 20% 40%, rgba(255,255,255,0.4), transparent)',
  'radial-gradient(1px 1px at 63% 86%, rgba(255,255,255,0.4), transparent)',
  'radial-gradient(1px 1px at 90% 22%, rgba(255,255,255,0.4), transparent)',
  'radial-gradient(1px 1px at 35% 92%, rgba(255,255,255,0.35), transparent)',
].join(',')

export default function EditorialInternshipExperience() {
  return (
    <section
      id="internship-experience"
      aria-label="Internship experience"
      className="relative w-full overflow-hidden bg-black/60 text-white border-t border-white/5"
    >
      {/* Stars */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage: stars }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24 md:py-32 flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-12 lg:gap-20">
        {/* Left: branding (~45%) */}
        <div className="md:w-[45%] flex flex-col justify-center">
          <span className="text-xs tracking-widest uppercase text-white/40 mb-4">
            INTERNSHIP EXPERIENCE
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold uppercase text-white mb-6">
            Practical learning
            <br />
            for a bigger tomorrow.
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed max-w-md mb-10">
            Hands-on experience, real-world exposure and expert guidance to help you build industry-ready skills.
          </p>
          <div className="w-16 h-px bg-white/40 mb-6" />
          <p className="text-xs uppercase tracking-widest font-semibold text-white leading-loose">
            YOUR GROWTH.
            <br />
            <span className="text-white/50">OUR COMMITMENT.</span>
          </p>
        </div>

        {/* Right: vertical timeline (~55%) */}
        <ol className="relative md:w-[55%] flex flex-col justify-center gap-10 sm:gap-14 lg:gap-16">
          {/* Thin grey connecting line, centered on the icon column */}
          <span aria-hidden="true" className="absolute left-6 sm:left-7 top-6 sm:top-7 bottom-6 sm:bottom-7 w-px bg-white/15" />
          {timelineItems.map(({ num, title, Icon, description }) => (
            <li key={num} className="group relative flex items-start gap-4 sm:gap-6 lg:gap-8">
              <span className="relative z-10 shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/25 bg-black flex items-center justify-center transition-colors duration-300 group-hover:border-white/70">
                <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
              </span>
              <div className="flex-1 min-w-0 pt-1">
                <span className="block text-xs tracking-widest text-white/40 mb-1">
                  {num}
                </span>
                <h3 className="text-base sm:text-lg md:text-xl uppercase tracking-widest font-bold text-white mb-2 sm:mb-3 break-words">
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed max-w-md">
                  {description}
                </p>
              </div>
              <span className="hidden sm:block shrink-0 pt-2 text-xs tracking-widest text-white/40">
                {num} / 04
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export default function Contact() {
  const formRef = useRef(null)

  const handleScrollToForm = (e) => {
    e.preventDefault()
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-white/40 mb-3"
        >
          CONTACT MONARCH
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-3xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 uppercase max-w-4xl"
        >
          Let's Build Your <br />
          <span className="text-glow underline decoration-white/20 underline-offset-8">Career Together</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs md:text-sm text-white/60 max-w-2xl font-light leading-relaxed mb-8"
        >
          Have questions about our training programs, placement support, or enrollment process? Reach out to us and we'll be happy to help.
        </motion.p>
      </section>

      {/* Form & Details Section */}
      <section ref={formRef} className="py-16 px-6 border-t border-white/5 bg-gradient-to-b from-black via-white/[0.01] to-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-7 glass-card rounded p-8 border-glow-white">
            <h2 className="text-xl uppercase tracking-widest font-bold text-white mb-6">Send a Message</h2>
            
            <form action="https://formsubmit.co/placements.monarch@gmail.com" method="POST" className="space-y-6">
              {/* FormSubmit configurations */}
              <input type="hidden" name="_subject" value="New Student Enrollment" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50 font-semibold" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50 font-semibold" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50 font-semibold" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Enter your phone number"
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50 font-semibold" htmlFor="course">Select Course</label>
                  <select
                    id="course"
                    name="course"
                    required
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white/80 focus:border-white/40 focus:outline-none transition-colors"
                  >
                    <option value="">Select a course</option>
                    <option>Full Stack Development</option>
                    <option>Python Development</option>
                    <option>Java Development</option>
                    <option>Data Analytics</option>
                    <option>UI/UX Design</option>
                    <option>Software Testing</option>
                    <option>Cloud Computing</option>
                    <option>Placement Training</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-semibold" htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your career goals..."
                  className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded flex items-center justify-center gap-2"
              >
                <span>Enroll Now</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Info Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass-card rounded p-8 border border-white/5 flex flex-col gap-6">
              <h2 className="text-xl uppercase tracking-widest font-bold text-white">Get In Touch</h2>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Connect with Monarch Training & Placements for career guidance, training information, and placement opportunities.
              </p>

              <div className="space-y-5 border-t border-white/5 pt-6">
                <div className="flex items-center gap-4 text-xs">
                  <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <a href="tel:+916385753874" className="text-white/80 hover:text-white transition-colors">+91 63857 53874</a>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <a href="mailto:hr@monarchsoftwares.com" className="text-white/80 hover:text-white transition-colors">hr@monarchsoftwares.com</a>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <span className="text-white/80">Saravanampatti, Coimbatore</span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <span className="text-white/80">Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="w-full h-[250px] border border-white/10 rounded overflow-hidden">
              <iframe
                title="Monarch Location Map"
                src="https://maps.google.com/maps?q=Saravanampatti,Coimbatore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-70"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-black flex flex-col justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase text-white mb-4">Ready To Start Your Career?</h2>
          <p className="text-xs text-white/60 font-light max-w-xl mx-auto mb-8">
            Join Monarch Training & Placements and gain the skills, confidence and guidance needed for a successful future.
          </p>
          <a
            href="#contactForm"
            onClick={handleScrollToForm}
            className="px-8 py-3.5 border border-white bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-500 rounded inline-block"
          >
            Enroll Today
          </a>
        </div>
      </section>
    </div>
  )
}

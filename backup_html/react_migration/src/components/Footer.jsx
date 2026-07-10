import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black py-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded bg-white/5">
                <span className="text-white font-display font-bold text-xs tracking-wider">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-display font-bold text-xs tracking-widest leading-none">MONARCH</span>
                <span className="text-[9px] text-white/50 tracking-wider font-light mt-0.5">Training & Placements</span>
              </div>
            </Link>
            <p className="text-xs text-white/60 font-light leading-relaxed max-w-xs">
              Bridging the gap between education and employment.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://www.linkedin.com/company/monarch-placements/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/monarchplacements?igsh=MWZpbWgyeWJ4cno0NA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/95">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Home</Link>
              <Link to="/training" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Training</Link>
              <Link to="/roadmap" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Roadmap</Link>
              <Link to="/placements" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Placements</Link>
              <Link to="/about" className="text-xs text-white/60 hover:text-white transition-colors w-fit">About Us</Link>
              <Link to="/contact" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Contact</Link>
            </div>
          </div>

          {/* Programs */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/95">Programs</h4>
            <div className="flex flex-col gap-2">
              <Link to="/training" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Aptitude Training</Link>
              <Link to="/training" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Technical Skills</Link>
              <Link to="/training" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Communication</Link>
              <Link to="/training" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Resume Building</Link>
              <Link to="/training" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Mock Interviews</Link>
              <Link to="/placements" className="text-xs text-white/60 hover:text-white transition-colors w-fit">Placement Support</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/95">Contact</h4>
            <div className="flex flex-col gap-2 text-xs text-white/60 leading-relaxed font-light">
              <a href="mailto:hr@monarchsoftwares.com" className="hover:text-white transition-colors w-fit">hr@monarchsoftwares.com</a>
              <a href="tel:+916385753874" className="hover:text-white transition-colors w-fit">+91 63857 53874</a>
              <address className="not-italic mt-1 text-white/50">Monarch Softwares, Bangalore, India</address>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-white/40 tracking-wider">
          <p>© 2026 Monarch Softwares. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

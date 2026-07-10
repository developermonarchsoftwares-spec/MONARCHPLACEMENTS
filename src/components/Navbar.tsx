"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Training', path: '/training' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Placements', path: '/placements' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Monarch Placements Logo"
              className="h-12 md:h-14 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-xs tracking-widest uppercase transition-colors py-1 ${
                    isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute left-0 bottom-0 w-full h-[1px] bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="relative group overflow-hidden px-5 py-2.5 border border-white rounded text-xs uppercase tracking-widest text-black bg-white hover:text-white hover:bg-black transition-colors duration-500"
            >
              <span className="relative z-10 flex items-center gap-1.5 font-medium">
                Enroll Now <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-white/80 transition-colors p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <nav className="flex flex-col gap-6">
              {links.map((link, idx) => {
                const isActive = pathname === link.path
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl font-display font-light tracking-wide block ${
                        isActive ? 'text-white pl-4 border-l border-white' : 'text-white/55'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="h-[1px] bg-white/10" />
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 border border-white bg-white text-black uppercase tracking-widest text-xs font-semibold hover:bg-transparent hover:text-white transition-colors duration-300"
              >
                Enroll Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function BackgroundEffects() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-black">
      {/* Moving Tech Grid Pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-[0.03] animate-grid-move" 
      />

      {/* Subtle Grid Accent Line */}
      <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-x-0 top-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      {/* Mouse Follow Glow Spotlight (High-End Agency Experience) */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-radial from-white/[0.04] to-transparent blur-[130px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mouseXSpring,
          top: mouseYSpring,
        }}
      />

      {/* Floating Monochrome Geometric Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-white/[0.01] rounded-full blur-[80px] animate-float" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px] animate-float-delayed" />
      
      {/* Noise Texture Overlay for Premium High-End Vibe */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  )
}

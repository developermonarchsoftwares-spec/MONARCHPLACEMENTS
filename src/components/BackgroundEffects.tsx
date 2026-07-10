"use client"

import React, { useEffect, useRef } from 'react'

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  phaseSpeed: number;
}

export default function BackgroundEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 1. Spotlight mouse move listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return
      const { clientX, clientY } = e
      spotlightRef.current.style.transform = `translate3d(${clientX - 250}px, ${clientY - 250}px, 0)`
    }
    window.addEventListener('mousemove', handleMouseMove)

    // 2. Scroll listener to hide canvas in hero sections (smoothly fades in as user scrolls down)
    const handleScroll = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const scrollY = window.scrollY
      // Fade in sparks starting from 200px scroll up to 700px scroll (approx hero height)
      const opacity = Math.min(1.0, Math.max(0, (scrollY - 200) / 400))
      canvas.style.opacity = (opacity * 0.8).toString() // Limit maximum visibility to a visible but clean level
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger once initially

    // 3. Canvas animation logic
    const canvas = canvasRef.current
    if (!canvas) {
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const sparks: Spark[] = []
    const sparkCount = Math.min(65, Math.floor((width * height) / 22000))

    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.15), // Drift upwards
        size: Math.random() * 1.3 + 0.5,   // Mini size (0.5px to 1.8px)
        alpha: 0,
        baseAlpha: Math.random() * 0.5 + 0.3, // Higher visibility
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.015 + 0.005
      })
    }

    let animationId = 0
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i]
        s.y += s.vy
        s.x += s.vx + Math.sin(s.phase) * 0.12
        s.phase += s.phaseSpeed

        // Soft twinkle
        s.alpha = s.baseAlpha * (0.7 + Math.sin(s.phase) * 0.3)

        // Reset when moving off-screen
        if (s.y < -10) {
          s.y = height + 10
          s.x = Math.random() * width
        }
        if (s.x < -10) s.x = width + 10
        if (s.x > width + 10) s.x = -10

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Moving Grid Gridlines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 animate-grid-move" />

      {/* Sparks/Moving Dots Canvas - Faded out near top of site */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-out will-change-opacity"
        style={{ opacity: 0 }}
      />

      {/* Interactive Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] will-change-transform transition-transform duration-300 ease-out"
        style={{ left: 0, top: 0 }}
      />

      {/* Background Static ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[160px]" />
    </div>
  )
}

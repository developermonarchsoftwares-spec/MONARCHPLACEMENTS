"use client"

import React, { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  radius: number
  baseOpacity: number
  pulseSpeed: number
  pulsePhase: number
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let dots: Dot[] = []

    let mouseX = -9999
    let mouseY = -9999
    let mouseActive = false

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const initDots = () => {
      // Responsive, evenly distributed dot count: 35 (mobile) to 75 (desktop)
      const count = Math.min(Math.max(Math.floor((width * height) / 22000), 35), 75)
      dots = []

      for (let i = 0; i < count; i++) {
        const radius = 0.65 + Math.random() * 0.65 // Tiny, subtle dots (0.65px - 1.3px)
        
        // Very slow, calm, smooth ambient drift in varied directions
        const angle = Math.random() * Math.PI * 2
        const speed = 0.18 + Math.random() * 0.16 // Very slow, calm ambient drift (0.18px to 0.34px per frame)
        const baseVx = Math.cos(angle) * speed
        const baseVy = Math.sin(angle) * speed

        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius,
          baseOpacity: 0.15 + Math.random() * 0.22, // Low-opacity (0.15 - 0.37)
          pulseSpeed: 0.008 + Math.random() * 0.014,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initDots()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      mouseActive = true
    }

    const handleMouseLeave = () => {
      mouseActive = false
      mouseX = -9999
      mouseY = -9999
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
        mouseActive = true
      }
    }

    const handleTouchEnd = () => {
      mouseActive = false
      mouseX = -9999
      mouseY = -9999
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const repelRadius = 140
      const repelRadiusSq = repelRadius * repelRadius

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]

        // Mouse repelling interaction
        if (mouseActive) {
          const dx = d.x - mouseX
          const dy = d.y - mouseY
          const distSq = dx * dx + dy * dy

          if (distSq < repelRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const force = Math.pow(1 - dist / repelRadius, 1.4) * 2.2
            const nx = dx / dist
            const ny = dy / dist
            d.vx += nx * force
            d.vy += ny * force
          }
        }

        // Smoothly ease back toward original base drift speed & direction
        d.vx += (d.baseVx - d.vx) * 0.045
        d.vy += (d.baseVy - d.vy) * 0.045

        // Cap maximum velocity for natural, elegant movement
        const currentSpeed = Math.hypot(d.vx, d.vy)
        const maxSpeed = 2.4
        if (currentSpeed > maxSpeed) {
          d.vx = (d.vx / currentSpeed) * maxSpeed
          d.vy = (d.vy / currentSpeed) * maxSpeed
        }

        // Update position
        d.x += d.vx
        d.y += d.vy

        // Smooth wrap-around
        if (d.x < -6) d.x = width + 6
        else if (d.x > width + 6) d.x = -6
        if (d.y < -6) d.y = height + 6
        else if (d.y > height + 6) d.y = -6

        // Subtle gentle breathing shimmer
        d.pulsePhase += d.pulseSpeed
        const opacity = Math.max(0.1, Math.min(0.45, d.baseOpacity + Math.sin(d.pulsePhase) * 0.1))

        // Draw clean tiny dot
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Background Static ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[160px]" />

      {/* Subtle Interactive Drift Dot Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}

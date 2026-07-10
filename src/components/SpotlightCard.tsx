"use client"

import React, { useRef, useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({ 
  children, 
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.06)"
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-neutral-950/60 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) hover:border-white/15 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] ${className}`}
    >
      {/* Light glow overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}

"use client"

import React from 'react'
import './LiquidGlassCard.css'

interface LiquidGlassCardProps {
  children: React.ReactNode
  className?: string
  selected?: boolean
}

export default function LiquidGlassCard({ children, className = '', selected = false }: LiquidGlassCardProps) {
  return (
    <div
      data-selected={selected}
      className={`lg-card ${className}`}
    >
      <div className="lg-content">{children}</div>
    </div>
  )
}

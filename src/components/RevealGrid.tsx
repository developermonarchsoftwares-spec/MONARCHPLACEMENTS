"use client"

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Same entrance used by the home page stats grid: items fade up one after
// another (0.08s stagger) the first time the grid scrolls into view.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

interface RevealGridProps {
  children: React.ReactNode
  className?: string
  itemClassName?: string
  /** Lift cards slightly on hover, matching SpotlightCard. Leave off for grids already made of SpotlightCards. */
  hoverLift?: boolean
}

export default function RevealGrid({
  children,
  className = '',
  itemClassName = '',
  hoverLift = false,
}: RevealGridProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={containerVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (child === null || child === undefined || typeof child === 'boolean') return child
        return (
          <motion.div
            variants={itemVariants}
            whileHover={hoverLift ? { y: -6, scale: 1.01, transition: { duration: 0.3 } } : undefined}
            className={`h-full [&>*]:h-full ${itemClassName}`}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

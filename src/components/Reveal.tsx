"use client"

import React, { forwardRef } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

// Scroll-triggered entrance used by the page sections below each hero: a short fade and
// upward settle, played once when the section first comes into view. Only opacity and a
// transform are animated, so the layout never shifts, and it is skipped entirely for
// visitors who prefer reduced motion.
const viewport = { once: true, amount: 0.08 } as const
const transition = { duration: 0.7, ease: 'easeOut' } as const

export const RevealSection = forwardRef<HTMLElement, HTMLMotionProps<'section'>>(function RevealSection(props, ref) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.section
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={transition}
      {...props}
    />
  )
})

export const Reveal = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(function Reveal(props, ref) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={transition}
      {...props}
    />
  )
})

"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
}

export default function SplitText({ 
  text, 
  className = "",
  delay = 0 
}: SplitTextProps) {
  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.02, 
        delayChildren: delay 
      }
    }
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 120
      }
    },
    hidden: {
      opacity: 0,
      y: 15,
      filter: 'blur(3px)',
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 120
      }
    }
  }

  return (
    <motion.span
      style={{ display: 'inline-block' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          key={index}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

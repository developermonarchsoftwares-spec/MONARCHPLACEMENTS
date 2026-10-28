"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

export interface DomainDetails {
  name: string
  category: string
  overview: string
  outcome: string
  techBadges: string[]
  keyModules: {
    title: string
    topic: string
  }[]
}

interface DomainDetailsModalProps {
  domain: DomainDetails
  onClose: () => void
  onApply: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function DomainDetailsModal({ domain, onClose, onApply }: DomainDetailsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  // Keep the latest onClose without re-running the keyboard/focus effect on every render.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Escape closes, Tab stays inside the dialog, and the page behind does not scroll.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const moduleCount = domain.keyModules.length
  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 pb-4 pt-16 sm:px-6 sm:pb-6 sm:pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.18 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="domain-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex w-full max-w-4xl max-h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d]/95 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-8 pt-6 sm:px-9 sm:pt-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="mb-2 text-sm text-white/50">{domain.category}</p>
              <h3
                id="domain-modal-title"
                className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl"
              >
                {domain.name}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{domain.overview}</p>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`-mr-1 -mt-1 shrink-0 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white cursor-pointer ${focusRing}`}
              suppressHydrationWarning
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-10 md:flex-row md:gap-14">
            {/* Syllabus */}
            <section className="min-w-0 flex-1" aria-labelledby="domain-syllabus-heading">
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h4 id="domain-syllabus-heading" className="text-base font-semibold text-white">
                  Syllabus
                </h4>
                <span className="text-xs text-white/40">
                  {moduleCount} {moduleCount === 1 ? 'module' : 'modules'}
                </span>
              </div>

              <ol className="divide-y divide-white/10">
                {domain.keyModules.map((item, i) => (
                  <li key={item.title} className="flex gap-4 py-4 first:pt-3">
                    <span className="w-5 shrink-0 pt-0.5 text-xs tabular-nums text-white/35">{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium leading-snug text-white">{item.title}</p>
                      {item.topic && (
                        <p className="mt-1 text-sm leading-6 text-white/55">{item.topic}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Course details */}
            <aside className="space-y-7 md:w-64 md:shrink-0 md:pt-1">
              {domain.techBadges.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-white">Technologies</h4>
                  <p className="text-sm leading-7 text-white/70">{domain.techBadges.join(', ')}</p>
                </div>
              )}

              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-white/45">Duration</dt>
                  <dd className="mt-0.5 text-white">15 Days – 6 Months</dd>
                </div>
                <div>
                  <dt className="text-white/45">Learning mode</dt>
                  <dd className="mt-0.5 text-white">Online / Hybrid / Offline</dd>
                </div>
                {domain.outcome && (
                  <div>
                    <dt className="text-white/45">Outcome</dt>
                    <dd className="mt-0.5 leading-6 text-white">{domain.outcome}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-white/45">Certificate</dt>
                  <dd className="mt-0.5 text-white">Verified Academic Credential</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>

        {/* Apply bar stays reachable however long the syllabus is */}
        <div className="shrink-0 border-t border-white/10 bg-black/40 px-5 py-4 sm:px-9">
          <button
            type="button"
            onClick={onApply}
            className={`group/btn flex w-full items-center justify-center gap-2 rounded-lg border border-white bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-black hover:text-white cursor-pointer sm:ml-auto sm:w-auto ${focusRing}`}
            suppressHydrationWarning
          >
            <span>Apply for This Track</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

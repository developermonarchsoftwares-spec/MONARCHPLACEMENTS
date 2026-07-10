import React from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/916385753874"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-55 flex items-center justify-center w-12 h-12 rounded-full border border-white/15 bg-black/80 text-white backdrop-blur-md shadow-glow-sm hover:border-white/40 hover:shadow-glow-md transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      
      {/* Tooltip */}
      <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-300 origin-right text-[10px] uppercase tracking-widest bg-black border border-white/10 text-white px-3 py-1.5 rounded whitespace-nowrap backdrop-blur-md">
        Chat with us
      </span>
    </a>
  )
}

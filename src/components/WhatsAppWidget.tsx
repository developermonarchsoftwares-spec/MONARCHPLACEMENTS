import React from 'react'

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/916385753874"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5c] hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Official WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
      >
        <path d="M16.002 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.364.627 4.636 1.818 6.627L2.667 29.333l6.896-1.79A13.277 13.277 0 0 0 16.002 29.333c7.364 0 13.331-5.971 13.331-13.333 0-7.362-5.967-13.333-13.331-13.333zm0 24.364a11.015 11.015 0 0 1-5.616-1.536l-.403-.24-4.09 1.061 1.087-3.973-.263-.408A10.987 10.987 0 0 1 5.001 16c0-6.075 4.927-11.003 11.001-11.003S27.003 9.925 27.003 16c0 6.073-4.927 11.031-11.001 11.031zm6.04-8.25c-.33-.165-1.953-.963-2.257-1.073-.303-.11-.524-.165-.745.165-.22.33-.855 1.073-1.047 1.293-.193.22-.385.248-.715.083-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.642-1.953-1.834-2.283-.193-.33-.021-.508.145-.672.149-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.745-1.793-1.02-2.455-.27-.645-.543-.558-.745-.568l-.635-.011c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.75 0 1.623 1.183 3.19 1.348 3.41.165.22 2.327 3.553 5.641 4.983.789.34 1.404.543 1.884.695.79.251 1.51.216 2.08.131.634-.094 1.953-.798 2.228-1.568.275-.771.275-1.432.193-1.568-.083-.138-.303-.22-.633-.385z"/>
      </svg>

      {/* Tooltip */}
      <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-300 origin-right text-[10px] uppercase tracking-widest bg-black border border-white/10 text-white px-3 py-1.5 rounded whitespace-nowrap backdrop-blur-md">
        Chat with us
      </span>
    </a>
  )
}

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackgroundEffects from './components/BackgroundEffects'
import WhatsAppWidget from './components/WhatsAppWidget'

// Pages
import Home from './pages/Home'
import Training from './pages/Training'
import Roadmap from './pages/Roadmap'
import Placements from './pages/Placements'
import About from './pages/About'
import Contact from './pages/Contact'

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Background visual graphics */}
      <BackgroundEffects />

      {/* Main app layout wrapper */}
      <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black">
        {/* Global sticky header */}
        <Navbar />

        {/* Dynamic page content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<Training />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global footer */}
        <Footer />
        
        {/* Floating WhatsApp chat widget */}
        <WhatsAppWidget />
      </div>
    </Router>
  )
}

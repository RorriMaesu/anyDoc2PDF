import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BuyMeCoffee = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasConverted, setHasConverted] = useState(false)

  // Track user engagement to show the button at optimal moments
  useEffect(() => {
    // Show after user has engaged with the site (scrolled down)
    const handleScroll = () => {
      if (window.scrollY > 300 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    // Track when user has completed a conversion action
    const trackConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        setHasConverted(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Check every few seconds if user has converted
    const interval = setInterval(trackConversion, 3000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [hasScrolled, hasConverted])

  // Periodically show tooltip to create urgency and scarcity
  useEffect(() => {
    if (hasScrolled || hasConverted) {
      const tooltipInterval = setInterval(() => {
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 5000)
      }, 45000) // Show every 45 seconds

      return () => clearInterval(tooltipInterval)
    }
  }, [hasScrolled, hasConverted])

  // Determine optimal position based on user behavior
  const position = hasConverted
    ? "fixed bottom-4 right-4 z-50" // After conversion, more prominent
    : hasScrolled
      ? "fixed bottom-4 right-4 z-50" // After scrolling, standard position
      : "fixed bottom-4 right-4 z-50 opacity-90" // Initially, slightly less visible

  return (
    <motion.div
      className={position}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: hasScrolled || hasConverted ? 1 : 0.9,
        scale: 1,
        y: hasConverted ? 0 : 5 // Slightly raised when user has converted
      }}
      transition={{
        duration: 0.5,
        delay: hasConverted ? 0.2 : hasScrolled ? 0.5 : 1.5 // Show faster after conversion
      }}
      whileHover={{
        scale: 1.05,
        y: -3, // Subtle float effect on hover
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Social proof tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute -top-16 right-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg text-sm w-48 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              <span className="text-green-500">♥</span> Thanks to supporters, this tool remains free for everyone!
            </p>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://www.buymeacoffee.com/rorrimaesu"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative group"
        aria-label="Support this project"
        onClick={() => {
          // Track click for analytics
          if (window.gtag) {
            window.gtag('event', 'click', {
              'event_category': 'engagement',
              'event_label': 'support_button'
            })
          }
        }}
      >
        {/* Subtle glow effect to draw attention */}
        <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

        <img
          src="/anyDoc2PDF/images/capitalismsucksbutiamsuperpassionateaboutbeingabletoaffordfood.png"
          alt="Support this project"
          className="relative w-32 h-auto shadow-lg rounded-lg transition-all duration-300 group-hover:shadow-xl"
        />

        {/* Micro-interaction indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </a>
    </motion.div>
  )
}

export default BuyMeCoffee

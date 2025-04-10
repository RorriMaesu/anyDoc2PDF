import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BuyMeCoffee = () => {
  const [visibility, setVisibility] = useState(0.75) // Start with slightly higher visibility
  const [position, setPosition] = useState({ x: 4, y: 4 })
  const [size, setSize] = useState(0.92)
  const [userJourney, setUserJourney] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipType, setTooltipType] = useState(null)
  const buttonRef = useRef(null)

  // Bernays-inspired journey stages that gradually increase influence
  useEffect(() => {
    // Gradually increase visibility based on user journey stage
    const journeyInterval = setInterval(() => {
      setUserJourney(prev => {
        const newStage = prev + 1

        // Adjust visibility based on journey stage - more noticeable
        if (newStage === 2) setVisibility(0.8)
        if (newStage === 4) setVisibility(0.85)
        if (newStage === 6) setVisibility(0.9)
        if (newStage === 8) setVisibility(0.95)
        if (newStage === 10) setVisibility(0.98)
        if (newStage === 12) setVisibility(1)

        // Size adjustments to draw attention - more noticeable
        if (newStage === 3) setSize(0.94)
        if (newStage === 7) setSize(0.97)
        if (newStage === 11) setSize(1)

        // Show different tooltip types at different stages
        if (newStage === 3) showTemporaryTooltip('social_proof')
        if (newStage === 6) showTemporaryTooltip('reciprocity')
        if (newStage === 9) showTemporaryTooltip('identity')
        if (newStage === 12) showTemporaryTooltip('scarcity')

        return newStage
      })
    }, 18000) // Slightly faster journey progression

    return () => clearInterval(journeyInterval)
  }, [])

  // Show temporary tooltip with Bernays-inspired messaging
  const showTemporaryTooltip = (type) => {
    setTooltipType(type)
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 6000) // Show for 6 seconds
  }

  // Track user engagement to accelerate journey
  useEffect(() => {
    // Track scrolling as engagement
    const handleScroll = () => {
      if (window.scrollY > 200) { // Trigger earlier
        setUserJourney(prev => Math.min(prev + 1, 12))
      }
    }

    // Track when user has completed a conversion action
    const trackConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        // Jump to later journey stages when user gets value
        setUserJourney(prev => Math.max(prev, 8))
        setVisibility(0.98)
        // Show reciprocity tooltip immediately after conversion
        showTemporaryTooltip('reciprocity')
      }
    }

    window.addEventListener('scroll', handleScroll)
    const interval = setInterval(trackConversion, 2000) // Check more frequently

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  // Bernays-inspired subtle animation to create awareness
  useEffect(() => {
    if (!buttonRef.current) return

    // More noticeable "breathing" effect
    const breathingInterval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% of the time
        const button = buttonRef.current
        const currentOpacity = parseFloat(button.style.opacity || 1)

        // Subtle pulse
        button.style.opacity = (currentOpacity - 0.08).toString() // Slightly more noticeable
        setTimeout(() => {
          if (button) button.style.opacity = currentOpacity.toString()
        }, 800) // Longer duration
      }
    }, 8000) // More frequent

    return () => clearInterval(breathingInterval)
  }, [buttonRef])

  // Bernays-inspired position adjustments based on user's mouse position
  useEffect(() => {
    if (userJourney < 4) return // Activate earlier

    const handleMouseMove = (e) => {
      // Subtle position adjustment based on mouse
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate distance from button (bottom right)
      const distanceX = windowWidth - e.clientX
      const distanceY = windowHeight - e.clientY

      // Only adjust when mouse is somewhat close to the button
      if (distanceX < 350 && distanceY < 350) { // Larger activation area
        // Slightly more noticeable adjustment
        const adjustX = Math.min(Math.max((350 - distanceX) / 350, 0), 1) * 1.5
        const adjustY = Math.min(Math.max((350 - distanceY) / 350, 0), 1) * 1.5

        setPosition({
          x: 4 - adjustX,
          y: 4 - adjustY
        })

        // Occasionally show tooltip when mouse is near
        if (Math.random() < 0.01 && !showTooltip) { // 1% chance per mouse move
          const tooltipTypes = ['social_proof', 'reciprocity', 'identity', 'scarcity']
          showTemporaryTooltip(tooltipTypes[Math.floor(Math.random() * tooltipTypes.length)])
        }
      } else {
        // Reset position when mouse is far away
        setPosition({ x: 4, y: 4 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [userJourney, showTooltip])

  return (
    <motion.div
      ref={buttonRef}
      className="fixed z-50 donation-button"
      style={{
        bottom: `${position.y}rem`,
        right: `${position.x}rem`,
      }}
      initial={{ opacity: 0.7, scale: 0.9 }}
      animate={{
        opacity: visibility,
        scale: size,
      }}
      transition={{
        duration: 0.6, // Faster transition
        ease: "easeOut"
      }}
      whileHover={{
        scale: size + 0.08, // More noticeable hover effect
        opacity: 1,
        transition: { duration: 0.2 }
      }}
    >
      {/* Bernays-inspired tooltips with psychological triggers */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute -top-16 right-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg text-xs w-48 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            {tooltipType === 'social_proof' && (
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium">Join 200+ supporters</span> who keep this tool free for everyone
              </p>
            )}

            {tooltipType === 'reciprocity' && (
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium">You've received value</span> - consider supporting our mission
              </p>
            )}

            {tooltipType === 'identity' && (
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium">Be a patron</span> of free, high-quality tools
              </p>
            )}

            {tooltipType === 'scarcity' && (
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium">Limited resources</span> - your support makes a difference
              </p>
            )}

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
      >
        {/* Subtle glow effect to draw attention */}
        <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

        <img
          src="/anyDoc2PDF/images/capitalismsucksbutiamsuperpassionateaboutbeingabletoaffordfood.png"
          alt="Support this project"
          className="relative w-28 h-auto shadow-md rounded-lg transition-all duration-300 group-hover:shadow-xl"
          style={{ filter: `brightness(${0.98 + (userJourney * 0.002)})` }} // Gradually increase brightness
        />

        {/* Subtle attention indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
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

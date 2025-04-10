import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BuyMeCoffee = () => {
  const [visibility, setVisibility] = useState(0.7) // Start with low visibility
  const [position, setPosition] = useState({ x: 4, y: 4 })
  const [size, setSize] = useState(0.9)
  const [userJourney, setUserJourney] = useState(0)
  const buttonRef = useRef(null)

  // Subliminal journey stages that gradually increase visibility
  useEffect(() => {
    // Gradually increase visibility based on user journey stage
    const journeyInterval = setInterval(() => {
      setUserJourney(prev => {
        const newStage = prev + 1

        // Adjust visibility based on journey stage
        if (newStage === 2) setVisibility(0.75)
        if (newStage === 4) setVisibility(0.8)
        if (newStage === 6) setVisibility(0.85)
        if (newStage === 8) setVisibility(0.9)
        if (newStage === 10) setVisibility(0.95)
        if (newStage === 12) setVisibility(1)

        // Subtle size adjustments to draw attention
        if (newStage === 3) setSize(0.92)
        if (newStage === 7) setSize(0.95)
        if (newStage === 11) setSize(1)

        return newStage
      })
    }, 20000) // Every 20 seconds = one journey stage

    return () => clearInterval(journeyInterval)
  }, [])

  // Track user engagement to accelerate journey
  useEffect(() => {
    // Track scrolling as engagement
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setUserJourney(prev => Math.min(prev + 1, 12))
      }
    }

    // Track when user has completed a conversion action
    const trackConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        // Jump to later journey stages when user gets value
        setUserJourney(prev => Math.max(prev, 8))
        setVisibility(0.95)
      }
    }

    window.addEventListener('scroll', handleScroll)
    const interval = setInterval(trackConversion, 3000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  // Subtle breathing animation to create subliminal awareness
  useEffect(() => {
    if (!buttonRef.current) return

    // Very subtle "breathing" effect that's barely noticeable
    const breathingInterval = setInterval(() => {
      if (Math.random() < 0.3) { // Only 30% of the time
        const button = buttonRef.current
        const currentOpacity = parseFloat(button.style.opacity || 1)

        // Subtle opacity pulse
        button.style.opacity = (currentOpacity - 0.05).toString()
        setTimeout(() => {
          if (button) button.style.opacity = currentOpacity.toString()
        }, 600)
      }
    }, 10000) // Every 10 seconds

    return () => clearInterval(breathingInterval)
  }, [buttonRef])

  // Subliminal position adjustments based on user's mouse position
  useEffect(() => {
    if (userJourney < 5) return // Only activate in later journey stages

    const handleMouseMove = (e) => {
      // Extremely subtle position adjustment based on mouse
      // This creates a subconscious connection between user movement and the button
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate distance from button (bottom right)
      const distanceX = windowWidth - e.clientX
      const distanceY = windowHeight - e.clientY

      // Only adjust when mouse is somewhat close to the button
      if (distanceX < 300 && distanceY < 300) {
        // Extremely subtle adjustment (max 1px in any direction)
        const adjustX = Math.min(Math.max((300 - distanceX) / 300, 0), 1) * 1
        const adjustY = Math.min(Math.max((300 - distanceY) / 300, 0), 1) * 1

        setPosition({
          x: 4 - adjustX,
          y: 4 - adjustY
        })
      } else {
        // Reset position when mouse is far away
        setPosition({ x: 4, y: 4 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [userJourney])

  return (
    <motion.div
      ref={buttonRef}
      className="fixed z-50 donation-button"
      style={{
        bottom: `${position.y}rem`,
        right: `${position.x}rem`,
      }}
      initial={{ opacity: 0.6, scale: 0.85 }}
      animate={{
        opacity: visibility,
        scale: size,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: size + 0.05,
        opacity: 1,
        transition: { duration: 0.3 }
      }}
    >
      <a
        href="https://www.buymeacoffee.com/rorrimaesu"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
        aria-label="Support this project"
      >
        <img
          src="/anyDoc2PDF/images/capitalismsucksbutiamsuperpassionateaboutbeingabletoaffordfood.png"
          alt="Support this project"
          className="relative w-28 h-auto shadow-md rounded-lg transition-all duration-500"
          style={{ filter: `brightness(${0.95 + (userJourney * 0.005)})` }} // Gradually increase brightness
        />
      </a>
    </motion.div>
  )
}

export default BuyMeCoffee

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// This component doesn't render anything visible directly
// Instead, it subtly influences the user's subconscious through carefully timed micro-interactions
const SubliminalPriming = () => {
  const [userEngagement, setUserEngagement] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasUsedTool, setHasUsedTool] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [flashType, setFlashType] = useState(null)
  
  // Track user engagement to gradually increase subliminal influence
  useEffect(() => {
    // Increment engagement score based on time spent on site
    const engagementInterval = setInterval(() => {
      setUserEngagement(prev => Math.min(prev + 1, 10))
    }, 30000) // Every 30 seconds
    
    // Track scrolling behavior
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
        // First scroll is a key engagement point - good time for first subliminal flash
        setTimeout(() => {
          setFlashType('gratitude')
          setShowFlash(true)
          setTimeout(() => setShowFlash(false), 50) // Very brief flash
        }, 2000)
      }
    }
    
    // Check if user has used the tool
    const checkToolUsage = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0 && !hasUsedTool) {
        setHasUsedTool(true)
        // User has received value - perfect time for value-association flash
        setTimeout(() => {
          setFlashType('value')
          setShowFlash(true)
          setTimeout(() => setShowFlash(false), 50) // Very brief flash
        }, 1000)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    const usageInterval = setInterval(checkToolUsage, 2000)
    
    // Schedule subliminal flashes based on engagement level
    const flashScheduler = setInterval(() => {
      // Only show occasional flashes as engagement increases
      if (userEngagement > 3 && Math.random() < 0.3) {
        const flashTypes = ['support', 'gratitude', 'value', 'community']
        setFlashType(flashTypes[Math.floor(Math.random() * flashTypes.length)])
        setShowFlash(true)
        setTimeout(() => setShowFlash(false), 50) // Very brief flash
      }
    }, 60000) // Check every minute
    
    return () => {
      clearInterval(engagementInterval)
      clearInterval(usageInterval)
      clearInterval(flashScheduler)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled, hasUsedTool, userEngagement])
  
  // Subtle cursor effect that follows mouse with slight delay
  // Creates subconscious association with support concepts
  useEffect(() => {
    if (userEngagement < 2) return // Only activate after some engagement
    
    const supportTerms = ['support', 'free', 'help', 'continue', 'thanks']
    let cursorTimeout = null
    
    const handleMouseMove = (e) => {
      if (Math.random() < 0.05 && !cursorTimeout) { // 5% chance on mouse move
        cursorTimeout = setTimeout(() => {
          // Create and position the element
          const term = supportTerms[Math.floor(Math.random() * supportTerms.length)]
          const el = document.createElement('div')
          el.innerText = term
          el.style.position = 'fixed'
          el.style.left = `${e.clientX + 10}px`
          el.style.top = `${e.clientY + 10}px`
          el.style.fontSize = '10px'
          el.style.color = 'rgba(0,0,0,0.03)' // Nearly invisible
          el.style.pointerEvents = 'none'
          el.style.zIndex = '9999'
          el.style.fontWeight = 'bold'
          el.style.textTransform = 'uppercase'
          document.body.appendChild(el)
          
          // Remove after brief display
          setTimeout(() => {
            document.body.removeChild(el)
            cursorTimeout = null
          }, 200)
        }, 100)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (cursorTimeout) clearTimeout(cursorTimeout)
    }
  }, [userEngagement])
  
  // Render the subliminal flash (extremely brief)
  return (
    <AnimatePresence>
      {showFlash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }} // Barely visible
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          {flashType === 'gratitude' && (
            <div className="text-6xl font-bold text-center text-black dark:text-white">
              THANK YOU
            </div>
          )}
          
          {flashType === 'value' && (
            <div className="text-6xl font-bold text-center text-black dark:text-white">
              FREE VALUE
            </div>
          )}
          
          {flashType === 'support' && (
            <div className="text-6xl font-bold text-center text-black dark:text-white">
              SUPPORT
            </div>
          )}
          
          {flashType === 'community' && (
            <div className="text-6xl font-bold text-center text-black dark:text-white">
              JOIN OTHERS
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SubliminalPriming

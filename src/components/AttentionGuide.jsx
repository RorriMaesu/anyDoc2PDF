import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// This component creates subtle visual cues that guide the user's attention
// toward the donation button at psychologically optimal moments
const AttentionGuide = () => {
  const [showGuide, setShowGuide] = useState(false)
  const [guideType, setGuideType] = useState(null)
  const [userJourney, setUserJourney] = useState(0)
  
  useEffect(() => {
    // Track user journey stage
    const journeyInterval = setInterval(() => {
      setUserJourney(prev => {
        const newValue = prev + 1
        
        // At specific journey points, trigger attention guides
        if (newValue === 3) {
          setTimeout(() => {
            setGuideType('subtle_glow')
            setShowGuide(true)
            setTimeout(() => setShowGuide(false), 3000)
          }, 500)
        }
        
        if (newValue === 7) {
          setTimeout(() => {
            setGuideType('directional_cue')
            setShowGuide(true)
            setTimeout(() => setShowGuide(false), 2000)
          }, 500)
        }
        
        if (newValue === 12) {
          setTimeout(() => {
            setGuideType('peripheral_movement')
            setShowGuide(true)
            setTimeout(() => setShowGuide(false), 4000)
          }, 500)
        }
        
        return newValue
      })
    }, 15000) // Every 15 seconds = one journey point
    
    // Check for conversion events that should trigger attention guides
    const checkConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        // User has received value - guide attention to donation
        setTimeout(() => {
          setGuideType('value_received')
          setShowGuide(true)
          setTimeout(() => setShowGuide(false), 3000)
        }, 2000) // Delay to let them see their result first
      }
    }
    
    const conversionInterval = setInterval(checkConversion, 5000)
    
    // Track mouse inactivity as an opportunity for subtle guidance
    let inactivityTimer = null
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        if (userJourney > 5 && Math.random() < 0.5) { // 50% chance after journey point 5
          setGuideType('inactivity_prompt')
          setShowGuide(true)
          setTimeout(() => setShowGuide(false), 3000)
        }
      }, 30000) // 30 seconds of inactivity
    }
    
    window.addEventListener('mousemove', resetInactivityTimer)
    window.addEventListener('keydown', resetInactivityTimer)
    window.addEventListener('scroll', resetInactivityTimer)
    resetInactivityTimer()
    
    return () => {
      clearInterval(journeyInterval)
      clearInterval(conversionInterval)
      clearTimeout(inactivityTimer)
      window.removeEventListener('mousemove', resetInactivityTimer)
      window.removeEventListener('keydown', resetInactivityTimer)
      window.removeEventListener('scroll', resetInactivityTimer)
    }
  }, [userJourney])
  
  if (!showGuide) return null
  
  return (
    <>
      {guideType === 'subtle_glow' && (
        <motion.div 
          className="fixed bottom-4 right-4 w-40 h-40 rounded-full bg-blue-400 dark:bg-blue-600 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 3, times: [0, 0.5, 1] }}
          style={{ filter: 'blur(30px)' }}
        />
      )}
      
      {guideType === 'directional_cue' && (
        <motion.div 
          className="fixed bottom-20 right-20 w-10 h-10 pointer-events-none z-40"
          initial={{ opacity: 0, x: 30, y: 30 }}
          animate={{ opacity: [0, 0.3, 0], x: [30, 10, 5], y: [30, 10, 5] }}
          transition={{ duration: 2 }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-blue-500 dark:text-blue-400">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
      
      {guideType === 'peripheral_movement' && (
        <motion.div 
          className="fixed bottom-0 right-0 w-full h-40 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 4, times: [0, 0.5, 1] }}
        />
      )}
      
      {guideType === 'value_received' && (
        <motion.div 
          className="fixed inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 3, times: [0, 0.5, 1] }}
        />
      )}
      
      {guideType === 'inactivity_prompt' && (
        <motion.div 
          className="fixed bottom-4 right-4 w-40 h-40 rounded-full bg-yellow-400 dark:bg-yellow-600 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{ duration: 3, times: [0, 0.5, 1] }}
          style={{ filter: 'blur(30px)' }}
        />
      )}
    </>
  )
}

export default AttentionGuide

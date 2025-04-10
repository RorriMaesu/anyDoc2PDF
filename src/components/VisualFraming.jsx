import React, { useEffect, useState, useRef } from 'react'

// This component implements Edward Bernays-inspired visual framing techniques
// It subtly manipulates the visual environment to create psychological frames
const VisualFraming = () => {
  const [userStage, setUserStage] = useState(0)
  const framingRef = useRef(null)
  
  // Bernays believed in controlling the visual environment to shape perception
  useEffect(() => {
    // Create a container for visual framing elements
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.inset = '0'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9990'
    document.body.appendChild(container)
    framingRef.current = container
    
    // Track user journey stages
    const stageInterval = setInterval(() => {
      setUserStage(prev => {
        const newStage = prev + 1
        
        // Apply different framing techniques at different stages
        if (newStage === 2) applyContrastFraming()
        if (newStage === 4) applyDirectionalFraming()
        if (newStage === 6) applyFocalPointFraming()
        if (newStage === 8) applyValueFraming()
        if (newStage === 10) applyStatusFraming()
        
        return newStage
      })
    }, 20000) // Every 20 seconds
    
    // Check for conversion events to accelerate framing
    const checkConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        // User has received value - apply value framing immediately
        applyValueFraming()
        // And accelerate to later stages
        setUserStage(prev => Math.max(prev, 8))
      }
    }
    
    const conversionInterval = setInterval(checkConversion, 5000)
    
    // Cleanup
    return () => {
      clearInterval(stageInterval)
      clearInterval(conversionInterval)
      if (framingRef.current && document.body.contains(framingRef.current)) {
        document.body.removeChild(framingRef.current)
      }
    }
  }, [])
  
  // Bernays technique: Contrast Framing - create subtle contrast to direct attention
  const applyContrastFraming = () => {
    if (!framingRef.current) return
    
    // Find the donation button
    const donationButton = document.querySelector('.donation-button')
    if (!donationButton) return
    
    // Create a subtle contrast frame around the donation area
    const contrastFrame = document.createElement('div')
    contrastFrame.style.position = 'absolute'
    contrastFrame.style.width = '200px'
    contrastFrame.style.height = '200px'
    contrastFrame.style.borderRadius = '50%'
    contrastFrame.style.background = 'radial-gradient(circle, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 70%)'
    contrastFrame.style.pointerEvents = 'none'
    contrastFrame.style.zIndex = '9991'
    contrastFrame.style.opacity = '0'
    contrastFrame.style.transition = 'opacity 5s'
    
    // Position it behind the donation button
    const rect = donationButton.getBoundingClientRect()
    contrastFrame.style.bottom = (window.innerHeight - rect.bottom - 50) + 'px'
    contrastFrame.style.right = (window.innerWidth - rect.right - 50) + 'px'
    
    framingRef.current.appendChild(contrastFrame)
    
    // Fade in very subtly
    setTimeout(() => {
      contrastFrame.style.opacity = '1'
    }, 100)
    
    // Remove after a while
    setTimeout(() => {
      contrastFrame.style.opacity = '0'
      setTimeout(() => {
        if (contrastFrame.parentNode === framingRef.current) {
          framingRef.current.removeChild(contrastFrame)
        }
      }, 5000)
    }, 60000) // Remove after 1 minute
  }
  
  // Bernays technique: Directional Framing - create subtle directional cues
  const applyDirectionalFraming = () => {
    if (!framingRef.current) return
    
    // Find the donation button
    const donationButton = document.querySelector('.donation-button')
    if (!donationButton) return
    
    // Create subtle directional cues that point toward the donation button
    const directions = [
      { x: -100, y: -100 }, // top-left
      { x: 0, y: -150 },    // top
      { x: -150, y: 0 }     // left
    ]
    
    directions.forEach(direction => {
      // Create a very subtle directional gradient
      const directionalCue = document.createElement('div')
      directionalCue.style.position = 'absolute'
      directionalCue.style.width = '200px'
      directionalCue.style.height = '200px'
      directionalCue.style.background = `linear-gradient(to bottom right, rgba(255,255,255,0.01), rgba(255,255,255,0))`
      directionalCue.style.pointerEvents = 'none'
      directionalCue.style.zIndex = '9991'
      directionalCue.style.opacity = '0'
      directionalCue.style.transition = 'opacity 8s'
      
      // Position it relative to the donation button
      const rect = donationButton.getBoundingClientRect()
      directionalCue.style.bottom = (window.innerHeight - rect.bottom + direction.y) + 'px'
      directionalCue.style.right = (window.innerWidth - rect.right + direction.x) + 'px'
      
      framingRef.current.appendChild(directionalCue)
      
      // Fade in very subtly
      setTimeout(() => {
        directionalCue.style.opacity = '1'
      }, 100)
      
      // Remove after a while
      setTimeout(() => {
        directionalCue.style.opacity = '0'
        setTimeout(() => {
          if (directionalCue.parentNode === framingRef.current) {
            framingRef.current.removeChild(directionalCue)
          }
        }, 8000)
      }, 40000) // Remove after 40 seconds
    })
  }
  
  // Bernays technique: Focal Point Framing - create a subtle focal point
  const applyFocalPointFraming = () => {
    if (!framingRef.current) return
    
    // Find the donation button
    const donationButton = document.querySelector('.donation-button')
    if (!donationButton) return
    
    // Create a subtle focal point around the donation button
    const focalPoint = document.createElement('div')
    focalPoint.style.position = 'absolute'
    focalPoint.style.width = '300px'
    focalPoint.style.height = '300px'
    focalPoint.style.borderRadius = '50%'
    focalPoint.style.background = 'radial-gradient(circle, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 70%)'
    focalPoint.style.pointerEvents = 'none'
    focalPoint.style.zIndex = '9991'
    focalPoint.style.opacity = '0'
    focalPoint.style.transition = 'opacity 10s, transform 15s'
    focalPoint.style.transform = 'scale(0.95)'
    
    // Position it behind the donation button
    const rect = donationButton.getBoundingClientRect()
    focalPoint.style.bottom = (window.innerHeight - rect.bottom - 100) + 'px'
    focalPoint.style.right = (window.innerWidth - rect.right - 100) + 'px'
    
    framingRef.current.appendChild(focalPoint)
    
    // Fade in and scale up very subtly
    setTimeout(() => {
      focalPoint.style.opacity = '1'
      focalPoint.style.transform = 'scale(1)'
    }, 100)
    
    // Remove after a while
    setTimeout(() => {
      focalPoint.style.opacity = '0'
      setTimeout(() => {
        if (focalPoint.parentNode === framingRef.current) {
          framingRef.current.removeChild(focalPoint)
        }
      }, 10000)
    }, 60000) // Remove after 1 minute
  }
  
  // Bernays technique: Value Framing - frame the donation in terms of value
  const applyValueFraming = () => {
    if (!framingRef.current) return
    
    // Find the donation button
    const donationButton = document.querySelector('.donation-button')
    if (!donationButton) return
    
    // Create a subtle value frame around the donation button
    const valueFrame = document.createElement('div')
    valueFrame.style.position = 'absolute'
    valueFrame.style.width = '250px'
    valueFrame.style.height = '250px'
    valueFrame.style.borderRadius = '50%'
    valueFrame.style.border = '1px solid rgba(255,255,255,0.01)'
    valueFrame.style.boxShadow = '0 0 50px rgba(255,255,255,0.01) inset'
    valueFrame.style.pointerEvents = 'none'
    valueFrame.style.zIndex = '9991'
    valueFrame.style.opacity = '0'
    valueFrame.style.transition = 'opacity 8s'
    
    // Position it behind the donation button
    const rect = donationButton.getBoundingClientRect()
    valueFrame.style.bottom = (window.innerHeight - rect.bottom - 75) + 'px'
    valueFrame.style.right = (window.innerWidth - rect.right - 75) + 'px'
    
    framingRef.current.appendChild(valueFrame)
    
    // Fade in very subtly
    setTimeout(() => {
      valueFrame.style.opacity = '1'
    }, 100)
    
    // Remove after a while
    setTimeout(() => {
      valueFrame.style.opacity = '0'
      setTimeout(() => {
        if (valueFrame.parentNode === framingRef.current) {
          framingRef.current.removeChild(valueFrame)
        }
      }, 8000)
    }, 50000) // Remove after 50 seconds
  }
  
  // Bernays technique: Status Framing - frame the donation as a status symbol
  const applyStatusFraming = () => {
    if (!framingRef.current) return
    
    // Find the donation button
    const donationButton = document.querySelector('.donation-button')
    if (!donationButton) return
    
    // Create a subtle status frame around the donation button
    const statusFrame = document.createElement('div')
    statusFrame.style.position = 'absolute'
    statusFrame.style.width = '200px'
    statusFrame.style.height = '200px'
    statusFrame.style.borderRadius = '50%'
    statusFrame.style.background = 'radial-gradient(circle, rgba(255,215,0,0.01) 0%, rgba(255,215,0,0) 70%)' // Gold color
    statusFrame.style.pointerEvents = 'none'
    statusFrame.style.zIndex = '9991'
    statusFrame.style.opacity = '0'
    statusFrame.style.transition = 'opacity 10s'
    
    // Position it behind the donation button
    const rect = donationButton.getBoundingClientRect()
    statusFrame.style.bottom = (window.innerHeight - rect.bottom - 50) + 'px'
    statusFrame.style.right = (window.innerWidth - rect.right - 50) + 'px'
    
    framingRef.current.appendChild(statusFrame)
    
    // Fade in very subtly
    setTimeout(() => {
      statusFrame.style.opacity = '1'
    }, 100)
    
    // Remove after a while
    setTimeout(() => {
      statusFrame.style.opacity = '0'
      setTimeout(() => {
        if (statusFrame.parentNode === framingRef.current) {
          framingRef.current.removeChild(statusFrame)
        }
      }, 10000)
    }, 60000) // Remove after 1 minute
  }
  
  // This component doesn't render anything visible directly
  return null
}

export default VisualFraming

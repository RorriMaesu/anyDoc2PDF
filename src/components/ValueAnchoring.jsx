import React, { useEffect, useState } from 'react'

// This component subtly influences color perception to create value anchoring
// It doesn't render visible elements but manipulates CSS variables that affect the site's color scheme
const ValueAnchoring = () => {
  const [valueStage, setValueStage] = useState(0)
  
  useEffect(() => {
    // Gradually shift color perception to create value anchoring
    // This works by subtly adjusting the site's color palette over time
    // to create subconscious associations with value and quality
    
    const root = document.documentElement
    
    // Initial color scheme - neutral
    const updateColorScheme = () => {
      switch (valueStage) {
        case 0:
          // Baseline colors - neutral
          root.style.setProperty('--value-accent', 'rgba(59, 130, 246, 0.1)') // blue-500 at 10% opacity
          break
        case 1:
          // Slight shift toward trust colors (blue tones)
          root.style.setProperty('--value-accent', 'rgba(59, 130, 246, 0.15)') // blue-500 at 15% opacity
          break
        case 2:
          // Introduce subtle premium cues (deeper blues)
          root.style.setProperty('--value-accent', 'rgba(37, 99, 235, 0.18)') // blue-600 at 18% opacity
          break
        case 3:
          // Shift toward value signifiers (blue-purple)
          root.style.setProperty('--value-accent', 'rgba(79, 70, 229, 0.15)') // indigo-600 at 15% opacity
          break
        case 4:
          // Premium value anchoring (richer colors)
          root.style.setProperty('--value-accent', 'rgba(124, 58, 237, 0.12)') // violet-600 at 12% opacity
          break
        case 5:
          // Final stage - subtle gold accents for premium feel
          root.style.setProperty('--value-accent', 'rgba(217, 119, 6, 0.08)') // amber-600 at 8% opacity
          break
        default:
          break
      }
      
      // Apply the value accent to subtle UI elements
      const accentElements = document.querySelectorAll('.value-accent-target')
      accentElements.forEach(el => {
        el.style.boxShadow = `0 0 10px var(--value-accent)`
      })
    }
    
    updateColorScheme()
    
    // Progress through value stages based on time and engagement
    const stageInterval = setInterval(() => {
      setValueStage(prev => {
        const newStage = Math.min(prev + 1, 5)
        return newStage
      })
    }, 45000) // Every 45 seconds
    
    // Check for conversion events to accelerate value anchoring
    const checkConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        // User has received value - accelerate value anchoring
        setValueStage(prev => Math.min(prev + 1, 5))
      }
    }
    
    const conversionInterval = setInterval(checkConversion, 5000)
    
    return () => {
      clearInterval(stageInterval)
      clearInterval(conversionInterval)
    }
  }, [valueStage])
  
  // Add value accent class to key UI elements
  useEffect(() => {
    // Target elements that should receive the value accent
    const targetSelectors = [
      '.file-drop-zone',
      '.pdf-preview-container',
      '.button-primary',
      '.card-premium'
    ]
    
    targetSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.add('value-accent-target')
      })
    })
    
    // Add subtle value accent to the donation button
    const donationButton = document.querySelector('.donation-button')
    if (donationButton) {
      donationButton.classList.add('value-accent-target')
    }
    
    return () => {
      // Cleanup
      document.querySelectorAll('.value-accent-target').forEach(el => {
        el.classList.remove('value-accent-target')
      })
    }
  }, [])
  
  // This component doesn't render anything visible directly
  return null
}

export default ValueAnchoring

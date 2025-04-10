import React, { useEffect, useState, useRef } from 'react'

// This component implements Edward Bernays-inspired psychological techniques
// It doesn't render visible UI but manipulates perception through sophisticated priming
const BernaysPriming = () => {
  const [userStage, setUserStage] = useState(0)
  const primingRef = useRef(null)
  
  // Bernays believed in creating engineered consent through environmental manipulation
  useEffect(() => {
    // Create a hidden container for psychological elements
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.top = '0'
    container.style.left = '0'
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9999'
    container.style.opacity = '0'
    document.body.appendChild(container)
    primingRef.current = container
    
    // Track user journey stages
    const stageInterval = setInterval(() => {
      setUserStage(prev => {
        const newStage = prev + 1
        
        // Apply different psychological techniques at different stages
        if (newStage === 2) applyAssociationPriming()
        if (newStage === 4) applyEmotionalTransference()
        if (newStage === 6) applyReciprocityPriming()
        if (newStage === 8) applyScarcityPriming()
        if (newStage === 10) applySocialProofPriming()
        if (newStage === 12) applyAuthorityPriming()
        
        return newStage
      })
    }, 15000) // Every 15 seconds
    
    // Check for conversion events to accelerate priming
    const checkConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        // User has received value - apply reciprocity priming immediately
        applyReciprocityPriming()
        // And accelerate to later stages
        setUserStage(prev => Math.max(prev, 8))
      }
    }
    
    const conversionInterval = setInterval(checkConversion, 5000)
    
    // Cleanup
    return () => {
      clearInterval(stageInterval)
      clearInterval(conversionInterval)
      if (primingRef.current && document.body.contains(primingRef.current)) {
        document.body.removeChild(primingRef.current)
      }
    }
  }, [])
  
  // Bernays technique: Association - link the product with deep desires and values
  const applyAssociationPriming = () => {
    if (!primingRef.current) return
    
    // Create subliminal association between the service and positive values
    const values = ['freedom', 'success', 'achievement', 'security', 'control']
    
    // Place these values in barely perceptible form throughout the interface
    values.forEach(value => {
      // Create and position value text elements at strategic locations
      const valueElement = document.createElement('div')
      valueElement.innerText = value
      valueElement.style.position = 'absolute'
      valueElement.style.fontSize = '8px'
      valueElement.style.color = 'rgba(0,0,0,0.03)' // Nearly invisible
      valueElement.style.fontWeight = 'bold'
      valueElement.style.textTransform = 'uppercase'
      valueElement.style.pointerEvents = 'none'
      
      // Position at strategic locations
      const top = Math.random() * 80 + 10 + '%'
      const left = Math.random() * 80 + 10 + '%'
      valueElement.style.top = top
      valueElement.style.left = left
      
      primingRef.current.appendChild(valueElement)
      
      // Remove after a while to avoid cluttering
      setTimeout(() => {
        if (valueElement.parentNode === primingRef.current) {
          primingRef.current.removeChild(valueElement)
        }
      }, 60000) // Remove after 1 minute
    })
    
    // Also apply to existing elements - add data attributes with these values
    const targetElements = document.querySelectorAll('.file-drop-zone, .button-primary, .card')
    targetElements.forEach(el => {
      const randomValue = values[Math.floor(Math.random() * values.length)]
      el.setAttribute('data-value', randomValue)
    })
  }
  
  // Bernays technique: Emotional Transference - transfer emotions from one context to another
  const applyEmotionalTransference = () => {
    if (!primingRef.current) return
    
    // Create emotional priming by adding subtle emotional cues
    const emotions = [
      { name: 'gratitude', color: 'rgba(52, 211, 153, 0.02)' }, // green
      { name: 'pride', color: 'rgba(59, 130, 246, 0.02)' }, // blue
      { name: 'security', color: 'rgba(79, 70, 229, 0.02)' } // indigo
    ]
    
    // Apply emotional color overlays
    emotions.forEach(emotion => {
      const overlay = document.createElement('div')
      overlay.style.position = 'fixed'
      overlay.style.inset = '0'
      overlay.style.backgroundColor = emotion.color
      overlay.style.opacity = '0'
      overlay.style.pointerEvents = 'none'
      overlay.style.zIndex = '9998'
      overlay.setAttribute('data-emotion', emotion.name)
      
      primingRef.current.appendChild(overlay)
      
      // Fade in very subtly
      setTimeout(() => {
        overlay.style.transition = 'opacity 10s'
        overlay.style.opacity = '1'
      }, 100)
      
      // Remove after a while
      setTimeout(() => {
        if (overlay.parentNode === primingRef.current) {
          overlay.style.opacity = '0'
          setTimeout(() => {
            if (overlay.parentNode === primingRef.current) {
              primingRef.current.removeChild(overlay)
            }
          }, 10000)
        }
      }, 30000) // Remove after 30 seconds
    })
    
    // Also add emotional words to the page in strategic locations
    const emotionWords = ['grateful', 'proud', 'secure', 'accomplished', 'valued']
    emotionWords.forEach(word => {
      const wordElement = document.createElement('div')
      wordElement.innerText = word
      wordElement.style.position = 'absolute'
      wordElement.style.fontSize = '7px'
      wordElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      wordElement.style.fontWeight = 'normal'
      wordElement.style.pointerEvents = 'none'
      
      // Position near important UI elements
      const uiElements = document.querySelectorAll('.button-primary, .card-header, .pdf-preview')
      if (uiElements.length > 0) {
        const randomElement = uiElements[Math.floor(Math.random() * uiElements.length)]
        const rect = randomElement.getBoundingClientRect()
        
        wordElement.style.top = (rect.top + window.scrollY + rect.height / 2) + 'px'
        wordElement.style.left = (rect.left + window.scrollX + rect.width / 2) + 'px'
        
        document.body.appendChild(wordElement)
        
        // Remove after a while
        setTimeout(() => {
          if (document.body.contains(wordElement)) {
            document.body.removeChild(wordElement)
          }
        }, 20000) // Remove after 20 seconds
      }
    })
  }
  
  // Bernays technique: Reciprocity - create a sense of obligation
  const applyReciprocityPriming = () => {
    if (!primingRef.current) return
    
    // Create a subtle sense of obligation through reciprocity cues
    const reciprocityPhrases = [
      'you received value',
      'free service',
      'premium quality',
      'no cost to you',
      'gift to you'
    ]
    
    // Flash these phrases very briefly and subtly
    reciprocityPhrases.forEach((phrase, index) => {
      setTimeout(() => {
        const phraseElement = document.createElement('div')
        phraseElement.innerText = phrase
        phraseElement.style.position = 'fixed'
        phraseElement.style.top = '50%'
        phraseElement.style.left = '50%'
        phraseElement.style.transform = 'translate(-50%, -50%)'
        phraseElement.style.fontSize = '24px'
        phraseElement.style.fontWeight = 'bold'
        phraseElement.style.color = 'rgba(0,0,0,0.01)' // Extremely faint
        phraseElement.style.textTransform = 'uppercase'
        phraseElement.style.pointerEvents = 'none'
        phraseElement.style.zIndex = '9999'
        phraseElement.style.opacity = '0'
        
        primingRef.current.appendChild(phraseElement)
        
        // Flash very briefly
        setTimeout(() => {
          phraseElement.style.opacity = '1'
          setTimeout(() => {
            phraseElement.style.opacity = '0'
            setTimeout(() => {
              if (phraseElement.parentNode === primingRef.current) {
                primingRef.current.removeChild(phraseElement)
              }
            }, 500)
          }, 50) // Visible for only 50ms
        }, 100)
      }, index * 10000) // Stagger the flashes
    })
    
    // Also add a subtle "gift" indicator near the PDF output
    const pdfElements = document.querySelectorAll('[data-pdf-element]')
    if (pdfElements.length > 0) {
      const giftIndicator = document.createElement('div')
      giftIndicator.innerText = 'gift'
      giftIndicator.style.position = 'absolute'
      giftIndicator.style.fontSize = '8px'
      giftIndicator.style.color = 'rgba(0,0,0,0.03)' // Nearly invisible
      giftIndicator.style.fontWeight = 'bold'
      giftIndicator.style.pointerEvents = 'none'
      
      const pdfElement = pdfElements[0]
      const rect = pdfElement.getBoundingClientRect()
      
      giftIndicator.style.top = (rect.top + window.scrollY + 20) + 'px'
      giftIndicator.style.left = (rect.left + window.scrollX + 20) + 'px'
      
      document.body.appendChild(giftIndicator)
      
      // Remove after a while
      setTimeout(() => {
        if (document.body.contains(giftIndicator)) {
          document.body.removeChild(giftIndicator)
        }
      }, 30000) // Remove after 30 seconds
    }
  }
  
  // Bernays technique: Scarcity - create a sense of limited availability
  const applyScarcityPriming = () => {
    if (!primingRef.current) return
    
    // Create a subtle sense of scarcity through visual cues
    const scarcityPhrases = [
      'limited resources',
      'costs to maintain',
      'server expenses',
      'development time',
      'ongoing support'
    ]
    
    // Add these phrases as extremely subtle background elements
    scarcityPhrases.forEach(phrase => {
      const phraseElement = document.createElement('div')
      phraseElement.innerText = phrase
      phraseElement.style.position = 'fixed'
      phraseElement.style.bottom = (Math.random() * 30 + 5) + '%'
      phraseElement.style.right = (Math.random() * 30 + 5) + '%'
      phraseElement.style.fontSize = '7px'
      phraseElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      phraseElement.style.fontWeight = 'normal'
      phraseElement.style.pointerEvents = 'none'
      phraseElement.style.zIndex = '9997'
      
      primingRef.current.appendChild(phraseElement)
      
      // Remove after a while
      setTimeout(() => {
        if (phraseElement.parentNode === primingRef.current) {
          primingRef.current.removeChild(phraseElement)
        }
      }, 45000) // Remove after 45 seconds
    })
  }
  
  // Bernays technique: Social Proof - show that others are doing it
  const applySocialProofPriming = () => {
    if (!primingRef.current) return
    
    // Create subtle social proof indicators
    const names = ['Alex', 'Jamie', 'Taylor', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Quinn']
    const actions = ['supported', 'contributed', 'donated', 'helped']
    
    // Create and display subtle "recent activity" indicators
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const name = names[Math.floor(Math.random() * names.length)]
        const action = actions[Math.floor(Math.random() * actions.length)]
        
        const proofElement = document.createElement('div')
        proofElement.innerText = `${name} ${action} recently`
        proofElement.style.position = 'fixed'
        proofElement.style.bottom = '20px'
        proofElement.style.right = '20px'
        proofElement.style.padding = '8px'
        proofElement.style.backgroundColor = 'rgba(255,255,255,0.02)' // Nearly invisible
        proofElement.style.borderRadius = '4px'
        proofElement.style.fontSize = '10px'
        proofElement.style.color = 'rgba(0,0,0,0.06)' // Very faint
        proofElement.style.pointerEvents = 'none'
        proofElement.style.zIndex = '9996'
        proofElement.style.opacity = '0'
        proofElement.style.transform = 'translateY(10px)'
        proofElement.style.transition = 'opacity 2s, transform 2s'
        
        primingRef.current.appendChild(proofElement)
        
        // Fade in very subtly
        setTimeout(() => {
          proofElement.style.opacity = '1'
          proofElement.style.transform = 'translateY(0)'
          
          // Fade out after a while
          setTimeout(() => {
            proofElement.style.opacity = '0'
            proofElement.style.transform = 'translateY(10px)'
            
            // Remove after fade out
            setTimeout(() => {
              if (proofElement.parentNode === primingRef.current) {
                primingRef.current.removeChild(proofElement)
              }
            }, 2000)
          }, 5000)
        }, 100)
      }, i * 20000) // Stagger the appearances
    }
  }
  
  // Bernays technique: Authority - leverage authority figures and expertise
  const applyAuthorityPriming = () => {
    if (!primingRef.current) return
    
    // Create subtle authority indicators
    const authorityPhrases = [
      'expert developed',
      'professionally designed',
      'industry standard',
      'trusted technology',
      'secure processing'
    ]
    
    // Add these phrases as extremely subtle background elements
    authorityPhrases.forEach(phrase => {
      const phraseElement = document.createElement('div')
      phraseElement.innerText = phrase
      phraseElement.style.position = 'fixed'
      phraseElement.style.top = (Math.random() * 30 + 5) + '%'
      phraseElement.style.left = (Math.random() * 30 + 5) + '%'
      phraseElement.style.fontSize = '7px'
      phraseElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      phraseElement.style.fontWeight = 'normal'
      phraseElement.style.pointerEvents = 'none'
      phraseElement.style.zIndex = '9997'
      
      primingRef.current.appendChild(phraseElement)
      
      // Remove after a while
      setTimeout(() => {
        if (phraseElement.parentNode === primingRef.current) {
          primingRef.current.removeChild(phraseElement)
        }
      }, 45000) // Remove after 45 seconds
    })
  }
  
  // This component doesn't render anything visible directly
  return null
}

export default BernaysPriming

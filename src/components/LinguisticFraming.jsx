import React, { useEffect, useState, useRef } from 'react'

// This component implements Edward Bernays-inspired linguistic framing techniques
// It subtly manipulates language patterns to influence perception
const LinguisticFraming = () => {
  const [userStage, setUserStage] = useState(0)
  const [hasConverted, setHasConverted] = useState(false)
  const framingRef = useRef(null)
  
  // Bernays believed in the power of language to shape perception and behavior
  useEffect(() => {
    // Create a container for linguistic framing elements
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.inset = '0'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9989'
    document.body.appendChild(container)
    framingRef.current = container
    
    // Track user journey stages
    const stageInterval = setInterval(() => {
      setUserStage(prev => {
        const newStage = prev + 1
        
        // Apply different linguistic techniques at different stages
        if (newStage === 2) applyPositiveLanguageFraming()
        if (newStage === 4) applyReciprocityLanguageFraming()
        if (newStage === 6) applyOwnershipLanguageFraming()
        if (newStage === 8) applyExclusivityLanguageFraming()
        if (newStage === 10) applyIdentityLanguageFraming()
        
        return newStage
      })
    }, 25000) // Every 25 seconds
    
    // Check for conversion events to accelerate framing
    const checkConversion = () => {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0 && !hasConverted) {
        setHasConverted(true)
        // User has received value - apply reciprocity language immediately
        applyReciprocityLanguageFraming()
        // And accelerate to later stages
        setUserStage(prev => Math.max(prev, 6))
      }
    }
    
    const conversionInterval = setInterval(checkConversion, 5000)
    
    // Modify existing text elements to subtly influence perception
    modifyExistingText()
    
    // Cleanup
    return () => {
      clearInterval(stageInterval)
      clearInterval(conversionInterval)
      if (framingRef.current && document.body.contains(framingRef.current)) {
        document.body.removeChild(framingRef.current)
      }
    }
  }, [hasConverted])
  
  // Modify existing text elements to subtly influence perception
  const modifyExistingText = () => {
    // Find text elements that can be subtly modified
    setTimeout(() => {
      // Add subtle linguistic framing to button text
      const buttons = document.querySelectorAll('button')
      buttons.forEach(button => {
        // Store original text
        if (!button.hasAttribute('data-original-text')) {
          button.setAttribute('data-original-text', button.innerText)
          
          // Add subtle linguistic framing
          if (button.innerText.toLowerCase().includes('convert')) {
            button.innerHTML = button.innerHTML.replace(
              /convert/i, 
              '<span style="position:relative">convert<span style="position:absolute;top:0;left:0;opacity:0.1;font-size:6px;white-space:nowrap">transform your experience</span></span>'
            )
          }
          
          if (button.innerText.toLowerCase().includes('download')) {
            button.innerHTML = button.innerHTML.replace(
              /download/i, 
              '<span style="position:relative">download<span style="position:absolute;top:0;left:0;opacity:0.1;font-size:6px;white-space:nowrap">receive your gift</span></span>'
            )
          }
        }
      })
      
      // Add subtle linguistic framing to headings
      const headings = document.querySelectorAll('h1, h2, h3')
      headings.forEach(heading => {
        // Store original text
        if (!heading.hasAttribute('data-original-text')) {
          heading.setAttribute('data-original-text', heading.innerText)
          
          // Add subtle linguistic framing
          if (heading.innerText.toLowerCase().includes('pdf')) {
            heading.innerHTML = heading.innerHTML.replace(
              /pdf/i, 
              '<span style="position:relative">PDF<span style="position:absolute;top:0;left:0;opacity:0.1;font-size:6px;white-space:nowrap">premium quality</span></span>'
            )
          }
        }
      })
    }, 2000) // Wait for the DOM to be fully loaded
  }
  
  // Bernays technique: Positive Language Framing - use positive language patterns
  const applyPositiveLanguageFraming = () => {
    if (!framingRef.current) return
    
    // Create subtle positive language cues
    const positiveWords = [
      'excellent',
      'premium',
      'valuable',
      'quality',
      'professional',
      'seamless',
      'effortless'
    ]
    
    // Add these words as extremely subtle background elements
    positiveWords.forEach(word => {
      const wordElement = document.createElement('div')
      wordElement.innerText = word
      wordElement.style.position = 'fixed'
      wordElement.style.top = (Math.random() * 80 + 10) + '%'
      wordElement.style.left = (Math.random() * 80 + 10) + '%'
      wordElement.style.fontSize = '8px'
      wordElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      wordElement.style.fontWeight = 'normal'
      wordElement.style.pointerEvents = 'none'
      wordElement.style.zIndex = '9989'
      
      framingRef.current.appendChild(wordElement)
      
      // Remove after a while
      setTimeout(() => {
        if (wordElement.parentNode === framingRef.current) {
          framingRef.current.removeChild(wordElement)
        }
      }, 60000) // Remove after 1 minute
    })
  }
  
  // Bernays technique: Reciprocity Language Framing - use language that creates a sense of obligation
  const applyReciprocityLanguageFraming = () => {
    if (!framingRef.current) return
    
    // Create subtle reciprocity language cues
    const reciprocityPhrases = [
      'you received',
      'given to you',
      'provided for you',
      'created for you',
      'your benefit'
    ]
    
    // Add these phrases as extremely subtle background elements
    reciprocityPhrases.forEach(phrase => {
      const phraseElement = document.createElement('div')
      phraseElement.innerText = phrase
      phraseElement.style.position = 'fixed'
      phraseElement.style.bottom = (Math.random() * 40 + 30) + '%'
      phraseElement.style.right = (Math.random() * 40 + 30) + '%'
      phraseElement.style.fontSize = '7px'
      phraseElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      phraseElement.style.fontWeight = 'normal'
      phraseElement.style.pointerEvents = 'none'
      phraseElement.style.zIndex = '9989'
      
      framingRef.current.appendChild(phraseElement)
      
      // Remove after a while
      setTimeout(() => {
        if (phraseElement.parentNode === framingRef.current) {
          framingRef.current.removeChild(phraseElement)
        }
      }, 50000) // Remove after 50 seconds
    })
    
    // If user has converted, add a more specific reciprocity cue
    if (hasConverted) {
      const pdfElements = document.querySelectorAll('[data-pdf-element]')
      if (pdfElements.length > 0) {
        const specificCue = document.createElement('div')
        specificCue.innerText = 'you received value'
        specificCue.style.position = 'absolute'
        specificCue.style.fontSize = '8px'
        specificCue.style.color = 'rgba(0,0,0,0.03)' // Nearly invisible
        specificCue.style.fontWeight = 'bold'
        specificCue.style.pointerEvents = 'none'
        
        const pdfElement = pdfElements[0]
        const rect = pdfElement.getBoundingClientRect()
        
        specificCue.style.top = (rect.bottom + window.scrollY + 10) + 'px'
        specificCue.style.left = (rect.left + window.scrollX + rect.width / 2) + 'px'
        specificCue.style.transform = 'translateX(-50%)'
        
        document.body.appendChild(specificCue)
        
        // Remove after a while
        setTimeout(() => {
          if (document.body.contains(specificCue)) {
            document.body.removeChild(specificCue)
          }
        }, 40000) // Remove after 40 seconds
      }
    }
  }
  
  // Bernays technique: Ownership Language Framing - use language that creates a sense of ownership
  const applyOwnershipLanguageFraming = () => {
    if (!framingRef.current) return
    
    // Create subtle ownership language cues
    const ownershipPhrases = [
      'your tool',
      'your service',
      'your resource',
      'your converter',
      'your solution'
    ]
    
    // Add these phrases as extremely subtle background elements
    ownershipPhrases.forEach(phrase => {
      const phraseElement = document.createElement('div')
      phraseElement.innerText = phrase
      phraseElement.style.position = 'fixed'
      phraseElement.style.top = (Math.random() * 40 + 30) + '%'
      phraseElement.style.left = (Math.random() * 40 + 30) + '%'
      phraseElement.style.fontSize = '7px'
      phraseElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      phraseElement.style.fontWeight = 'normal'
      phraseElement.style.pointerEvents = 'none'
      phraseElement.style.zIndex = '9989'
      
      framingRef.current.appendChild(phraseElement)
      
      // Remove after a while
      setTimeout(() => {
        if (phraseElement.parentNode === framingRef.current) {
          framingRef.current.removeChild(phraseElement)
        }
      }, 55000) // Remove after 55 seconds
    })
  }
  
  // Bernays technique: Exclusivity Language Framing - use language that creates a sense of exclusivity
  const applyExclusivityLanguageFraming = () => {
    if (!framingRef.current) return
    
    // Create subtle exclusivity language cues
    const exclusivityPhrases = [
      'select users',
      'premium quality',
      'advanced features',
      'special access',
      'enhanced service'
    ]
    
    // Add these phrases as extremely subtle background elements
    exclusivityPhrases.forEach(phrase => {
      const phraseElement = document.createElement('div')
      phraseElement.innerText = phrase
      phraseElement.style.position = 'fixed'
      phraseElement.style.bottom = (Math.random() * 30 + 10) + '%'
      phraseElement.style.left = (Math.random() * 30 + 10) + '%'
      phraseElement.style.fontSize = '7px'
      phraseElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      phraseElement.style.fontWeight = 'normal'
      phraseElement.style.pointerEvents = 'none'
      phraseElement.style.zIndex = '9989'
      
      framingRef.current.appendChild(phraseElement)
      
      // Remove after a while
      setTimeout(() => {
        if (phraseElement.parentNode === framingRef.current) {
          framingRef.current.removeChild(phraseElement)
        }
      }, 45000) // Remove after 45 seconds
    })
  }
  
  // Bernays technique: Identity Language Framing - use language that creates a sense of identity
  const applyIdentityLanguageFraming = () => {
    if (!framingRef.current) return
    
    // Create subtle identity language cues
    const identityPhrases = [
      'you are a supporter',
      'you are generous',
      'you value quality',
      'you appreciate craft',
      'you enable creation'
    ]
    
    // Add these phrases as extremely subtle background elements
    identityPhrases.forEach(phrase => {
      const phraseElement = document.createElement('div')
      phraseElement.innerText = phrase
      phraseElement.style.position = 'fixed'
      phraseElement.style.top = (Math.random() * 30 + 10) + '%'
      phraseElement.style.right = (Math.random() * 30 + 10) + '%'
      phraseElement.style.fontSize = '7px'
      phraseElement.style.color = 'rgba(0,0,0,0.02)' // Nearly invisible
      phraseElement.style.fontWeight = 'normal'
      phraseElement.style.pointerEvents = 'none'
      phraseElement.style.zIndex = '9989'
      
      framingRef.current.appendChild(phraseElement)
      
      // Remove after a while
      setTimeout(() => {
        if (phraseElement.parentNode === framingRef.current) {
          framingRef.current.removeChild(phraseElement)
        }
      }, 50000) // Remove after 50 seconds
    })
  }
  
  // This component doesn't render anything visible directly
  return null
}

export default LinguisticFraming

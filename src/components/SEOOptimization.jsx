import React, { useEffect } from 'react'

// This component doesn't render anything visible but adds SEO metadata to the document
const SEOOptimization = () => {
  useEffect(() => {
    // Update the document title with high-value keywords
    document.title = "AnyDoc2PDF - Free Online Document to PDF Converter | Convert Word, Excel, PPT to PDF"
    
    // Update meta description with high-value keywords
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free online document converter. Convert Word to PDF, Excel to PDF, PowerPoint to PDF, ' +
        'JPG to PDF, and more. No installation, no registration, 100% free PDF conversion tool.'
      )
    } else {
      const newMetaDescription = document.createElement('meta')
      newMetaDescription.name = 'description'
      newMetaDescription.content = 'Free online document converter. Convert Word to PDF, Excel to PDF, PowerPoint to PDF, ' +
        'JPG to PDF, and more. No installation, no registration, 100% free PDF conversion tool.'
      document.head.appendChild(newMetaDescription)
    }
    
    // Add keywords meta tag (still useful for some search engines)
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 
        'pdf converter, word to pdf, excel to pdf, ppt to pdf, image to pdf, ' +
        'free pdf converter, online pdf tool, document converter, pdf creator, ' +
        'convert to pdf, pdf conversion, free online converter'
      )
    } else {
      const newMetaKeywords = document.createElement('meta')
      newMetaKeywords.name = 'keywords'
      newMetaKeywords.content = 'pdf converter, word to pdf, excel to pdf, ppt to pdf, image to pdf, ' +
        'free pdf converter, online pdf tool, document converter, pdf creator, ' +
        'convert to pdf, pdf conversion, free online converter'
      document.head.appendChild(newMetaKeywords)
    }
    
    // Add canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://rorrimaesu.github.io/anyDoc2PDF/')
    } else {
      const newCanonicalLink = document.createElement('link')
      newCanonicalLink.rel = 'canonical'
      newCanonicalLink.href = 'https://rorrimaesu.github.io/anyDoc2PDF/'
      document.head.appendChild(newCanonicalLink)
    }
    
    // Add Open Graph meta tags for better social sharing
    const ogTags = [
      { property: 'og:title', content: 'AnyDoc2PDF - Free Online Document to PDF Converter' },
      { property: 'og:description', content: 'Convert any document to PDF for free. No registration, no email required. Word to PDF, Excel to PDF, PowerPoint to PDF, and more.' },
      { property: 'og:url', content: 'https://rorrimaesu.github.io/anyDoc2PDF/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'AnyDoc2PDF' }
    ]
    
    ogTags.forEach(tag => {
      const existingTag = document.querySelector(`meta[property="${tag.property}"]`)
      if (existingTag) {
        existingTag.setAttribute('content', tag.content)
      } else {
        const newTag = document.createElement('meta')
        newTag.setAttribute('property', tag.property)
        newTag.setAttribute('content', tag.content)
        document.head.appendChild(newTag)
      }
    })
    
    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'AnyDoc2PDF - Free Online Document to PDF Converter' },
      { name: 'twitter:description', content: 'Convert any document to PDF for free. No registration, no email required. Word to PDF, Excel to PDF, PowerPoint to PDF, and more.' }
    ]
    
    twitterTags.forEach(tag => {
      const existingTag = document.querySelector(`meta[name="${tag.name}"]`)
      if (existingTag) {
        existingTag.setAttribute('content', tag.content)
      } else {
        const newTag = document.createElement('meta')
        newTag.setAttribute('name', tag.name)
        newTag.setAttribute('content', tag.content)
        document.head.appendChild(newTag)
      }
    })
    
    // Add structured data (JSON-LD) for rich search results
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'AnyDoc2PDF',
      'url': 'https://rorrimaesu.github.io/anyDoc2PDF/',
      'description': 'Free online document to PDF converter. Convert Word, Excel, PowerPoint, images and more to PDF.',
      'applicationCategory': 'DocumentConversion',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'featureList': [
        'Convert Word to PDF',
        'Convert Excel to PDF',
        'Convert PowerPoint to PDF',
        'Convert Images to PDF',
        'Free to use',
        'No registration required',
        'Client-side processing for privacy'
      ]
    }
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]')
    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(structuredData)
    } else {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.textContent = JSON.stringify(structuredData)
      document.head.appendChild(scriptTag)
    }
    
    // Add high-value keywords as data attributes to key elements for semantic richness
    const keyElements = document.querySelectorAll('.file-drop-zone, .button-primary, .card-header, h1, h2, h3')
    const keywordsList = [
      'pdf converter',
      'word to pdf',
      'excel to pdf',
      'powerpoint to pdf',
      'image to pdf',
      'free pdf tool',
      'online converter',
      'document conversion',
      'pdf creator',
      'free pdf service'
    ]
    
    keyElements.forEach((el, index) => {
      el.setAttribute('data-seo-keyword', keywordsList[index % keywordsList.length])
    })
    
    return () => {
      // Cleanup is not really needed as we want the SEO elements to persist
    }
  }, [])
  
  // This component doesn't render anything visible
  return null
}

export default SEOOptimization

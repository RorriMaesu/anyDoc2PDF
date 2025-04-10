import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FileUploader from './components/FileUploader'
import PDFConverter from './components/PDFConverter'
import PreviewPane from './components/PreviewPane'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import FeatureShowcase from './components/FeatureShowcase'
import BuyMeCoffee from './components/BuyMeCoffee'
import SubliminalPriming from './components/SubliminalPriming'
import AttentionGuide from './components/AttentionGuide'
import ValueAnchoring from './components/ValueAnchoring'
import BernaysPriming from './components/BernaysPriming'
import VisualFraming from './components/VisualFraming'
import LinguisticFraming from './components/LinguisticFraming'
import SEOOptimization from './components/SEOOptimization'

function App() {
  const [file, setFile] = useState(null)
  const [convertedPdf, setConvertedPdf] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [activeSection, setActiveSection] = useState('upload')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check user preference for dark mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)

    // Apply dark mode class if needed
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile)
    setConvertedPdf(null)
    setShowPreview(false)
    setActiveSection('convert')
  }

  const handleConversion = async () => {
    if (!file) return

    setIsConverting(true)

    try {
      // The actual conversion will be handled by the PDFConverter component
      const result = await new Promise(resolve => {
        // Simulate conversion time for better UX
        setTimeout(() => resolve(true), 1500)
      })

      if (result) {
        setConvertedPdf(file)
        setShowPreview(true)
        setActiveSection('preview')
      }
    } catch (error) {
      console.error('Conversion failed:', error)
    } finally {
      setIsConverting(false)
    }
  }

  const handleBack = () => {
    setShowPreview(false)
    setActiveSection('convert')
  }

  // Define app-wide transition settings
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <AnimatePresence mode="wait">
        {!showPreview ? (
          <motion.div
            key="main-app"
            className="flex flex-col min-h-screen"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <main className="flex-grow">
              <div className="relative overflow-hidden">
                <AnimatedBackground />

                <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 md:pt-32 md:pb-24 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center max-w-4xl mx-auto"
                  >
                    <div className="mb-6 inline-block">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                        Fast & Secure
                      </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-tight">
                      Free Online Document to PDF Converter
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                      Convert Word, Excel, PowerPoint, Images and more to high-quality PDF. Fast, secure, and 100% free.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Word to PDF</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Excel to PDF</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">PowerPoint to PDF</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Image to PDF</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">No Registration</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl">
                      <div className="p-1">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full" />
                      </div>

                      <div className="p-6 md:p-8">
                        <div className="flex items-center space-x-2 mb-6">
                          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                          <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 ml-2 font-mono">
                            AnyDoc2PDF Converter
                          </div>
                        </div>

                        <FileUploader onFileUpload={handleFileUpload} />

                        {file && (
                          <PDFConverter
                            file={file}
                            onConvert={handleConversion}
                            isConverting={isConverting}
                          />
                        )}
                      </div>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Trusted by thousands of users worldwide
                      </p>
                      <div className="flex flex-wrap justify-center items-center gap-6">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-gray-600 dark:text-gray-300">4.9/5 rating</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span className="ml-1 text-gray-600 dark:text-gray-300">100% Secure</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="ml-1 text-gray-600 dark:text-gray-300">Fast Conversion</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Features Section */}
              <section id="features" className="py-20 sm:py-24 bg-white dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                  <FeatureShowcase />
                </div>
              </section>



            </main>

            <Footer />
            <BuyMeCoffee />
            <SubliminalPriming />
            <AttentionGuide />
            <ValueAnchoring />
            <BernaysPriming />
            <VisualFraming />
            <LinguisticFraming />
            <SEOOptimization />
          </motion.div>
        ) : (
          <motion.div
            key="preview-pane"
            className="flex flex-col h-screen"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b py-4 px-4 sm:px-6 flex items-center justify-between shadow-sm`}>
              <div className="flex items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 rounded-lg blur opacity-30"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 text-transparent bg-clip-text px-1">
                      AnyDoc2PDF
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={handleBack}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Editor
                </motion.button>

                <motion.button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </header>

            <div className="flex-grow overflow-hidden bg-gray-100 dark:bg-gray-900">
              <PreviewPane
                file={convertedPdf}
                onBack={handleBack}
                darkMode={darkMode}
              />
            </div>

            <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t py-4 text-center text-sm text-gray-500 dark:text-gray-400`}>
              <div className="container mx-auto px-4">
                <p>© {new Date().getFullYear()} AnyDoc2PDF • Premium Document Conversion</p>
              </div>
            </footer>
            <BuyMeCoffee />
            <SubliminalPriming />
            <AttentionGuide />
            <ValueAnchoring />
            <BernaysPriming />
            <VisualFraming />
            <LinguisticFraming />
            <SEOOptimization />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

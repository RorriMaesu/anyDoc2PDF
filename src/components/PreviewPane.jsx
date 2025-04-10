import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { savePDF, createPreviewUrl, convertToPDF } from '../utils/pdfUtils'

const PreviewPane = ({ file, onBack, darkMode }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [convertedPdfBlob, setConvertedPdfBlob] = useState(null)
  const [isConverting, setIsConverting] = useState(true)
  const [conversionError, setConversionError] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pdfObjectRef = useRef(null)
  const [pdfKey, setPdfKey] = useState(0) // Add a key to force re-render of PDF object
  const pdfContainerRef = useRef(null) // Add a ref to the PDF container for better zoom control
  const pdfViewerRef = useRef(null) // Add a ref to access the internal PDF viewer

  useEffect(() => {
    // Create a preview URL for the file
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      // Convert the file to PDF using our utility
      const convertFile = async () => {
        setIsConverting(true)
        setConversionError(null)

        try {
          // Use our conversion utility
          const pdfBlob = await convertToPDF(file)

          // Store the converted PDF blob for download
          setConvertedPdfBlob(pdfBlob)

          // Create a preview URL for the PDF
          const pdfUrl = createPreviewUrl(pdfBlob)
          setPreviewUrl(pdfUrl)

          // Attempt to estimate the number of pages (this is a simplified approach)
          // In a real app, you would use a PDF.js or similar library to get the exact page count
          const pdfSize = pdfBlob.size
          const estimatedPages = Math.max(1, Math.ceil(pdfSize / 30000)) // Rough estimate
          setTotalPages(estimatedPages)
        } catch (error) {
          console.error('Error converting file to PDF:', error)
          setConversionError('Failed to convert file. Please try again.')
        } finally {
          setIsConverting(false)
        }
      }

      convertFile()

      return () => {
        URL.revokeObjectURL(url)
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
        }
      }
    }
  }, [file])

  useEffect(() => {
    // Update zoom level for PDF viewer
    if (pdfViewerRef.current) {
      pdfViewerRef.current.style.transform = `scale(${zoomLevel / 100})`
      pdfViewerRef.current.style.transformOrigin = 'top center'
    }
  }, [zoomLevel])

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      if (convertedPdfBlob) {
        // Use our utility to download the PDF
        savePDF(convertedPdfBlob, `${file.name.split('.')[0]}.pdf`)
      } else {
        // If for some reason the blob isn't available, try converting again
        const pdfBlob = await convertToPDF(file, {
          quality: 'premium',
          pageSize: 'a4',
        })
        savePDF(pdfBlob, `${file.name.split('.')[0]}.pdf`)
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      setConversionError('Failed to download PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  // Effect to update PDF when page changes
  useEffect(() => {
    // Force re-render of PDF object when page changes
    setPdfKey(prevKey => prevKey + 1)
  }, [currentPage])

  // Function to handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200))
  }

  // Function to handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50))
  }

  // Function to reset zoom
  const handleZoomReset = () => {
    setZoomLevel(100)
  }

  // Function to go to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  // Function to go to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top navigation bar */}
      <div className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <motion.button
          type="button"
          onClick={onBack}
          className={`text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} flex items-center group`}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2 mr-1.5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ x: 0 }}
            animate={{ x: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              repeatDelay: 2
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </motion.svg>
          Back to Editor
        </motion.button>

        <div className="flex items-center">
          <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center rounded mr-2">
            <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
          <div>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mr-2`}>
              {file.name.split('.')[0]}.pdf
            </span>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {convertedPdfBlob ? `${(convertedPdfBlob.size / 1024).toFixed(0)} KB` : ''}
            </span>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleDownload}
          className={`px-4 py-2 ${
            isDownloading
              ? 'bg-gray-400 dark:bg-gray-600'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-md hover:shadow-blue-500/30'
          } text-white text-sm rounded-lg flex items-center shadow transition-all duration-300`}
          disabled={isDownloading || isConverting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isDownloading ? (
            <>
              <div className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF</span>
            </>
          )}
        </motion.button>
      </div>

      {/* PDF Controls */}
      <div className={`flex justify-between items-center p-3 ${darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
        <div className="flex items-center space-x-2">
          {/* Page navigation */}
          <motion.button
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || isConverting}
            className={`p-2 rounded-full ${
              currentPage <= 1 || isConverting
                ? 'opacity-40 cursor-not-allowed'
                : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`
            }`}
            title="Previous Page"
            whileHover={currentPage > 1 && !isConverting ? { scale: 1.1 } : {}}
            whileTap={currentPage > 1 && !isConverting ? { scale: 0.95 } : {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <div className={`text-sm font-medium rounded-lg px-3 py-1 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            Page <span className="font-bold text-blue-600 dark:text-blue-400">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
          </div>

          <motion.button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isConverting}
            className={`p-2 rounded-full ${
              currentPage >= totalPages || isConverting
                ? 'opacity-40 cursor-not-allowed'
                : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`
            }`}
            title="Next Page"
            whileHover={currentPage < totalPages && !isConverting ? { scale: 1.1 } : {}}
            whileTap={currentPage < totalPages && !isConverting ? { scale: 0.95 } : {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Zoom controls */}
          <motion.button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50 || isConverting}
            className={`p-2 rounded-full ${
              zoomLevel <= 50 || isConverting
                ? 'opacity-40 cursor-not-allowed'
                : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`
            }`}
            title="Zoom Out"
            whileHover={zoomLevel > 50 && !isConverting ? { scale: 1.1 } : {}}
            whileTap={zoomLevel > 50 && !isConverting ? { scale: 0.95 } : {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </motion.button>

          <div className={`text-sm font-medium rounded-lg px-3 py-1 min-w-[70px] text-center ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {zoomLevel}%
          </div>

          <motion.button
            onClick={handleZoomReset}
            disabled={zoomLevel === 100 || isConverting}
            className={`text-xs px-2 py-1 rounded ${
              zoomLevel === 100 || isConverting
                ? 'opacity-40 cursor-not-allowed'
                : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'} transition-colors`
            }`}
            title="Reset Zoom"
            whileHover={zoomLevel !== 100 && !isConverting ? { scale: 1.05 } : {}}
            whileTap={zoomLevel !== 100 && !isConverting ? { scale: 0.95 } : {}}
          >
            Reset
          </motion.button>

          <motion.button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200 || isConverting}
            className={`p-2 rounded-full ${
              zoomLevel >= 200 || isConverting
                ? 'opacity-40 cursor-not-allowed'
                : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`
            }`}
            title="Zoom In"
            whileHover={zoomLevel < 200 && !isConverting ? { scale: 1.1 } : {}}
            whileTap={zoomLevel < 200 && !isConverting ? { scale: 0.95 } : {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className={`flex-grow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} overflow-auto pdf-viewer-container`}>
        {isConverting ? (
          <div className="flex items-center justify-center h-full">
            <div className={`text-center ${darkMode ? 'bg-gray-900' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-20 animate-ping"></div>
                <div className="relative flex items-center justify-center w-full h-full">
                  <div className="h-16 w-16 rounded-full border-4 border-blue-100 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
                </div>
              </div>
              <div className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
                Converting your document
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Please wait while we transform your document into a perfect PDF format...
              </div>
            </div>
          </div>
        ) : conversionError ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Conversion Failed
              </div>
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                {conversionError}
              </div>
              <motion.button
                onClick={onBack}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white text-sm rounded-lg shadow-md border border-gray-700"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Try Again
              </motion.button>
            </div>
          </div>
        ) : previewUrl ? (
          <div className="h-full w-full overflow-auto flex justify-center">
            {/* PDF container that handles overflow and positioning */}
            <div
              ref={pdfContainerRef}
              data-pdf-element="true"
              className={`relative ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl max-w-5xl w-full mx-auto rounded-md my-4 overflow-hidden`}
              style={{
                height: 'calc(100% - 2rem)',
                overflow: 'auto'
              }}
            >
              {/* Document decoration */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

              {/* This wrapper div applies the zoom transform */}
              <div
                ref={pdfViewerRef}
                className="pdf-content pt-8 pb-12 px-6"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s ease-out',
                  width: '100%',
                  height: 'auto',
                }}
              >
                <object
                  key={pdfKey}
                  ref={pdfObjectRef}
                  data={`${previewUrl}#page=${currentPage}`}
                  type="application/pdf"
                  className="w-full"
                  style={{
                    height: 'calc(100vh - 190px)',
                    display: 'block',
                    border: darkMode ? '1px solid rgba(75, 85, 99, 0.2)' : '1px solid rgba(229, 231, 235, 0.5)',
                    borderRadius: '0.375rem',
                    boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  aria-label="PDF Preview"
                  onLoad={(e) => {
                    // This ensures zoom works properly after PDF loads
                    if (pdfViewerRef.current) {
                      pdfViewerRef.current.style.transform = `scale(${zoomLevel / 100})`;
                    }
                  }}
                >
                  <div className="flex items-center justify-center h-full p-8">
                    <div className={`text-center p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
                      <div className="w-12 h-12 mx-auto mb-3 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        PDF preview not available in your browser.
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Please click the Download button to view the PDF.
                      </div>
                    </div>
                  </div>
                </object>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className={`text-center max-w-md mx-auto p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-2`}>
                Conversion Complete
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Your document has been successfully converted to PDF format.
                <br/>
                Click the Download button to save it to your device.
              </div>
              <motion.button
                onClick={handleDownload}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-lg shadow-md hover:shadow-blue-500/30 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewPane

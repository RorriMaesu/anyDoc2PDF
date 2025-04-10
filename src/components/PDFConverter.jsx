import React from 'react'
import { motion } from 'framer-motion'

const PDFConverter = ({ file, onConvert, isConverting }) => {
  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes) return '0 Bytes'
    
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }
  
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    
    switch (extension) {
      case 'doc':
      case 'docx':
        return (
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shadow-sm border border-blue-100 dark:border-blue-800/50">
            <svg className="text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
        )
      case 'xls':
      case 'xlsx':
        return (
          <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center shadow-sm border border-green-100 dark:border-green-800/50">
            <svg className="text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 8 9 8 11 10 11"></polyline>
            </svg>
          </div>
        )
      case 'ppt':
      case 'pptx':
        return (
          <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shadow-sm border border-orange-100 dark:border-orange-800/50">
            <svg className="text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <rect x="8" y="12" width="8" height="6" rx="1"></rect>
            </svg>
          </div>
        )
      case 'pdf':
        return (
          <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center shadow-sm border border-red-100 dark:border-red-800/50">
            <svg className="text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M9 15L12 12 15 15"></path>
              <path d="M12 12V18"></path>
            </svg>
          </div>
        )
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'tiff':
        return (
          <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shadow-sm border border-purple-100 dark:border-purple-800/50">
            <svg className="text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
            <svg className="text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
        )
    }
  }
  
  return (
    <div className="flex flex-col">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-start">
          {getFileIcon(file.name)}
          
          <div className="ml-4 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs sm:max-w-sm">
                  {file.name}
                </h3>
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatBytes(file.size)}</span>
                  <span className="mx-2">•</span>
                  <span>{file.type || 'Unknown type'}</span>
                </div>
              </div>
              
              <motion.button
                type="button"
                onClick={onConvert}
                className={`mt-4 sm:mt-0 btn ${isConverting ? 'btn-outline' : 'btn-primary'} sm:self-start`}
                whileHover={isConverting ? {} : { scale: 1.05 }}
                whileTap={isConverting ? {} : { scale: 0.95 }}
                disabled={isConverting}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isConverting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Converting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                    Convert to PDF
                  </div>
                )}
              </motion.button>
            </div>
            
            {isConverting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: '5%' }}
                    animate={{ 
                      width: ['5%', '30%', '65%', '85%', '95%'],
                    }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Processing document... please wait
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800/40">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">About the conversion</h3>
                <p className="mt-1 text-xs text-blue-700 dark:text-blue-400">
                  Your document will be converted with high quality formatting preserved. The conversion happens locally without uploading to any server.
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-100 dark:border-green-800/40">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Privacy protected</h3>
                <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                  Your document is processed entirely in your browser. We never upload or store your files on any server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFConverter

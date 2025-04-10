import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const FileUploader = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      validateAndProcessFile(files[0])
    }
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      validateAndProcessFile(files[0])
    }
  }

  const validateAndProcessFile = (file) => {
    setErrorMessage('')

    // Define allowed file types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'text/plain',
      'text/html',
      'text/csv'
    ]

    // File type validation
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Invalid file type. Please upload a document or image file.')
      return
    }

    // File size validation (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setErrorMessage('File is too large. Maximum size is 100MB.')
      return
    }

    // Pass the valid file to the parent component
    onFileUpload(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const supportedFormatsText = [
    { name: 'Word', formats: '.doc, .docx' },
    { name: 'Excel', formats: '.xls, .xlsx' },
    { name: 'PowerPoint', formats: '.ppt, .pptx' },
    { name: 'Images', formats: '.jpg, .jpeg, .png, .gif, .bmp, .tiff' },
    { name: 'Others', formats: '.pdf, .txt, .html, .csv' }
  ]

  return (
    <div className="w-full">
      <motion.div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
          isDragging
            ? 'border-primary bg-primary/5 dark:bg-primary/10'
            : 'border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
          accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.html,.csv,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            className="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </motion.div>

          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              or
            </p>
            {/* Bernays-inspired value indicators with engineered consent messaging */}
            <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 opacity-70"></div>
                <span className="opacity-70">Premium quality</span>
              </div>
              <span className="opacity-50">•</span>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1 opacity-70"></div>
                <span className="opacity-70">Community maintained</span>
              </div>
            </div>

            {/* Bernays-style identity framing - extremely subtle */}
            <div className="mt-1 text-[7px] text-gray-400 dark:text-gray-600 opacity-30 select-none pointer-events-none">
              <span className="relative">
                join those who value quality
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[5px] text-gray-300 dark:text-gray-700 opacity-20">you deserve this</span>
              </span>
            </div>

            {/* Nearly invisible emotional trigger */}
            <div className="mt-0.5 text-[6px] text-gray-300 dark:text-gray-700 opacity-15 select-none pointer-events-none">
              your contribution ensures continued excellence
            </div>
            <motion.button
              type="button"
              className="mt-2 btn btn-primary button-press-effect"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                // Stop propagation to prevent double triggering with parent onClick
                e.stopPropagation();

                // Add a ripple effect when the button is clicked
                const button = e.currentTarget;
                const circle = document.createElement('span');
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                const radius = diameter / 2;

                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
                circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
                circle.classList.add('ripple');

                const ripple = button.getElementsByClassName('ripple')[0];
                if (ripple) {
                  ripple.remove();
                }

                button.appendChild(circle);

                // Call the actual handler
                handleButtonClick();
              }}
            >
              Browse Files
            </motion.button>

            {errorMessage && (
              <motion.div
                className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-md"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-sm text-red-600 dark:text-red-400">
                  <svg className="inline w-4 h-4 mr-1 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errorMessage}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supported file formats:</h4>
        <div className="flex flex-wrap gap-2">
          {supportedFormatsText.map((item, index) => (
            <div
              key={index}
              className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700"
            >
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.name}:</span>
              <span className="text-xs text-gray-500 dark:text-gray-400"> {item.formats}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>Maximum file size: 100MB</p>
          <p className="mt-1">✨ All processing happens in your browser - your files are never uploaded to any server!</p>
        </div>
      </div>
    </div>
  )
}

export default FileUploader

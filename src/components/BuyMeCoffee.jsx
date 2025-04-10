import React from 'react'
import { motion } from 'framer-motion'

const BuyMeCoffee = () => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <a 
        href="https://www.buymeacoffee.com/rorrimaesu" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
        aria-label="Buy me a coffee"
      >
        <img 
          src="/anyDoc2PDF/images/capitalismsucksbutiamsuperpassionateaboutbeingabletoaffordfood.png" 
          alt="Buy me a coffee" 
          className="w-32 h-auto shadow-lg rounded-lg"
        />
      </a>
    </motion.div>
  )
}

export default BuyMeCoffee

import React from 'react'
import { motion } from 'framer-motion'

const FeatureShowcase = () => {
  const features = [
    {
      title: 'Lightning Fast',
      description: 'Convert documents in seconds with our optimized processing engine.'
    },
    {
      title: 'Secure & Private',
      description: 'Your files never leave your browser. All processing happens locally.'
    },
    {
      title: 'Professional Quality',
      description: 'Get pixel-perfect PDFs with preserved formatting and high-resolution output.'
    },
    {
      title: 'No Installation',
      description: 'Works directly in your browser. No downloads, plugins, or software required.'
    },
    {
      title: 'Batch Processing',
      description: 'Convert multiple files at once to save time on large projects.'
    },
    {
      title: 'Customization Options',
      description: 'Adjust quality, page size, and compression to meet your specific needs.'
    },
  ]

  return (
    <section id="features" className="py-16">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Powerful Features, <span className="text-primary-600 dark:text-primary-400">Simple to Use</span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Convert your documents to PDF with professional quality and advanced features.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="card hover:shadow-xl transition-all duration-300 border-l-4 border-primary-500 dark:border-primary-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="#"
          className="btn-primary px-6 py-3 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          <span>Try It Now</span>
        </a>
      </motion.div>
    </section>
  )
}

export default FeatureShowcase

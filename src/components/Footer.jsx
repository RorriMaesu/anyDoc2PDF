import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      ),
    }
  ]

  // Animation variants removed

  return (
    <footer className="relative bg-white dark:bg-gray-900 mt-12 sm:mt-20 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Premium decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-1/5 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

      {/* Premium background glow */}
      <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>

      <div className="relative container mx-auto px-4 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Logo & Description */}
          <motion.div
            className="col-span-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center">
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
                <span className="relative text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 text-transparent bg-clip-text px-1">
                  AnyDoc2PDF
                </span>
              </div>
            </div>
            <motion.p
              className="mt-6 text-base text-gray-600 dark:text-gray-300 max-w-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A premium, browser-based document conversion tool that transforms any document format into high-quality PDFs with perfect formatting.
            </motion.p>

            <motion.div
              className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-100/50 dark:border-blue-900/30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">100% Secure Conversion</h3>
                  <p className="mt-1 text-sm text-blue-700/80 dark:text-blue-400/80">Your files are processed in your browser and never uploaded to any server.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex space-x-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Footer Links removed */}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800/70">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xs">ADP</span>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  &copy; {currentYear} AnyDoc2PDF. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span className="inline-flex items-center">
                    <span className="relative">
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                      </span>
                      Powered by supporters
                    </span>
                    <a
                      href="https://www.buymeacoffee.com/rorrimaesu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-500 hover:text-blue-600 transition-colors underline"
                    >
                      Join them
                    </a>
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex flex-wrap justify-center space-x-5 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Made with precision</span>
              </span>
              <span>&middot;</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <span>&middot;</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <span>&middot;</span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>SSL Secured</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

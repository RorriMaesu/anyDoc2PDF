import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "AnyDoc2PDF saved me countless hours of work. I needed to convert hundreds of documents for a project, and this tool handled it flawlessly. The quality is indistinguishable from paid services.",
      author: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp Solutions",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      content: "I was skeptical about a free PDF converter, but AnyDoc2PDF exceeded my expectations. The conversion quality is excellent, and the interface is intuitive. It's now my go-to tool for all document conversions.",
      author: "Michael Chen",
      role: "Graphic Designer",
      company: "Creative Studios",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      id: 3,
      content: "As a small business owner, I appreciate tools that save me money without compromising quality. AnyDoc2PDF does exactly that. The batch processing feature is a game-changer for my workflow.",
      author: "Emma Rodriguez",
      role: "Founder",
      company: "Bright Ideas Consulting",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 4,
      content: "I've tried numerous PDF converters, both free and paid, and AnyDoc2PDF stands out for its simplicity and reliability. The fact that it's completely free is just the cherry on top.",
      author: "David Wilson",
      role: "IT Specialist",
      company: "Global Systems Inc.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 5,
      content: "The security aspect was crucial for me as I work with sensitive documents. Knowing that my files never leave my browser gives me peace of mind. Plus, the conversion quality is top-notch.",
      author: "Olivia Thompson",
      role: "Legal Assistant",
      company: "Thompson & Partners Law",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg"
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900/50 rounded-3xl my-8 sm:my-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of satisfied users who've discovered the power of AnyDoc2PDF
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div 
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-6 sm:p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            
            <svg className="text-primary-100 dark:text-primary-900/30 w-10 h-10 sm:w-12 sm:h-12 absolute top-6 sm:top-8 left-6 sm:left-8 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            
            <div className="relative z-10 ml-0 sm:ml-6 md:ml-10">
              <AnimatePresence mode="wait">
                <motion.blockquote 
                  key={testimonials[activeIndex].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 dark:text-white leading-relaxed mb-6 sm:mb-8"
                >
                  "{testimonials[activeIndex].content}"
                </motion.blockquote>
              </AnimatePresence>
              
              <div className="flex items-center">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].author}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 border-2 border-primary-500"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-primary-600 w-5' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

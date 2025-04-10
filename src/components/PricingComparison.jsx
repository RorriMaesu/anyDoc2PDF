import React from 'react'
import { motion } from 'framer-motion'

const PricingComparison = () => {
  const pricingPlans = [
    {
      name: 'AnyDoc2PDF',
      price: 'Free',
      popular: true,
      features: [
        { name: 'Convert documents to PDF', available: true },
        { name: 'All file formats supported', available: true },
        { name: 'High-quality conversion', available: true },
        { name: 'Local processing', available: true },
        { name: 'No watermarks', available: true },
        { name: 'Batch processing', available: true },
        { name: 'No file size limits', available: true },
        { name: 'No registration required', available: true },
        { name: 'Advanced options', available: true },
      ],
    },
    {
      name: 'Basic Online Services',
      price: '$5 - $10',
      price_note: 'per month',
      popular: false,
      features: [
        { name: 'Convert documents to PDF', available: true },
        { name: 'All file formats supported', available: false },
        { name: 'High-quality conversion', available: false },
        { name: 'Local processing', available: false },
        { name: 'No watermarks', available: false },
        { name: 'Batch processing', available: false },
        { name: 'No file size limits', available: false },
        { name: 'No registration required', available: false },
        { name: 'Advanced options', available: false },
      ],
    },
    {
      name: 'Premium Software',
      price: '$60 - $200',
      price_note: 'one-time',
      popular: false,
      features: [
        { name: 'Convert documents to PDF', available: true },
        { name: 'All file formats supported', available: true },
        { name: 'High-quality conversion', available: true },
        { name: 'Local processing', available: true },
        { name: 'No watermarks', available: true },
        { name: 'Batch processing', available: true },
        { name: 'No file size limits', available: true },
        { name: 'No registration required', available: false },
        { name: 'Advanced options', available: true },
      ],
    },
  ]

  return (
    <section id="pricing" className="py-12 sm:py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Pay When You Can Get It
            <span className="text-primary-600 dark:text-primary-400"> For Free?</span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Compare AnyDoc2PDF with other PDF conversion solutions to see why we're the best choice.
          </motion.p>
        </div>

        <div className="relative">
          {/* Pricing Table */}
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="grid grid-cols-4 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                {/* Header Row */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6">
                  <div className="h-full flex flex-col justify-end">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-2">Features</p>
                  </div>
                </div>
                {pricingPlans.map((plan, index) => (
                  <motion.div 
                    key={plan.name}
                    className={`relative bg-white dark:bg-gray-800 p-4 sm:p-6 ${plan.popular ? 'shadow-lg ring-2 ring-primary-500 dark:ring-primary-400 z-10 rounded-t-lg' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                        <div className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold py-1 px-4">
                          Recommended
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                      <div className="mt-2 sm:mt-4 flex items-baseline">
                        <span className={`text-2xl sm:text-3xl font-bold ${plan.popular ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>{plan.price}</span>
                        {plan.price_note && (
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{plan.price_note}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Feature Rows */}
                {pricingPlans[0].features.map((feature, featureIndex) => (
                  <React.Fragment key={feature.name}>
                    <div className="bg-white dark:bg-gray-800 p-4 sm:py-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{feature.name}</span>
                    </div>
                    {pricingPlans.map((plan, planIndex) => (
                      <motion.div 
                        key={`${plan.name}-${feature.name}`}
                        className="bg-white dark:bg-gray-800 p-4 sm:py-3 flex justify-center items-center border-t border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 * featureIndex + 0.1 * planIndex }}
                      >
                        {plan.features[featureIndex].available ? (
                          <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${plan.popular ? 'bg-primary-600 dark:bg-primary-400' : 'bg-green-500 dark:bg-green-400'}`}></div>
                        ) : (
                          <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        )}
                      </motion.div>
                    ))}
                  </React.Fragment>
                ))}

                {/* CTA Row */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="h-full flex items-end">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Make your choice</span>
                  </div>
                </div>
                {pricingPlans.map((plan, index) => (
                  <div 
                    key={`${plan.name}-cta`}
                    className={`bg-white dark:bg-gray-800 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 ${plan.popular ? 'rounded-b-lg' : ''}`}
                  >
                    <motion.button
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md hover:shadow-lg'
                          : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.popular ? 'Get Started Now' : plan.name === 'Basic Online Services' ? 'Compare Services' : 'View Options'}
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              <span className="font-semibold">AnyDoc2PDF</span> is and always will be free. No credit card required, no hidden fees, no subscriptions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PricingComparison

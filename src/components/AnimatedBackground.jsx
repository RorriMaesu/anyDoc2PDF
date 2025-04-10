import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Simple static gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400/5 via-violet-500/3 to-indigo-500/5 dark:from-blue-900/20 dark:via-violet-900/15 dark:to-indigo-900/20 pointer-events-none" />

      {/* Simple grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Simple glass effect */}
      <div className="fixed inset-0 bg-white/5 dark:bg-black/10 backdrop-blur-[80px] pointer-events-none opacity-20" />
    </div>
  )
}

export default AnimatedBackground

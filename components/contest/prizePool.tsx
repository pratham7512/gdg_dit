"use client"

import { motion } from "framer-motion"

export default function PrizePool() {
  return (
    <section className="min-h-1/2 bg-black text-white py-16 sm:py-24 font-geist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-8 sm:mb-12"
        >
          Prize Pool
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { place: "1st Place", prize: "₹10,000", delay: 0 },
            { place: "2nd Place", prize: "₹6,000", delay: 0.1 },
            { place: "3rd Place", prize: "₹4,000", delay: 0.2 },
          ].map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: prize.delay, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-lg p-6 sm:p-8 text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-lg sm:text-xl font-normal mb-4 font-mono">{prize.place}</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl mb-4">{prize.prize}</p>
              <p className="text-lg sm:text-xl font-normal font-mono text-white/60">+</p>
              <p className="text-lg sm:text-xl font-normal mb-4 font-mono text-white/80">Scrimba Pro Subscription</p>
              <div className="flex items-center gap-2 justify-center mt-4 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm">Provided by</p>
                <p className="text-sm font-mono">Scrimba</p>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DvxwIKlYRA7sgZrkQEKNjDa1bYSWnQ.png"
                  alt="Scrimba Logo"
                  className="size-5 rounded-sm"
                />
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


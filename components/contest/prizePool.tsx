"use client"

import { motion } from "framer-motion"

export default function PrizePool() {
  return (
    <section className="bg-black text-white py-12 sm:py-20 font-geist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-8 sm:mb-12"
        >
          Prize Pool
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {[
            { place: "1st Place", prize: "$5,000", delay: 0 },
            { place: "2nd Place", prize: "$3,000", delay: 0.1 },
            { place: "3rd Place", prize: "$1,000", delay: 0.2 },
          ].map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: prize.delay, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="border border-white/10 rounded-lg p-6 sm:p-8 text-center hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <h3 className="text-lg sm:text-xl font-normal mb-4 font-mono">{prize.place}</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl">{prize.prize}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

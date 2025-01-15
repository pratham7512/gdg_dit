"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import maskImg2 from "@/public/images/maskImage2.jpg"

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const scheduleItems = [
    {
      time: "10:00 AM - 11:30 AM",
      event: "MCQ Round",
      description: "Test your technical knowledge with our comprehensive multiple-choice questions."
    },
    {
      time: "12:00 PM - 2:00 PM",
      event: "Debug Challenge",
      description: "Fix and optimize code snippets against the clock."
    },
    {
      time: "2:30 PM - 5:30 PM",
      event: "DSA Contest",
      description: "Solve complex algorithmic problems and optimize for efficiency."
    }
  ]

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <section 
        ref={stickyRef}
        className="sticky top-0 h-screen bg-black text-white flex items-center font-geist z-20 overflow-hidden"
      >
        <Image
          src={maskImg2 || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.4)' }}
        />
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ opacity, scale }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-8 sm:mb-12"
          >
            Event Schedule
          </motion.h2>
          <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
            {scheduleItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ once: true, amount: 0.8 }}
                className="border border-white/10 rounded-lg p-4 sm:p-6 hover:border-white/20 transition-all duration-100 hover:translate-x-2 backdrop-blur-sm ease-in"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 ">
                    <time className="font-mono text-sm sm:text-base text-blue-200/80 whitespace-nowrap 
                                   px-4 py-1 rounded-full bg-white/5 border border-white/10">
                      {item.time}
                    </time>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-light text-white mb-2 
                                   tracking-wide">{item.event}</h3>
                      <p className="text-blue-100/70 font-light leading-relaxed">{item.description}</p>
                    </div> 
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}


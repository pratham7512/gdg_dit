"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import maskImg2 from "@/public/images/maskImage2.png"

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scheduleItems = [
    {
      time: "10:00 AM",
      event: "MCQ Round",
      description: "Test your technical knowledge with our comprehensive multiple-choice questions.",
      details:
        "This round will feature a mix of Data Structures, Algorithms, and Web Development questions. Be prepared to showcase your broad technical knowledge!",
    },
    {
      time: "12:00 PM",
      event: "Debug Challenge",
      description: "Fix and optimize code snippets against the clock.",
      details:
        "Choose between DSA or Web Development tracks. For DSA, debug code to pass test cases. For Web Dev, fix bugs in a base repository to achieve the desired output.",
    },
    {
      time: "2:30 PM",
      event: "DSA Contest",
      description: "Solve complex algorithmic problems and optimize for efficiency.",
      details:
        "Engage in an intense competitive programming contest. Tackle algorithmic challenges and optimize your solutions for the best performance.",
    },
  ]

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      <section
        ref={stickyRef}
        className="sticky top-0 h-screen bg-black text-white flex items-center font-geist z-20 overflow-hidden"
      >
        <Image
          src={maskImg2 || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover"
          style={{ filter: "brightness(0.3)" }}
        />
        <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ opacity, scale }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-normal text-center mb-6 sm:mb-8"
          >
            Event Schedule
          </motion.h2>
          <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
            {scheduleItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.8 }}
                className="border border-white/10 rounded-md hover:border-white/20 transition-all duration-200 backdrop-blur-sm ease-in overflow-hidden"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <time
                      className="font-mono text-xs sm:text-sm text-blue-200/80 whitespace-nowrap 
                                    px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                    >
                      {item.time}
                    </time>
                    <motion.div animate={{ rotate: hoveredIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-white/70" />
                    </motion.div>
                  </div>
                  <h3 className="text-base sm:text-lg font-light text-white mt-2 mb-1 tracking-wide">{item.event}</h3>
                  <p className="text-xs sm:text-sm text-blue-100/70 font-light leading-relaxed">{item.description}</p>
                </div>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-white/5 border-t border-white/10"
                    >
                      <div className="p-3 sm:p-4 text-xs sm:text-sm text-blue-100/60 font-light leading-relaxed">
                        {item.details}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}


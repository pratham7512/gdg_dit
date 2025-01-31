"use client"

import { useState, useRef } from "react"
import { ChevronDown } from 'lucide-react'
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import faq from "@/public/images/maskImage3.jpg"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1,1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 0.95])

  const faqs = [
    {
      question: "What is Hack-a-bit Challenge?",
      answer:
        "Hack-a-bit Challenge is an offline coding competition held at the DIT campus that tests participants' skills through multiple rounds including MCQs, debugging, and algorithmic problem-solving.",
    },
    {
      question: "How can I participate?",
      answer:
        "Register through our website and you'll receive detailed instructions via email about attending the event on the day of the competition.",
    },
    {
      question: "What other information should I know before participating?",
      answer:
        "In addition to the technical requirements, make sure to review the event schedule, familiarize yourself with the competition format, and prepare any necessary materials or tools you may need during the event.",
    },
    {
      question: "How will I be evaluated?",
      answer:
        "Each round has specific evaluation criteria. MCQs are automatically graded, debug challenges are evaluated based on correctness and optimization, and DSA problems consider both solution correctness and time complexity.",
    },
    {
      question: "On which languages will the MCQs be based?",
      answer:
        "The MCQs will cover basic programming concepts in C++, Python, and JavaScript.",
    }
  ]

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      <section 
        ref={stickyRef}
        className="sticky top-0 bg-black text-white font-geist min-h-screen flex items-between"
      >
        <div className="w-full flex flex-col lg:flex-row justify-between ">
          <motion.div 
            className="w-full flex flex-col justify-center mt-24 md:mt-4"
            style={{ opacity, scale }}
          >
            <motion.h2 
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-normal mb-8 sm:mb-12 mx-4"
            >
              FAQ&apos;s
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-4 w-full mx-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-white/5 transition-colors duration-300"
                  >
                    <span className="text-lg  font-normal">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 text-md text-white/70">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Image only shows on larger screens */}
          <div className="hidden lg:block w-full h-screen">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full relative"
            >
              <Image 
                src={faq} 
                alt="FAQ illustration" 
                className="object-cover object-center"
                fill
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}


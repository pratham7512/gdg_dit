"use client"

import Header from "@/components/components/Header"
import Footer from "@/components/components/Footer"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

import { motion, AnimatePresence } from "framer-motion"

export default function QuizLandingPage() {

  const [activeSection, setActiveSection] = useState("intro")
  const [isLive, setIsLive] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)

  const languages = ["C", "Python", "C++", "Java"]

  const quizSections = [
    [
      { id: "#include <stdio.h>", title: "#include <stdio.h>" },
      { id: "int main() {", title: "int main() {" },
      { id: "  printf(\"Hello, everyone!\\n\");", title: "  printf(\"Hello, World!\\n\");" },
      { id: "  printf(\"Welcome to hack-a-bit!\\n\");", title: "  printf(\Welcome to hack-a-bit!\\n\");" },
      { id: "  return 0;", title: "  return 0;" },
      { id: "}", title: "}" },
    ],
    [
      { id: "import sys", title: "import sys" },
      { id: "def main():", title: "def main():" },
      { id: "  print('Hello, everyone!')", title: "  print('Hello, World!')" },
      { id: "  print('Welcome to hack-a-bit!')", title: "  print('Welcome to hack-a-bit!')" },
      { id: "if __name__ == '__main__':", title: "if __name__ == '__main__':" },
      { id: "  main()", title: "  main()" },
    ],
    [
      { id: "#include <iostream>", title: "#include <iostream>" },
      { id: "int main() {", title: "int main() {" },
      { id: "  std::cout << 'Hello, everyone!' << std::endl;", title: "  std::cout << 'Hello, World!' << std::endl;" },
      { id: "  std::cout << 'Welcome to hack-a-bit!' << std::endl;", title: "  std::cout << 'Welcome to hack-a-bit!' << std::endl;" },
      { id: "  return 0;", title: "  return 0;" },
      { id: "}", title: "}" },
    ],
    [
      { id: "public class Main {", title: "public class Main {" },
      { id: "  public static void main(String[] args) {", title: "  public static void main(String[] args) {" },
      { id: "  public static void main(String[] args) {", title: "  public static void main(String[] args) {" },
      { id: "    System.out.println('Hello, everyone!');", title: "    System.out.println('Hello, World!');" },
      { id: "    System.out.println('Welcome to hack-a-bit!');", title: "    System.out.println('Hello, World!');" },
      { id: "  }", title: "  }" },
      { id: "}", title: "}" },
    ],
  ]

  useEffect(() => {
    const checkIfLive = () => {
      const eventDate = new Date("2025-02-01T04:30:00Z") // 8:00 PM IST
      //2025-02-01T08:30:00Z
      const now = new Date()
      setIsLive(now >= eventDate)
    }

    checkIfLive()
    const timer = setInterval(checkIfLive, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setVisibleLines(0)
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < quizSections[currentLanguage].length - 1) {
          return prev + 1
        } else {
          clearInterval(lineInterval)
          setTimeout(() => {
            setCurrentLanguage((prev) => (prev + 1) % languages.length)
          }, 3000) // Wait for 2 seconds before changing language
          return prev
        }
      })
    }, 100) // Reveal a new line every second

    return () => clearInterval(lineInterval)
  }, [currentLanguage])

  return (
    <div className="min-h-screen overflow-hidden bg-black bg-grid-white/[0.090] font-mono">
      <Header />
      <main className="container mx-auto px-4 py-20 md:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Hack-a-bit 2025
            </h2>
            <nav className="h-[250px] overflow-hidden">
              {" "}
              {/* Fixed height */}
              <AnimatePresence mode="wait">
                <motion.div key={currentLanguage} initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
                  {quizSections[currentLanguage].map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: index <= visibleLines ? 1 : 0, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setActiveSection(section.id)}
                      className={`block text-left py-2 w-full ${
                        activeSection === section.id ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      {section.title}
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </nav>
            <p className="text-gray-300 mb-5">
              2024 has been a big year for programming. Test your knowledge with our comprehensive quiz.
            </p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc87Jt8MZLLAQugW4GXcqXp6K0s0KTNee1ysOTzE1IfZCTcog/viewform?embedded=true">
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 mt-10 rounded-none">
                START QUIZ
              </Button>
            </a>
          </div>
          <div className="w-full lg:w-2/3 bg-blue-600 p-6 md:p-8 relative">
            <div className="mb-4">
              <span className="bg-blue-500 text-xs font-semibold px-2 py-1">QUIZ 2024</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Hack-a-bit 2025
            </h2>
            <div className="space-y-2 mb-6 text-white">
              <p className="text-sm md:text-base lg:text-lg">Date: 1 February 2025</p>
              <p className="text-sm md:text-base lg:text-lg">Time: 10:00 AM</p>
              <p className="text-sm md:text-base lg:text-lg">Mode: Online (Google Forms)</p>
              <p className="text-sm md:text-base lg:text-lg">Event: Hack-a-bit</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="hover:bg-blue-700 border border-dashed border-white px-4 py-2 text-white">
                <p className="font-semibold">45 Questions</p>
                <p className="text-xs md:text-sm">Covering all aspects of programming</p>
              </div>
              <div className="hover:bg-blue-700 border border-dashed border-white px-4 py-2 text-white">
                <p className="font-semibold">30 Minutes</p>
                <p className="text-xs md:text-sm">Time to complete</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-20 px-2 mx-2 py-1 mt-6">
              <span className="text-xs md:text-sm text-white">{isLive ? "🔴 Live" : "Starting soon..."}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


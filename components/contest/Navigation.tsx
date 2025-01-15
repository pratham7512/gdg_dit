"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import gdg from "@/public/images/gdgLogo.png"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const navItems = ["overview", "rounds", "prizes", "schedule", "sponsors"]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/10 shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between sm:h-16 h-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-primary"
          >
            <Image src={gdg} width={50} height={50} alt="GDG Logo" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => scrollToSection(item)}
                className="text-sm text-gray-300 hover:text-primary transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden fixed top-4 right-4 z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Register Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block"
          >
            <Button
              onClick={() => scrollToSection("register")}
              className="bg-primary hover:bg-primary/80 text-black"
            >
              Register Now
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/40 backdrop-blur-lg fixed inset-0 flex flex-col"
            >
              <div className="flex flex-col justify-center items-center h-full space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-center text-gray-300 hover:text-primary py-2 transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
                <Button
                  onClick={() => scrollToSection("register")}
                  className="w-2/3 bg-primary hover:bg-primary/80 text-black mt-4"
                >
                  Register Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation
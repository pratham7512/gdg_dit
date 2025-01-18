"use client"

import { Button } from "../ui/button"
import FluidCursor from "./fluid-cursor"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import logo from "@/components/assets/GDSC-logo.svg"
import maskImg from "@/public/images/maskImage1.jpg"

export default function Hero() {
    const [onHover, setOnHover] = useState(false)
    const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null)

    const handleInteraction = useCallback(() => {
        if (mouseTimer) {
            clearTimeout(mouseTimer)
        }
        
        setOnHover(true)
        
        const timer = setTimeout(() => {
            setOnHover(false)
        }, 1000)
        
        setMouseTimer(timer)
    }, [mouseTimer])

    useEffect(() => {
        return () => {
            if (mouseTimer) {
                clearTimeout(mouseTimer)
            }
        }
    }, [mouseTimer])

    return (
        <div 
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" 
            onMouseMove={handleInteraction}
        >
            <div 
                className={`absolute inset-0 bg-cover bg-center transition-all ease-in-out ${
                    onHover ? 'opacity-0 scale-90 duration-10' : 'opacity-60 scale-105 duration-1000'
                }`}
                style={{ 
                    backgroundImage: `url(${maskImg.src})`,
                    willChange: 'opacity, transform',
                }}
            />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 text-center z-10"
            >  
                <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <span className="flex items-center justify-center backdrop-blur-xl bg-background/10 rounded-full w-auto px-6 py-3 mb-12 border border-white/10 shadow-glow">
                        <Image src={logo || "/placeholder.svg"} alt="" width={40} height={40} className="mr-3 w-auto h-8 md:h-10"/>
                        <p className="text-lg md:text-2xl font-medium tracking-tight text-primary/90">
                            GDG DIT
                        </p>
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                        Hack-a-bit 2025
                    </h1>

                    <p className="text-lg md:text-2xl mb-8 font-mono text-foreground/80 tracking-tight leading-relaxed">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            February 1, 2025 • DIT Pimpri, Pune
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="inline-block ml-2"
                        >
                            <span className="text-primary font-semibold">50k+</span> prizepool
                        </motion.span>
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/80 text-background text-lg px-8 py-6 font-mono 
                                     transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/20
                                     border border-primary/20"
                        >
                            Register Now
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            <FluidCursor />
        </div>
    )
}


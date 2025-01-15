import { Button } from "../ui/button";
import FluidCursor from "./fluid-cursor";
import maskImg2 from "@/public/images/maskImage1.jpg"
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import logo from "@/components/assets/GDSC-logo.svg"
export default function Hero(){
    const [onHover, setOnHover] = useState(false);
    const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);

    const handleMouseMove = useCallback(() => {
        if (mouseTimer) {
            clearTimeout(mouseTimer);
        }
        
        setOnHover(true);
        
        const timer = setTimeout(() => {
            setOnHover(false);
        }, 1000); 
        
        setMouseTimer(timer);
    }, [mouseTimer]);

    // Cleanup timer on component unmount
    useEffect(() => {
        return () => {
            if (mouseTimer) {
                clearTimeout(mouseTimer);
            }
        };
    }, [mouseTimer]);

    return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" 
        onMouseMove={handleMouseMove}
    >
        <div 
            className={`absolute inset-0 bg-cover bg-center transition-all  ease-in-out ${
                onHover ? 'opacity-0 scale-90 duration-10' : 'opacity-60 scale-105 duration-1000'
            }`}
            style={{ 
                backgroundImage: `url(${maskImg2.src})`,
                willChange: 'opacity, transform',
            }}
        />
        
        <div className="container mx-auto px-4 text-center z-10">  
            <span className="flex items-center justify-center">
                <Image src={logo} alt="" width={60} className="mr-2"/>
                <p className="text-2xl font-medium font-geist md:text-4xl text-primary/90 text-center">
                    GDG DIT
                </p>
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans mb-4">
                CodeMaster Challenge
                <span className="block text-primary mt-2">2025</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-mono text-foreground/80">
                February 1, 2025 • DIT Pimpri, Pune . 20k+ prizepool
            </p>
            <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-background text-lg px-8 py-6 font-mono animate-float"
            >
                Register Now
            </Button>
            <FluidCursor />
        </div>

    </div>
    )
}
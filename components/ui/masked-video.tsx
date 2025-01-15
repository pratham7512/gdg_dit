"use client";
 
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";

export default function MaskedVideo({ imageSrc }: { imageSrc: StaticImageData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const clipPathProgress = useTransform(scrollYProgress, [0, 0.5], [20, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] z-20">
      <div
        ref={stickyRef}
        className="top-0 sticky flex justify-center items-center w-full h-screen"
      >
        <div className="relative w-full h-full aspect-square">
          {/* Quote Overlay */}
          <motion.div 
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{
              opacity: textOpacity,
              y: textY
            }}
          >
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-serif text-white leading-relaxed tracking-wider"
                 style={{
                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                   fontFamily: '"Playfair Display", serif'
                 }}>
                &ldquo;Unleash Excellence,
                <br />
                Code Beyond Reality&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            className="w-full h-full"
            style={{
              clipPath: useTransform(
                clipPathProgress,
                (value: number) => `circle(${value}% at 50% 50%)`
              ),
            }}
          >
            <Image
              className="absolute inset-0 rounded-lg w-full h-full object-cover"
              src={imageSrc}
              alt=""
              width={3840} 
              height={2160}
            />
          </motion.div>
          <div
            className="bottom-0 z-[10] absolute w-full h-[370px] translate-y-[5px]"
            style={{
              maskImage: "linear-gradient(transparent, black 85%)",
              backgroundColor: "rgb(12, 12, 12)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
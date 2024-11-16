"use client";

import {
  motion,
} from "framer-motion";
import Image from "next/image";
import React, {useRef} from "react";
import GDSC from "@/components/assets/GDSC-logo.svg"
import { collabApps } from "@/constants";
import { LeftCurve } from "../design/Collaboration";
interface TimelineEntry {
  name: string;
  role: string;
  image: string;
}

export const Team = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start 10%", "end 50%"],
  // });


  return (
    <div
      className="pt-16 w-full bg-background bg-grid-white/[0.050] text-foreground font-sans py-10"
      ref={containerRef}
    >
      <div className="fixed pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)]"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-10">
          <div className="flex flex-col items-start gap-6 mb-6 lg:mb-0">
            {/* <div className="flex items-center py-8 justify-start">
              <Image src={GDSC} alt="GDSC Logo" className="w-[90px] h-[90px]" />
              <h2 className="text-lg font-bold md:text-4xl text-foreground max-w-4xl ml-4">
                Google Developer Groups DIT
              </h2>
            </div> */}
            <div className="pl-2 z-10 relative">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Meet our team of <span className="italic">creators</span>,{" "}
              <span className="italic">designers</span>, and world-class{" "}
              <span className="italic">problem solvers</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              To be the company our customers want us to be, it takes an{" "}
              <span className="italic">eclectic group</span> of passionate operators. Get to know the people{" "}
              <span className="italic">leading the way</span> at Untitled.
            </p>
            </div>
          </div>
          <div className="hidden lg:block lg:ml-auto xl:w-[30rem] mt-4">
            <motion.div
              className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
                <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                  <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                    <Image
                      src={GDSC}
                      width={48}
                      height={48}
                      alt="AI platform logo"
                    />
                  </div>
                </div>
              </div>

              <motion.ul>
                {collabApps.map((app, index) => (
                  <motion.li
                    key={app.id}
                    className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${index * 45}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div
                      className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${index * 45}`}
                    >
                      <Image
                        className="m-auto"
                        width={app.width}
                        height={app.height}
                        alt={app.title}
                        src={app.icon}
                      />
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
              <LeftCurve />
            </motion.div>
          </div>
        </div>
        <div ref={ref} className="relative mx-auto mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {data.map((member) => (
              <div key={member.name} className="space-y-4">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {member.name === "Phoenix Baker" ? (
                        <g>
                          {[...Array(12)].map((_, i) => (
                            <line
                              key={i}
                              x1="50"
                              y1="50"
                              x2="100"
                              y2="50"
                              stroke="currentColor"
                              strokeWidth="0.5"
                              transform={`rotate(${i * 30} 50 50)`}
                            />
                          ))}
                        </g>
                      ) : (
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      )}
                    </svg>
                  </div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-gray-600 italic">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
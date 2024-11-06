"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import GDSC from "@/components/assets/GDSC-logo.svg"
import { collabApps } from "@/constants";
import { LeftCurve} from "../design/Collaboration";
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Team = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-background bg-grid-white/[0.030] text-foreground font-sans md:px-10 py-10"
      ref={containerRef}
    >
      <div className="fixed pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)]"></div>
      <div className="flex justify-between max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-10">
        <div className="flex flex-col items-start gap-6 mb-6">
          <div className="flex items-center py-8 justify-start">
              <Image src={GDSC} alt="GDSC Logo" className="w-[90px] h-[90px]" />
              <h2 className="text-lg font-bold md:text-4xl text-foreground max-w-4xl ml-4">
                  Google Devloper Groups DIT
              </h2>
          </div>
          <div className="pl-2">
            <h2 className="text-md md:text-4xl mb-4 text-foreground max-w-4xl">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl">
              Get to know the dedicated members of Google Developer Groups DIT who work together to foster learning and innovation in our community.
            </p>
          </div>
        </div>
        <div className="hidden md:block lg:ml-auto xl:w-[30rem] mt-4">
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

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-muted border-border border p-2" />
              </div>
              <h3 className="hidden md:block text-md md:pl-20 md:text-3xl font-bold text-muted-foreground">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-muted-foreground">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

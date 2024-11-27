import Button from "./Button";
import Section from "./Section";


import { useRef } from "react";
import { curve } from "../assets";
import { useScroll } from "framer-motion";
import Image from 'next/image';

const HeroRoadmap = () => {
    const parallaxRef = useRef(null);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  
  console.log(scrollYProgress);
  return (
    <>
        <Section
      className="pt-[12rem] -mt-[5.25rem]"
   
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
           Roadmaps with&nbsp;GDG&nbsp;{` `}
            <span className="inline-block relative">
              Community{" "}
              <Image
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Join a global network of developers and GDG provide a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.
            </p>
        </div>
        

        {/* <CompanyLogos className="hidden relative z-10 mt-20 lg:block" /> */}
      </div>

    </Section>
    </>
  )
}

export default HeroRoadmap
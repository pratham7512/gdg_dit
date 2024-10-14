import { curve, heroimg2, gradient } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "../design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Notification from "./Notification";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from 'next/image';

const Hero: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [1, 0], [1.2, 0.9]);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Unlock Your Potential with&nbsp;GDG&nbsp;{` `}
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
            Join a global network of developers and innovators, sharpen your skills, and work on real-world projects.
          </p>
          <Button href="/join-us">
            Contact Us
          </Button>
        </div>
        <motion.div className="relative z-10 max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <motion.div className="relative z-2 p-0.5 rounded-2xl bg-conic-gradient" style={{ scale }} ref={targetRef}>
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <Image
                  src={heroimg2}
                  className="w-full scale-[1.5] translate-y-[7%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[20%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <Image src={icon} width={24} height={25} alt={`icon-${index}`} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Connect & Collaborate"
                  />
                </ScrollParallax>
              </div>
            </div>

            <Gradient />
          </motion.div>
          <div className="absolute -top-[44%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[42%] md:w-[138%] lg:-top-[80%]">
            <Image
              src={gradient}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles parallaxRef={parallaxRef} />
        </motion.div>

        {/* <CompanyLogos className="hidden relative z-10 mt-20 lg:block" /> */}
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;

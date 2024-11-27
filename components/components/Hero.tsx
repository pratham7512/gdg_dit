import { curve} from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles} from "../design/Hero";
// import { heroIcons } from "../../constants";
// import { ScrollParallax } from "react-just-parallax";
import { useRef, useEffect, useState } from "react";
// import Notification from "./Notification";
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

  const texts = [
    "Explore GDG-dit and its amazing community.",
    "Join us to innovate and collaborate.",
    "Be part of the future with GDG-dit!",
  ];
  
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 90; // Typing speed
  const deletingSpeed = 90; // Deleting speed

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText === currentText) {
          setIsDeleting(true);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-20 relative max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className=" text-3xl font-bold lg:h1 mb-6 ">
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
        <motion.div className="relative z-2 max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <motion.div className="relative z-2 rounded-2xl flex justify-center" style={{ scale }} ref={targetRef}>
            <div className="w-full aspect-[16/9] bg-black rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="flex items-center px-3 py-3 bg-zinc-900 border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
              <div className="p-4 font-mono text-sm h-96 overflow-auto">
                <pre className="whitespace-pre-wrap text-xl text-white leading-relaxed">
                {"Welcome to the Google Developers Group Terminal!\n\n$ ls\nprojects  workshops  events  resources\n\n$ cat about.txt\nJoin us to explore cutting-edge technologies,\nattend workshops, and collaborate on exciting projects.\nLet's innovate together!\n\n"}
                {displayText}
                  <span className="animate-blink">█</span>
                </pre>
              </div>
            </div>
            <style jsx>{`
              @keyframes blink {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
              }
              .animate-blink {
                animation: blink 1s infinite;
              }
            `}</style>
          </motion.div>
          <BackgroundCircles parallaxRef={parallaxRef} />
        </motion.div>
        {/* <CompanyLogos className="hidden relative z-10 mt-20 lg:block" /> */}
      </div>
    </Section>
  );
};

export default Hero;

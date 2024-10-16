import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";
import { quote, cloudrepo, codesvg, conversation, medal } from "../assets/index";
import { motion } from "framer-motion";
// import PlusSvg from "../assets/svg/PlusSvg";
import Image from "next/image";

export const Gradient: React.FC = () => {
  return (
    <>
      <div className="relative z-2 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
      <div className="relative z-2 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
    </>
  );
};

export const BottomLine: React.FC = () => {
  return (
    <>
      <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block" />
    </>
  );
};

const Rings: React.FC = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};

interface BackgroundCirclesProps {
  parallaxRef: React.RefObject<HTMLDivElement>;
}

export const BackgroundCircles: React.FC<BackgroundCirclesProps> = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants for orbiting icons
  const orbitAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 14,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  const orbitAnimation1 = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 13,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  const orbitAnimation2 = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  const orbitAnimation3 = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 11,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  const orbitAnimation4 = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]">
      <Rings />

      {/* Moving background colored circle balls */}
      <MouseParallax strength={0.09} parallaxContainerRef={parallaxRef}>
        {/* Cloudrepo Icon */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-0.25 h-[35%] origin-bottom rotate-[46deg]"
          variants={orbitAnimation1}
          initial="initial"
          animate="animate"
        >
          <div
            className={`w-20 h-20 -ml-1 -mt-32 bg-transparent rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Image src={cloudrepo} width={70} height={70} alt="Cloudrepo" className="-rotate-[46deg]" />
          </div>
        </motion.div>

        {/* Quote Icon */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-0.25 h-[5.5%] origin-bottom -rotate-[56deg]"
          variants={orbitAnimation4}
          initial="initial"
          animate="animate"
        >
          <div
            className={`w-10 h-10 -ml-1 -mt-32 bg-transparent rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Image src={quote} width={70} height={70} alt="Quote" className="rotate-[56deg]" />
          </div>
        </motion.div>

        {/* Conversation Icon */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-0.25 h-[43%] origin-bottom rotate-[54deg]"
          variants={orbitAnimation}
          initial="initial"
          animate="animate"
        >
          <div
            className={`w-15 h-15 -ml-1 -mt-32 bg-transparent rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Image src={conversation} width={70} height={70} alt="Conversation" className="-rotate-[54deg]" />
          </div>
        </motion.div>

        {/* Code Icon */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-0.25 h-[25%] origin-bottom -rotate-[60deg]"
          variants={orbitAnimation2}
          initial="initial"
          animate="animate"
        >
          <div
            className={`w-15 h-15 -ml-1 -mt-32 bg-transparent rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Image src={codesvg} width={70} height={70} alt="Code" className="rotate-[60deg]" />
          </div>
        </motion.div>

        {/* Medal Icon */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-0.25 h-[14.5%] origin-bottom -rotate-[70deg]"
          variants={orbitAnimation3}
          initial="initial"
          animate="animate"
        >
          <div
            className={`w-15 h-15 -ml-1 -mt-32 bg-transparent rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Image src={medal} width={70} height={70} alt="Medal" className="rotate-[70deg]" />
          </div>
        </motion.div>
      </MouseParallax>
    </div>
  );
};

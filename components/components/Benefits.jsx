import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { benefits } from "../../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "../design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import Image from "next/image";

// Wrap Image component with motion
const MotionImage = motion(Image);

const Benefits = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax effect
  const yOffset = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  return (
    <Section id="features" ref={ref}>
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Elevate Your Skills with GDSC"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((item, index) => (
            <motion.div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: false }}
            >
              <motion.div
                className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none"
                style={{ y: yOffset }}
              >
                <motion.h5
                  className="h5 mb-5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: false }}
                >
                  {item.title}
                </motion.h5>

                <motion.p
                  className="body-2 mb-6 text-n-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: false }}
                >
                  {item.text}
                </motion.p>

                <div className="flex items-center mt-auto">
                  <MotionImage
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                    style={{ y: yOffset }}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </motion.div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-black"
                style={{ clipPath: "url(#benefits)" }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10"
                  whileHover={{ scale: 1.05, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: false }}
                >
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </div>

              <ClipPath />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;

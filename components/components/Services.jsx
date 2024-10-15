import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "../assets";
import { gdscServices, brainwaveServicesIcons } from "../../constants";
import { PhotoChatMessage, Gradient, VideoChatMessage } from "../design/Services";
// import Generating from "./Generating";
import Image from "next/image";

const MotionImage = motion(Image);
const Services = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

  // Set up transforms for parallax and spring animations
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const smoothOpacity = useSpring(opacity, { damping: 15, stiffness: 100 });
  const smoothTranslate = useSpring(yTranslate, { damping: 10, stiffness: 80 });

  return (
    <Section id="how-to-use" ref={targetRef}>
      <div className="container">
        <motion.div style={{ opacity: smoothOpacity, y: smoothTranslate }}>
          <Heading
            title="Empowering Innovation Across Disciplines"
            text="Our GDSC Bot connects you to event info, club members, and AI-powered tools for enhanced productivity and creativity."
          />
        </motion.div>

        <div className="relative">
          <motion.div
            className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]"
            style={{ opacity: smoothOpacity, y: smoothTranslate }}
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <MotionImage
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover md:object-right"
                width={800}
                height={730}
                alt="Empowering Tech"
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">Tech Workshops & Support</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Our GDSC Bot provides real-time info on workshops, training, and tech support to keep you updated on our latest initiatives.
              </p>
              <ul className="body-2">
                {gdscServices.map((item, index) => (
                  <li key={index} className="flex items-start py-4 border-t border-n-6">
                    <Image width={24} height={24} src={check} alt="check" />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div className="relative z-1 grid gap-5 lg:grid-cols-2" style={{ y: smoothTranslate }}>
            <motion.div
              className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0">
                <Image
                  src={service2}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="AI Photo Enhancements"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">AI-Powered Bot</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Use Our bot to know about events also contact us, bringing your creative work to life!
                </p>
              </div>

              <PhotoChatMessage />
            </motion.div>

            <motion.div
              className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Community Help</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  Use our GDSC Bot for instant help and know more about us also you can share new ideas and get for your projects.
                </p>

                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className={`rounded-2xl flex items-center justify-center ${
                        index === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <Image src={item} width={24} height={24} alt={item} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <Image
                  src={service3}
                  className="w-full h-full object-cover"
                  width={520}
                  height={400}
                  alt="AI Video Tool"
                />

                <VideoChatMessage />
                
              </div>
            </motion.div>
          </motion.div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;

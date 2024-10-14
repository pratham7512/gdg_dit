import { GDSCLogo, check } from "../assets";
import { collabApps, collabContent, collabText } from "../../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "../design/Collaboration";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Collaboration = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Scroll animation transforms
  const yOffset = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <Section ref={ref}>
      <div className="container lg:flex">
        <div className="max-w-[40rem]">
          <motion.h2
            className="h2 mb-4 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Unleash Innovation Through Collaborative Learning and Support
          </motion.h2>

          <motion.ul
            className="max-w-[22rem] mb-10 md:mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {collabContent.map((item, index) => (
              <motion.li
                className="mb-3 py-3"
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="flex items-center">
                  <Image src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </motion.li>
            ))}
          </motion.ul>

          <Button href="/try-now">Start Now</Button>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <motion.p
            className="body-2 mb-4 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {collabText || ""}
          </motion.p>

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
                    src={GDSCLogo}
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
            <RightCurve />
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;

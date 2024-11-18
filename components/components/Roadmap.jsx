// import {  useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import { InfiniteMovingCards } from "../ui/infiniteCards";
// import Tagline from "./Tagline";
// import { roadmap } from "../../constants";
// import { check2, grid, loading1 } from "../assets";
// import { Gradient } from "../design/Roadmap";
// import Image from "next/image";

// const MotionImage = motion(Image);

const Roadmap = () => {
  const targetRef = useRef(null);
  const events = [
    {
      id: 1,
      name: "Tech Talk 2023",
      description: "A series of insightful discussions on emerging technologies and their impact on our future.",
      images: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMHRhbGt8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2glMjB0YWxrfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2glMjB0YWxrfGVufDB8fDB8fHww"
      ]
    },
    {
      id: 2,
      name: "Hackathon Spring 2023",
      description: "A 48-hour coding marathon where students collaborated to solve real-world problems.",
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFja2F0aG9ufGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFja2F0aG9ufGVufDB8fDB8fHww"
      ]
    },
    {
      id: 3,
      name: "Workshop: Intro to AI",
      description: "An interactive session introducing the basics of Artificial Intelligence and Machine Learning.",
      images: [
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D"
      ]
    }
  ]
  // const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

  // Set up transforms for parallax and fade animations
  // const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // const yTranslate2 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Adjust for subtle parallax effect
  //const opacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 1, 1, 1]); // Fade-in effect
  // const smoothOpacity = useSpring(opacity, { damping: 20, stiffness: 100 });
  // const smoothTranslate = useSpring(yTranslate, { damping: 15, stiffness: 80 });

  return (
    <Section className="overflow-hidden" id="roadmap" ref={targetRef}>
      <div className="container md:pb-10">
        <Heading tag="Relive the Highlights" title="A Glimpse into Our Past Events" />
        <InfiniteMovingCards events={events} />

        {/* <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
          {roadmap.map((item) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <motion.div
                className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                  item.colorful ? "bg-conic-gradient" : "bg-n-6"
                }`}
                key={item.id}
                style={{ opacity: smoothOpacity }}
                initial={{ opacity: 1, scale: 0.95,y:100 }}
                whileInView={{ opacity: 1, scale: 1,y:0}}
                transition={{ duration: 0.6 }} // Apply animations here
              >
                <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
                  <div className="absolute top-0 left-0 max-w-full">
                    <MotionImage
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full"
                      src={grid}
                      width={550}
                      height={550}
                      alt="Grid"
                    />
                  </div>
                  <div className="relative z-1">
                    <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                      <Tagline>{item.date}</Tagline>

                      <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
                        <MotionImage
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                          className="mr-2.5"
                          src={item.status === "done" ? check2 : loading1}
                          width={16}
                          height={16}
                          alt={status}
                        />
                        <div className="tagline">{status}</div>
                      </div>
                    </div>

                    <div className="mb-10 -my-10 -mx-15">
                      <MotionImage
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                        className="w-full"
                        src={item.imageUrl}
                        width={628}
                        height={426}
                        alt={item.title}
                      />
                    </div>
                    <h4 className="h4 mb-4">{item.title}</h4>
                    <p className="body-2 text-n-4">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <Gradient />
        </div> */}

        <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">
          <Button href="/events">Upcoming Events</Button>
        </div>
      </div>
    </Section>
  );
};

export default Roadmap;

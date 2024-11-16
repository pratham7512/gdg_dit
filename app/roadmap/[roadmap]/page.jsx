"use client"
import ButtonGradient from '@/components/assets/svg/ButtonGradient'
import Preloader from "@/components/Preloadercommon"
import Chatbot from '@/components/Chatbot'

import Footer from '@/components/components/Footer'
import Header from '@/components/components/Header'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'

// const Roadmaps = [
//     {
//       id: "Frontend",
//       name: "Frontend Development",
//     },
//     {
//       id: "Backend",
//       name: "Backend Development",
//     },
//     {
//       id: "Fullstack",
//       name: "Fullstack Development",
//     },
//     {
//       id: "AI",
//       name: "AI & Machine Learning",
//     },
//     {
//       id: "Blockchain",
//       name: "Blockchain Development",
//     },
//     {
//       id: "DataScience",
//       name: "Data Science",
//     },
//     {
//       id: "DevOps",
//       name: "DevOps Engineering",
//     },
//     {
//       id: "CyberSecurity",
//       name: "Cyber Security",
//     },
//     {
//       id: "Cloud",
//       name: "Cloud Computing",
//     },
//     {
//       id: "Mobile",
//       name: "Mobile App Development",
//     },
//     {
//       id: "Game",
//       name: "Game Development",
//     },
//     {
//       id: "IoT",
//       name: "Internet of Things (IoT)",
//     },
//     {
//       id: "UIUX",
//       name: "UI/UX Design",
//     },
//     {
//       id: "SoftwareTesting",
//       name: "Software Testing",
//     },
//     {
//       id: "EmbeddedSystems",
//       name: "Embedded Systems",
//     },
//   ];

const RoadmapPage = () => {
    const [isLoading, setIsLoading] = useState(true);
  // const RoadmapsId = (params.roadmap);  // Parse the event ID from params
  // const Roadmap = Roadmaps.find(e => e.id === RoadmapsId); // Find the event with the matching ID

  useEffect(() => {
    (async () => {
      // const LocomotiveScroll = (await import('locomotive-scroll')).default;
      // const locomotiveScroll = new LocomotiveScroll();
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <>
    <AnimatePresence mode='wait'>
      {isLoading && (
        <Preloader
          destination="events"
          words={["Upcoming Events", "Join Us", "Don’t Miss Out!", "Exciting Lineup Ahead"]}
        />
      )}
    </AnimatePresence>

    <AnimatePresence mode='wait'>
      {!isLoading && <Chatbot />}
    </AnimatePresence>

    {/* <AnimatePresence mode='wait'>
      {!isLoading && <BentoEvents event={Roadmap} />} 
    </AnimatePresence> */}

    <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
      <Header />
      <Footer />
    </div>

    <ButtonGradient />
  </>
  )
}

export default RoadmapPage

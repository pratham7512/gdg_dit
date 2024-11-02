import * as React from "react";




import Link from "next/link";
import { motion } from "framer-motion";
import { Gradient } from "../design/Roadmap";
import Section from "./Section";
const Roadmaps = [
    {
      id: "Frontend",
      name: "Frontend Development",
    },
    {
      id: "Backend",
      name: "Backend Development",
    },
    {
      id: "Fullstack",
      name: "Fullstack Development",
    },
    {
      id: "AI",
      name: "AI & Machine Learning",
    },
    {
      id: "Blockchain",
      name: "Blockchain Development",
    },
    {
      id: "DataScience",
      name: "Data Science",
    },
    {
      id: "DevOps",
      name: "DevOps Engineering",
    },
    {
      id: "CyberSecurity",
      name: "Cyber Security",
    },
    {
      id: "Cloud",
      name: "Cloud Computing",
    },
    {
      id: "Mobile",
      name: "Mobile App Development",
    },
    {
      id: "Game",
      name: "Game Development",
    },
    {
      id: "IoT",
      name: "Internet of Things (IoT)",
    },
    {
      id: "UIUX",
      name: "UI/UX Design",
    },
    {
      id: "SoftwareTesting",
      name: "Software Testing",
    },
    {
      id: "EmbeddedSystems",
      name: "Embedded Systems",
    },
  ];

const BlocksRoadmap = () => {

  return (
    <>
        <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
    
    >   
        
         <div className="relative mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
  {Roadmaps.map((Roadmap) => (
    <Link
    key={Roadmap.id}
            href={`/roadmap/${Roadmap.id}`}
    
          >
            
    <motion.div
    className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-lg bg-slate-500 cursor-pointer hover:bg-conic-gradient`}
   
    initial={{ opacity: 1, scale: 0.95,y:100 }}
    whileInView={{ opacity: 1, scale: 1,y:0}}
    transition={{ duration: 0.6 }} // Apply animations here
  >
    <motion.div
      key={Roadmap.id}
      className="bg-gray-800 rounded-lg w-full shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
     
      <div className="p-3  flex w-full flex-col justify-between h-full">
        <h3 className="text-lg   text-neutral-100">
          {Roadmap.name}
        </h3>
      </div>
    </motion.div>
    </motion.div>
    </Link>
  ))}
  <Gradient />
</div>

</Section>
    </>
  )
}

export default BlocksRoadmap

"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const hoverEffect = {
  rest: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, opacity: 0.95 },
};

const BentoEvents = ({ event }) => {
  if (!event) return <p className="w-full h-full py-[10%] px-4 text-gray-400">No event data available.</p>;

  return (
    <div className="w-full h-full py-[10%] px-4 ">
      <motion.h2
        className="max-w-7xl text-center mx-auto text-3xl md:text-5xl font-extrabold text-gray-200 font-sans mb-10 tracking-wide shadow-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        {event.name}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left Section */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="relative bg-[#1b1b1e] border border-gray-700 rounded-lg p-6 w-full h-[60%] shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
            style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={hoverEffect}
          >
            <h3 className="text-gray-100 text-xl font-semibold">Additional Information</h3>
            <p className="text-gray-400 text-md mt-2">{event.additionalInfo}</p>
            <p className="text-gray-400 text-md mt-2">Date: {event.date}</p>
            <p className="text-gray-400 text-md">Location: {event.location}</p>
          </motion.div>

          <motion.div
            className="relative bg-[#1b1b1e] border border-gray-700 rounded-lg overflow-hidden w-full h-[40%] shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
            style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={hoverEffect}
          >
            <Image src={event.img} alt="Event Image" sizes="100%" objectFit="cover" className="transition-transform duration-300 transform hover:scale-110 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-gray-100 text-lg font-semibold">Event Highlights</h3>
              <p className="text-gray-400 text-md">{event.information}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Center - Main Event */}
        <motion.div
          className="relative flex flex-col gap-6 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-6 h-[30%]">
            <motion.div
              className="relative bg-[#1b1b1e] border border-gray-700 rounded-lg overflow-hidden w-full h-full shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
              style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={hoverEffect}
            >
              <Image src={event.img} alt="Hackathon Workshop" sizes="100%" objectFit="cover" className="transition-transform duration-300 transform hover:scale-110 w-full h-full" />
            </motion.div>
            <motion.div
              className="relative bg-[#1b1b1e] border border-gray-700 rounded-lg overflow-hidden w-full h-full shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
              style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={hoverEffect}
            >
              <Image src={event.img} alt="Networking Event" sizes="100%" objectFit="cover" className="transition-transform duration-300 transform hover:scale-110 w-full h-full" />
            </motion.div>
          </div>

          <motion.div
            className="relative mt-6 w-full h-[40%] shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
            style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={hoverEffect}
          >
            <Image src={event.img} alt="Main Event" sizes="100%" objectFit="cover" className="transition-transform duration-300 transform hover:scale-110 rounded-lg w-full h-full" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 mt-6 h-[30%]">
            <motion.div
              className="relative bg-[#1b1b1e] border border-gray-700 rounded-lg p-6 w-full h-full shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
              style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={hoverEffect}
            >
              <h3 className="text-gray-100 text-xl font-semibold">Event Details</h3>
              <p className="text-gray-400 text-md mt-2">{event.information}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="relative bg-[#1b1b1e] border border-gray-700 rounded-lg p-6 w-full h-[60%] shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
            style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={hoverEffect}
          >
            <h3 className="text-gray-100 text-xl font-semibold">Event Overview</h3>
            <p className="text-gray-400 text-md mt-2">{event.additionalInfo}</p>
            <p className="text-gray-400 text-md mt-2">Date: {event.date}</p>
            <p className="text-gray-400 text-md">Location: {event.location}</p>
          </motion.div>

          <motion.div
            className="relative bg-[#1b1b1e] border border-gray-700 rounded-lg p-6 w-full h-[40%] shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1"
            style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.7)" }}
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={hoverEffect}
          >
            <h3 className="text-gray-100 text-xl font-semibold">Register Now</h3>
            <p className="text-gray-400 text-md mt-2">{event.name}</p>
            <p className="text-gray-400 text-md mt-2">{event.information}</p>
            <Link href={event.registrationLink}>
              <button className="inline-block text-center bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 absolute bottom-4 left-4">
                Register now
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoEvents;

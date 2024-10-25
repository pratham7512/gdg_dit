import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { heroimg2, event1, event2 } from "../assets";
import Link from "next/link";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    img: heroimg2,
    name: "Hackathon 2024",
    information:
      "An intensive 48-hour hackathon bringing together tech enthusiasts to solve real-world challenges through innovative solutions.",
    date: "March 1-3, 2024",
    location: "Tech Park Auditorium",
    additionalInfo: "Teams will compete for exciting prizes and networking opportunities.",
    registrationLink: "/register/hackathon-2024",
  },
  {
    id: 2,
    img: event1,
    name: "Cybersecurity Awareness Workshop",
    information:
      "A comprehensive workshop to understand the fundamentals of cybersecurity, including current threats and best practices.",
    date: "March 10, 2024",
    location: "Room 204, Main Building",
    additionalInfo: "Free for all students. Limited seats available.",
    registrationLink: "/register/cybersecurity-workshop",
  },
  {
    id: 3,
    img: event2,
    name: "Placement Preparation Series",
    information:
      "A series designed to help students excel in placement exams, technical interviews, and group discussions.",
    date: "March 15-20, 2024",
    location: "Online",
    additionalInfo: "Join our expert sessions and mock interviews.",
    registrationLink: "/register/placement-preparation",
  },
  {
    id: 4,
    img: heroimg2,
    name: "AI & Machine Learning Bootcamp",
    information:
      "An intensive bootcamp covering the basics and advanced topics in AI and machine learning, with real-world project implementations.",
    date: "April 1-7, 2024",
    location: "Lab 3, Innovation Center",
    additionalInfo: "Hands-on projects and mentorship included.",
    registrationLink: "/register/ai-bootcamp",
  },
];

export function CarouselEvent() {
  return (
    <div className="w-full h-full md:py-[10%] max-sm:py-[20%]">
      <h2 className="max-w-7xl text-center pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-300 dark:text-neutral-200 font-sans mb-6">
        Upcoming Events
      </h2>

      <Carousel className="w-full h-full max-w-3xl m-auto mt-[2%]">
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index}>
              <div className="p-2">
                <Link
                  href={{
                    pathname: `/events/${event.id}`,
                  }}
                  passHref
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative cursor-pointer rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  >
                    <Card className="items-center bg-gray-900 border border-gray-700">
                      <CardContent className="flex w-full aspect-video p-1 relative group">
                        <Image
                          src={event.img}
                          alt={event.name}
                          height={200}
                          width={760}
                          objectFit="contain"
                          className="rounded h-full w-full transition-transform duration-300 transform group-hover:scale-105"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1.05 }}
                          className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-2xl font-bold p-4 transition-opacity duration-300 ease-in-out rounded-lg"
                        >
                          {event.name}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Event Details Section */}
      {/* Event Details Section */}
      <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
  {events.map((event) => (
    <motion.div
      key={event.id}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={event.img}
        alt={event.name}
        height={300}
        width={760}
        objectFit="contain"
        className="rounded-t-lg mb-4 h-64 w-full"
      />
      <div className="p-6 flex flex-col justify-between h-full">
        <h3 className="text-xl font-bold mb-4 text-center text-neutral-100">
          {event.name}
        </h3>
        <p className="text-gray-300 mb-3 leading-relaxed text-center">
          {event.information}
        </p>
        <div className="flex flex-col items-center sm:items-start text-sm text-gray-400 mb-4 space-y-1">
          <div>
            <span className="font-semibold">Date:</span> {event.date}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {event.location}
          </div>
          <p className="text-gray-300 text-center sm:text-left mt-2">
            {event.additionalInfo}
          </p>
        </div>
        <div className="mt-5 pt-4">
          <Link
            href={event.registrationLink}
            className="inline-block text-center bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 absolute bottom-3 left-4"
          >
            Register Now
          </Link>
        </div>
      </div>
    </motion.div>
  ))}
</div>

    </div>
  );
}

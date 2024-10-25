"use client"
import ButtonGradient from '@/components/assets/svg/ButtonGradient'
import Preloader from "@/components/Preloadercommon"
import Chatbot from '@/components/Chatbot'
import BentoEvents from '@/components/components/BentoEvent'
import Footer from '@/components/components/Footer'
import Header from '@/components/components/Header'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { heroimg2, event1, event2 } from "@/components/assets";

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
      registrationLink: "/",
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
      registrationLink: "/",
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
      registrationLink: "/",
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
      registrationLink: "/",
    },
  ];


const EventDetails = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const eventId = parseInt(params.eventid);  // Parse the event ID from params
  const event = events.find(e => e.id === eventId); // Find the event with the matching ID

  useEffect(() => {
    (async () => {
      // const LocomotiveScroll = (await import('locomotive-scroll')).default;
      // const locomotiveScroll = new LocomotiveScroll();
        console.log(event);
        console.log(params);
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

      <AnimatePresence mode='wait'>
        {!isLoading && <BentoEvents event={event} />} {/* Pass event data to BentoEvents */}
      </AnimatePresence>

      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
        <Header />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
}

export default EventDetails;

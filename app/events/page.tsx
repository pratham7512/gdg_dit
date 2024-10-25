"use client";
import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from "@/components/Preloadercommon";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import { CarouselEvent } from "@/components/components/CarouselEvent";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
const Events = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

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
        {isLoading && <Preloader destination="events" words={["Upcoming Events", "Join Us", "Don’t Miss Out!", "Exciting Lineup Ahead"]} />}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {!isLoading && <Chatbot />}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {!isLoading && 
        
        <CarouselEvent />
        }
      </AnimatePresence>
      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
        <Header />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  )
}

export default Events
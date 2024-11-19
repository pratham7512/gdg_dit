"use client"
import { AnimatePresence } from 'framer-motion';
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import { CarouselEvent } from "@/components/components/CarouselEvent";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import {CarouselEventSkeleton} from '@/components/components/CarouselEventSkeleton';
import useFetchEvents from '@/hooks/useFetchEvents';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';


const Events =  () => {
  const {status} =  useSession();
  const { events, error, isLoading } = useFetchEvents();
  if(status==="loading"){
    return(
      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
        <Header />
          <CarouselEventSkeleton/>
        <Footer /> 
      </div>
    )
  }
  if (status==='unauthenticated') {
    redirect('/');
  }

  const renderContent = () => {
    if (isLoading) {
      return <CarouselEventSkeleton />;
    }

    if (error||!events) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center justify-center min-h-[75vh] px-4"
        >
          <div className="bg-n-8/60 border-l-4 border hover:border-red-500 border-l-red-500 p-4 rounded-lg max-w-lg w-full">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Error Loading Event
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  {error}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-3 text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <CarouselEvent events={events}/>
      </AnimatePresence>
    );
  };
  return (
    <>

      <AnimatePresence mode='wait'>
        {!isLoading && <Chatbot />}
      </AnimatePresence>

      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden bg-black bg-grid-white/[0.090]">
        <Header />
        {renderContent()}
        <Footer /> 
      </div>
      <ButtonGradient />
    </>
  )
}

export default Events
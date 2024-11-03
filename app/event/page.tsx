"use client"
import { AnimatePresence } from 'framer-motion';
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import { redirect} from 'next/navigation';
import EventSkeleton from '@/components/components/EventSkeleton';
import { useSession } from "next-auth/react"
import EventPage from '@/components/components/Event';


const Event = () => {
  const {status} =  useSession();

  if(status==="loading"){
    return <EventSkeleton/>
  }
  if (status==='unauthenticated') {
    redirect('/');
  }
  return (
    <>
      <AnimatePresence mode="wait">
        <Chatbot />
      </AnimatePresence>

      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
        <Header />
        <EventPage/>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Event;
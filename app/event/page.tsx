"use client"
import { AnimatePresence } from 'framer-motion';
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import EventSkeleton from '@/components/components/EventSkeleton';
import { useSession } from "next-auth/react"
import EventPage from '@/components/components/Event';
import { AuthDialog } from '@/components/components/Signin';
import Button from '@/components/components/Button';


const Event = () => {
  const {status} =  useSession();

  if(status==="loading"){
    return(
      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
        <Header />
          <EventSkeleton/>
        <Footer /> 
      </div>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
      <Header />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
        <div className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-black border">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Please Sign In
            </h2>
            <p className="text-gray-300 mb-8">
              You need to be login to access this content.
            </p>
            <AuthDialog initialMode="signin">
            <Button className='z-20 relative border font-bold border-white rounded-lg hover:bg-gray-300'>
              Sign In
            </Button>
            </AuthDialog>
          </div>
        </div>
      </div>
      </div>
    );
  }
  return (
    <>
      <AnimatePresence mode="wait">
        <Chatbot />
      </AnimatePresence>

      <div className=" lg:pt-[2.8rem] overflow-hidden bg-black">
        <Header />
        <EventPage/>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Event;
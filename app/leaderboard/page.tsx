"use client"
import { AnimatePresence } from 'framer-motion';
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import Leaderboard from '@/components/components/Leaderboard';
import { useSession } from "next-auth/react";
import {LeaderboardSkeleton} from '@/components/components/LeaderboardSkeleton';
import { AuthDialog } from '@/components/components/Signin';
import Button from '@/components/components/Button';


const Ranking =() => {
  const {status} =  useSession();
  if(status==="loading"){
    return(
    <div className="pt-[4rem] bg-black lg:pt-[2.8rem] overflow-hidden">
    <Header />
      <LeaderboardSkeleton/>
    <Footer /> 
    </div>)
  }
  if (status === 'unauthenticated') {
    return (
      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
      <Header />
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-90">
        <div className="w-full max-w-md mx-10 p-8 rounded-lg shadow-2xl bg-black border">
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
      <AnimatePresence mode='wait'>
        {<Chatbot />}
      </AnimatePresence>

      <div className="lg:pt-[0.8rem] overflow-hidden bg-black bg-grid-white/[0.090]">
        <Header />
        <AnimatePresence mode='wait'>
        <Leaderboard/>
        </AnimatePresence>
        <Footer /> 
      </div>
      <ButtonGradient />
    </>
  )
}

export default Ranking
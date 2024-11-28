"use client"
import { AnimatePresence } from 'framer-motion';
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import Leaderboard from '@/components/components/Leaderboard';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import LeaderboardSkeleton from '@/components/components/LeaderboardSkeleton';


const Ranking =() => {
  const {status} =  useSession();
  if(status==="loading"){
    return(
    <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
    <Header />
      <LeaderboardSkeleton/>
    <Footer /> 
    </div>)
  }
  if (status==='unauthenticated') {
    redirect('/');
  }
  return (
    <>
      <AnimatePresence mode='wait'>
        {<Chatbot />}
      </AnimatePresence>

      <div className="lg:pt-[0.8rem] overflow-hidden bg-black">
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
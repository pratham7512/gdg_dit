"use client";
import { AnimatePresence } from 'framer-motion';
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import Leaderboard from '@/components/components/Leaderboard';
const Ranking = () => {

  return (
    <>
      <AnimatePresence mode='wait'>
        {<Chatbot />}
      </AnimatePresence>

      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
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
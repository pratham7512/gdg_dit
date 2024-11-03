"use client"
import { AnimatePresence } from 'framer-motion';
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import Leaderboard from '@/components/components/Leaderboard';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';


const Ranking =() => {
  const {status} =  useSession();
  if(status==="loading"){
    return(<>
    {[...Array(10)].map((_, index) => (
      <TableRow key={index} className="border-b border-gray-800 animate-pulse">
        <TableCell><Skeleton className="h-6 w-8" /></TableCell>
        <TableCell>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </TableCell>
        <TableCell><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
        <TableCell><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
        <TableCell><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
        <TableCell><Skeleton className="h-6 w-16 ml-auto" /></TableCell>
      </TableRow>
    ))}
  </>)
  }
  if (status==='unauthenticated') {
    redirect('/');
  }
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
"use client";
import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from "@/components/Preloadercommon";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";

import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import HeroRoadmap from '@/components/components/HeroRoadmap';
import BlocksRoadmap from '@/components/components/BlocksRoadmap';

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            // const LocomotiveScroll = (await import('locomotive-scroll')).default;
            // const locomotiveScroll = new LocomotiveScroll();

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
                {isLoading && <Preloader destination="events" words={["Roadmaps", "Devlopment", "DSA!", "AI&ML", "Blockchain"]} />}
            </AnimatePresence>
            <AnimatePresence mode='wait'>
                {!isLoading && <Chatbot />}
            </AnimatePresence>
            <AnimatePresence mode='wait'>
                {!isLoading &&

                    <HeroRoadmap />
                }
            </AnimatePresence>

            <AnimatePresence mode='wait'>
                {!isLoading &&

                    <BlocksRoadmap />
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

export default Page
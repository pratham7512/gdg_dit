"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloadercommon";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import { useSession } from "next-auth/react";
import ButtonGradient from "@/components/assets/svg/ButtonGradient";
import HeroRoadmap from "@/components/components/HeroRoadmap";
import BlocksRoadmap from "@/components/components/BlocksRoadmap";
import { AuthDialog } from "@/components/components/Signin";
import Button from "@/components/components/Button";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  if (status === "unauthenticated") {
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
                You need to be logged in to access this content.
              </p>
              <AuthDialog initialMode="signin">
                <Button className="z-20 relative border font-bold border-white rounded-lg hover:bg-gray-300">
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
    <div className="bg-grid-white/[0.090] bg-black">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            destination="events"
            words={["Roadmaps", "Development", "DSA!", "AI&ML", "Blockchain"]}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">{!isLoading && <Chatbot />}</AnimatePresence>
      <AnimatePresence mode="wait">
        {!isLoading && <HeroRoadmap />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!isLoading && <BlocksRoadmap />}
      </AnimatePresence>
      <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden">
        <Header />
        <Footer />
      </div>
      <ButtonGradient />
    </div>
  );
};

export default Page;

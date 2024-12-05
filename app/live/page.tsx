'use client'

import Header from "@/components/components/Header"
import Footer from "@/components/components/Footer"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { AuthDialog } from "@/components/components/Signin"

export default function QuizLandingPage() {
  const { status } = useSession();
  const [activeSection, setActiveSection] = useState('intro');
  const [isLive, setIsLive] = useState(false);

  const quizSections = [
    { id: '#include <stdio.h>', title: '#include <stdio.h>' },
    { id: 'basics', title: 'C Basics' },
    { id: 'advanced', title: 'Advanced C' },
    { id: 'challenges', title: 'Coding Challenges' },
    { id: 'return 0;', title: 'return 0' },
  ];

  useEffect(() => {
    const checkIfLive = () => {
      const eventDate = new Date('2024-12-05T14:30:00Z'); // 8:00 PM IST
      const now = new Date();
      setIsLive(now >= eventDate);
    };

    checkIfLive();
    const timer = setInterval(checkIfLive, 1000);
    return () => clearInterval(timer);
  }, []);

  if (status === 'unauthenticated') {
    return (
      <div className="pt-16 sm:pt-20 overflow-hidden">
        <Header />
        <div className="mt-8 min-h-screen flex items-center justify-center bg-black bg-opacity-90">
          <div className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-black border mx-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">
                Please Sign In
              </h2>
              <p className="text-gray-300 mb-8">
                You need to be logged in to access this content.
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
    <div className="min-h-screen overflow-hidden bg-black bg-grid-white/[0.090] font-mono">
      <Header />
      <main className="container mx-auto px-4 py-20 md:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">That&apos;s What C Said</h2>
            <nav>
              {quizSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`block text-left py-2 w-full ${
                    activeSection === section.id ? 'text-blue-500' : 'text-gray-400'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
            <p className="text-gray-300 mb-5">
              2024 has been a big year for C programming. Test your knowledge with our comprehensive quiz.
            </p>
            <a href="https://forms.gle/LVtud9FH8mryvS846">
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 mt-10 rounded-none">
                START QUIZ
              </Button>
            </a>
          </div>
          <div className="w-full lg:w-2/3 bg-blue-600 p-6 md:p-8 relative">
            <div className="mb-4">
              <span className="bg-blue-500 text-xs font-semibold px-2 py-1">QUIZ 2024</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">That&apos;s What C Said</h2>
            <div className="space-y-2 mb-6 text-white">
              <p className="text-sm md:text-base lg:text-lg">Date: 5th December 2024</p>
              <p className="text-sm md:text-base lg:text-lg">Time: 8:00 PM</p>
              <p className="text-sm md:text-base lg:text-lg">Mode: Online (Google Forms)</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="hover:bg-blue-700 border border-dashed border-white px-4 py-2 text-white">
                <p className="font-semibold">40 Questions</p>
                <p className="text-xs md:text-sm">Covering all aspects of C</p>
              </div>
              <div className="hover:bg-blue-700 border border-dashed border-white px-4 py-2 text-white">
                <p className="font-semibold">30 Minutes</p>
                <p className="text-xs md:text-sm">Time to complete</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-2 mx-2 py-1 mt-6">
              <span className="text-xs md:text-sm text-white">
                {isLive ? '🔴 Live' : '⏳ Starting Soon'}
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

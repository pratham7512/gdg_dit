"use client"

import FAQ from "@/components/contest/faq"
import Hero from "@/components/contest/Hero"
import MaskedVideoDemo from "@/components/contest/maskedVideo"
import Navigation from "@/components/contest/Navigation"
import PrizePool from "@/components/contest/prizePool"
import Schedule from "@/components/contest/schedule"
import Sponsors from "@/components/contest/sponsors"
import Footer from "@/components/components/Footer";

export default function Contest(){
    return (
    <>
    <div className="bg-black">
        <Navigation/>
        <Hero/>
        <MaskedVideoDemo/>
        <Schedule/>
        <PrizePool/>
        <Sponsors/>
        <FAQ/>
        <Footer/>
    </div>
    </>
    )
}
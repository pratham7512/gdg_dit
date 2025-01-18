"use client"

import FAQ from "@/components/contest/faq"
import Hero from "@/components/contest/Hero"
import MaskedVideoDemo from "@/components/contest/maskedVideo"
import Navigation from "@/components/contest/Navigation"
import PrizePool from "@/components/contest/prizePool"
import Schedule from "@/components/contest/schedule"
import Sponsors from "@/components/contest/sponsors"
import Footer from "@/components/components/Footer";
import EventFeeAndRegistration from "@/components/contest/feeAndRegistration"

export default function Contest(){
    return (
    <>
    <div className="bg-black">
        <Navigation/>
        <div id="overview">
            <Hero/>
        </div>
        <MaskedVideoDemo/>
        <div id="schedule">
            <Schedule/>
        </div>
        <div id="prizes">
            <PrizePool/>
        </div>
        <div id="feeAndRegistration">
          <EventFeeAndRegistration/>
        </div>
        <div id="sponsors">
            <Sponsors/>
        </div>
        <div id="faq">
            <FAQ/>
        </div>
        <Footer/>
    </div>
    </>
    )
}
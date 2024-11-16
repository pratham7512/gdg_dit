'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import useFetchEvents from '@/hooks/useFetchEvents'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import EventSkeleton from "./EventSkeleton"

export default function EventPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  const searchParams = useSearchParams()
  const id = searchParams?.get("id")
  const { events, error, isLoading } = useFetchEvents(id || undefined)
  const event = events?.[0]

  useEffect(() => {
    if (!event?.dateTime) return

    const timer = setInterval(() => {
      const now = new Date()
      const end = new Date(event.dateTime)
      const diff = end.getTime() - now.getTime()

      if (diff <= 0) {
        setIsExpired(true)
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [event?.dateTime])

  if (isLoading) {
    return (
      <EventSkeleton/>
    )
  }

  if (error || !events) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-black text-white flex items-center justify-center p-4"
      >
        <div className="text-center space-y-4">
          <h2 className="text-xl text-red-500">Error Loading Event</h2>
          <p className="text-neutral-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-pink-500 hover:text-pink-400"
          >
            Try again
          </button>
        </div>
      </motion.div>
    )
  }

  if (!event) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-black text-white flex items-center justify-center p-4"
      >
        <div className="text-center space-y-4">
          <h2 className="text-xl text-red-500">Event Not Found</h2>
          <p className="text-neutral-400">The requested event could not be found.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white bg-grid-white/[0.090] mt-6">
      <div className="max-w-5xl mx-auto border bg-black">
        <div className="relative h-[400px]">
          <Image
            src={event.imageUrls?.[currentImage]}
            alt={`${event.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button 
              onClick={() => setCurrentImage(prev => prev === 0 ? event.imageUrls.length - 1 : prev - 1)}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setCurrentImage(prev => prev === event.imageUrls.length - 1 ? 0 : prev + 1)}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {event.imageUrls?.map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full ${i === currentImage ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
        
        <div >
          <div className="grid grid-cols-1 md:grid-cols-[1fr,350px]">
            <div className="">
              <div className="py-6 w-full hover:bg-blue-500 hover:text-black">
              <h1 className="text-4xl font-normal px-6 py-2">{event.name}</h1>
              </div>
              <div className="flex items-center gap-4 border-t border-b border-neutral-800 py-4 px-6 text-xl">
                <div className="bg-red-500 text-black px-3 py-1 text-base font-code">
                  ₹{event.entryFees}
                </div>
                <div className="tagline text-md border px-4 py-2 rounded-sm">{event.domain}</div>
                <div className="tagline text-md border px-4 py-2 rounded-sm">{event.mode}</div>
              </div>

              <div className="space-y-4 p-6 transition-smooth">
                <p className="text-[1rem] leading-relaxed">{event.description}</p>
                
                <div className="prose prose-lg prose-invert">
                  <p className="leading-relaxed whitespace-pre-wrap text-justify text-[1rem]">{event.details}</p>
                </div>
                
                <div className="space-y-4 border-t border-neutral-800 pt-6">
                  <h3 className="text-2xl font-bold mb-3">Items to Bring:</h3>
                  <ul className="list-disc list-inside space-y-2 text-[1rem]">
                    {event.itemsToBring?.map((item, index) => (
                      <li key={index} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 border-t border-neutral-800 pt-6">
                  <h3 className="text-2xl font-bold mb-3">Prerequisites:</h3>
                  <p className="text-[1rem] leading-relaxed">{event.prerequisites}</p>
                </div>
              </div>
            </div>

            <div className="border-l border-neutral-800">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-neutral-300 text-lg">
                    <MapPin className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300 text-lg">
                    <Calendar className="w-5 h-5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300 text-lg">
                    <Clock className="w-5 h-5" />
                    <span>{isExpired ? 'Applications Closed' : 'Applications close in:'}</span>
                  </div>
                  {!isExpired && (
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(timeLeft).map(([key, value]) => (
                        <div key={key} className="bg-neutral-900 hover:bg-yellow-500 hover:text-black px-2 py-3 rounded-lg text-center">
                          <div className="font-mono text-xl">{value}</div>
                          <div className="text-[10px]  uppercase tracking-wider mt-1 text-center">{key}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-white transform rounded-lg"></div>
                  <Button 
                    className="font-code text-md w-full bg-black text-white hover:bg-green-500 hover:text-black relative z-10 transform hover:-translate-y-1 hover:-translate-x-1 transition-all border duration-200"
                    disabled={isExpired}
                  >
                    {isExpired ? 'Applications Closed' : 'RSVP NOW'}
                  </Button>
                </div>

                {!isExpired&&<div className="flex items-center justify-between gap-2 ">
                <div className="relative">
                <div className="absolute inset-0 bg-white transform rounded-lg"></div>    
                  <Button variant="outline" className="flex-1 relative z-10 hover:bg-blue-500 hover:text-black hover:-translate-y-1 hover:-translate-x-1">
                    Add to calendar
                  </Button>
                </div>
                <div className="relative">
                <div className="absolute inset-0 bg-white transform rounded-lg"></div>  
                  <Button className="hover:bg-red-500 hover:text-black hover:-translate-y-1 hover:-translate-x-1 z-10 relative" variant="outline" size="icon">
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
                </div>}
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-6 space-y-8 ">
            {event.speakers && Object.values(event.speakers).length > 0 && (
              <section className="border-b border-neutral-800 pb-8 px-6">
                <h2 className="text-3xl font-medium mb-6">Speakers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.values(event?.speakers || {}).map((speaker, index) => (
                    <div key={index} className="text-center">
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src={speaker?.image} />
                        <AvatarFallback>{speaker?.name?.substring(0, 2) ?? 'NA'}</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-2 font-medium text-xl">{speaker?.name}</h3>
                      <p className="text-base">{speaker?.designation}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="pb-8 px-6">
              <h2 className="text-3xl font-medium mb-6">Sponsors</h2>
              <div className="grid grid-cols-3 gap-6">
                {event.sponsors?.map((sponsor, i) => (
                  <div key={i} className="aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
                    <Image 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>

            {event["faq's"] && event["faq's"].length > 0 && (
              <section className="border-t border-neutral-800 px-6 bg-green-500 text-black py-6">
                <h2 className=" text-3xl font-medium">FAQ</h2>
                <Accordion type="single" collapsible className="w-full">
                  {event["faq's"].map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-xl font-medium">{faq?.question}</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        {faq?.ans}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
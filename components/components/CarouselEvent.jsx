"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Tagline from "./Tagline"
import Button from "./Button"
import Heading from "./Heading"
import { Badge } from "../ui/badge"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"

function getRandomColor() {
  const colors = ['green-500', 'red-500', 'blue-500', 'yellow-500'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function CarouselEvent({ events }) {
  const targetRef = React.useRef(null)
  const { scrollYProgress } = useScroll({ 
    target: targetRef, 
    offset: ["start end", "end start"] 
  })
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 1, 1, 1])
  const smoothOpacity = useSpring(opacity, { damping: 20, stiffness: 100 })
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <div className="w-full h-full md:py-[5%] max-sm:py-[5%]">
      {/* Image Carousel Section */}
      <div className="container mb-16 w-full md:w-3/5">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {events && events.flatMap((event) => 
              event.imageUrls?.map((url, index) => (
                <CarouselItem key={`${event.id}-${index}`} className="basis-full">
                  <div className="relative h-[30vh] sm:h-[60vh] w-full overflow-hidden rounded-xl">
                    <Image
                      src={url}
                      alt={`Event image for ${event.name}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Event Details Section */}
      <div className="container md:pb-5 px-4 md:px-0">
        <Heading tag="Ready to get started" title="What we're working on" />
        <div className="relative grid gap-6 md:grid-cols-2 md:gap-6 md:pb-[7rem] mx-0 md:mx-10">
          {events && events.map((item) => {
            return (
              <Link href={`/event?id=${item.id}`} key={item.id}>
                <motion.div
                  className={`md:flex even:md:translate-y-[7rem] bg-muted hover:bg-${getRandomColor()} rounded-xl`}
                  style={{ opacity: smoothOpacity }}
                  initial={{ opacity: 1, scale: 0.95, y: 100 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative p-6 bg-black border overflow-hidden xl:p-15 w-full rounded-xl relative z-10 transform hover:-translate-y-2 hover:-translate-x-3 transition-all">
                    <div className="relative z-1">
                      <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-8">
                        <Tagline>{item.date}</Tagline>
                        <Badge className="bg-transparent tagline border border-n-3 p-1 px-3 hover:bg-transparent text-n-3">
                          {item.domain}
                        </Badge>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="h-4/5">
                          <h4 className="h4 mb-4">{item.name}</h4>
                          <p className="body-2 text-n-4">{item.description}</p>
                        </div>
                        <div className="mt-5">
                          <Button href={item.rsvpLink}>RSVP</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
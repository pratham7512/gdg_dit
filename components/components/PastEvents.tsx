'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { InfiniteMovingCards } from '../ui/infiniteCards'

type Event = {
  id: number
  name: string
  description: string
  images: string[]
}

export default function PastEvents() {
  const events: Event[] = [
    {
      id: 1,
      name: "Tech Talk 2023",
      description: "A series of insightful discussions on emerging technologies and their impact on our future.",
      images: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMHRhbGt8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2glMjB0YWxrfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2glMjB0YWxrfGVufDB8fDB8fHww"
      ]
    },
    {
      id: 2,
      name: "Hackathon Spring 2023",
      description: "A 48-hour coding marathon where students collaborated to solve real-world problems.",
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFja2F0aG9ufGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFja2F0aG9ufGVufDB8fDB8fHww"
      ]
    },
    {
      id: 3,
      name: "Workshop: Intro to AI",
      description: "An interactive session introducing the basics of Artificial Intelligence and Machine Learning.",
      images: [
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D"
      ]
    }
  ]

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-background bg-grid-white/[0.050]">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-4/5 italic underline">Past Events</h2>
        <br></br>
        <div className="space-y-16 mb-16">
          {events.map((event) => (
            <EventCarousel key={event.id} event={event} />
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight max-w-4/5">
              <div className='italic underline'>Event Gallery</div>
        </h1>
        <br></br>
        <InfiniteMovingCards events={events} />
      </div>
    </section>
  )
}

function EventCarousel({ event }: { event: Event }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % event.images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [event.images.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % event.images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + event.images.length) % event.images.length)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/2 relative">
        <div className="overflow-hidden aspect-video">
          {event.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${event.name} - Image ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          aria-label="Previous slide"
        >
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          aria-label="Next slide"
        >
        </button>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-semibold mb-4">{event.name}</h3>
        <p className="text-lg text-muted-foreground">{event.description}</p>
      </div>
    </div>
  )
}

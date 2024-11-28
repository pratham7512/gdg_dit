'use client';

import { useState, useEffect } from 'react';
import { InfiniteMovingCards } from '../ui/infiniteCards';
import Image from 'next/image';

type Event = {
  id: number;
  name: string;
  description: string;
  imageUrls: string[]; // Ensure this matches your API structure
};

export default function PastEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/pastEvents'); // Replace with your API route
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        const data = await response.json();

        // Validate that data is an array
        if (!Array.isArray(data)) {
          throw new Error('Fetched data is not in the expected array format.');
        }

        // Add fallback for missing properties
        const validatedData = data.map((event) => ({
          id: event.id ?? 0, // Ensure id is a number
          name: event.name || 'Unnamed Event', // Fallback for name
          description: event.description || 'No description available', // Fallback for description
          imageUrls: Array.isArray(event.imageUrls) ? event.imageUrls : [], // Ensure imageUrls is always an array
        }));

        setEvents(validatedData);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Access the error message
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <p>Loading past events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-4/5 italic underline">Past Events</h2>
        <br />
        <div className="space-y-16 mb-16">
          {events.map((event) => (
            <EventCarousel key={event.id} event={event} />
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight max-w-4/5">
          <div className="italic underline">Event Gallery</div>
        </h1>
        <br />
        <InfiniteMovingCards events={events} />
      </div>
    </section>
  );
}

function EventCarousel({ event }: { event: Event }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (event.imageUrls?.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % event.imageUrls.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [event.imageUrls]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/2 relative">
        <div className="overflow-hidden aspect-video">
          {event.imageUrls && event.imageUrls.length > 0 ? (
            event.imageUrls.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${event.name} - Image ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : (
            <p>No images available for this event</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-semibold mb-4">{event.name}</h3>
        <p className="text-lg text-muted-foreground">{event.description}</p>
      </div>
    </div>
  );
}

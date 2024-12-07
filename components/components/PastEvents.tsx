'use client';

import { useState, useEffect } from 'react';
import { InfiniteMovingCards } from '../ui/infiniteCards';
import Image from 'next/image';

type RawEvent = {
  id?: number;
  name?: string;
  description?: string;
  imageUrls?: string[];
};

type Event = {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
};

export default function PastEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/pastEvents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: RawEvent[] = await response.json();
  
        const validatedData: Event[] = data
          .filter((event): event is RawEvent => event != null)
          .map(event => ({
            id: Number(event.id) || 0,
            name: event.name?.toString() || 'Unnamed Event',
            description: event.description?.toString() || 'No description available',
            imageUrls: (event.imageUrls || [])
              .filter((url): url is string => typeof url === 'string')
          }));
  
        setEvents(validatedData);
      } catch (err) {
        console.error('Event fetching error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
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
    <section className="py-12 px-1 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-4/5 italic underline">Past Events</h2>
        <br />
        <div className="space-y-16 mb-16">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCarousel key={event.id} event={event} />
            ))
          ) : (
            <p>No events found</p>
          )}
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
      }, 5000);

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
                width={600}
                height={400}
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
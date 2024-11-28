import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import { InfiniteMovingCards } from "../ui/infiniteCards";

const Roadmap = () => {
  const targetRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/pastEvents"); // Replace with your API route
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        const data = await response.json();

        // Validate that data is an array
        if (!Array.isArray(data)) {
          throw new Error("Fetched data is not in the expected array format.");
        }

        // Add fallback for missing properties
        const validatedData = data.map((event) => ({
          id: event.id ?? 0, // Ensure id is a number
          name: event.name || "Unnamed Event", // Fallback for name
          description: event.description || "No description available", // Fallback for description
          imageUrls: Array.isArray(event.imageUrls) ? event.imageUrls : [], // Ensure imageUrls is always an array
        }));

        setEvents(validatedData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
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
    <Section className="overflow-hidden" id="roadmap" ref={targetRef}>
      <div className="container md:pb-10">
        <Heading tag="Relive the Highlights" title="A Glimpse into Our Past Events" />
        <InfiniteMovingCards events={events} />
        <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">
          <Button href="/events">Upcoming Events</Button>
        </div>
      </div>
    </Section>
  );
};

export default Roadmap;

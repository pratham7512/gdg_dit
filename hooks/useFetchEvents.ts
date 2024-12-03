"use client";
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from "@/app/firebase/config";

type FAQ = {
    question: string;
    ans: string;
};

type Event = {
    id: string;
    name: string;
    date: string;
    dateTime: string;
    description: string;
    calendar:string,
    details: string;
    domain: string;
    entryFees: string;
    rsvpLink: string;
    faq: FAQ[];
    imageUrls: string[];
    itemsToBring: string[];
    location: string;
    mode: string;
    prerequisites: string;
    prizepool: any[];
    speakers: Record<string, {
        name: string;
        designation: string;
        company: string;
        Expertise: string;
        image: string;
    }>;
    sponsors: Array<{
        name: string;
        logo: string;
    }>;
};

type FirebaseEvent = Record<string, Event>;

const useFetchEvents = (id?: string) => {
    const [events, setEvents] = useState<Event[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true); // Set loading to true when fetching starts
            setError(null); // Reset error state on new fetch
            
            try {
                const dbRef = ref(database, "events/upcomingEvents");
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    const data = snapshot.val() as FirebaseEvent;
                    const eventArray = Object.values(data);

                    if (id) {
                        const foundEvent = eventArray.find(
                            (event) => (event.id) === (id)
                        );
                        setEvents(foundEvent ? [foundEvent] : null);
                    } else {
                        setEvents(eventArray);
                    }
                } else {
                    throw new Error('No events data available');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch events');
                setEvents(null);
            } finally {
                setIsLoading(false); // Set loading to false when fetching ends
            }
        };

        fetchEvents();
    }, [id]);

    return { events, error, isLoading };
};

export default useFetchEvents;
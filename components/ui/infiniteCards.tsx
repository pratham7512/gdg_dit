'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  events,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  events: {
    id: number;
    name: string;
    description: string;
    imageUrls: string[];
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-10xl overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ width: "200%" }}
      >
        {[...events, ...events].map((event, eventIndex) => (
          <div
            key={`${event.id}-${eventIndex}`}
            className="grid grid-cols-3 gap-4 p-4"
            style={{ width: "70%", flexShrink: 0.02 }}
          >
            {event.imageUrls.map((image, imageIndex) => (
              <div
                key={`${event.id}-${eventIndex}-${imageIndex}`}
                className={`relative overflow-hidden rounded-lg ${
                  imageIndex === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`${event.name} - Image ${imageIndex + 1}`}
                  className="w-full h-full object-cover"
                  width={1080}
                  height={720}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 transition-opacity opacity-0 hover:opacity-100">
                  <span className="text-white text-sm font-medium">{event.name}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
}

interface InfiniteMovingCardsProps {
  events: Event[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  events,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

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
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const renderImages = (images: string[]) => {
    const filledImages = [...images];
    while (filledImages.length < 3) {
      filledImages.push(images[filledImages.length % images.length]);
    }

    return filledImages.map((image, imageIndex) => (
      <div
        key={`image-${imageIndex}`}
        className={cn(
          "relative overflow-hidden rounded-md",
          imageIndex === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
        )}
      >
        <Image
          src={image}
          alt={`Event image ${imageIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 280px, (max-width: 1200px) 400px, 500px"
        />
      </div>
    ));
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
      >
        {[...events, ...events].map((event, eventIndex) => (
          <li
            key={`${event.id}-${eventIndex}`}
            className="w-[280px] md:w-[400px] lg:w-[500px] flex-shrink-0"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 bg-black rounded-lg shadow-md">
              {renderImages(event.imageUrls)}
            </div>
            <div className="mt-2 p-2 bg-black rounded-lg shadow-md">
              <h3 className="text-lg font-semibold truncate">{event.name}</h3>
              <p className="text-sm text-gray-600 truncate">{event.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


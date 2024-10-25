"use client";
import Image from "next/image";
import React from "react";

import { heroimg2 } from "../assets";

interface EventContentProps {
  slug: string;
  author: string;
  date: string;
  title: string;
  description: string;
  image: string;
  authorAvatar: string;
}

const EventContent: EventContentProps = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: heroimg2,
  authorAvatar: "/manu.png",
};

// interface TitleComponentProps {
//   title: string;
//   avatar: string;
// }

// const TitleComponent: React.FC<TitleComponentProps> = ({ title, avatar }) => (
//   <div className="flex space-x-2 items-center">
//     <Image
//       src={avatar}
//       height={20}
//       width={20}
//       alt="thumbnail"
//       className="rounded-full border-2 border-white"
//     />
//     <p>{title}</p>
//   </div>
// );

export function CarouselComponent() {
  return (
    <div className="w-full h-full md:py-[15%] max-sm:py-[30%]">
      <h2 className="max-w-7xl text-center pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-300 dark:text-neutral-200 font-sans">
        Upcoming Events
      </h2>
      
      <div className="w-80 mx-auto my-10">
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
          <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
                <Image
                    src={EventContent.image}
                    alt="thumbnail"
                    className="group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200"
                    sizes="100%"
                    objectFit="cover"
                    
                />
          </div>
          <div className="p-4">
            <h2 className="font-bold my-4 text-lg text-zinc-700">
              {EventContent.title}
            </h2>
            <h2 className="font-normal my-4 text-sm text-zinc-500">
              {EventContent.description}
            </h2>
            <div className="flex flex-row justify-between items-center mt-10">
              <span className="text-sm text-gray-500">{EventContent.date}</span>
              <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
                Read More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

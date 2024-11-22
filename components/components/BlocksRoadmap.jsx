import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Section from "./Section";

const BlocksRoadmap = () => {
  const [roadmaps, setRoadmaps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Fetch roadmaps from API
    const fetchRoadmaps = async () => {
      try {
        const response = await fetch("/api/roadmap");
        if (!response.ok) {
          throw new Error("Failed to fetch roadmaps");
        }
        const data = await response.json();
        setRoadmaps(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  if (loading) {
    return (
      <Section className="pt-[12rem] -mt-[5.25rem]"  customPaddings>
        <div className="text-center">Loading roadmaps...</div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="pt-[12rem] -mt-[5.25rem]"   customPaddings>
        <div className="text-center text-red-600">Error: {error}</div>
      </Section>
    );
  }

  return (
    <Section className="pt-[8rem] -mt-[5.25rem]"   customPaddings>
      <div className="relative mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <Link key={roadmap.id} href={`/roadmap/${roadmap.id}`}>
            <motion.div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-lg bg-slate-500 cursor-pointer hover:bg-conic-gradient`}
              initial={{ opacity: 1, scale: 0.95, y: 100 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="bg-gray-800 rounded-lg w-full shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-3 flex w-full flex-col justify-between h-full">
                  <h3 className="text-lg text-neutral-100">{roadmap.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      
      </div>
    </Section>
  );
};

export default BlocksRoadmap;

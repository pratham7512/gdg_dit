import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Section from "@/components/components/Section";

const BlocksRoadmap = () => {
  const [roadmaps, setRoadmaps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
      <Section className="py-20">
        <RoadmapSkeleton />
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="py-20">
        <div className="text-center text-red-500">Error: {error}</div>
      </Section>
    );
  }

  return (
    <Section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Explore Our Roadmaps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmaps.map((roadmap, index) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
        ))}
      </div>
    </Section>
  );
};

const RoadmapCard = ({ roadmap, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={`/roadmap/${roadmap.id}`}>
      <Card className="group h-full bg-black hover:bg-gradient-to-br from-primary/10 to-secondary/10 transition-all duration-300 border-primary/20 hover:border-primary/40">
        <CardContent className="p-6 flex flex-col h-full">
          <h3 className="text-2xl font-semibold mb-4 text-primary group-hover:text-secondary transition-colors duration-300">
            {roadmap.title}
          </h3>
          <p className="text-muted-foreground mb-6 flex-grow">
            {roadmap.description}
          </p>
          <div className="flex items-center text-primary group-hover:text-secondary transition-colors duration-300">
            <span className="mr-2">Explore</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

const RoadmapSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <Card key={index} className="bg-black border-primary/20">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-3/4 mb-4 bg-primary/20" />
          <Skeleton className="h-4 w-full mb-2 bg-muted" />
          <Skeleton className="h-4 w-5/6 mb-6 bg-muted" />
          <Skeleton className="h-4 w-1/4 bg-primary/20" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export default BlocksRoadmap;


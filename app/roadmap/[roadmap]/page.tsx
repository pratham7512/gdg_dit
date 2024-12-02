'use client'
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ButtonGradient from '@/components/assets/svg/ButtonGradient';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/components/Footer';
import Header from '@/components/components/Header';
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from 'lucide-react';
import { NotionPage } from "@/components/components/NotionPage";
import { notion } from "@/lib/notion";

interface RoadmapData {
  notionLink: string;
  steps: string[];
}

export default function RoadmapPage({ params }: { params: { roadmap: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [notionData, setNotionData] = useState<any | null>(null);
  const [rootPageId, setRootPageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`/api/roadmap?id=${params.roadmap}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap data');
        }
        const data: RoadmapData = await response.json();
        setRoadmapData(data);

        // Extract the Notion page ID from the notionLink
        const notionIdMatch = data.notionLink.match(/([a-zA-Z0-9]{32})$/);
        if (notionIdMatch) {
          const extractedId = notionIdMatch[0];
          setRootPageId(extractedId);

          // Fetch Notion data for the page ID
          const notionPageData = await notion.getPage(extractedId);
          setNotionData(notionPageData);
        }
      } catch (error) {
        console.error('Error fetching roadmap data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmap();
    document.body.style.cursor = 'default';
    window.scrollTo(0, 0);
  }, [params.roadmap]);

  return (
    <div className="pt-[2.8rem] min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-grow container px-1 md:px-4 py-8">
        {isLoading ? (
          <RoadmapSkeleton />
        ) : roadmapData ? (
          <div className="w-full h-full">
            {rootPageId && notionData && (
              <div className="mb-6">
                <NotionPage recordMap={notionData} rootPageId={rootPageId} />
              </div>
            )}

            <div className="text-white">
              <ul className="space-y-2">
                {roadmapData.steps && roadmapData.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No roadmap data available.</p>
        )}
      </main>

      <Footer />
      <AnimatePresence mode="wait">
        {!isLoading && <Chatbot />}
      </AnimatePresence>
      <ButtonGradient />
    </div>
  );
}

function RoadmapSkeleton() {
  return (
    <div className="w-full text-white">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-6" />
      <Skeleton className="h-[75vh] w-full mb-6" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

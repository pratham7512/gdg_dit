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
import { type ExtendedRecordMap } from 'notion-types'

interface RoadmapData {
  notionLink: string;
  steps: string[];
}

// Function to extract Notion page ID from a URL
function extractNotionPageId(url: string): string | null {
  // Regex to match 32-character hexadecimal/alphanumeric ID at the end of the URL
  const idRegex = /([a-f0-9]{32})$/i;
  
  try {
    // Try parsing as a URL first
    const parsedUrl = new URL(url);
    const matchedId = parsedUrl.pathname.match(idRegex);
    
    if (matchedId) {
      return matchedId[1];
    }
    
    // Fallback to direct string matching if URL parsing fails
    const directMatch = url.match(idRegex);
    return directMatch ? directMatch[1] : null;
  } catch {
    // If URL parsing fails, try direct regex matching
    const directMatch = url.match(idRegex);
    return directMatch ? directMatch[1] : null;
  }
}

async function getData(rootPageId: string) {
  return await notion.getPage(rootPageId);
}

export default function RoadmapPage({ params }: { params: { roadmap: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [notionData, setNotionData] = useState<ExtendedRecordMap | null>(null);
  const [rootPageId, setRootPageId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoadmapData() {
      try {
        const response = await fetch(`/api/roadmap?id=${params.roadmap}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap data');
        }
        
        const rdata: RoadmapData = await response.json();
        setRoadmapData(rdata);

        // Extract the Notion page ID from the notionLink
        const extractedId = extractNotionPageId(rdata.notionLink);
        
        if (extractedId) {
          setRootPageId(extractedId);
          
          // Fetch Notion data for the page ID
          const notionPageData = await getData(extractedId);
          setNotionData(notionPageData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching roadmap data:', error);
        setIsLoading(false);
      }
    }

    fetchRoadmapData();
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
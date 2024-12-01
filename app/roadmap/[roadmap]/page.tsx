'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ButtonGradient from '@/components/assets/svg/ButtonGradient'
import Chatbot from '@/components/Chatbot'
import Footer from '@/components/components/Footer'
import Header from '@/components/components/Header'
import { Card, CardContent, CardHeader,} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle2 } from 'lucide-react'

interface RoadmapData {
  notionHtmlFileUrl: string;
  steps: string[];
}

export default function RoadmapPage({ params }: { params: { roadmap: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  // const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`/api/roadmap?id=${params.roadmap}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap data');
        }
        const data = await response.json();
        setRoadmapData(data);
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
    <div className="lg:pt-[2.8rem] min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <RoadmapSkeleton />
        ) : roadmapData ? (
          <Card className="w-full bg-card border border-card text-card-foreground">
            <CardContent>
              {roadmapData.notionHtmlFileUrl && (
                <div className="mb-6">
                  <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
                    <div className="relative h-[80vh] overflow-hidden max-w-full">
                      <iframe
                        src={roadmapData.notionHtmlFileUrl}
                        className="absolute top-0 left-0 w-full h-full border-0"
                        style={{
                          minHeight: '600px',
                          maxHeight: '95vh'
                        }}
                        title="Notion Roadmap"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <ul className="space-y-2">
                  {roadmapData.steps && roadmapData.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-muted-foreground">No roadmap data available.</p>
        )}
      </main>

      <Footer />

      <AnimatePresence mode='wait'>
        {!isLoading && <Chatbot />}
      </AnimatePresence>

      <ButtonGradient />
    </div>
  )
}

function RoadmapSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />
        <Skeleton className="h-[600px] w-full mb-6" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </CardContent>
    </Card>
  )
}


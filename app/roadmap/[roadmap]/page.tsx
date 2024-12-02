import Footer from '@/components/components/Footer';
import Header from '@/components/components/Header';
import NotionRoadmap from '@/components/components/NotionRoadmap';
import { CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRoadmapData } from '@/lib/fetchRoadmapData';

interface RoadmapData {
  notionLink: string;
  steps: string[];
}

interface RoadmapPageProps {
  params: { roadmap: string };
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  // Fetch the roadmap data server-side
  const roadmapData: RoadmapData | null = await fetchRoadmapData(params.roadmap);

  return (
    <>
      <Header />
      <main>
        {roadmapData ? (
          <div>
            {roadmapData.notionLink && (
              <NotionRoadmap rootPageid={roadmapData.notionLink} />
            )}
            {roadmapData.steps.map((step: string, index: number) => (
              <div key={index} className="step-item">
                <CheckCircle2 className="icon" />
                {step}
              </div>
            ))}
          </div>
        ) : (
          <RoadmapSkeleton />
        )}
      </main>
      <Footer />
    </>
  );
}

function RoadmapSkeleton() {
  return (
    <div className="skeleton-container">
      <Skeleton className="w-48 h-8 mb-4" />
      <Skeleton className="w-96 h-4" />
      <Skeleton className="w-96 h-4" />
    </div>
  );
}

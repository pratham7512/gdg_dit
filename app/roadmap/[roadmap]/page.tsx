import Footer from '@/components/components/Footer';
import Header from '@/components/components/Header';
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from 'lucide-react';
import NotionRoadmap from '@/components/components/NotionRoadmap';
import { useRoadmap } from '@/hooks/useRoadmap';

interface RoadmapPageProps {
  params: { roadmap: string }; // Expecting `params` as a prop
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const { isLoading, roadmapData, error } = useRoadmap({ roadmapId: params.roadmap });

  return (
    <>
      <Header />
      <main>
        {isLoading ? (
          <RoadmapSkeleton />
        ) : error ? (
          <div>Error: {error}</div>
        ) : roadmapData ? (
          <div>
            {roadmapData.notionLink && (
              <NotionRoadmap rootPageid={roadmapData.notionLink} />
            )}
            {roadmapData.steps.map((step, index) => (
              <div key={index} className="step-item">
                <CheckCircle2 className="icon" />
                {step}
              </div>
            ))}
          </div>
        ) : (
          <div>No roadmap data available.</div>
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

export async function getServerSideProps(context: { params: { roadmap: string } }) {
  const { params } = context;

  return {
    props: {
      params,
    },
  };
}

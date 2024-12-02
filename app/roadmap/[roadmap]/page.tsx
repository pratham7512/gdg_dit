import Footer from '@/components/components/Footer';
import Header from '@/components/components/Header';
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from 'lucide-react';
import NotionRoadmap from '@/components/components/NotionRoadmap';

interface RoadmapData {
  notionLink: string;
  steps: string[];
}

interface RoadmapPageProps {
  roadmapData: RoadmapData | null;
}

export default function RoadmapPage({ roadmapData }: RoadmapPageProps) {
  return (
    <>
      <Header />
      <main>
        {roadmapData ? (
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

export function RoadmapSkeleton() {
  return (
    <div className="skeleton-container">
      <Skeleton className="w-48 h-8 mb-4" />
      <Skeleton className="w-96 h-4" />
      <Skeleton className="w-96 h-4" />
    </div>
  );
}

export async function getServerSideProps(context: { params: { roadmap: string } }) {
  const { roadmap } = context.params;
  let roadmapData: RoadmapData | null = null;

  try {
    const response = await fetch(`/api/roadmap?id=${roadmap}`);
    if (response.ok) {
      roadmapData = await response.json();
    } else {
      console.error(`Failed to fetch roadmap data: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching roadmap data:', error);
  }

  return {
    props: {
      roadmapData,
    },
  };
}

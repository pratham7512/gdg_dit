import { useEffect, useState } from 'react';

interface RoadmapData {
  notionLink: string;
  steps: string[];
}

interface UseRoadmapParams {
  roadmapId: string;
}

export function useRoadmap({ roadmapId }: UseRoadmapParams) {
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`/api/roadmap?id=${roadmapId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap data');
        }
        const data: RoadmapData = await response.json();
        setRoadmapData(data);
      } catch (err) {
        setError((err as Error).message || 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmap();
    document.body.style.cursor = 'default';
    window.scrollTo(0, 0);
  }, [roadmapId]);

  return { isLoading, roadmapData, error };
}

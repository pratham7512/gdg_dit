export async function fetchRoadmapData(roadmapId: string) {
    try {
      const response = await fetch(`/api/roadmap?id=${roadmapId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch roadmap data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching roadmap data:', error);
      return null;
    }
  }
  
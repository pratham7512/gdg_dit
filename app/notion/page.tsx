import { NotionPage } from "@/components/components/NotionPage";
import { notion } from "@/lib/notion";
import { ref, get } from 'firebase/database';
import { database } from "@/app/firebase/config";

type Roadmap = {
  notionLink: string;
};

type FirebaseRoadmap = Record<string, Roadmap>;

export const fetchRoadmap = async (id: string): Promise<string | null> => {
  const dbRef = ref(database, "roadmaps");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const data = snapshot.val() as FirebaseRoadmap;

    // Check if the ID exists in the fetched data
    if (id in data) {
      return data[id].notionLink || null; // Return null if notionLink is not available
    }
  }
  
  // Return null if snapshot doesn't exist or ID is not found
  return null;
};

// Default root page ID
const defaultRootPageId = "6b6c2a9f1282499aba4782b88bf7e204";

// Fetch the Notion page data based on the provided rootPageId
async function getData(rootPageId: string) {
  try {
    return await notion.getPage(rootPageId);
  } catch (error) {
    console.error("Error fetching Notion page:", error);
    throw new Error("Failed to fetch Notion page");
  }
}

export default async function Home() {
  const roadmapId = "95fc1a80-eae1-4c0c-ae2f-85c5e91ab16a";
  const notionLink = await fetchRoadmap(roadmapId);

  // Use the fetched notion link or fallback to the default root page ID
  const rootPageId = notionLink || defaultRootPageId;

  let data;
  try {
    data = await getData(rootPageId);
  } catch (error) {
    console.error("Error fetching data for Notion page:", error);
    return <div>Error loading Notion page.</div>; // Handle error gracefully in UI
  }

  return (
    <>
      <div>This is the fetched Notion link: {notionLink || "No link found"}</div>
      <NotionPage recordMap={data} rootPageId={rootPageId} />
    </>
  );
}
import { NotionPage } from "@/components/components/NotionPage";
import { notion } from "@/lib/notion";

export const fetchRoadmap = async (id: string): Promise<string> => {
    const response = await fetch(`/api/roadmap?id=${id}`);
    const data = await response.json();
    return data.notionLink ;
};

// Default root page ID
const defaultRootPageId = "6b6c2a9f1282499aba4782b88bf7e204";

// Fetch the Notion page data based on the provided rootPageId
async function getData(rootPageId: string) {
  return await notion.getPage(rootPageId);
}

export default async function Home() {
  const notionLink = await fetchRoadmap("95fc1a80-eae1-4c0c-ae2f-85c5e91ab16a");

  const rootPageId = notionLink || defaultRootPageId;
  const data = await getData(rootPageId);

  return (
    <>
      <div> This is the fetched notion link: {notionLink} </div>
      <NotionPage recordMap={data} rootPageId={rootPageId} />
    </>
  );
}

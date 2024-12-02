import NotionRoadmap from "@/components/components/NotionRoadmap";

const rootPageId = "98d8acfc9a0c4b98b94d68324d219b97";


  export default function Home() {
  
    return (
      <NotionRoadmap rootPageid={rootPageId} />
    );
  }
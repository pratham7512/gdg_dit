import { NotionPage } from "@/components/components/NotionPage";
import {notion} from "@/lib/notion"

const rootPageId = "98d8acfc9a0c4b98b94d68324d219b97";

async function getData(rootPageId:string) {
    return await notion.getPage(rootPageId);
  }
  export default async function Home() {
    const data = await getData(rootPageId);
  
    return (
      <NotionPage recordMap={data} rootPageId={rootPageId} />
    );
  }
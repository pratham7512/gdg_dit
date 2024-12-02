import { NotionPage } from "@/components/components/NotionPage";
import {notion} from "@/lib/notion"


async function getData(rootPageId:string) {
    return await notion.getPage(rootPageId);
  }
  export default async function NotionRoadmap({rootPageid}:{rootPageid:string}) {
    const data = await getData(rootPageid);
  
    return (
      <NotionPage recordMap={data} rootPageId={rootPageid} />
    );
  }
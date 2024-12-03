
import { AnimatePresence } from 'framer-motion'
import ButtonGradient from '@/components/assets/svg/ButtonGradient'
import Chatbot from '@/components/Chatbot'
import Footer from '@/components/components/Footer'
import Header from '@/components/components/Header'
import { ref, get } from 'firebase/database';
import { database } from "@/app/firebase/config";
import NotionRoadmap from '@/components/components/NotionRoadmap'

type Roadmap = {
  notionLink: string;
};

type FirebaseRoadmap = Record<string, Roadmap>;

const fetchRoadmap = async (id: string): Promise<string | null> => {
  const dbRef = ref(database, "roadmaps");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const data = snapshot.val() as FirebaseRoadmap;
    if (id in data) {
      return data[id].notionLink || null; // Return null if notionLink is not available
    }
  }
  return null;
};

// Default root page ID
const defaultRootPageId = "6b6c2a9f1282499aba4782b88bf7e204";

export default async function RoadmapPage({ params }: { params: { roadmap: string } }) {
  const notionLink = await fetchRoadmap(params.roadmap);
  const rootPageId = notionLink || defaultRootPageId;
  return (
    <div className="lg:pt-[0.8rem] overflow-hidden bg-black">
    <Header />
    <div className="pt-[4.8rem] md:pt-[3.8rem]">
          <NotionRoadmap rootPageid={rootPageId} />
      <AnimatePresence mode='wait'>
        {<Chatbot />}
      </AnimatePresence>
      <ButtonGradient />
    </div>
    <Footer />
    </div>
  )
}


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

export default async function RoadmapPage({ params }: { params: { roadmapId: string } }) {
  const notionLink = await fetchRoadmap(params.roadmapId);
  const rootPageId = notionLink || defaultRootPageId;
  return (
    <div className="pt-[2.8rem] min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow container px-1 md:px-4 py-8">
          <div className="w-full h-full">
              <div className="mb-6">
                <div className="w-full overflow-hidden rounded-lg">
                  <div className="relative w-full h-[87vh]"> {/* 4:3 Aspect Ratio */}
                      <NotionRoadmap rootPageid={rootPageId} />
                  </div>
                </div>
              </div>
          </div>
      </main>
      <Footer />
      <AnimatePresence mode='wait'>
        {<Chatbot />}
      </AnimatePresence>
      <ButtonGradient />
    </div>
  )
}

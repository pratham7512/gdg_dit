
import { AnimatePresence } from 'framer-motion'
import ButtonGradient from '@/components/assets/svg/ButtonGradient'
import Chatbot from '@/components/Chatbot'
import Footer from '@/components/components/Footer'
import Header from '@/components/components/Header'
import { ref, get } from 'firebase/database';
import { database } from "@/app/firebase/config";
import NotionRoadmap from '@/components/components/NotionRoadmap'
import { useSession } from "next-auth/react";
import { AuthDialog } from '@/components/components/Signin'
import Button from '@/components/components/Button'

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
  const {status} =  useSession();
  if (status === 'unauthenticated') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
        <div className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-black border">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Please Sign In
            </h2>
            <p className="text-gray-300 mb-8">
              You need to be login to access this content.
            </p>
            <AuthDialog initialMode="signin">
            <Button className='z-20 relative border font-bold border-white rounded-lg hover:bg-gray-300'>
              Sign In
            </Button>
            </AuthDialog>
          </div>
        </div>
      </div>
    );
  }
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

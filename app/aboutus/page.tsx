import Community from "@/components/components/Community";
import Footer from "@/components/components/Footer";
import { Team } from "@/components/components/gdgTeam";
import Header from "@/components/components/Header";
import PastEvents from "@/components/components/PastEvents";




export default function TimelineDemo() {


  return (
    <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden bg-black bg-grid-white/[0.090]">
      <Header />
      <Team/> {/* Pass dynamically fetched data */}
      <PastEvents />
      <Community />
      <Footer />
    </div>
  );
}
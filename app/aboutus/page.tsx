import Community from "@/components/components/Community";
import Footer from "@/components/components/Footer";
import { Team } from "@/components/components/gdgTeam";
import Header from "@/components/components/Header";
import PastEvents from "@/components/components/PastEvents";

export default function TimelineDemo() {
  const data = [{
    name: "Mia Ward",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/1000?u=mia@gdsc.dev",
  },
  {
    name: "Phoenix Baker",
    role: "Head of Engineering",
    image: "https://i.pravatar.cc/1000?u=phoenix@gdsc.dev",
  },
  {
    name: "Lana Steiner",
    role: "Chief Operating Office",
    image: "https://i.pravatar.cc/1000?u=lana@gdsc.dev",
  },
  {
    name: "Michael Chen",
    role: "Lead Designer",
    image: "https://i.pravatar.cc/1000?u=michael@gdsc.dev",
  },
  {
    name: "David Kim",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/1000?u=david@gdsc.dev",
  },
  {
    name: "Sarah Park",
    role: "Backend Developer",
    image: "https://i.pravatar.cc/1000?u=sarah@gdsc.dev",
  },
]

  return (
    <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden bg-black bg-grid-white/[0.090]">
      <Header />
      <Team data={data} />
      <PastEvents/>
      <Community/>
      <Footer/>
    </div>
  );
}


import TeamMember from "@/components/components/TeamMember";
import { Team } from "@/components/ui/gdgTeam";

export default function TimelineDemo() {
  const data = [
    {
      title: "Web Development",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="John Doe"
            designation="Frontend Lead"
            imageUrl="https://i.pravatar.cc/1000?u=lam@gdsc.dev"
            color="bg-red-500"
          />
          <TeamMember 
            name="Jane Smith"
            designation="Backend Developer"
            imageUrl="https://i.pravatar.cc/1000?u=jane.smith@gdsc.dev"
            color="bg-blue-500"
          />
          <TeamMember 
            name="Mike Johnson"
            designation="Full Stack Developer"
            imageUrl="https://i.pravatar.cc/1000?u=mike.johnson@gdsc.dev"
            color="bg-yellow-500"
          />
          <TeamMember 
            name="Alex Chen"
            designation="Data Scientist"
            imageUrl="https://i.pravatar.cc/1000?u=alex@gdsc.dev"
            color="bg-green-500"
          />
        </div>
      ),
    },
    {
      title: "AI/ML",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Sarah Wilson"
            designation="ML Engineer"
            imageUrl="https://i.pravatar.cc/1000?u=sarah@gdsc.dev"
            color="bg-red-500"
          />
          <TeamMember 
            name="Alex Chen"
            designation="Data Scientist"
            imageUrl="https://i.pravatar.cc/1000?u=alex@gdsc.dev"
            color="bg-green-500"
          />
          <TeamMember 
            name="John Doe"
            designation="Frontend Lead"
            imageUrl="https://i.pravatar.cc/1000?u=lam@gdsc.dev"
            color="bg-red-500"
          />
        </div>
      ),
    },
    {
      title: "Android Development",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="David Kumar"
            designation="Android Lead"
            imageUrl="https://i.pravatar.cc/1000?u=david.kumar@gdsc.dev"
            color="bg-green-500"
          />
          <TeamMember 
            name="Lisa Park"
            designation="Mobile Developer"
            imageUrl="https://i.pravatar.cc/1000?u=lisa@gdsc.dev"
            color="bg-blue-500"
          />
          <TeamMember 
            name="Alex Chen"
            designation="Data Scientist"
            imageUrl="https://i.pravatar.cc/1000?u=alex@gdsc.dev"
            color="bg-green-500"
          />
        </div>
      ),
    },
    {
      title: "Cloud Computing",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Ryan Cloud"
            designation="Cloud Architect"
            imageUrl="https://i.pravatar.cc/1000?u=ryan.cloud@gdsc.dev"
            color="bg-purple-500"
          />
          <TeamMember 
            name="Emma Watson"
            designation="DevOps Engineer"
            imageUrl="https://i.pravatar.cc/1000?u=emma.watson@gdsc.dev"
            color="bg-indigo-500"
          />
          <TeamMember 
            name="John Doe"
            designation="Frontend Lead"
            imageUrl="https://i.pravatar.cc/1000?u=lam@gdsc.dev"
            color="bg-red-500"
          />
        </div>
      ),
    },
    {
      title: "UI/UX Design",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Sophie Chen"
            designation="UI/UX Lead"
            imageUrl="https://i.pravatar.cc/1000?u=sophie.chen@gdsc.dev"
            color="bg-pink-500"
          />
          <TeamMember 
            name="Tom Wright"
            designation="Product Designer"
            imageUrl="https://i.pravatar.cc/1000?u=tom.wright@gdsc.dev"
            color="bg-orange-500"
          />
          <TeamMember 
            name="John Doe"
            designation="Frontend Lead"
            imageUrl="https://i.pravatar.cc/1000?u=lam@gdsc.dev"
            color="bg-red-500"
          />
          <TeamMember 
            name="Alex Chen"
            designation="Data Scientist"
            imageUrl="https://i.pravatar.cc/1000?u=alex@gdsc.dev"
            color="bg-green-500"
          />
        </div>
      ),
    },
    {
      title: "Cybersecurity",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Marcus Security"
            designation="Security Lead"
            imageUrl="https://i.pravatar.cc/1000?u=marcus.security@gdsc.dev"
            color="bg-teal-500"
          />
          <TeamMember 
            name="Nina Shield"
            designation="Security Analyst"
            imageUrl="https://i.pravatar.cc/1000?u=nina.shield@gdsc.dev"
            color="bg-cyan-500"
          />
          <TeamMember 
            name="Ryan Cloud"
            designation="Cloud Architect"
            imageUrl="https://i.pravatar.cc/1000?u=ryan.cloud@gdsc.dev"
            color="bg-purple-500"
          />
          <TeamMember 
            name="Emma Watson"
            designation="DevOps Engineer"
            imageUrl="https://i.pravatar.cc/1000?u=emma.watson@gdsc.dev"
            color="bg-indigo-500"
          />
        </div>
      ),
    }
  ];

  return (
    <div >
      <Team data={data} />
    </div>
  );
}

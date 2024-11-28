'use client'

import { useState } from 'react'
import { Search, Plus, MoreVertical, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')

  const communities = [
    {
      id: 7,
      name: "Cybersecurity",
      message: "Join us to discuss cybersecurity topics!",
      time: "Now",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=CS",
      link: "https://chat.whatsapp.com/KOEVISf5fceBWbgRL7st32"
    },
    {
      id: 8,
      name: "Flutter",
      message: "Connect with Flutter developers!",
      time: "Now",
      image: "https://cdn.prod.website-files.com/5ee12d8d7f840543bde883de/5ef3a1148ac97166a06253c1_flutter-logo-white-inset.svg",
      link: "https://chat.whatsapp.com/CjEpoHXbfmF3AfkZ1LEp5X"
    },
    {
      id: 9,
      name: "Android",
      message: "Join our Android development community!",
      time: "Now",
      image: "https://i.pinimg.com/736x/95/b7/e1/95b7e17b5161175de4fe88b1b2602236.jpg",
      link: "https://chat.whatsapp.com/GNXhJwCpwPR28YaUNAFe2B"
    },
    {
      id: 10,
      name: "Competitive Programming",
      message: "Sharpen your coding skills with us!",
      time: "Now",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1ifvMfrD9VzaphHBYLhM6wUV-YHR0g28Ow&s",
      link: "https://chat.whatsapp.com/E61t8Fk2hGn1H91dumtWHE"
    },
    {
      id: 11,
      name: "Cloud Computing",
      message: "Join our cloud computing discussions!",
      time: "Now",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfZtWD6rC11TPy0gP1hGCQAjAYPizxyMRZA&s",
      link: "https://chat.whatsapp.com/KRjmxF7C4ScH192QSXeeiF"
    },
    {
      id: 12,
      name: "AI/ML",
      message: "Explore AI and ML topics with us!",
      time: "Now",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1ifvMfrD9VzaphHBYLhM6wUV-YHR0g28Ow&s",
      link: "https://chat.whatsapp.com/EVlz7THQclX6bsjkiIUfvM"
    },
    {
      id: 13,
      name: "UI/UX",
      message: "Join our UI/UX design community!",
      time: "Now",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1ifvMfrD9VzaphHBYLhM6wUV-YHR0g28Ow&s",
      link: "https://chat.whatsapp.com/EfO8Y4892LPHBhNR0dPONu"
    },
    {
      id: 14,
      name: "Blockchain",
      message: "Discuss blockchain technology with us!",
      time: "Now",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1ifvMfrD9VzaphHBYLhM6wUV-YHR0g28Ow&s",
      link: "https://chat.whatsapp.com/FqlBROKCJipH8kxxuLss6j"
    },
    {
      id: 15,
      name: "Web Dev Community",
      message: "Join our Web Development community!",
      time: "Now",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1ifvMfrD9VzaphHBYLhM6wUV-YHR0g28Ow&s",
      link: "https://chat.whatsapp.com/JWantqkWXr30chv4HcYwWb"
    }
  ]

  const filters = ["All", "Unread", "Favorites", "Groups"]

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-4 lg:p-8 min-h-screen bg-background">
      <Card className="w-full lg:w-[500px] bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Communities</CardTitle>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add community</span>
            </Button>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search" 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="flex gap-2 pb-4 overflow-x-auto">
              {filters.map((filter, index) => (
                <Button
                  key={filter}
                  variant={index === 0 ? "default" : "outline"}
                  className="rounded-full px-4 py-1 h-auto text-sm"
                >
                  {filter}
                </Button>
              ))}
            </div>
            {filteredCommunities.map((community) => (
              <a
                key={community.id}
                href={community.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={community.image} alt={community.name} />
                  <AvatarFallback>{community.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{community.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {community.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {community.message}
                  </p>
                </div>
              </a>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-[500px] mt-8 lg:mt-0">
        <CardContent className="pt-6">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
            Join our WhatsApp communities now!
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Connect with fellow developers, share knowledge, and stay updated on the latest in tech. Our GDSC communities are the perfect place to grow your skills and network with like-minded individuals.
          </p>
          <Button size="lg" className="w-full sm:w-auto" onClick={() => window.open("https://chat.whatsapp.com/Jt2uFQ1vQf249FHpFCnPGh", "_blank")}>
            Explore All Communities
          </Button>
        </CardContent>
      </Card>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bottom-4 right-4 lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open communities</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Communities</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ScrollArea className="flex-1">
              {filteredCommunities.map((community) => (
                <a
                  key={community.id}
                  href={community.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={community.image} alt={community.name} />
                    <AvatarFallback>{community.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{community.name}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {community.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {community.message}
                    </p>
                  </div>
                </a>
              ))}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
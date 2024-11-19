'use client'

import { useState } from 'react'
import { Search, Plus, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Community() {
  const [searchTerm, setSearchTerm] = useState('')

  const communities = [
    {
      id: 1,
      name: "Web Development Community",
      message: "Join us to learn and discuss web development!",
      time: "Thursday",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=WD"
    },
    {
      id: 2,
      name: "Android Development",
      message: "🎯 Learn Android app development with Kotlin",
      time: "01:17",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=AD"
    },
    {
      id: 3,
      name: "AI/ML Community GDSC",
      message: "📚 Resources for getting started with AI/ML",
      time: "00:38",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=AI"
    },
    {
      id: 4,
      name: "Blockchain Tech",
      message: "New meeting scheduled for tomorrow!",
      time: "Yesterday",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=BT"
    },
    {
      id: 5,
      name: "Cloud Computing",
      message: "AWS workshop this weekend! 🚀",
      time: "Yesterday",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=CC"
    },
    {
      id: 6,
      name: "Coding Club GDSC",
      message: "✨ DSA Problems discussion at 6 PM",
      time: "Yesterday",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=CG"
    }
  ]

  const filters = ["All", "Unread", "Favorites", "Groups"]

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex justify-center items-start gap-8 p-8 min-h-screen">
      <div className="w-full max-w-md bg-[#111B21] rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">Communities</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
              <Plus className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search" 
              className="w-full bg-[#202C33] border-none text-white pl-10 placeholder:text-gray-400 focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 p-2 overflow-x-auto scrollbar-none">
          {filters.map((filter, index) => (
            <Button
              key={filter}
              variant="ghost"
              className={cn(
                "text-sm rounded-full px-4 py-1 h-auto",
                index === 0 ? "bg-[#00A884] text-white hover:bg-[#00A884]" : "text-gray-400 hover:bg-[#202C33]"
              )}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="h-[calc(95vh-240px)] overflow-y-auto">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className="flex items-center gap-3 p-3 hover:bg-[#202C33] cursor-pointer border-b border-gray-800"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={community.image} />
                <AvatarFallback className="bg-[#202C33] text-white">
                  {community.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-medium truncate">{community.name}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {community.time}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {community.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-4/5">
              <div>Join our WhatsApp</div>  
              <div>communities now !</div>
            </h1>
        <p className="text-xl text-gray-400 mt-5">
          Connect with fellow developers, share knowledge, and stay updated on the latest in tech. Our GDSC communities are the perfect place to grow your skills and network with like-minded individuals.
        </p>
        <Button className="mt-6 bg-[#00A884] hover:bg-[#008f6f] text-white">
          Explore All Communities
        </Button>
      </div>
    </div>
  )
}
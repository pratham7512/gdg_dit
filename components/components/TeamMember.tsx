'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface ProfileCardProps {
  name?: string
  designation?: string
  imageUrl?: string
  color?: string
}

export default function TeamMember({
  name = "Team Member",
  designation = "Developer",
  imageUrl = "/placeholder.svg?height=400&width=300",
  color = "red"
}: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full">
      {/* Shadow card that appears on hover */}
      <div 
        className={` absolute inset-0 ${color} transition-all duration-300 ease-in-out rounded-lg ${
          isHovered ? 'translate-x-1 translate-y-1' : 'translate-x-0 translate-y-0 m-1'
        }`} 
      />
      
      {/* Main card */}
      <Card
        className={`relative rounded-lg w-full transition-all duration-300 ease-in-out ${
          isHovered 
            ? '-translate-x-2 -translate-y-2 bg-black' 
            : 'translate-x-0 translate-y-0 bg-black'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative overflow-hidden rounded-t-lg">
          {/* Black and white image */}
          <img
            src={imageUrl}
            alt={name}
            className={`w-full h-[150px] object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-0' : 'opacity-100 grayscale'
            }`}
          />
          {/* Color image (positioned absolutely over the B&W image) */}
          <img
            src={imageUrl}
            alt={name}
            className={`absolute inset-0 w-full h-[150px] object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Text content */}
        <div className="p-4">
          <h3 
            className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
              isHovered ? 'text-white' : 'text-white'
            }`}
          >
            {name}
          </h3>
          <p 
            className={`text-sm transition-colors duration-300 ${
              isHovered ? 'text-gray-300' : 'text-gray-300'
            }`}
          >
            {designation}
          </p>
        </div>
      </Card>
    </div>
  )
}
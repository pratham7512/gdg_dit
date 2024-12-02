'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'


export default function CreateRoadmap() {
  const router = useRouter()
  const [roadmapData, setRoadmapData] = useState({
    id: Date.now(),
    name: '',
    steps:[],
    status: 'Planning',
    notionLink: '', 
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRoadmapData((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!roadmapData.notionLink) {
      return alert("Please upload the notionLink.")
    }

    // Upload the file to Firebase Storage (or your chosen storage solution)
    // const file = roadmapData.notionLink
    
    // Now save the file URL along with other roadmap data
    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: roadmapData.name,
          description: 'Roadmap description',
          status: roadmapData.status,
          notionLink: roadmapData.notionLink, // Save the file URL
        }),
      })

      const result = await response.json()
      if (response.ok) {
        router.push('/ditgdgadmin/dashboard')
      } else {
        console.error('Error saving roadmap:', result.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Roadmap</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Roadmap Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={roadmapData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="notionLink">notion Link</Label>
              <Input
                type="text"
                id="notionLink"
                name="notionLink"
                value={roadmapData.notionLink}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Input
                type="text"
                id="status"
                name="status"
                value={roadmapData.status}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit">Save Roadmap</Button>
      </form>
      {roadmapData.notionLink && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Preview</h2>
          <iframe
            src={(roadmapData.notionLink)} // Directly using the uploaded HTML file
            title="Notion Roadmap"
            width="100%"
            height="600px"
            className="border rounded"
            allow="fullscreen"
          />
        </div>
      )}
    </div>
  )
}

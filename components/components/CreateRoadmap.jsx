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
    steps: [],
    status: 'Planning',
    notionLink: '', // For Notion link
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRoadmapData((prev) => ({ ...prev, [name]: value }))
  }

  const extractRootId = (url) => {
    const match = url.match(/([a-f0-9]{32})/)
    return match ? match[0] : null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!roadmapData.notionLink) {
      return alert("Please enter the Notion link.")
    }

    const rootId = extractRootId(roadmapData.notionLink)
    if (!rootId) {
      return alert("Invalid Notion link. Please check the URL.")
    }

    // Save the root ID along with other roadmap data
    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: roadmapData.name,
          description: 'Roadmap description',
          status: roadmapData.status,
          notionRootId: rootId, // Save the extracted root ID
        }),
      })

      const result = await response.json()
      if (response.ok) {
        router.push('/admin/dashboard')
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
              <Label htmlFor="notionLink">Notion Link</Label>
              <Input
                type="url"
                id="notionLink"
                name="notionLink"
                value={roadmapData.notionLink}
                onChange={handleInputChange}
                placeholder="https://example.notion.site/Your-Roadmap-98d8acfc9a0c4b98b94d68324d219b97"
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
    </div>
  )
}

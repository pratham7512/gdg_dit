'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { exportToSvg } from "@excalidraw/excalidraw"

// Dynamically import Excalidraw to avoid SSR issues
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
)

export default function CreateRoadmap() {
  const router = useRouter()
  const [roadmapData, setRoadmapData] = useState({
    id: Date.now(), // Add a unique ID for each roadmap
    name: '',
    details: '',
    faq: [],
    exercises: '',
    companyQuestions: '',
    previousYearQuestions: [],
    status: 'Planning', // Add a default status
    drawData:{},
  })
  const [excalidrawData, setExcalidrawData] = useState(null)
  const [faqCount, setFaqCount] = useState(1)
  const [pyqCount, setPyqCount] = useState(1)

  useEffect(() => {
    // Load existing roadmap data if available (for editing)
    const savedData = localStorage.getItem('editingRoadmap')
    if (savedData) {
      setRoadmapData(JSON.parse(savedData))
      localStorage.removeItem('editingRoadmap') // Clear after loading
    }
    // Load Excalidraw data if available
    const savedExcalidrawData = localStorage.getItem('excalidrawData')
    if (savedExcalidrawData) {
      setExcalidrawData(JSON.parse(savedExcalidrawData))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRoadmapData(prev => ({ ...prev, [name]: value }))
  }

  const handleFaqChange = (index, field, value) => {
    const updatedFaq = [...roadmapData.faq]
    updatedFaq[index] = { ...updatedFaq[index], [field]: value }
    setRoadmapData(prev => ({ ...prev, faq: updatedFaq }))
  }

  const handlePyqChange = (index, field, value) => {
    const updatedPyq = [...roadmapData.previousYearQuestions]
    updatedPyq[index] = { ...updatedPyq[index], [field]: value }
    setRoadmapData(prev => ({ ...prev, previousYearQuestions: updatedPyq }))
  }

  const onExcalidrawChange = useCallback((elements, appState, files) => {
    setExcalidrawData({ elements, appState, files });
    setRoadmapData(prev => ({ ...prev, drawData: { elements, appState, files } }));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Save roadmap data to local storage
    const existingRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]')
    const updatedRoadmaps = [...existingRoadmaps, roadmapData]
    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps))

    // Save Excalidraw data
    localStorage.setItem('excalidrawData', JSON.stringify(excalidrawData))

    // Convert Excalidraw data to SVG
    const svg = await exportToSvg({
      elements: excalidrawData.elements,
      appState: {
        ...excalidrawData.appState,
        exportWithDarkMode: false,
      },
      files: excalidrawData.files,
      exportPadding: 10,
    })

    // Convert SVG to blob and create download link
    const svgBlob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(svgBlob)
    link.download = `roadmap_${roadmapData.id}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Redirect to the dashboard
    router.push('/admin/dashboard')
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
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                value={roadmapData.details}
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

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              FAQ
              <div>
                <Button type="button" size="sm" onClick={() => setFaqCount(prev => prev + 1)}><Plus className="h-4 w-4" /></Button>
                <Button type="button" size="sm" onClick={() => setFaqCount(prev => Math.max(1, prev - 1))} className="ml-2"><Minus className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(faqCount)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder={`FAQ ${index + 1} Question`}
                  value={roadmapData.faq[index]?.question || ''}
                  onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                />
                <Textarea
                  placeholder={`FAQ ${index + 1} Answer`}
                  value={roadmapData.faq[index]?.answer || ''}
                  onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exercises Section */}
        <Card>
          <CardHeader>
            <CardTitle>Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="exercises"
              name="exercises"
              value={roadmapData.exercises}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>

        {/* Company Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Company Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="companyQuestions"
              name="companyQuestions"
              value={roadmapData.companyQuestions}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>

        {/* Previous Year Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Previous Year Questions
              <div>
                <Button type="button" size="sm" onClick={() => setPyqCount(prev => prev + 1)}><Plus className="h-4 w-4" /></Button>
                <Button type="button" size="sm" onClick={() => setPyqCount(prev => Math.max(1, prev - 1))} className="ml-2"><Minus className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(pyqCount)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder={`PYQ ${index + 1} Question`}
                  value={roadmapData.previousYearQuestions[index]?.question || ''}
                  onChange={(e) => handlePyqChange(index, 'question', e.target.value)}
                />
                <Textarea
                  placeholder={`PYQ ${index + 1} Answer`}
                  value={roadmapData.previousYearQuestions[index]?.answer || ''}
                  onChange={(e) => handlePyqChange(index, 'answer', e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Roadmap Diagram Section */}
        <Card>
          <CardHeader>
            <CardTitle>Roadmap Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[600px] border border-gray-300 rounded-md">
              <Excalidraw
                onChange={onExcalidrawChange}
                initialData={excalidrawData || {
                  elements: [],
                  appState: { viewBackgroundColor: "#FFFFFF" },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit">Save Roadmap</Button>
      </form>
    </div>
  )
}
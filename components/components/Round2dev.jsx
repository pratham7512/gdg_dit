'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubmitEventRound() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: Date.now(),
    roundName: '',
    description: '',
    htmlFile: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, htmlFile: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.htmlFile) {
      return alert("Please upload the HTML file.")
    }

    try {
      // Upload the HTML file to your storage solution (e.g., Firebase, S3, etc.)
      const formDataToSend = new FormData()
      formDataToSend.append('htmlFile', formData.htmlFile)
      formDataToSend.append('roundName', formData.roundName)
      formDataToSend.append('description', formData.description)

      const response = await fetch('/api/event-round', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Event round saved:', result)
        router.push('/ditgdgadmin/dashboard')
      } else {
        console.error('Error saving event round:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit Event Round</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Round Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="roundName">Round Name</Label>
              <Input
                type="text"
                id="roundName"
                name="roundName"
                value={formData.roundName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="htmlFile">Upload HTML File</Label>
              <Input
                type="file"
                id="htmlFile"
                name="htmlFile"
                accept=".html"
                onChange={handleFileChange}
                required
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit">Submit Event Round</Button>
      </form>
      {formData.htmlFile && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Preview</h2>
          <iframe
            src={URL.createObjectURL(formData.htmlFile)}
            title="Event Round Preview"
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

'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadFileToFirebase } from '../../firebase/firebaseUtils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitEventRound() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: Date.now(),
    teamid: '',
    roundName: 'Round2-Debug',
    email: '',
    htmlFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, htmlFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.htmlFile) {
      return alert('Please upload the HTML file.');
    }

    if (!formData.teamid) {
      return alert('Please provide the event name.');
    }

    try {
      // Upload the file to Firebase storage
      const fileUrl = await uploadFileToFirebase(formData.htmlFile, `event-round/${formData.teamid}`);

      // Prepare the data for the API
      const dataToSend = {
        id: formData.id,
        teamid: formData.teamid,
        roundName: formData.roundName,
        email: formData.email,
        htmlContentUrl: fileUrl, // Store the URL of the uploaded file
      };

      // Make the API request
      const response = await fetch(`/api/event-round`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Event round saved:', result);
        router.push('/contest');
      } else {
        console.error('Error saving event round:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
              <Label htmlFor="teamid">Team id</Label>
              <Input
                type="text"
                id="teamid"
                name="teamid"
                value={formData.teamid}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
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
            style={{ backgroundColor: '#FFFFFF' }}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { uploadFileToFirebase } from '../../firebase/firebaseUtils';

export default function Page() {
  const router = useRouter();
  const [faqCount, setFaqCount] = useState(1);
  const [sponsorsCount, setSponsorsCount] = useState(1);
  const [coordinatorsCount, setCoordinatorsCount] = useState(1);
  const [imageCount, setImageCount] = useState(1);
  const [speakersCount, setspeakersCount] = useState(1);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    dateTime: '',
    image: [],
    description: '',
    details: '',
    domain: '',
    entryFees: '',
    itemsToBring: [],
    location: '',
    mode: '',
    faq: [],
    prerequisites: '',
    prizepool: [],
    speakers: [],
    sponsors: [],
    status: '',
    coordinators: [],
    contact: '',
    rsvpLink:'',
  });
  const [events, setEvents] = useState([]);

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadFileToFirebase(file,"events");
      const updatedImages = [...newEvent.image];
      updatedImages[index] =  imageUrl ;
      setNewEvent((prev) => ({ ...prev, image: updatedImages }));
    }
  };
  const handleImageUploadSpeaker = async (index,field,event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadFileToFirebase(file,"Speakers");
      const updatedImages = [...newEvent.speakers];
      updatedImages[index] = { ...updatedImages[index], [field]: imageUrl };
      setNewEvent((prev) => ({ ...prev, speakers: updatedImages }));

    }
  };
  const handleImageUploadSponser = async (index,field, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadFileToFirebase(file,"Sponsers");
      const updatedImages = [...newEvent.sponsors];
      updatedImages[index] =  { ...updatedImages[index], [field]: imageUrl } ;
      setNewEvent((prev) => ({ ...prev, sponsors: updatedImages }));
    }
  };
  const handlespeakersChange = (index, field, value) => {
    const updatedspeakers = [...newEvent.speakers];
    updatedspeakers[index] = { ...updatedspeakers[index], [field]: value };
    setNewEvent(prev => ({ ...prev, speakers: updatedspeakers }));
  };
  const handleFaqChange = (index, field, value) => {
    const updatedFaq = [...newEvent.faq];
    updatedFaq[index] = { ...updatedFaq[index], [field]: value };
    setNewEvent(prev => ({ ...prev, faq: updatedFaq }));
  };

  const handleSponsorsChange = (index, field, value) => {
    const updatedSponsors = [...newEvent.sponsors];
    updatedSponsors[index] = { ...updatedSponsors[index], [field]: value };
    setNewEvent(prev => ({ ...prev, sponsors: updatedSponsors }));
  };

  const handleCoordinatorsChange = (index, field, value) => {
    const updatedCoordinators = [...newEvent.coordinators];
    updatedCoordinators[index] = { ...updatedCoordinators[index], [field]: value };
    setNewEvent(prev => ({ ...prev, coordinators: updatedCoordinators }));
  };

  const addEvent = async () => {
    const response = await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      const result = await response.json();
      setEvents(prevEvents => [...prevEvents, result]);
      setNewEvent({
        name: '',
        date: '',
        dateTime: '',
        image: [],
        description: '',
        details: '',
        domain: '',
        entryFees: '',
        itemsToBring: [],
        location: '',
        mode: '',
        faq: [],
        prerequisites: '',
        prizepool: [],
        speakers: [],
        sponsors: [],
        status: '',
        coordinators: [],
        contact: '',
        rsvpLink:'',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEvent();
    router.push('/admin/dashboard');
  };

  useEffect(() => {
    console.log(newEvent);
    console.log(events);
    
    
  }, [newEvent]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Information */}
        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateTime" className="text-right">Date & Time</Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={newEvent.dateTime}
                onChange={(e) => setNewEvent({ ...newEvent, dateTime: e.target.value })}
                className="col-span-3"
              />
            </div>
            {/* Description and Details */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="details" className="text-right">Details</Label>
              <Textarea
                id="details"
                value={newEvent.details}
                onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rsvpLink" className="text-right">RSVP Link</Label>
              <Input
                id="rsvpLink"
                value={newEvent.rsvpLink}
                onChange={(e) => setNewEvent({ ...newEvent, rsvpLink: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domain" className="text-right">Domain</Label>
              <Input
                id="domain"
                value={newEvent.domain}
                onChange={(e) => setNewEvent({ ...newEvent, domain: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entryFees" className="text-right">Entry Fees</Label>
              <Input
                id="entryFees"
                value={newEvent.entryFees}
                onChange={(e) => setNewEvent({ ...newEvent, entryFees: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prerequisites" className="text-right">Prerequisites</Label>
              <Textarea
                id="prerequisites"
                value={newEvent.prerequisites}
                onChange={(e) => setNewEvent({ ...newEvent, prerequisites: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prizepool" className="text-right">Prize Pool</Label>
              <Input
                id="prizepool"
                value={newEvent.prizepool.join(', ')}
                onChange={(e) => setNewEvent({ ...newEvent, prizepool: e.target.value.split(', ') })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemsToBring" className="text-right">Items to Bring</Label>
              <Input
                id="itemsToBring"
                value={newEvent.itemsToBring.join(', ')}
                onChange={(e) => setNewEvent({ ...newEvent, itemsToBring: e.target.value.split(', ') })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Textarea
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="col-span-3"
              />
             </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mode" className="text-right">Mode</Label>
              <Textarea
                id="mode"
                value={newEvent.mode}
                onChange={(e) => setNewEvent({ ...newEvent, mode: e.target.value })}
                className="col-span-3"
              />
             </div>
             
             <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Speakers
              <div>
                <Button size="sm" onClick={() => setspeakersCount(prev => prev + 1)}><Plus className="h-4 w-4" /></Button>
                <Button size="sm" onClick={() => setspeakersCount(prev => Math.max(1, prev - 1))} className="ml-2"><Minus className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(speakersCount)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder={`speakers  ${index + 1} Name`}
                  value={newEvent.speakers[index]?.name || ''}
                  onChange={(e) => handlespeakersChange(index, 'name', e.target.value)}
                />
                <Input
                  placeholder={`Expertise ${index + 1} `}
                  value={newEvent.speakers[index]?.Expertise || ''}
                  onChange={(e) => handlespeakersChange(index, 'Expertise', e.target.value)}
                />
                <Input
                  placeholder={`Company  ${index + 1} Name`}
                  value={newEvent.speakers[index]?.company || ''}
                  onChange={(e) => handlespeakersChange(index, 'company', e.target.value)}
                />
                <Input
                  placeholder={`designation  ${index + 1} Name`}
                  value={newEvent.speakers[index]?.designation || ''}
                  onChange={(e) => handlespeakersChange(index, 'designation', e.target.value)}
                />
               <Label htmlFor={`image-${index}`} className="block">Image {index + 1}</Label>
                <Input
                  type="file"
                  id={`image-${index}`}
                
                  onChange={(e) => handleImageUploadSpeaker(index, "image",e)}
                />
                {newEvent.speakers[index]?.image && (
                  <img src={newEvent.speakers[index]?.image} alt={`Uploaded Image ${index + 1}`} className="w-32 h-32 object-cover" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
             {/* Images Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Images
              <div>
                <Button size="sm" onClick={() => setImageCount((prev) => prev + 1)}><Plus className="h-4 w-4" /></Button>
                <Button size="sm" onClick={() => setImageCount((prev) => Math.max(1, prev - 1))} className="ml-2"><Minus className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(imageCount)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`image-${index}`} className="block">Image {index + 1}</Label>
                <Input
                  type="file"
                  id={`image-${index}`}
                  onChange={(e) => handleImageUpload(index,e)}
                />
                {newEvent.image[index] && (
                  <img src={newEvent.image[index]} alt={`Uploaded Image ${index + 1}`} className="w-32 h-32 object-cover" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              FAQ
              <div>
                <Button size="sm" onClick={() => setFaqCount(prev => prev + 1)}><Plus className="h-4 w-4" /></Button>
                <Button size="sm" onClick={() => setFaqCount(prev => Math.max(1, prev - 1))} className="ml-2"><Minus className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(faqCount)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder={`FAQ ${index + 1} Question`}
                  value={newEvent.faq[index]?.question || ''}
                  onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                />
                <Textarea
                  placeholder={`FAQ ${index + 1} Answer`}
                  value={newEvent.faq[index]?.answer || ''}
                  onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sponsors Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Sponsors
              <div>
                <Button size="sm" onClick={() => setSponsorsCount(prev => prev + 1)}><Plus className="h-4 w-4" /></Button>
                <Button size="sm" onClick={() => setSponsorsCount(prev => Math.max(1, prev - 1))} className="ml-2"><Minus className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(sponsorsCount)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder={`Sponsor ${index + 1} Name`}
                  value={newEvent.sponsors[index]?.name || ''}
                  onChange={(e) => handleSponsorsChange(index, 'name', e.target.value)}
                />
                <Label htmlFor={`image-${index}`} className="block">Image {index + 1}</Label>
                <Input
                  type="file"
                  id={`image-${index}`}
                  onChange={(e) => handleImageUploadSponser(index,"logo",e)}
                />
                {newEvent.sponsors[index]?.logo && (
                  <img src={newEvent.speakers[index]?.logo} alt={`Uploaded Image ${index + 1}`} className="w-32 h-32 object-cover" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Coordinators Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Coordinators
              <div>
                <Button size="sm" onClick={() => setCoordinatorsCount(prev => prev + 1)}><Plus className="h-4 w-4" /></Button>
                <Button size="sm" onClick={() => setCoordinatorsCount(prev => Math.max(1, prev - 1))} className="ml-2"><Minus className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(coordinatorsCount)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder={`Coordinator ${index + 1} Name`}
                  value={newEvent.coordinators[index]?.name || ''}
                  onChange={(e) => handleCoordinatorsChange(index, 'name', e.target.value)}
                />
                <Input
                  placeholder={`Coordinator ${index + 1} Contact`}
                  value={newEvent.coordinators[index]?.contact || ''}
                  onChange={(e) => handleCoordinatorsChange(index, 'contact', e.target.value)}
                />
                <Input
                  type="file"
                  id={`image-${index}`}
                  onChange={(e) => handleImageUpload(index, e)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">Submit Event</Button>
      </form>
    </div>
  );
}

'use client'

import { useState} from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, MapPin, Trophy,Terminal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ApplicationCard from './ApplicationCard'
import Image from 'next/image'

type FAQ = {
  question: string,
  ans: string
}
type Event = {
  id: string
  name: string
  date: string
  dateTime: string
  description: string
  details: string
  domain: string
  entryFees: string
  rsvpLink: string
  "faq's": FAQ[]
  imageUrls: string[]
  itemsToBring: string[]
  location: string
  mode: string
  prerequisites: string
  prizepool: Array<{
    ammount: string
  }>
  speakers: Record<string, {
    name: string
    designation: string
    company: string
    Expertise: string
    image: string
  }>
  sponsors: Array<{
    name: string
    logo: string
  }>
}

interface EventProps {
  event?: Event|null; // Allow undefined
}

const EventPage: React.FC<EventProps> =({event})=> {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredFaqs = event?.["faq's"]?.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.ans.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

  return (
    <div className="container mx-auto p-2 sm:p-4 backdrop-blur-lg bg-[#0e0c15] text-foreground my-4 sm:my-10">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 mx-2 sm:mx-4 lg:mx-20">
        <div className="flex-grow overflow-y-auto max-h-screen pb-4 sm:pb-8 lg:w-2/3 scrollbar-hidden sm:mx-2 lg:mx-10">
          <div className="w-full space-y-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-3xl lg:text-4xl font-bold tracking-tight p-2">
                    {event?.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="tagline p-1 px-2 font-sm">{event?.mode}</Badge>
                  <Badge variant="outline" className="tagline  p-1 px-2 font-sm">{event?.domain}</Badge>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
          </div>

        <Card className="mb-8 bg-[#0e0c15] border border-[#2A2A3C]">
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A27] border border-[#2A2A3C] flex items-center justify-center">
                    <Calendar className="w-5 h-5 " />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-[#6E6E8F]">DATE & TIME</p>
                    <p className="text-sm text-white">{event?.dateTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A27] border border-[#2A2A3C] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-[#6E6E8F]">LOCATION</p>
                    <p className="text-sm text-white">{event?.location}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A27] border border-[#2A2A3C] flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-[#6E6E8F]">ENTRY FEE</p>
                    <p className="text-sm text-white">₹{event?.entryFees}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A27] border border-[#2A2A3C] flex items-center justify-center">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-[#6E6E8F]">PREREQUISITES</p>
                    <p className="text-sm text-white">{event?.prerequisites}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {event?.imageUrls?.[0] && (
            <div className="mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={event.imageUrls[0]}
                alt={`${event.name} Banner`}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="space-y-6 sm:space-y-8">
            <section>
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">About the Event</h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <Card className="bg-[#0e0c15] backdrop-blur-lg">
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <p className="text-md sm:text-base text-white leading-relaxed">{event?.description}</p>
                  <Separator className="my-4" />
                  <p className="text-sm sm:text-base text-muted-foreground text-justify leading-relaxed">{event?.details}</p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">What to Bring</h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <Card className='bg-[#0e0c15]'>
                <CardContent className="p-4 sm:p-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {event?.itemsToBring.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />
                        <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {Object.keys(event?.speakers || {}).length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold">Speakers</h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.values(event?.speakers || {}).map((speaker, index) => (
                    <Card key={index} className="overflow-hidden bg-[#0e0c15]">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-primary">
                            <AvatarImage src={speaker.image} alt={speaker.name} />
                            <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-base sm:text-lg">{speaker.name}</p>
                            <p className="text-sm text-muted-foreground">{speaker.designation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {(event?.sponsors?.length ?? 0) > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold">Sponsors</h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {event?.sponsors.filter(sponsor => sponsor.logo).map((sponsor, index) => (
                    <Card key={index} className="bg-[#0e0c15] backdrop-blur-lg">
                      <CardContent className="p-4 sm:p-6 flex items-center justify-center h-24 sm:h-32">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name || 'Sponsor logo'}
                          className="max-h-16 sm:max-h-20 max-w-full object-contain"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">FAQ</h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md mx-1 bg-n-8/70 text-sm sm:text-base"
                />
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-primary hover:no-underline hover:text-primary/90 text-sm sm:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                        {faq.ans}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </div>

        <div className="lg:w-1/3">

          <ApplicationCard 
              dateTime={event?.dateTime || ''} 
              date={event?.date || ''} 
              location={event?.location || ''} 
              rsvpLink={event?.rsvpLink || ''}
            />
        </div>
      </div>
    </div>
  )
}

export default EventPage;
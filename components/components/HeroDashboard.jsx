'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState([
    { id: 1, name: 'CP Contest 2024', date: '2024-06-15', image: '/placeholder.svg?height=100&width=100', details: 'Annual coding competition', faq: 'Q: How to register?\nA: Visit our website', coordinators: 'John Doe, Jane Smith', contact: 'contact@cpcontest.com' },
    { id: 2, name: 'Algorithmic Workshop', date: '2024-07-01', image: '/placeholder.svg?height=100&width=100', details: 'Learn advanced algorithms', faq: 'Q: What\'s the prerequisite?\nA: Basic programming knowledge', coordinators: 'Alice Johnson', contact: 'workshop@algo.com' },
  ])
  const [roadmaps, setRoadmaps] = useState([])
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'John Doe', scores: [95, 88, 92] },
    { id: 2, name: 'Jane Smith', scores: [98, 90, 95] },
  ])

  const [newEvent, setNewEvent] = useState({ 
    name: '', 
    date: '', 
    image: '', 
    details: '', 
    faq: '', 
    coordinators: '', 
    contact: '' 
  })
  const [newLeaderboardEntry, setNewLeaderboardEntry] = useState({
    name: '',
    scores: ['', '', '']
  })
  const [editingEvent, setEditingEvent] = useState(null)
  const [editingLeaderboardEntry, setEditingLeaderboardEntry] = useState(null)

  useEffect(() => {
    // Load roadmaps from local storage
    const savedRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]')
    setRoadmaps(savedRoadmaps)
  }, [])

  const addEvent = () => {
    setEvents([...events, { ...newEvent, id: Date.now() }])
    setNewEvent({ name: '', date: '', image: '', details: '', faq: '', coordinators: '', contact: '' })
  }

  const startEditingEvent = (event) => {
    setEditingEvent({ ...event })
  }

  const saveEditedEvent = () => {
    setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event))
    setEditingEvent(null)
  }

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const addLeaderboardEntry = () => {
    const scores = newLeaderboardEntry.scores.map(score => Number(score))
    setLeaderboard([...leaderboard, { ...newLeaderboardEntry, id: Date.now(), scores }])
    setNewLeaderboardEntry({ name: '', scores: ['', '', ''] })
  }

  const startEditingLeaderboardEntry = (entry) => {
    setEditingLeaderboardEntry({ ...entry })
  }

  const saveEditedLeaderboardEntry = () => {
    setLeaderboard(leaderboard.map(entry => entry.id === editingLeaderboardEntry.id ? editingLeaderboardEntry : entry))
    setEditingLeaderboardEntry(null)
  }

  

  const deleteLeaderboardEntry = (id) => {
    setLeaderboard(leaderboard.filter(entry => entry.id !== id))
  }

  const calculateAverage = (scores) => {
    return scores.reduce((a, b) => a + b, 0) / scores.length
  }

  const editRoadmap = (roadmap) => {
    localStorage.setItem('editingRoadmap', JSON.stringify(roadmap))
    router.push(`edit-roadmap?id=${roadmap.id}`)
  }

  const deleteRoadmap = (id) => {
    const updatedRoadmaps = roadmaps.filter(roadmap => roadmap.id !== id)
    setRoadmaps(updatedRoadmaps)
    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roadmaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roadmaps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaderboard.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Manage Events</TabsTrigger>
          <TabsTrigger value="roadmaps">Manage Roadmaps</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        {/* Events Tab Content */}
        <TabsContent value="events" className="space-y-4">
          {/* ... (existing events management code) ... */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Events</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Event</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={newEvent.image}
                      onChange={(e) => setNewEvent({...newEvent, image: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="details" className="text-right">
                      Details
                    </Label>
                    <Textarea
                      id="details"
                      value={newEvent.details}
                      onChange={(e) => setNewEvent({...newEvent, details: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="faq" className="text-right">
                      FAQ
                    </Label>
                    <Textarea
                      id="faq"
                      value={newEvent.faq}
                      onChange={(e) => setNewEvent({...newEvent, faq: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="coordinators" className="text-right">
                      Coordinators
                    </Label>
                    <Input
                      id="coordinators"
                      value={newEvent.coordinators}
                      onChange={(e) => setNewEvent({...newEvent, coordinators: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">
                      Contact
                    </Label>
                    <Input
                      id="contact"
                      value={newEvent.contact}
                      onChange={(e) => setNewEvent({...newEvent, contact: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={addEvent}>Add Event</Button>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Image src={event.image} width={30} height={30} alt={event.name} className="w-10 h-10 object-cover" />
                  </TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => startEditingEvent(event)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {editingEvent && (
            <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="edit-name"
                      value={editingEvent.name}
                      onChange={(e) => setEditingEvent({...editingEvent, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={editingEvent.date}
                      onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="edit-image"
                      value={editingEvent.image}
                      onChange={(e) => setEditingEvent({...editingEvent, image: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-details" className="text-right">
                      Details
                    </Label>
                    <Textarea
                      id="edit-details"
                      value={editingEvent.details}
                      onChange={(e) => setEditingEvent({...editingEvent, details: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-faq" className="text-right">
                      FAQ
                    </Label>
                    <Textarea
                      id="edit-faq"
                      value={editingEvent.faq}
                      onChange={(e) => setEditingEvent({...editingEvent, faq: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-coordinators" className="text-right">
                      Coordinators
                    </Label>
                    <Input
                      id="edit-coordinators"
                      value={editingEvent.coordinators}
                      onChange={(e) => setEditingEvent({...editingEvent, coordinators: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-contact" className="text-right">
                      Contact
                    </Label>
                    <Input
                      id="edit-contact"
                      value={editingEvent.contact}
                      onChange={(e) => setEditingEvent({...editingEvent, contact:  e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={saveEditedEvent}>Save Changes</Button>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Roadmaps Tab Content */}
        <TabsContent value="roadmaps" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Roadmaps</h2>
            <Link href="create-roadmap">
              <Button><Plus className="mr-2 h-4 w-4" /> Create Roadmap</Button>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roadmaps.map((roadmap) => (
                <TableRow key={roadmap.id}>
                  <TableCell>{roadmap.name}</TableCell>
                  <TableCell>{roadmap.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => editRoadmap(roadmap)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteRoadmap(roadmap.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Leaderboard Tab Content */}
        <TabsContent value="leaderboard" className="space-y-4">
          {/* ... (existing leaderboard management code) ... */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Leaderboard</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Entry</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Leaderboard Entry</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="leaderboard-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="leaderboard-name"
                      value={newLeaderboardEntry.name}
                      onChange={(e) => setNewLeaderboardEntry({...newLeaderboardEntry, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={`score-${index}`} className="text-right">
                        Score {index + 1}
                      </Label>
                      <Input
                        id={`score-${index}`}
                        type="number"
                        value={newLeaderboardEntry.scores[index]}
                        onChange={(e) => {
                          const newScores = [...newLeaderboardEntry.scores]
                          newScores[index] = e.target.value
                          setNewLeaderboardEntry({...newLeaderboardEntry, scores: newScores})
                        }}
                        className="col-span-3"
                      />
                    </div>
                  ))}
                </div>
                <Button onClick={addLeaderboardEntry}>Add Entry</Button>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Score 1</TableHead>
                <TableHead>Score 2</TableHead>
                <TableHead>Score 3</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard
                .sort((a, b) => calculateAverage(b.scores) - calculateAverage(a.scores))
                .map((entry, index) => (
                  <TableRow key={entry.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    {entry.scores.map((score, scoreIndex) => (
                      <TableCell key={scoreIndex}>{score}</TableCell>
                    ))}
                    <TableCell>{calculateAverage(entry.scores).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => startEditingLeaderboardEntry(entry)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteLeaderboardEntry(entry.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {editingLeaderboardEntry && (
            <Dialog open={!!editingLeaderboardEntry} onOpenChange={() => setEditingLeaderboardEntry(null)}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Leaderboard Entry</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-leaderboard-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="edit-leaderboard-name"
                      value={editingLeaderboardEntry.name}
                      onChange={(e) => setEditingLeaderboardEntry({...editingLeaderboardEntry, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={`edit-score-${index}`} className="text-right">
                        Score {index + 1}
                      </Label>
                      <Input
                        id={`edit-score-${index}`}
                        type="number"
                        value={editingLeaderboardEntry.scores[index]}
                        onChange={(e) => {
                          const newScores = [...editingLeaderboardEntry.scores]
                          newScores[index] = Number(e.target.value)
                          setEditingLeaderboardEntry({...editingLeaderboardEntry, scores: newScores})
                        }}
                        className="col-span-3"
                      />
                    </div>
                  ))}
                </div>
                <Button onClick={saveEditedLeaderboardEntry}>Save Changes</Button>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
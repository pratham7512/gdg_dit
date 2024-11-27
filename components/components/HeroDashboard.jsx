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
// import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
// import { uploadFileToFirebase } from '../../app/firebase/firebaseUtils'; // You need to implement this

export default function AdminDashboard() {
  const router = useRouter()

  const [roadmaps, setRoadmaps] = useState([])
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'John Doe', scores: [95, 88, 92] },
    { id: 2, name: 'Jane Smith', scores: [98, 90, 95] },
  ])

 
  const [newLeaderboardEntry, setNewLeaderboardEntry] = useState({
    name: '',
    scores: ['', '', '']
  })


  const [editingLeaderboardEntry, setEditingLeaderboardEntry] = useState(null)



  const [events, setEvents] = useState([]); // This would be populated by the backend data
  const [editingEvent, setEditingEvent] = useState(null);

  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = await uploadFileToFirebase(file); // Upload file to Firebase Storage
  //     setNewEvent((prev) => ({ ...prev, image: imageUrl }));
  //   }
  // };
  const fetchEvents = async () => {
    const response = await fetch('/api/event');
    if (response.ok) {
      return await response.json();
    }
    return [];
  };
  const fetchteam = async () => {
    const response = await fetch('/api/team-members');
    if (response.ok) {
      return await response.json();
    }
    return [];
  };
  const fetchRoadamap = async () => {
    const response = await fetch('/api/roadmap');
    if (response.ok) {
      return await response.json();
    }
    return [];
  };
  const handeladd =  () => {
   
    router.push('/admin/addevent');
  };
  const [teamMembers, setTeamMembers] = useState([
   
  ])
  const [editingTeamMember, setEditingTeamMember] = useState(null)
  // const addEvent = async () => {
  //   // Your API call to save the event in the database
  //   const response = await fetch('/api/event', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newEvent)
  //   });
  //   const result = await response.json();
  //   setEvents((prevEvents) => [...prevEvents, result]);
  //   setNewEvent({
  //     name: '',
  //     date: '',
  //     dateTime:'',
  //     imageUrls: null,
  //     description:'',
  //     details: '',
  //     domain:'',
  //     entryFees:'',
  //     itemsToBring:null,
  //     location:'',
  //     mode:'',
  //     faq: '',
  //     prerequisites:'',
  //     prizepool:null,
  //     speakers:null,
  //     sponsors:null,
  //     status:'',
  //     coordinators: '',
  //     contact: ''
  //   });
  // };

  const startEditingEvent = (event) => {
    setEditingEvent({ ...event });
  };

  const saveEditedEvent = async () => {
    // Save the edited event
    const response = await fetch(`/api/event/${editingEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingEvent)
    });
    const updatedEvent = await response.json();
    setEvents((prevEvents) => prevEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    setEditingEvent(null);
  };

  const deleteEvent = async (id) => {
    // API call to delete event
    await fetch(`/api/event/${id}`, { method: 'DELETE' });
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

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
  useEffect(() => {
    const loadData = async () => {
      try {
        const eventData = await fetchEvents();
        const roadampData=await fetchRoadamap();
        const teamData=await fetchteam();
        // Ensure that eventData is an object and convert it into an array

        const roadmapArray=Object.values(roadampData);
        const eventsArray = Object.values(eventData); 
        const teamArray=Object.values(teamData);
        setRoadmaps(roadmapArray);
        setEvents(eventsArray);
        setTeamMembers(teamArray);
        console.log(events.imageUrls);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);  // Fallback to empty array on error
      }
    };
    
    loadData();
  }, []); // Empty dependency array ensures this runs once on mount
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Manage Events</TabsTrigger>
          <TabsTrigger value="roadmaps">Manage Roadmaps</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Events Tab Content */}
        <TabsContent value="events" className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Events</h2>
        <Button onClick={handeladd} ><Plus className="mr-2 h-4 w-4" /> Add Event</Button>
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
              <Image src={event.imageUrls[0]} width={30} height={30} alt={event.name} className="w-10 h-10 object-cover" />
            </TableCell>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" onClick={() => startEditingEvent(event)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
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
              {/* Repeat the form similar to adding an event */}
              {/* Form fields for editing */}
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
                  <TableCell>{roadmap.title}</TableCell>
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
         <TabsContent value="team" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Team Members</h2>
            <Link href="addmember">
              <Button><Plus className="mr-2 h-4 w-4" /> Add Member</Button>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Image src={member.image} width={40} height={40} alt={member.name} className="rounded-full" />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.domain}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => startEditingTeamMember(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteTeamMember(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {editingTeamMember && (
            <Dialog open={!!editingTeamMember} onOpenChange={() => setEditingTeamMember(null)}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Team Member</DialogTitle>
                </DialogHeader>
                
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
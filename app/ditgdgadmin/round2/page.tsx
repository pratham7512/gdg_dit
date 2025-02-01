"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

interface EventRound {
  id: string;
  createdAt: number;
  email: string;
  htmlContentUrl: string;
  teamid: string;
}

export default function EventListPage() {
  const [data, setData] = useState<EventRound[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/event-round')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = data.filter(item =>
    item.email.toLowerCase().includes(search.toLowerCase())
  )

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error loading data</p>
          <p className="text-zinc-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Event Rounds</h1>
        
        <Input
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
        />

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center p-8 text-zinc-500">
            No event rounds found
          </div>
        ) : (
          <div className="rounded-md border border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400 w-[100px]">Sr. No</TableHead>
                  <TableHead className="text-zinc-400">Team ID</TableHead>
                  <TableHead className="text-zinc-400">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id} className="border-zinc-800">
                    <Link href={item.htmlContentUrl} className="hover:text-zinc-100">
                    <TableCell className="text-zinc-300">{index + 1}</TableCell>
                    <TableCell className="text-zinc-300">{item.teamid}</TableCell>
                    <TableCell className="text-zinc-300 font-mono">{item.email}</TableCell>
                    <TableCell>  {(
                        (item.createdAt-new Date("2025-02-01T06:21:05.498Z").getTime()) /
                        60000
                      ).toFixed(2)}
                    </TableCell>
                    </Link>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
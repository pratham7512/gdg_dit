'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { ref, get } from 'firebase/database'
import { database } from '@/app/firebase/config'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"

type Player = {
  rank: number
  name: string
  sept: number
  oct: number
  nov: number
  total: number
}

// Custom hook for data fetching
const useLeaderboardData = () => {
  const [players, setPlayers] = useState<Player[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, "leaderboard/DevChef2024/scores")
        const snapshot = await get(dbRef)
        if (snapshot.exists()) {
          const p1 = snapshot.val().sort((a: Player, b: Player) => b.total - a.total)
            .map((player: Player, index: number) => ({ ...player, rank: index + 1 }))
          setPlayers(p1)
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { players, loading }
}

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 10
  const { players, loading } = useLeaderboardData()

  const filteredPlayers = players ? players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  const indexOfLastPlayer = currentPage * playersPerPage
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const getBadge = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return null
  }

  const getBorderColor = (rank: number) => {
    if (rank === 1) return "border-yellow-400"
    if (rank === 2) return "border-gray-400"
    if (rank === 3) return "border-amber-900"
    return "border-gray-800"
  }

  const LoadingSkeleton = () => (
    <>
      {[...Array(10)].map((_, index) => (
        <TableRow key={index} className="border-b border-gray-800 animate-pulse">
          <TableCell><Skeleton className="h-6 w-8" /></TableCell>
          <TableCell>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
          </TableCell>
          <TableCell><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
          <TableCell><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
          <TableCell><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
          <TableCell><Skeleton className="h-6 w-16 ml-auto" /></TableCell>
        </TableRow>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-background text-foreground md:py-[5%] max-sm:py-[5%] ">
      <div className="container mx-auto p-4 font-sans">
        <h1 className="text-3xl mb-4 font-code">CP Leaderboard</h1>
        <div className="mb-4 relative">
          <Input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-n-7 text-foreground border-border"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-n-8 hover:bg-n-7">
                <TableHead className="w-16 text-muted-foreground">Rank</TableHead>
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-right text-muted-foreground">sept</TableHead>
                <TableHead className="text-right text-muted-foreground">oct</TableHead>
                <TableHead className="text-right text-muted-foreground">nov</TableHead>
                <TableHead className="text-right text-muted-foreground">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                currentPlayers.map((player) => (
                  <TableRow key={player.rank} className={`border-b ${getBorderColor(player.rank)} transition-all duration-200`}>
                    <TableCell className="font-mono">
                      {player.rank}.
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image src={`https://robohash.org/${player.name}?bgset=bg2`} alt={player.name} width={48} height={48} className="rounded-full" />
                        <div>
                          <div className="font-mono text-md">{player.name} {getBadge(player.rank)}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">{player.sept > 0 ? `+${player.sept}` : player.sept}</TableCell>
                    <TableCell className="text-right font-mono">{player.oct > 0 ? `+${player.oct}` : player.oct}</TableCell>
                    <TableCell className="text-right font-mono">{player.nov > 0 ? `+${player.nov}` : player.nov}</TableCell>
                    <TableCell className="text-right font-mono font-bold">{player.total > 0 ? `+${player.total}` : player.total}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            variant="outline"
            className="bg-n-7 text-white border-gray-800 hover:bg-n-6"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-gray-500">
            {loading ? (
              <Skeleton className="h-6 w-32 inline-block" />
            ) : (
              `Page ${currentPage} of ${Math.ceil(filteredPlayers.length / playersPerPage)}`
            )}
          </span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPlayer >= filteredPlayers.length || loading}
            variant="outline"
            className="bg-n-7 text-white border-gray-800 hover:bg-n-6"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
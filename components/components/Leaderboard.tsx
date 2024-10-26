'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

type Player = {
  rank: number
  name: string
  team: string
  Q1: number
  Q2: number
  Q3: number
  score: number
}

const players: Player[] = [
  {"rank": 1, "name": "Jon Rahm", "team": "Legion XIII", "Q1": -3, "Q2": -5, "Q3": -4, "score": -12},
  {"rank": 2, "name": "Dustin Johnson", "team": "4 Aces GC", "Q1": -4, "Q2": -3, "Q3": -4, "score": -11},
  {"rank": 3, "name": "Bryson DeChambeau", "team": "Crushers GC", "Q1": -2, "Q2": -4, "Q3": -4, "score": -10},
  {"rank": 4, "name": "Brooks Koepka", "team": "Smash GC", "Q1": -3, "Q2": -2, "Q3": -4, "score": -9},
  {"rank": 5, "name": "Cameron Smith", "team": "Ripper GC", "Q1": -2, "Q2": -3, "Q3": -3, "score": -8},
  {"rank": 6, "name": "Phil Mickelson", "team": "HyFlyers GC", "Q1": -1, "Q2": -4, "Q3": -2, "score": -7},
  {"rank": 7, "name": "Sergio Garcia", "team": "Fireballs GC", "Q1": -2, "Q2": -2, "Q3": -3, "score": -7},
  {"rank": 8, "name": "Patrick Reed", "team": "4 Aces GC", "Q1": -1, "Q2": -3, "Q3": -2, "score": -6},
  {"rank": 9, "name": "Joaquin Niemann", "team": "Torque GC", "Q1": -2, "Q2": -1, "Q3": -3, "score": -6},
  {"rank": 10, "name": "Louis Oosthuizen", "team": "Stinger GC", "Q1": -1, "Q2": -2, "Q3": -2, "score": -5},
  {"rank": 11, "name": "Bubba Watson", "team": "RangeGoats GC", "Q1": 0, "Q2": -3, "Q3": -2, "score": -5},
  {"rank": 12, "name": "Kevin Na", "team": "Iron Heads GC", "Q1": -1, "Q2": -1, "Q3": -2, "score": -4},
  {"rank": 13, "name": "Talor Gooch", "team": "RangeGoats GC", "Q1": 0, "Q2": -2, "Q3": -2, "score": -4},
  {"rank": 14, "name": "Paul Casey", "team": "Crushers GC", "Q1": -1, "Q2": -1, "Q3": -1, "score": -3},
  {"rank": 15, "name": "Ian Poulter", "team": "Majesticks GC", "Q1": 0, "Q2": -2, "Q3": -1, "score": -3},
  {"rank": 16, "name": "Charles Howell III", "team": "Crushers GC", "Q1": 0, "Q2": -1, "Q3": -2, "score": -3},
  {"rank": 17, "name": "Henrik Stenson", "team": "Majesticks GC", "Q1": -1, "Q2": 0, "Q3": -1, "score": -2},
  {"rank": 18, "name": "Lee Westwood", "team": "Majesticks GC", "Q1": 0, "Q2": -1, "Q3": -1, "score": -2},
  {"rank": 19, "name": "Matt Jones", "team": "Ripper GC", "Q1": 1, "Q2": -2, "Q3": -1, "score": -2},
  {"rank": 20, "name": "Peter Uihlein", "team": "4 Aces GC", "Q1": 0, "Q2": 0, "Q3": -1, "score": -1},
  {"rank": 21, "name": "Graeme McDowell", "team": "Cleeks GC", "Q1": 1, "Q2": -1, "Q3": -1, "score": -1},
  {"rank": 22, "name": "Bernd Wiesberger", "team": "Cleeks GC", "Q1": 0, "Q2": 0, "Q3": 0, "score": 0},
  {"rank": 23, "name": "Scott Vincent", "team": "Iron Heads GC", "Q1": 1, "Q2": 0, "Q3": -1, "score": 0},
  {"rank": 24, "name": "Charl Schwartzel", "team": "Stinger GC", "Q1": 1, "Q2": 0, "Q3": 0, "score": 1},
  {"rank": 25, "name": "Marc Leishman", "team": "Ripper GC", "Q1": 1, "Q2": 1, "Q3": -1, "score": 1},
  {"rank": 26, "name": "Anirban Lahiri", "team": "Crushers GC", "Q1": 2, "Q2": 0, "Q3": 0, "score": 2},
  {"rank": 27, "name": "Abraham Ancer", "team": "Fireballs GC", "Q1": 1, "Q2": 1, "Q3": 0, "score": 2},
  {"rank": 28, "name": "Brendan Steele", "team": "HyFlyers GC", "Q1": 2, "Q2": 1, "Q3": 0, "score": 3},
  {"rank": 29, "name": "Cameron Tringale", "team": "HyFlyers GC", "Q1": 2, "Q2": 1, "Q3": 1, "score": 4},
  {"rank": 30, "name": "Jediah Morgan", "team": "Ripper GC", "Q1": 3, "Q2": 2, "Q3": 1, "score": 6}
]

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 10

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    if (rank === 1) return "border-yellow-500"
    if (rank === 2) return "border-gray-400"
    if (rank === 3) return "border-amber-600"
    return "border-gray-800"
  }

  return (
    <div className="min-h-screen bg-n-8 text-white md:py-[5%] max-sm:py-[5%]">
      <div className="container mx-auto p-4 font-mono">
        <h1 className="text-2xl font-bold mb-4">CP Leaderboard</h1>
        <div className="mb-4 relative">
          <Input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-n-7 text-white border-gray-800"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-n-6">
                <TableHead className="w-16 text-gray-400">Rank</TableHead>
                <TableHead className="text-gray-400">Player name</TableHead>
                <TableHead className="text-right text-gray-400">Q1</TableHead>
                <TableHead className="text-right text-gray-400">Q2</TableHead>
                <TableHead className="text-right text-gray-400">Q3</TableHead>
                <TableHead className="text-right text-gray-400">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPlayers.map((player) => (
                <TableRow key={player.rank} className={`border-b ${getBorderColor(player.rank)}`}>
                  <TableCell className="font-bold flex items-center">
                    {player.rank}
                    <span className="ml-2 text-xl">{getBadge(player.rank)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img src={`https://robohash.org/${player.name}?bgset=bg2`} alt={player.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <div className="font-bold">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.team}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{player.Q1 > 0 ? `+${player.Q1}` : player.Q1}</TableCell>
                  <TableCell className="text-right font-mono">{player.Q2 > 0 ? `+${player.Q2}` : player.Q2}</TableCell>
                  <TableCell className="text-right font-mono">{player.Q3 > 0 ? `+${player.Q3}` : player.Q3}</TableCell>
                  <TableCell className="text-right font-mono font-bold">{player.score > 0 ? `+${player.score}` : player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            className="bg-n-7 text-white border-gray-800 hover:bg-gray-800"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-gray-500">Page {currentPage} of {Math.ceil(filteredPlayers.length / playersPerPage)}</span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPlayer >= filteredPlayers.length}
            variant="outline"
            className="bg-n-7 text-white border-gray-800 hover:bg-gray-800"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
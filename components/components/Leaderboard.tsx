"use client"

import { useState, useEffect } from "react"
import { Search } from 'lucide-react'
import { signOut, useSession } from "next-auth/react"
import {LeaderboardSkeleton } from "./LeaderboardSkeleton"
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";

interface Player {
  name: string;
  email: string;
  amount_of_coins: number;
  rank: number;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const [amountOfCoins, setAmountOfCoins] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    fetch("https://gdg-cfw.prathameshdesai679.workers.dev/users")
      .then((response) => response.json())
      .then((data) => {
        // Sort players by coins and assign ranks
        const rankedPlayers = data
          .sort((a: Player, b: Player) => b.amount_of_coins - a.amount_of_coins)
          .map((player: Player, index: number) => ({ ...player, rank: index + 1 }));
        setPlayers(rankedPlayers);
        setIsLoading(false);
        // Reset to first page when players are loaded or search changes
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch("/api/coins", {
          method: "GET",
        });

        if (!response.ok) {
          if (response.status === 403) {
            signOut(); 
          }
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAmountOfCoins(data.amount_of_coins || 0);
      } catch (error) {
        setError("Could not fetch coins");
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  // Filter players by search query (global filtering)
  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(search.toLowerCase()) ||
      player.email.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered results
  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset current page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const userRank = session?.user?.email
    ? players.find((player) => player.email === session.user.email)?.rank || 0
    : 0;

  if (isLoading) {
    return(
      <div className="pt-[4rem] bg-black lg:pt-[2.8rem] overflow-hidden">
      <Header />
        <LeaderboardSkeleton/>
      <Footer /> 
      </div>)
  }

  return (
    <div className=" mt-[4rem] min-h-screen text-white p-4 sm:p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">LEADERBOARD</h1>
          <p className="text-[#666666] text-base sm:text-lg">
            Compete with other players and earn coins to climb the leaderboard.
          </p>
        </div>

        {/* Top 3 Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {players.slice(0, 3).map((player, index) => (
            <TopPlayerCard key={player.email} player={player} position={index + 1} />
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#222222] p-4 pr-12 text-white placeholder:text-[#666666] focus:outline-none focus:border-[#0066FF]"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] w-5 h-5" />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-8 bg-black">
          <table className="w-full border-collapse min-w-[640px] border border-[#222222]">
            <thead>
              <tr className="border-b border-[#222222]">
                <th className="p-4 text-left font-normal text-[#666666]">RANK</th>
                <th className="p-4 text-left font-normal text-[#666666]">PLAYER</th>
                <th className="p-4 text-left font-normal text-[#666666]">EMAIL</th>
                <th className="p-4 text-left font-normal text-[#666666]">COINS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#222222] bg-[#111111]">
                <td className="p-4 text-[#666666]">{userRank > 0 ? userRank : 'UNRANKED'}</td>
                <td className="p-4 text-[#FF3B00]">You</td>
                <td className="p-4 text-[#FF3B00]">{session?.user?.email || 'N/A'}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFD700] text-xl">●</span>
                    {error?<span className="text-red">error</span>:<span>{amountOfCoins.toFixed(2)}</span>}
                  </div>
                </td>
              </tr>
              {paginatedPlayers.map((player, index) => (
                <tr key={player.email} className="border-b border-[#222222]">
                  <td className="p-4">
                    {index + 1 === 1 ? (
                      <span className="text-[#0066FF]">[{player.rank}]</span>
                    ) : (
                      <span className="text-[#666666]">[{player.rank}]</span>
                    )}
                  </td>
                  <td className="p-4">{player.name}</td>
                  <td className="p-4">{player.email}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFD700] text-xl">●</span>
                      <span>{player.amount_of_coins.toFixed(2)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#111111] border border-[#222222] disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-[#666666]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#111111] border border-[#222222] disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* No results message */}
        {filteredPlayers.length === 0 && (
          <div className="text-center text-[#666666] mt-8">
            No players found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}

// TopPlayerCard component remains the same as in the original code
function TopPlayerCard({ player, position }: { player: Player; position: number }) {
  return (
    <div className={`bg-[#111111] border ${position === 1 ? 'border-[#0066FF]' : 'border-[#222222]'} p-4 flex flex-col items-center justify-between h-full`}>
      <div className="relative w-full aspect-square mb-4 bg-[#0066FF]/10 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
          {[...Array(400)].map((_, i) => (
            <div key={i} className={`${Math.random() > 0.5 ? 'bg-[#0066FF]/20' : 'bg-transparent'} transition-colors duration-300 ease-in-out`} />
          ))}
        </div>
      </div>
      <div className="space-y-2 text-center w-full">
        <p className={`text-base sm:text-lg ${position === 1 ? 'text-[#0066FF]' : 'text-[#666666]'} truncate w-full`}>
          [{position}] {player.name}
        </p>
        <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl">
          <span className="text-[#FFD700] text-2xl">●</span>
          <span>{player.amount_of_coins.toFixed(2)}</span>
        </div>
        <p className="text-[#444444] text-sm">COINS</p>
      </div>
    </div>
  )
}
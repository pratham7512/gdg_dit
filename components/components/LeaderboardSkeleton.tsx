import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search} from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
export default function LeaderboardSkeleton(){
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
                    <LoadingSkeleton />
                </TableBody>
            </Table>
            </div>
        </div>
    </div>
  )
}
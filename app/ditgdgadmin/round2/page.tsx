"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface EventRound {
  id: string;
  createdAt: number;
  email: string;
  htmlContentUrl: string;
  teamid: string;
}

export default function EventListPage() {
  const [data, setData] = useState<EventRound[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/event-round');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error loading data</p>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Event Rounds</h1>
        
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              No event rounds found
            </div>
          ) : (
            data.map((item) => (
              <Link key={item.id} href={`/viewer/${encodeURIComponent(item.htmlContentUrl)}`}>
                <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Team ID: {item.teamid}</p>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                    <ChevronRight className="text-gray-500" />
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
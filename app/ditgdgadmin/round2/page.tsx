import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, X, Loader2 } from 'lucide-react';

interface EventRound {
  id: string;
  createdAt: number;
  email: string;
  htmlContentUrl: string;
  teamid: string;
}

export default function EventRoundPage() {
  const [selectedUrl, setSelectedUrl] = useState<string>('');
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Event Rounds</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List View */}
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
                <Card 
                  key={item.id} 
                  className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => setSelectedUrl(item.htmlContentUrl)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Team ID: {item.teamid}</p>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                    <ChevronRight className="text-gray-500" />
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Preview Panel */}
          {selectedUrl && (
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Preview</h2>
                <button 
                  onClick={() => setSelectedUrl('')}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="relative w-full" style={{ paddingTop: '75%' }}>
                <iframe
                  src={selectedUrl}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  title="Content Preview"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { X } from 'lucide-react';
import Link from 'next/link';

export default function ContentViewerPage({ params }: { params: { url: string } }) {
  const decodedUrl = decodeURIComponent(params.url);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Content Preview</h1>
          <Link 
            href="/"
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded-full"
          >
            <X className="h-6 w-6" />
          </Link>
        </div>
        
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
          <div className="relative w-full" style={{ paddingTop: '75%' }}>
            <iframe
              src={decodedUrl}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              title="Content Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
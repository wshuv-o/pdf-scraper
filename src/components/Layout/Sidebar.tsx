import { useState } from 'react';
import { ChevronLeft, Copy } from 'lucide-react';
import SearchResultItem from '@/components/Search/SearchResultItem';

interface SidebarProps {
  searchQuery: string;
  currentPDF: File | null;
  setCurrentPDF: (pdf: File | null) => void;
}

// Mock search result data
const MOCK_SEARCH_RESULTS = [
  { id: 1, page: 5, content: "This is a sample text containing the term \"Hello\" with some context around it for demonstration purposes. This would be the..." },
  { id: 2, page: 3, content: "This is a sample text containing the term \"Hello\" with some context around it for demonstration purposes. This would be the..." },
  { id: 3, page: 3, content: "This is a sample text containing the term \"Hello\" with some context around it for demonstration purposes. This would be the..." },
  { id: 4, page: 3, content: "This is a sample text containing the term \"Hello\" with some context around it for demonstration purposes. This would be the..." },
];

const Sidebar = ({ searchQuery, currentPDF, setCurrentPDF }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<'current' | 'all'>('current');
  
  return (
    <div className="w-64 flex flex-col border-r border-gray-700 bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium">Search Results</h2>
        <button className="p-1 rounded hover:bg-gray-800">
          <ChevronLeft size={20} />
        </button>
      </div>
      
      <div className="flex border-b border-gray-700">
        <button 
          className={`flex-1 py-2 text-center text-sm ${activeTab === 'current' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('current')}
        >
          Current PDF
        </button>
        <button 
          className={`flex-1 py-2 text-center text-sm ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('all')}
        >
          All PDFs
        </button>
      </div>
      
      {searchQuery && (
        <div className="p-3 border-b border-gray-700 bg-gray-800">
          <div className="flex gap-2 items-center">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              4
            </span>
            <span className="font-medium">Hello</span>
          </div>
          <div className="flex mt-1 text-xs text-gray-400">
            This is a sample text...
            <button className="ml-2 p-1 rounded hover:bg-gray-700">
              <Copy size={12} />
            </button>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        <div className="py-2 text-sm text-gray-400 px-4">{MOCK_SEARCH_RESULTS.length} results</div>
        
        {MOCK_SEARCH_RESULTS.map((result) => (
          <SearchResultItem
            key={result.id}
            page={result.page}
            content={result.content}
            searchTerm={searchQuery}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
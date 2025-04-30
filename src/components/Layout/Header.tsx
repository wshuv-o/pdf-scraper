import { useState } from 'react';
import { Search, X, Upload, Sun, Moon, Download } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
}

const Header = ({ searchQuery, setSearchQuery, darkMode, setDarkMode }: HeaderProps) => {
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const handleAddSearchTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      if (!searchTags.includes(searchQuery.trim())) {
        setSearchTags([...searchTags, searchQuery.trim()]);
      }
      setSearchQuery('');
    }
  };

  const handleRemoveSearchTag = (tag: string) => {
    setSearchTags(searchTags.filter(t => t !== tag));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className={`flex items-center px-4 py-2 ${darkMode ? 'bg-gray-900 text-white border-b border-gray-700' : 'bg-white text-gray-900 border-b border-gray-200'}`}>
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-8">PDFlyzer</h1>
        
        <button 
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm mr-4 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          <Upload size={16} />
          <span>Upload PDFs</span>
        </button>
      </div>
      
      <div className="flex-1 mx-4 relative">
        <div className={`flex items-center rounded px-3 py-1.5 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Search size={18} className="text-gray-500" />
          
          <div className="flex flex-wrap gap-1 ml-2">
            {searchTags.map(tag => (
              <div 
                key={tag} 
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-sm ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-900'}`}
              >
                <span>{tag}</span>
                <button onClick={() => handleRemoveSearchTag(tag)}>
                  <X size={14} />
                </button>
              </div>
            ))}
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleAddSearchTag}
              className="flex-1 bg-transparent outline-none min-w-[100px]"
              placeholder="Add another term..."
            />
          </div>
          
          {searchQuery && (
            <button onClick={handleClearSearch}>
              <X size={18} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
interface SearchResultItemProps {
    page: number;
    content: string;
    searchTerm: string;
  }
  
  const SearchResultItem = ({ page, content, searchTerm }: SearchResultItemProps) => {
    // Function to highlight search term in content
    const highlightSearchTerm = (text: string, term: string) => {
      if (!term) return text;
      
      const parts = text.split(new RegExp(`(${term})`, 'gi'));
      
      return parts.map((part, index) => 
        part.toLowerCase() === term.toLowerCase() 
          ? <span key={index} className="bg-blue-600 text-white px-1 rounded">
              {part}
            </span>
          : part
      );
    };
  
    return (
      <div className="p-3 border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
        <div className="flex justify-between items-center mb-1">
          <div className="bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
            Hello
          </div>
          <div className="text-xs text-gray-400">
            Page {page}
          </div>
        </div>
        <div className="text-sm">
          {highlightSearchTerm(content, searchTerm)}
        </div>
      </div>
    );
  };
  
  export default SearchResultItem;
interface PDFThumbnailsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const PDFThumbnails = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
  }: PDFThumbnailsProps) => {
    
    // Generate an array of page numbers
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="w-20 border-r border-gray-700 bg-gray-900 overflow-y-auto flex flex-col items-center py-4">
        {pages.map((page) => (
          <div 
            key={page}
            className={`mb-4 cursor-pointer transition-all ${
              currentPage === page 
                ? 'ring-2 ring-blue-500' 
                : 'hover:ring-2 hover:ring-gray-500'
            }`}
            onClick={() => onPageChange(page)}
          >
            {/* Thumbnail image - in a real app, this would be the actual page thumbnail */}
            <div className="w-16 h-20 bg-gray-800 flex items-center justify-center border border-gray-700">
              <span className="text-xs text-gray-400">{page}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PDFThumbnails;
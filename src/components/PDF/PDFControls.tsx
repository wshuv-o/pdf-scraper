import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

interface PDFControlsProps {
  currentPage: number;
  totalPages: number;
  zoom: number;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
}

const PDFControls = ({ 
  currentPage, 
  totalPages, 
  zoom, 
  onPageChange, 
  onZoomChange 
}: PDFControlsProps) => {
  
  const handleZoomIn = () => {
    onZoomChange(Math.min(zoom + 10, 150));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoom - 10, 20));
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page)) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <button 
          className="p-1 rounded hover:bg-gray-800 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center mx-2">
          <input 
            type="text"
            value={currentPage}
            onChange={handlePageInputChange}
            className="w-8 text-center bg-gray-800 rounded p-1 text-sm"
          />
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-gray-400">{totalPages}</span>
        </div>
        
        <button 
          className="p-1 rounded hover:bg-gray-800 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="flex items-center bg-gray-800 rounded">
        <button 
          className="p-1 rounded-l hover:bg-gray-700 disabled:opacity-50"
          onClick={handleZoomOut}
          disabled={zoom <= 20}
        >
          <Minus size={16} />
        </button>
        
        <span className="px-2 text-sm">{zoom}%</span>
        
        <button 
          className="p-1 rounded-r hover:bg-gray-700 disabled:opacity-50"
          onClick={handleZoomIn}
          disabled={zoom >= 150}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default PDFControls;
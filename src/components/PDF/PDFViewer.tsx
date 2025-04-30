import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import PDFControls from "./PDFControls";
import PDFThumbnails from "./PDFThumbnails";
import {
  AlignJustify,
  Download,
  Printer,
  RotateCcw,
  Search,
} from "lucide-react";

interface PDFViewerProps {
  pdfFile: File; // Updated to accept a File object instead of a string
  searchQuery: string;
}

const PDFViewer = ({ pdfFile, searchQuery }: PDFViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [zoom, setZoom] = useState(30);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);

  // Create a URL for the uploaded PDF file
  useEffect(() => {
    if (pdfFile) {
      const objectUrl = URL.createObjectURL(pdfFile);
      setPdfFileUrl(objectUrl);

      return () => {
        // Cleanup the object URL when the component is unmounted
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    }
  }, [pdfFile]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="border-b border-gray-700 p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-gray-800">
            <AlignJustify size={18} />
          </button>
          <span className="font-medium text-gray-300 text-sm truncate max-w-sm">
            {pdfFile.name}
          </span>
        </div>

        <PDFControls
          currentPage={currentPage}
          totalPages={totalPages}
          zoom={zoom}
          onPageChange={handlePageChange}
          onZoomChange={handleZoomChange}
        />

        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-gray-800">
            <Download size={18} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-800">
            <Printer size={18} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-800">
            <RotateCcw size={18} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-800">
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {showThumbnails && (
          <PDFThumbnails
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className="flex-1 flex justify-center items-start overflow-auto p-4 bg-gray-800">
          {pdfFileUrl ? (
            <div className="relative" style={{ width: `${zoom}%` }}>
              <Document
                file={pdfFileUrl}
                onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
              >
                <Page pageNumber={currentPage} />
              </Document>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="text-3xl text-gray-500">
                  PDF Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Loading PDF...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;

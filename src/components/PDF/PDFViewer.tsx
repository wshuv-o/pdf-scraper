import { useState, useEffect } from "react";
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
  pdfFiles: File[]; // Accept an array of files
  searchQuery: string;
}

const PDFViewer = ({ pdfFiles, searchQuery }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0); // Keep track of the current PDF index
  const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pdfFiles.length > 0) {
      const objectUrl = URL.createObjectURL(pdfFiles[currentPdfIndex]); // Get URL for the selected PDF
      setPdfFileUrl(objectUrl);

      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    }
  }, [pdfFiles, currentPdfIndex]);

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  // Handle changing the current PDF (if multiple PDFs are provided)
  const handlePdfChange = (index: number) => {
    setCurrentPdfIndex(index);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="border-b border-gray-700 p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-gray-800">
            <AlignJustify size={18} />
          </button>
          <span className="font-medium text-gray-300 text-sm truncate max-w-sm">
            {pdfFiles[currentPdfIndex]?.name}
          </span>
        </div>

        <PDFControls
          currentPage={1}
          totalPages={1}
          zoom={zoom}
          onPageChange={() => {}}
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
        {/* {showThumbnails && (
          <PDFThumbnails
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
          />
        )} */}

        <div className="flex-1 flex justify-center items-start overflow-auto p-4 bg-gray-800">
          {pdfFileUrl ? (
            <iframe
              src={pdfFileUrl}
              title="PDF Viewer"
              className="w-full h-full border-0"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top left",
              }}
            />
          ) : (
            <div className="text-gray-500">Loading PDF...</div>
          )}
        </div>
      </div>

      {/* Optionally add navigation for multiple PDFs */}
      <div className="flex justify-center gap-2 p-4">
        {pdfFiles.map((pdf, index) => (
          <button
            key={index}
            onClick={() => handlePdfChange(index)}
            className="text-gray-300 hover:text-white"
          >
            {pdf.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PDFViewer;

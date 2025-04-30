"use client";

import { useState } from "react";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import PDFViewer from "@/components/PDF/PDFViewer";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedPDFs, setUploadedPDFs] = useState<File[]>([]); // This should hold the array of PDFs
  const [currentPDF, setCurrentPDF] = useState<File | null>(null); // Single file for current PDF view
  const [searchQuery, setSearchQuery] = useState<string>("Hello");
  const [darkMode, setDarkMode] = useState(true);

  // Function to handle setting the uploaded PDFs
  const handleSetUploadedPDFs = (pdfFiles: File[]) => {
    setUploadedPDFs(pdfFiles); // Store all uploaded PDFs in the state
    if (pdfFiles.length > 0) {
      setCurrentPDF(pdfFiles[0]); // Set the first PDF as the current PDF
    }
  };

  return (
    <main
      className={`flex flex-col h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setUploadedPDFs={handleSetUploadedPDFs} // Passing the function to Header
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <Sidebar
            searchQuery={searchQuery}
            uploadedPDFs={uploadedPDFs} // Pass the entire list of PDFs to Sidebar
            setCurrentPDF={setCurrentPDF} // Pass the setter to Sidebar to update the selected PDF
          />
        )}

        <div className="flex-1 overflow-hidden">
          {currentPDF ? ( // Check if a specific PDF is selected
            <PDFViewer
              pdfFiles={uploadedPDFs} // Pass the entire list of uploaded PDFs
              searchQuery={searchQuery}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">
                Select or upload a PDF to view
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

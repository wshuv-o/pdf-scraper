"use client";

import { useState } from "react";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import PDFViewer from "@/components/PDF/PDFViewer";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPDF, setCurrentPDF] = useState<File | null>(null); // Change to File instead of string
  const [searchQuery, setSearchQuery] = useState<string>("Hello");
  const [darkMode, setDarkMode] = useState(true);

  // Function to handle setting the uploaded PDFs
  const handleSetUploadedPDFs = (pdfFiles: File[]) => {
    if (pdfFiles.length > 0) {
      // Set the first uploaded PDF as the current PDF to be displayed
      setCurrentPDF(pdfFiles[0]);
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
            currentPDF={currentPDF}
            setCurrentPDF={setCurrentPDF}
          />
        )}

        <div className="flex-1 overflow-hidden">
          {currentPDF ? (
            <PDFViewer
              pdfFile={currentPDF} // Pass the whole file here
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

"use client"

import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
  setUploadedPDFs: (pdfFiles: File[]) => void; // New prop
}

const Header = ({
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  setUploadedPDFs, // Accepting the new prop
}: HeaderProps) => {
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddSearchTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      if (!searchTags.includes(searchQuery.trim())) {
        setSearchTags([...searchTags, searchQuery.trim()]);
      }
      setSearchQuery("");
    }
  };

  const handleRemoveSearchTag = (tag: string) => {
    setSearchTags(searchTags.filter((t) => t !== tag));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const pdfFiles = Array.from(files);
      setUploadedPDFs(pdfFiles); // Pass the files to parent component
      console.log("Uploaded PDF files:", pdfFiles);
    }
  };

  return (
    <header
      className={`flex items-center px-4 py-2 ${
        darkMode
          ? "bg-gray-900 text-white border-b border-gray-700"
          : "bg-white text-gray-900 border-b border-gray-200"
      }`}
    >
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-8">PDFlyzer</h1>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={handleUploadClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm mr-4 ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Upload size={16} />
          <span>Upload PDFs</span>
        </button>
      </div>

      {/* Search bar and other controls */}
      {/* Your existing code for search and dark mode toggle */}
    </header>
  );
};

export default Header;

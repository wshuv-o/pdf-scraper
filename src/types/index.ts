// PDF related types
export interface PDFDocument {
    id: string;
    name: string;
    path: string;
    totalPages: number;
  }
  
  // Search related types
  export interface SearchResult {
    id: number;
    documentId: string;
    documentName: string;
    page: number;
    content: string;
    matchPosition: number;
  }
  
  export interface SearchTag {
    id: string;
    text: string;
  }
  
  // UI related types
  export type ThemeMode = 'dark' | 'light';
  
  // Application state types
  export interface AppState {
    currentPDF: PDFDocument | null;
    searchQuery: string;
    searchTags: SearchTag[];
    searchResults: SearchResult[];
    themeMode: ThemeMode;
  }
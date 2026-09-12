/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { poems as initialPoems, type Poem } from "../data/poems";
import { books as initialBooks, type Book } from "../data/books";
import { musings as initialMusings, type JournalEntry } from "../data/musings";
import { authorData as initialAuthor, type AuthorProfile } from "../data/author";

interface DataContextType {
  poems: Poem[];
  books: Book[];
  musings: JournalEntry[];
  authorData: AuthorProfile;
  // Poems
  addPoem: (poem: Omit<Poem, "id">) => void;
  updatePoem: (id: string, poem: Partial<Poem>) => void;
  deletePoem: (id: string) => void;
  // Books
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  // Musings
  addMusing: (musing: Omit<JournalEntry, "id">) => void;
  updateMusing: (id: string, musing: Partial<JournalEntry>) => void;
  deleteMusing: (id: string) => void;
  // Author
  updateAuthor: (data: Partial<AuthorProfile>) => void;
  // Reset & Backup
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = "rishitha_site_data_v3";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [poems, setPoems] = useState<Poem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.poems && Array.isArray(parsed.poems)) return parsed.poems;
      }
    } catch {
      // fallback
    }
    return initialPoems;
  });

  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.books && Array.isArray(parsed.books)) return parsed.books;
      }
    } catch {
      // fallback
    }
    return initialBooks;
  });

  const [musings, setMusings] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.musings && Array.isArray(parsed.musings)) return parsed.musings;
      }
    } catch {
      // fallback
    }
    return initialMusings;
  });

  const [authorData, setAuthorData] = useState<AuthorProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.authorData) return parsed.authorData;
      }
    } catch {
      // fallback
    }
    return initialAuthor;
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      const payload = {
        poems,
        books,
        musings,
        authorData,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage limit or private mode fallback
    }
  }, [poems, books, musings, authorData]);

  // Poem Operations
  const addPoem = (newPoemData: Omit<Poem, "id">) => {
    const id = newPoemData.slug || `poem-${Date.now()}`;
    const newPoem: Poem = {
      ...newPoemData,
      id,
    };
    setPoems((prev) => [newPoem, ...prev]);
  };

  const updatePoem = (id: string, updatedFields: Partial<Poem>) => {
    setPoems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deletePoem = (id: string) => {
    setPoems((prev) => prev.filter((p) => p.id !== id));
  };

  // Book Operations
  const addBook = (newBookData: Omit<Book, "id">) => {
    const id = newBookData.slug || `book-${Date.now()}`;
    const newBook: Book = {
      ...newBookData,
      id,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id: string, updatedFields: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // Musing Operations
  const addMusing = (newMusingData: Omit<JournalEntry, "id">) => {
    const id = newMusingData.slug || `musing-${Date.now()}`;
    const newMusing: JournalEntry = {
      ...newMusingData,
      id,
    };
    setMusings((prev) => [newMusing, ...prev]);
  };

  const updateMusing = (id: string, updatedFields: Partial<JournalEntry>) => {
    setMusings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedFields } : m))
    );
  };

  const deleteMusing = (id: string) => {
    setMusings((prev) => prev.filter((m) => m.id !== id));
  };

  // Author Operations
  const updateAuthor = (data: Partial<AuthorProfile>) => {
    setAuthorData((prev) => ({
      ...prev,
      ...data,
      photos: {
        ...prev.photos,
        ...(data.photos || {}),
      },
      social: {
        ...prev.social,
        ...(data.social || {}),
      },
    }));
  };

  // Reset to original data
  const resetToDefaults = () => {
    setPoems(initialPoems);
    setBooks(initialBooks);
    setMusings(initialMusings);
    setAuthorData(initialAuthor);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Export & Import
  const exportDataJson = () => {
    return JSON.stringify(
      {
        poems,
        books,
        musings,
        authorData,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.poems && Array.isArray(parsed.poems)) setPoems(parsed.poems);
      if (parsed.books && Array.isArray(parsed.books)) setBooks(parsed.books);
      if (parsed.musings && Array.isArray(parsed.musings)) setMusings(parsed.musings);
      if (parsed.authorData) setAuthorData(parsed.authorData);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        poems,
        books,
        musings,
        authorData,
        addPoem,
        updatePoem,
        deletePoem,
        addBook,
        updateBook,
        deleteBook,
        addMusing,
        updateMusing,
        deleteMusing,
        updateAuthor,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

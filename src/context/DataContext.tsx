/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { poems as initialPoems, type Poem } from "../data/poems";
import { books as initialBooks, type Book } from "../data/books";
import {
  BUILT_IN_MUSINGS,
  musings as initialMusings,
  type JournalEntry,
} from "../data/musings";
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
  syncPublishedJournals: (remoteJournals: JournalEntry[], markPending?: boolean) => void;
  // Author
  updateAuthor: (data: Partial<AuthorProfile>) => void;
  // Reset & Backup
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = "rishitha_site_data_v3";
const PENDING_SYNC_TTL_MS = 3 * 60 * 1000;

interface StoredOverrides {
  localDraftPoems: string[];
  editedPoems: string[];
  deletedPoems: string[];
  localDraftBooks: string[];
  editedBooks: string[];
  deletedBooks: string[];
  localDraftMusings: string[];
  editedMusings: string[];
  deletedMusings: string[];
  editedAuthor: boolean;
}

interface StoredPayload {
  poems?: Poem[];
  books?: Book[];
  musings?: JournalEntry[];
  authorData?: AuthorProfile;
  overrides?: Partial<StoredOverrides>;
  pendingPublishedMusings?: JournalEntry[];
  pendingSyncedAt?: number;
}

const DEFAULT_OVERRIDES: StoredOverrides = {
  localDraftPoems: [],
  editedPoems: [],
  deletedPoems: [],
  localDraftBooks: [],
  editedBooks: [],
  deletedBooks: [],
  localDraftMusings: [],
  editedMusings: [],
  deletedMusings: [],
  editedAuthor: false,
};

const readSavedPayload = (): StoredPayload | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as StoredPayload) : null;
  } catch {
    return null;
  }
};

const hasLocalModifications = (
  overrides: StoredOverrides,
  pendingPublishedMusings: JournalEntry[] | null
): boolean => {
  if (pendingPublishedMusings !== null) return true;
  if (overrides.editedAuthor) return true;
  return (
    overrides.localDraftPoems.length > 0 ||
    overrides.editedPoems.length > 0 ||
    overrides.deletedPoems.length > 0 ||
    overrides.localDraftBooks.length > 0 ||
    overrides.editedBooks.length > 0 ||
    overrides.deletedBooks.length > 0 ||
    overrides.localDraftMusings.length > 0 ||
    overrides.editedMusings.length > 0 ||
    overrides.deletedMusings.length > 0
  );
};

/**
 * Merges static repository entries with browser-local drafts/edits so new
 * entries or deletions in src/data/*.ts always reflect for visitors.
 */
const mergeWithStaticData = <T extends { id: string }>(
  initialItems: T[],
  savedItems: T[] | undefined,
  localDraftIds: string[] = [],
  editedIds: string[] = [],
  deletedIds: string[] = []
): T[] => {
  if (!Array.isArray(savedItems)) return initialItems;

  const draftSet = new Set(localDraftIds);
  const deletedSet = new Set(deletedIds);
  const editedSet = new Set(editedIds);
  const initialIds = new Set(initialItems.map((item) => item.id));
  const savedMap = new Map(savedItems.map((item) => [item.id, item]));

  const localDrafts = savedItems.filter(
    (item) => draftSet.has(item.id) && !initialIds.has(item.id)
  );
  const staticItems = initialItems
    .filter((item) => !deletedSet.has(item.id))
    .map((item) =>
      editedSet.has(item.id) && savedMap.has(item.id) ? savedMap.get(item.id)! : item
    );

  return [...localDrafts, ...staticItems];
};

const makeUniqueSlug = <T extends { id: string; slug: string }>(
  rawSlug: string,
  fallbackPrefix: string,
  existing: T[]
): string => {
  const base = rawSlug || `${fallbackPrefix}-${Date.now()}`;
  const collides = existing.some((item) => item.id === base || item.slug === base);
  return collides ? `${base}-${Date.now()}` : base;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialCache] = useState<StoredPayload | null>(() => readSavedPayload());

  const [overrides, setOverrides] = useState<StoredOverrides>(() => ({
    ...DEFAULT_OVERRIDES,
    ...(initialCache?.overrides || {}),
  }));

  const [pendingSync, setPendingSync] = useState<{
    journals: JournalEntry[];
    syncedAt: number;
  } | null>(() => {
    if (
      Array.isArray(initialCache?.pendingPublishedMusings) &&
      typeof initialCache?.pendingSyncedAt === "number" &&
      Date.now() - initialCache.pendingSyncedAt < PENDING_SYNC_TTL_MS
    ) {
      return {
        journals: initialCache.pendingPublishedMusings,
        syncedAt: initialCache.pendingSyncedAt,
      };
    }
    return null;
  });

  const [poems, setPoems] = useState<Poem[]>(() =>
    mergeWithStaticData(
      initialPoems,
      initialCache?.poems,
      initialCache?.overrides?.localDraftPoems,
      initialCache?.overrides?.editedPoems,
      initialCache?.overrides?.deletedPoems
    )
  );

  const [books, setBooks] = useState<Book[]>(() =>
    mergeWithStaticData(
      initialBooks,
      initialCache?.books,
      initialCache?.overrides?.localDraftBooks,
      initialCache?.overrides?.editedBooks,
      initialCache?.overrides?.deletedBooks
    )
  );

  const [musings, setMusings] = useState<JournalEntry[]>(() => {
    const baseMusings =
      Array.isArray(initialCache?.pendingPublishedMusings) &&
      typeof initialCache?.pendingSyncedAt === "number" &&
      Date.now() - initialCache.pendingSyncedAt < PENDING_SYNC_TTL_MS
        ? [...initialCache.pendingPublishedMusings, ...BUILT_IN_MUSINGS]
        : initialMusings;

    return mergeWithStaticData(
      baseMusings,
      initialCache?.musings,
      initialCache?.overrides?.localDraftMusings,
      initialCache?.overrides?.editedMusings,
      initialCache?.overrides?.deletedMusings
    );
  });

  const [authorData, setAuthorData] = useState<AuthorProfile>(() => {
    return initialCache?.overrides?.editedAuthor && initialCache?.authorData
      ? initialCache.authorData
      : initialAuthor;
  });

  // Sync only local drafts/overrides or short-lived pending GitHub sync to localStorage
  useEffect(() => {
    try {
      const pendingList = pendingSync ? pendingSync.journals : null;
      if (!hasLocalModifications(overrides, pendingList)) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      const payload: StoredPayload & { lastUpdated: string } = {
        poems,
        books,
        musings,
        authorData,
        overrides,
        lastUpdated: new Date().toISOString(),
      };
      if (pendingSync) {
        payload.pendingPublishedMusings = pendingSync.journals;
        payload.pendingSyncedAt = pendingSync.syncedAt;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage limit or private mode fallback
    }
  }, [poems, books, musings, authorData, overrides, pendingSync]);

  const markOverride = (key: Exclude<keyof StoredOverrides, "editedAuthor">, id: string) => {
    setOverrides((prev) =>
      prev[key].includes(id) ? prev : { ...prev, [key]: [...prev[key], id] }
    );
  };

  // Poem Operations
  const addPoem = (newPoemData: Omit<Poem, "id">) => {
    const uniqueSlug = makeUniqueSlug(newPoemData.slug, "poem", poems);
    markOverride("localDraftPoems", uniqueSlug);
    setPoems((prev) => [{ ...newPoemData, id: uniqueSlug, slug: uniqueSlug }, ...prev]);
  };

  const updatePoem = (id: string, updatedFields: Partial<Poem>) => {
    markOverride("editedPoems", id);
    setPoems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deletePoem = (id: string) => {
    if (initialPoems.some((p) => p.id === id)) {
      markOverride("deletedPoems", id);
    }
    setOverrides((prev) => ({
      ...prev,
      localDraftPoems: prev.localDraftPoems.filter((draftId) => draftId !== id),
    }));
    setPoems((prev) => prev.filter((p) => p.id !== id));
  };

  // Book Operations
  const addBook = (newBookData: Omit<Book, "id">) => {
    const uniqueSlug = makeUniqueSlug(newBookData.slug, "book", books);
    markOverride("localDraftBooks", uniqueSlug);
    setBooks((prev) => [...prev, { ...newBookData, id: uniqueSlug, slug: uniqueSlug }]);
  };

  const updateBook = (id: string, updatedFields: Partial<Book>) => {
    markOverride("editedBooks", id);
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBook = (id: string) => {
    if (initialBooks.some((b) => b.id === id)) {
      markOverride("deletedBooks", id);
    }
    setOverrides((prev) => ({
      ...prev,
      localDraftBooks: prev.localDraftBooks.filter((draftId) => draftId !== id),
    }));
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // Musing Operations
  const addMusing = (newMusingData: Omit<JournalEntry, "id">) => {
    const uniqueSlug = makeUniqueSlug(newMusingData.slug, "journal", musings);
    markOverride("localDraftMusings", uniqueSlug);
    setMusings((prev) => [{ ...newMusingData, id: uniqueSlug, slug: uniqueSlug }, ...prev]);
  };

  const updateMusing = (id: string, updatedFields: Partial<JournalEntry>) => {
    markOverride("editedMusings", id);
    setMusings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedFields } : m))
    );
  };

  const deleteMusing = (id: string) => {
    if (initialMusings.some((m) => m.id === id)) {
      markOverride("deletedMusings", id);
    }
    setOverrides((prev) => ({
      ...prev,
      localDraftMusings: prev.localDraftMusings.filter((draftId) => draftId !== id),
    }));
    setMusings((prev) => prev.filter((m) => m.id !== id));
  };

  const syncPublishedJournals = (remoteJournals: JournalEntry[], markPending = false) => {
    const remoteIds = new Set(remoteJournals.map((j) => j.id));
    const builtInIds = new Set(BUILT_IN_MUSINGS.map((j) => j.id));
    const localDraftSet = new Set(overrides.localDraftMusings);

    setMusings((prev) => {
      const remainingLocalDrafts = prev.filter(
        (m) => localDraftSet.has(m.id) && !remoteIds.has(m.id) && !builtInIds.has(m.id)
      );
      return [...remainingLocalDrafts, ...remoteJournals, ...BUILT_IN_MUSINGS];
    });

    setOverrides((prev) => ({
      ...prev,
      localDraftMusings: prev.localDraftMusings.filter(
        (id) => !remoteIds.has(id) && !builtInIds.has(id)
      ),
      editedMusings: [],
      deletedMusings: [],
    }));

    if (markPending) {
      setPendingSync({ journals: remoteJournals, syncedAt: Date.now() });
    }
  };

  // Author Operations
  const updateAuthor = (data: Partial<AuthorProfile>) => {
    setOverrides((prev) => ({ ...prev, editedAuthor: true }));
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
    setOverrides(DEFAULT_OVERRIDES);
    setPendingSync(null);
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
      const nextOverrides: Partial<StoredOverrides> = {};

      if (parsed.poems && Array.isArray(parsed.poems)) {
        const importedPoems = parsed.poems as Poem[];
        const importedIds = new Set(importedPoems.map((p) => p.id));
        const initialIds = new Set(initialPoems.map((p) => p.id));
        nextOverrides.localDraftPoems = importedPoems.filter((p) => !initialIds.has(p.id)).map((p) => p.id);
        nextOverrides.editedPoems = initialPoems.filter((p) => importedIds.has(p.id)).map((p) => p.id);
        nextOverrides.deletedPoems = initialPoems.filter((p) => !importedIds.has(p.id)).map((p) => p.id);
        setPoems(importedPoems);
      }
      if (parsed.books && Array.isArray(parsed.books)) {
        const importedBooks = parsed.books as Book[];
        const importedIds = new Set(importedBooks.map((b) => b.id));
        const initialIds = new Set(initialBooks.map((b) => b.id));
        nextOverrides.localDraftBooks = importedBooks.filter((b) => !initialIds.has(b.id)).map((b) => b.id);
        nextOverrides.editedBooks = initialBooks.filter((b) => importedIds.has(b.id)).map((b) => b.id);
        nextOverrides.deletedBooks = initialBooks.filter((b) => !importedIds.has(b.id)).map((b) => b.id);
        setBooks(importedBooks);
      }
      if (parsed.musings && Array.isArray(parsed.musings)) {
        const importedMusings = parsed.musings as JournalEntry[];
        const importedIds = new Set(importedMusings.map((m) => m.id));
        const initialIds = new Set(initialMusings.map((m) => m.id));
        nextOverrides.localDraftMusings = importedMusings.filter((m) => !initialIds.has(m.id)).map((m) => m.id);
        nextOverrides.editedMusings = initialMusings.filter((m) => importedIds.has(m.id)).map((m) => m.id);
        nextOverrides.deletedMusings = initialMusings.filter((m) => !importedIds.has(m.id)).map((m) => m.id);
        setMusings(importedMusings);
      }
      if (parsed.authorData) {
        nextOverrides.editedAuthor = true;
        setAuthorData(parsed.authorData);
      }
      setOverrides((prev) => ({ ...prev, ...nextOverrides }));
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
        syncPublishedJournals,
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

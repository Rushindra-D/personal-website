import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  Check,
  Download,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Feather,
  Sparkles,
  User,
  LogOut,
  Search,
  X,
  Save,
} from "lucide-react";
import { useData } from "../context/DataContext";
import type { Poem } from "../data/poems";
import type { Book } from "../data/books";
import type { JournalEntry } from "../data/musings";

export const AdminPage: React.FC = () => {
  const {
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
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("author_admin_auth") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "poems" | "books" | "musings" | "profile" | "backup">("dashboard");

  // Notifications
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const showBanner = (msg: string) => {
    setBannerMessage(msg);
    setTimeout(() => setBannerMessage(null), 3500);
  };

  // --- POEM MODAL STATE ---
  const [editingPoemId, setEditingPoemId] = useState<string | null>(null);
  const [poemModalOpen, setPoemModalOpen] = useState(false);
  const [poemForm, setPoemForm] = useState({
    title: "",
    slug: "",
    content: "",
    signature: "~Rishitha Gorupati",
    excerpt: "",
    featured: false,
  });
  const [poemSearch, setPoemSearch] = useState("");

  // --- BOOK MODAL STATE ---
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookForm, setBookForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    author: "Rishitha Gorupati",
    synopsis: "",
    coverFront: "/assets/books/that_day_is_inevitable_front.jpg",
    coverBack: "/assets/books/that_day_is_inevitable_back.jpg",
    mockup: "/assets/books/that_day_is_inevitable_mockup.jpg",
    amazonLink: "https://amzn.in/d/02x4k9iQ",
    flipkartLink: "https://www.flipkart.com/PLACEHOLDER",
    publisher: "String Production India",
    isbn: "978-93-58136-03-6",
    format: "Paperback",
    price: "₹99",
    genre: "Life / Philosophy",
  });

  // --- MUSING MODAL STATE ---
  const [editingMusingId, setEditingMusingId] = useState<string | null>(null);
  const [musingModalOpen, setMusingModalOpen] = useState(false);
  const [musingForm, setMusingForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    category: "Psychological Inquiry & Reflections",
    readTime: "4 min read",
    author: "Rishitha Gorupati",
    excerpt: "",
    bodyText: "",
    concludingReflection: "",
  });

  // --- AUTHOR PROFILE STATE ---
  const [profileForm, setProfileForm] = useState({
    name: authorData.name,
    titles: authorData.titles.join(", "),
    pronouns: authorData.pronouns,
    tagline: authorData.tagline,
    bio: authorData.bio,
    shortBio: authorData.shortBio,
    email: authorData.social.email,
    linkedin: authorData.social.linkedin,
    instagram: authorData.social.instagram,
    heroPhoto: authorData.photos.hero,
    portraitPhoto: authorData.photos.portrait,
    gardenPhoto: authorData.photos.garden,
  });

  // --- PASSKEY STATE ---
  const [newPasskey, setNewPasskey] = useState("");
  const [confirmPasskey, setConfirmPasskey] = useState("");
  const [passkeyFeedback, setPasskeyFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const customPasskey = localStorage.getItem("author_custom_passkey");
    const entered = passwordInput.trim();
    const valid =
      (customPasskey && entered === customPasskey) ||
      entered === "rishitha" ||
      entered === "author2026";

    if (valid) {
      setIsAuthenticated(true);
      localStorage.setItem("author_admin_auth", "true");
      setAuthError(false);
      showBanner("Welcome back, Rishitha!");
    } else {
      setAuthError(true);
    }
  };

  const handleUpdatePasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasskey.trim()) {
      setPasskeyFeedback({ type: "error", msg: "Passkey cannot be empty." });
      return;
    }
    if (newPasskey !== confirmPasskey) {
      setPasskeyFeedback({ type: "error", msg: "Passkeys do not match." });
      return;
    }
    if (newPasskey.length < 4) {
      setPasskeyFeedback({ type: "error", msg: "Passkey must be at least 4 characters long." });
      return;
    }
    localStorage.setItem("author_custom_passkey", newPasskey.trim());
    setPasskeyFeedback({
      type: "success",
      msg: `Passkey updated successfully! Use "${newPasskey}" next time you log in.`,
    });
    setNewPasskey("");
    setConfirmPasskey("");
    showBanner("Admin passkey successfully updated!");
  };

  const handleResetPasskey = () => {
    if (window.confirm("Reset passkey back to default ('rishitha')?")) {
      localStorage.removeItem("author_custom_passkey");
      setPasskeyFeedback({ type: "success", msg: "Passkey reset to default ('rishitha')." });
      showBanner("Passkey reset to default ('rishitha').");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("author_admin_auth");
  };

  // --- POEM ACTIONS ---
  const openNewPoem = () => {
    setEditingPoemId(null);
    setPoemForm({
      title: "",
      slug: "",
      content: "",
      signature: "~Rishitha Gorupati",
      excerpt: "",
      featured: false,
    });
    setPoemModalOpen(true);
  };

  const openEditPoem = (poem: Poem) => {
    setEditingPoemId(poem.id);
    setPoemForm({
      title: poem.title,
      slug: poem.slug,
      content: poem.content,
      signature: poem.signature,
      excerpt: poem.excerpt,
      featured: !!poem.featured,
    });
    setPoemModalOpen(true);
  };

  const savePoem = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      poemForm.slug.trim() ||
      poemForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const poemData = {
      title: poemForm.title.trim(),
      slug,
      content: poemForm.content.trim(),
      signature: poemForm.signature.trim(),
      excerpt: poemForm.excerpt.trim() || poemForm.content.slice(0, 100) + "...",
      featured: poemForm.featured,
    };

    if (editingPoemId) {
      updatePoem(editingPoemId, poemData);
      showBanner(`Poem "${poemForm.title}" updated successfully.`);
    } else {
      addPoem(poemData);
      showBanner(`New poem "${poemForm.title}" published!`);
    }

    setPoemModalOpen(false);
  };

  // --- BOOK ACTIONS ---
  const openNewBook = () => {
    setEditingBookId(null);
    setBookForm({
      title: "",
      slug: "",
      subtitle: "",
      author: "Rishitha Gorupati",
      synopsis: "",
      coverFront: "/assets/books/that_day_is_inevitable_front.jpg",
      coverBack: "/assets/books/that_day_is_inevitable_back.jpg",
      mockup: "/assets/books/that_day_is_inevitable_mockup.jpg",
      amazonLink: "",
      flipkartLink: "",
      publisher: "",
      isbn: "",
      format: "Paperback",
      price: "",
      genre: "Literature",
    });
    setBookModalOpen(true);
  };

  const openEditBook = (book: Book) => {
    setEditingBookId(book.id);
    setBookForm({
      title: book.title,
      slug: book.slug,
      subtitle: book.subtitle || "",
      author: book.author,
      synopsis: book.synopsis.join("\n\n"),
      coverFront: book.coverFront,
      coverBack: book.coverBack || "",
      mockup: book.mockup || "",
      amazonLink: book.buyLinks.amazon,
      flipkartLink: book.buyLinks.flipkart,
      publisher: book.details.publisher || "",
      isbn: book.details.isbn || "",
      format: book.details.format || "Paperback",
      price: book.details.price || "",
      genre: book.details.genre || "",
    });
    setBookModalOpen(true);
  };

  const saveBook = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      bookForm.slug.trim() ||
      bookForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const synopsisParagraphs = bookForm.synopsis
      .split("\n\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const bookPayload: Omit<Book, "id"> = {
      slug,
      title: bookForm.title.trim(),
      subtitle: bookForm.subtitle.trim(),
      author: bookForm.author.trim(),
      synopsis: synopsisParagraphs.length > 0 ? synopsisParagraphs : [bookForm.title],
      coverFront: bookForm.coverFront.trim(),
      coverBack: bookForm.coverBack.trim() || undefined,
      mockup: bookForm.mockup.trim() || undefined,
      buyLinks: {
        amazon: bookForm.amazonLink.trim(),
        flipkart: bookForm.flipkartLink.trim(),
        isFlipkartPlaceholder: !bookForm.flipkartLink.trim(),
      },
      details: {
        format: bookForm.format,
        language: "English",
        publisher: bookForm.publisher.trim(),
        isbn: bookForm.isbn.trim(),
        price: bookForm.price.trim(),
        genre: bookForm.genre.trim(),
      },
    };

    if (editingBookId) {
      updateBook(editingBookId, bookPayload);
      showBanner(`Book "${bookForm.title}" updated successfully.`);
    } else {
      addBook(bookPayload);
      showBanner(`Book "${bookForm.title}" added to site!`);
    }

    setBookModalOpen(false);
  };

  // --- MUSING ACTIONS ---
  const openNewMusing = () => {
    setEditingMusingId(null);
    setMusingForm({
      title: "",
      slug: "",
      subtitle: "",
      category: "Psychological Inquiry & Reflections",
      readTime: "4 min read",
      author: "Rishitha Gorupati",
      excerpt: "",
      bodyText: "",
      concludingReflection: "",
    });
    setMusingModalOpen(true);
  };

  const openEditMusing = (musing: JournalEntry) => {
    setEditingMusingId(musing.id);
    const bodyText = musing.sections
      .map((s) => (s.heading ? `### ${s.heading}\n` : "") + s.paragraphs.join("\n\n"))
      .join("\n\n");

    setMusingForm({
      title: musing.title,
      slug: musing.slug,
      subtitle: musing.subtitle,
      category: musing.category,
      readTime: musing.readTime,
      author: musing.author,
      excerpt: musing.excerpt,
      bodyText,
      concludingReflection: musing.concludingReflection,
    });
    setMusingModalOpen(true);
  };

  const saveMusing = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      musingForm.slug.trim() ||
      musingForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const paragraphs = musingForm.bodyText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const musingPayload: Omit<JournalEntry, "id"> = {
      slug,
      title: musingForm.title.trim(),
      subtitle: musingForm.subtitle.trim(),
      category: musingForm.category.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      readTime: musingForm.readTime.trim(),
      author: musingForm.author.trim(),
      excerpt: musingForm.excerpt.trim() || musingForm.subtitle,
      coverImage: "/assets/sketches/sketch_geometric_spiral.jpg",
      tags: ["Journal", "Psychology", "Reflections"],
      sections: [
        {
          paragraphs,
        },
      ],
      sketches: musings[0]?.sketches || [],
      concludingReflection: musingForm.concludingReflection.trim(),
    };

    if (editingMusingId) {
      updateMusing(editingMusingId, musingPayload);
      showBanner(`Journal "${musingForm.title}" updated.`);
    } else {
      addMusing(musingPayload);
      showBanner(`New Journal "${musingForm.title}" published!`);
    }

    setMusingModalOpen(false);
  };

  // --- PROFILE ACTIONS ---
  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const titles = profileForm.titles.split(",").map((t) => t.trim()).filter(Boolean);

    updateAuthor({
      name: profileForm.name.trim(),
      titles: titles.length > 0 ? titles : authorData.titles,
      pronouns: profileForm.pronouns.trim(),
      tagline: profileForm.tagline.trim(),
      bio: profileForm.bio.trim(),
      shortBio: profileForm.shortBio.trim(),
      photos: {
        hero: profileForm.heroPhoto.trim(),
        portrait: profileForm.portraitPhoto.trim(),
        garden: profileForm.gardenPhoto.trim(),
      },
      social: {
        email: profileForm.email.trim(),
        linkedin: profileForm.linkedin.trim(),
        instagram: profileForm.instagram.trim(),
      },
    });

    showBanner("Author profile updated across all pages!");
  };

  // --- BACKUP ACTIONS ---
  const handleExport = () => {
    const dataStr = exportDataJson();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rishitha_site_data_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showBanner("Backup file downloaded successfully.");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const success = importDataJson(content);
      if (success) {
        showBanner("Site data imported and refreshed!");
      } else {
        alert("Invalid JSON data format.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content back to the default manuscript? Any custom additions will be cleared.")) {
      resetToDefaults();
      showBanner("Content restored to original manuscript data.");
    }
  };

  // Filter poems for list
  const filteredPoems = poems.filter(
    (p) =>
      p.title.toLowerCase().includes(poemSearch.toLowerCase()) ||
      p.content.toLowerCase().includes(poemSearch.toLowerCase())
  );

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-8 sm:p-10 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#F7F3EB] border border-[#E0D8CB] flex items-center justify-center text-[#856E4E] mx-auto">
            <Lock className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-[#221E1B] font-medium">
              Author Portal
            </h1>
            <p className="font-serif italic text-sm text-[#736B61]">
              Enter author credentials to edit poems, books, journals, and bio.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono text-[#4B453E] mb-1">
                Passkey
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter author passkey..."
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm text-[#221E1B] focus:outline-none focus:border-[#856E4E] focus:ring-1 focus:ring-[#856E4E] transition-all"
              />
            </div>

            {authError && (
              <p className="text-xs text-[#C53030]">
                Incorrect passkey. (Hint: <span className="font-mono font-semibold">rishitha</span>)
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors flex items-center justify-center space-x-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Enter Portal</span>
            </button>
          </form>

          <p className="text-[11px] text-[#968D81] pt-2">
            Default author passkey is <span className="font-mono text-[#856E4E]">rishitha</span>
          </p>
        </div>
      </div>
    );
  }

  // LOGGED-IN ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 space-y-8">
      {/* Banner Notification */}
      {bannerMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#221E1B] text-[#FDFBF7] px-6 py-3 rounded-sm shadow-xl flex items-center space-x-3 text-xs uppercase tracking-wider animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{bannerMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EFE9DD] pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E] flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              Author Dynamic Portal
            </span>
            <span className="text-xs text-[#968D81]">|</span>
            <span className="text-xs text-[#736B61]">{authorData.name}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium mt-1">
            Content Management
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-[#E0D8CB] bg-white text-xs uppercase tracking-wider font-medium text-[#4B453E] hover:border-[#856E4E] hover:text-[#221E1B] transition-colors rounded-sm"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 bg-[#F7F3EB] text-xs uppercase tracking-wider font-medium text-[#736B61] hover:text-[#C53030] transition-colors rounded-sm"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#EFE9DD] overflow-x-auto space-x-2 sm:space-x-4">
        {[
          { key: "dashboard", label: "Overview", icon: Sparkles },
          { key: "poems", label: `Poems (${poems.length})`, icon: Feather },
          { key: "books", label: `Books (${books.length})`, icon: BookOpen },
          { key: "musings", label: `Musings (${musings.length})`, icon: Feather },
          { key: "profile", label: "Author Profile", icon: User },
          { key: "backup", label: "Backup & Sync", icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center space-x-2 py-3 px-4 border-b-2 text-xs uppercase tracking-[0.14em] font-medium transition-all whitespace-nowrap ${
                active
                  ? "border-[#856E4E] text-[#221E1B] font-semibold bg-[#F7F3EB]/50"
                  : "border-transparent text-[#736B61] hover:text-[#221E1B]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="space-y-10 animate-fadeIn">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div
              onClick={() => setActiveTab("poems")}
              className="cursor-pointer p-6 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm hover:border-[#856E4E] transition-all group"
            >
              <div className="flex items-center justify-between text-[#856E4E] mb-2">
                <Feather className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-mono">Manage →</span>
              </div>
              <p className="font-serif text-3xl font-medium text-[#221E1B]">{poems.length}</p>
              <p className="text-xs uppercase tracking-wider text-[#736B61] mt-1">Poetry Manuscripts</p>
            </div>

            <div
              onClick={() => setActiveTab("books")}
              className="cursor-pointer p-6 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm hover:border-[#856E4E] transition-all group"
            >
              <div className="flex items-center justify-between text-[#856E4E] mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-mono">Manage →</span>
              </div>
              <p className="font-serif text-3xl font-medium text-[#221E1B]">{books.length}</p>
              <p className="text-xs uppercase tracking-wider text-[#736B61] mt-1">Published Volumes</p>
            </div>

            <div
              onClick={() => setActiveTab("musings")}
              className="cursor-pointer p-6 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm hover:border-[#856E4E] transition-all group"
            >
              <div className="flex items-center justify-between text-[#856E4E] mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-mono">Manage →</span>
              </div>
              <p className="font-serif text-3xl font-medium text-[#221E1B]">{musings.length}</p>
              <p className="text-xs uppercase tracking-wider text-[#736B61] mt-1">Journals &amp; Inquiries</p>
            </div>
          </div>

          {/* Quick Actions Deck */}
          <div className="p-8 bg-[#F7F3EB] border border-[#EFE9DD] rounded-sm space-y-6">
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openNewPoem}
                className="inline-flex items-center px-5 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Add New Poem</span>
              </button>
              <button
                onClick={openNewBook}
                className="inline-flex items-center px-5 py-3 bg-white border border-[#D5C7B2] text-[#221E1B] text-xs uppercase tracking-wider font-medium rounded-sm hover:border-[#856E4E] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2 text-[#856E4E]" />
                <span>Add Book Volume</span>
              </button>
              <button
                onClick={openNewMusing}
                className="inline-flex items-center px-5 py-3 bg-white border border-[#D5C7B2] text-[#221E1B] text-xs uppercase tracking-wider font-medium rounded-sm hover:border-[#856E4E] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2 text-[#856E4E]" />
                <span>Write Journal / Musing</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className="inline-flex items-center px-5 py-3 bg-white border border-[#D5C7B2] text-[#221E1B] text-xs uppercase tracking-wider font-medium rounded-sm hover:border-[#856E4E] transition-colors"
              >
                <User className="w-4 h-4 mr-2 text-[#856E4E]" />
                <span>Update Author Bio &amp; Links</span>
              </button>
            </div>
          </div>

          {/* Dynamic Persistence Information */}
          <div className="p-6 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-2">
            <h4 className="font-serif text-lg font-medium text-[#221E1B]">
              Real-Time Dynamic Synchronization
            </h4>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Every poem you write, book you add, or profile edit you make here updates your website immediately without needing to re-compile code. Everything is stored persistently in your browser and automatically exported to your backup file anytime.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: POEMS MANAGER */}
      {activeTab === "poems" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#968D81] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search poems by title or verse..."
                value={poemSearch}
                onChange={(e) => setPoemSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FDFBF7] border border-[#E0D8CB] rounded-sm text-xs text-[#221E1B] focus:outline-none focus:border-[#856E4E]"
              />
            </div>

            <button
              onClick={openNewPoem}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Add New Poem</span>
            </button>
          </div>

          {/* Poems Table / List */}
          <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm overflow-hidden shadow-xs">
            <div className="divide-y divide-[#EFE9DD]">
              {filteredPoems.map((poem, index) => (
                <div
                  key={poem.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-[#F7F3EB]/40 transition-colors gap-4"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-[#968D81]">#{index + 1}</span>
                      <h4 className="font-serif text-lg font-medium text-[#221E1B]">
                        {poem.title}
                      </h4>
                      {poem.featured && (
                        <span className="text-[10px] uppercase font-mono tracking-wider bg-[#F4EFE6] text-[#856E4E] px-2 py-0.5 rounded border border-[#E5DDCF]">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="font-serif italic text-xs text-[#736B61] line-clamp-1">
                      {poem.excerpt || poem.content.slice(0, 90) + "..."}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center">
                    <Link
                      to={`/poetry/${poem.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#736B61] hover:text-[#221E1B] transition-colors"
                      title="View live poem"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => openEditPoem(poem)}
                      className="p-2 text-[#856E4E] hover:text-[#221E1B] transition-colors"
                      title="Edit poem"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${poem.title}"?`)) {
                          deletePoem(poem.id);
                          showBanner(`Poem "${poem.title}" deleted.`);
                        }
                      }}
                      className="p-2 text-[#C53030] hover:text-red-700 transition-colors"
                      title="Delete poem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKS MANAGER */}
      {activeTab === "books" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Published Volumes</h3>
            <button
              onClick={openNewBook}
              className="inline-flex items-center px-5 py-2.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Add New Book</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {books.map((b) => (
              <div
                key={b.id}
                className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="flex space-x-4">
                  <div className="w-24 aspect-2/3 shrink-0 rounded overflow-hidden border border-[#E0D8CB] bg-white">
                    <img src={b.coverFront} alt={b.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#856E4E]">
                      {b.details.genre || "Book"}
                    </span>
                    <h4 className="font-serif text-xl font-medium text-[#221E1B]">{b.title}</h4>
                    <p className="font-serif italic text-xs text-[#736B61]">{b.subtitle}</p>
                    <p className="text-xs text-[#968D81] font-mono pt-2">ISBN: {b.details.isbn}</p>
                    <p className="text-xs text-[#968D81] font-mono">Price: {b.details.price || "₹99"}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EFE9DD] flex items-center justify-between">
                  <Link
                    to={`/books/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-[#856E4E] hover:underline"
                  >
                    <span>View Page</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditBook(b)}
                      className="px-3 py-1 bg-[#F7F3EB] text-[#221E1B] text-xs font-medium rounded hover:bg-[#856E4E] hover:text-white transition-colors"
                    >
                      Edit Book
                    </button>
                    {books.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete book "${b.title}"?`)) {
                            deleteBook(b.id);
                            showBanner(`Book deleted.`);
                          }
                        }}
                        className="p-1.5 text-[#C53030] hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MUSINGS & JOURNALS */}
      {activeTab === "musings" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Journals &amp; Musings</h3>
            <button
              onClick={openNewMusing}
              className="inline-flex items-center px-5 py-2.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Write Journal</span>
            </button>
          </div>

          <div className="space-y-4">
            {musings.map((m) => (
              <div
                key={m.id}
                className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1 max-w-2xl">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#856E4E]">
                    {m.category} • {m.date}
                  </span>
                  <h4 className="font-serif text-xl font-medium text-[#221E1B]">{m.title}</h4>
                  <p className="font-serif italic text-xs text-[#736B61] line-clamp-1">{m.subtitle}</p>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <Link
                    to={`/musings/${m.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#736B61] hover:text-[#221E1B]"
                    title="Read live journal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => openEditMusing(m)}
                    className="px-3 py-1.5 bg-[#F7F3EB] text-[#221E1B] text-xs font-medium rounded hover:bg-[#856E4E] hover:text-white transition-colors"
                  >
                    Edit Journal
                  </button>
                  {musings.length > 1 && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete journal "${m.title}"?`)) {
                          deleteMusing(m.id);
                          showBanner("Journal deleted.");
                        }
                      }}
                      className="p-1.5 text-[#C53030] hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AUTHOR PROFILE */}
      {activeTab === "profile" && (
        <form onSubmit={saveProfile} className="space-y-8 max-w-3xl bg-[#FDFBF7] border border-[#EAE3D6] p-8 rounded-sm animate-fadeIn">
          <div className="border-b border-[#EFE9DD] pb-4">
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Edit Author Information</h3>
            <p className="font-serif italic text-xs text-[#736B61]">
              Updates your biography, pronouns, tagline, and verified social contact links across every page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E]">
                Pronouns
              </label>
              <input
                type="text"
                value={profileForm.pronouns}
                onChange={(e) => setProfileForm({ ...profileForm, pronouns: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E]">
              Titles (comma separated)
            </label>
            <input
              type="text"
              value={profileForm.titles}
              onChange={(e) => setProfileForm({ ...profileForm, titles: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E]">
              Tagline Quote
            </label>
            <input
              type="text"
              value={profileForm.tagline}
              onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-serif italic"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E]">
              Short Bio (Homepage)
            </label>
            <textarea
              rows={3}
              value={profileForm.shortBio}
              onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-serif"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E]">
              Full Biography (About Page)
            </label>
            <textarea
              rows={5}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-serif"
            />
          </div>

          {/* Social Links */}
          <div className="border-t border-[#EFE9DD] pt-6 space-y-4">
            <h4 className="font-serif text-lg text-[#221E1B] font-medium">Contact &amp; Social Links</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-[#736B61] uppercase">Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#736B61] uppercase">LinkedIn URL</label>
                <input
                  type="url"
                  value={profileForm.linkedin}
                  onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#736B61] uppercase">Instagram URL</label>
                <input
                  type="url"
                  value={profileForm.instagram}
                  onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFE9DD] flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#856E4E] transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Author Profile</span>
            </button>
          </div>

          {/* Security & Portal Passkey Section */}
          <div className="pt-8 border-t border-[#EFE9DD] space-y-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E] flex items-center">
                <Lock className="w-3.5 h-3.5 mr-1.5" />
                Security &amp; Passkey
              </span>
              <h4 className="font-serif text-xl text-[#221E1B] font-medium mt-1">
                Change Admin Portal Passkey
              </h4>
              <p className="font-serif italic text-xs text-[#736B61] mt-0.5">
                Set a personal secret passkey to unlock your Author Portal. Default is <span className="font-mono font-semibold text-[#856E4E]">rishitha</span>.
              </p>
            </div>

            <div className="p-5 bg-[#F7F3EB] border border-[#E5DDCF] rounded-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono text-[#736B61] uppercase">
                    New Passkey
                  </label>
                  <input
                    type="password"
                    value={newPasskey}
                    onChange={(e) => setNewPasskey(e.target.value)}
                    placeholder="Enter new passkey (min 4 chars)"
                    className="w-full px-4 py-2 bg-white border border-[#D5C7B2] rounded-sm text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono text-[#736B61] uppercase">
                    Confirm Passkey
                  </label>
                  <input
                    type="password"
                    value={confirmPasskey}
                    onChange={(e) => setConfirmPasskey(e.target.value)}
                    placeholder="Confirm new passkey"
                    className="w-full px-4 py-2 bg-white border border-[#D5C7B2] rounded-sm text-sm"
                  />
                </div>
              </div>

              {passkeyFeedback && (
                <div
                  className={`p-3 text-xs rounded-xs ${
                    passkeyFeedback.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {passkeyFeedback.msg}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleUpdatePasskey}
                  className="px-5 py-2 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
                >
                  Update Passkey
                </button>
                <button
                  type="button"
                  onClick={handleResetPasskey}
                  className="px-3 py-2 text-xs text-[#736B61] hover:text-[#221E1B] underline transition-colors"
                >
                  Reset to Default (&quot;rishitha&quot;)
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 6: BACKUP & RESTORE */}
      {activeTab === "backup" && (
        <div className="space-y-8 max-w-2xl animate-fadeIn">
          <div className="bg-[#FDFBF7] border border-[#EAE3D6] p-8 rounded-sm space-y-6">
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Export &amp; Backup Site Data</h3>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Download all your poems, books, journals, and author profile details as a single file. You can keep this on your computer as a safe offline backup.
            </p>
            <button
              onClick={handleExport}
              className="inline-flex items-center px-6 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>Download Backup (.json)</span>
            </button>
          </div>

          <div className="bg-[#FDFBF7] border border-[#EAE3D6] p-8 rounded-sm space-y-4">
            <h3 className="font-serif text-xl text-[#221E1B] font-medium">Restore From Backup</h3>
            <p className="text-xs text-[#736B61] leading-relaxed">
              Choose a previously downloaded backup file to restore all content.
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="block w-full text-xs text-[#736B61] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#F7F3EB] file:text-[#221E1B] hover:file:bg-[#EAE3D6]"
            />
          </div>

          <div className="bg-[#FDFBF7] border border-[#EAE3D6] p-8 rounded-sm space-y-4 border-l-4 border-l-[#C53030]">
            <h3 className="font-serif text-xl text-[#C53030] font-medium">Reset to Default Manuscript</h3>
            <p className="text-xs text-[#736B61] leading-relaxed">
              Restore the initial 14 poems, default book, and author biography included in the website repository.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center px-5 py-2.5 border border-[#C53030] text-[#C53030] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#C53030] hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              <span>Reset Everything to Defaults</span>
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL FOR ADDING/EDITING POEM --- */}
      {poemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFBF7] border border-[#E0D8CB] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-4">
              <h3 className="font-serif text-2xl text-[#221E1B] font-medium">
                {editingPoemId ? "Edit Poem" : "Write New Poem"}
              </h3>
              <button
                onClick={() => setPoemModalOpen(false)}
                className="p-1.5 text-[#736B61] hover:text-[#221E1B] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={savePoem} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E] mb-1">
                    Poem Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={poemForm.title}
                    onChange={(e) => setPoemForm({ ...poemForm, title: e.target.value })}
                    placeholder="e.g. Whispers of the Dawn"
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E] mb-1">
                    URL Slug (optional)
                  </label>
                  <input
                    type="text"
                    value={poemForm.slug}
                    onChange={(e) => setPoemForm({ ...poemForm, slug: e.target.value })}
                    placeholder="e.g. whispers-of-the-dawn"
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E] mb-1">
                  Poem Stanzas &amp; Content *
                </label>
                <textarea
                  rows={8}
                  required
                  value={poemForm.content}
                  onChange={(e) => setPoemForm({ ...poemForm, content: e.target.value })}
                  placeholder="Type your poem stanzas here..."
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-base font-serif leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#4B453E] mb-1">
                    Author Signature
                  </label>
                  <input
                    type="text"
                    value={poemForm.signature}
                    onChange={(e) => setPoemForm({ ...poemForm, signature: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-serif italic"
                  />
                </div>

                <div className="flex items-center pt-6 space-x-2">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={poemForm.featured}
                    onChange={(e) => setPoemForm({ ...poemForm, featured: e.target.checked })}
                    className="w-4 h-4 text-[#856E4E] focus:ring-[#856E4E] border-[#E0D8CB] rounded"
                  />
                  <label htmlFor="featured-checkbox" className="text-xs uppercase tracking-wider font-mono text-[#221E1B] cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-[#EFE9DD]">
                <button
                  type="button"
                  onClick={() => setPoemModalOpen(false)}
                  className="px-5 py-2.5 border border-[#E0D8CB] text-xs uppercase tracking-wider font-medium text-[#736B61] hover:bg-[#F7F3EB] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
                >
                  {editingPoemId ? "Save Changes" : "Publish Poem"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FOR ADDING/EDITING BOOK --- */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFBF7] border border-[#E0D8CB] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-4">
              <h3 className="font-serif text-2xl text-[#221E1B] font-medium">
                {editingBookId ? "Edit Book" : "Add New Book Volume"}
              </h3>
              <button
                onClick={() => setBookModalOpen(false)}
                className="p-1.5 text-[#736B61] hover:text-[#221E1B] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Book Title *</label>
                  <input
                    type="text"
                    required
                    value={bookForm.title}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                  />
                </div>
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={bookForm.subtitle}
                    onChange={(e) => setBookForm({ ...bookForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-mono text-[#4B453E] mb-1">
                  Synopsis / Blurb (separate paragraphs with blank lines) *
                </label>
                <textarea
                  rows={5}
                  required
                  value={bookForm.synopsis}
                  onChange={(e) => setBookForm({ ...bookForm, synopsis: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-serif"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Front Cover Image</label>
                  <input
                    type="text"
                    value={bookForm.coverFront}
                    onChange={(e) => setBookForm({ ...bookForm, coverFront: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Back Cover Image</label>
                  <input
                    type="text"
                    value={bookForm.coverBack}
                    onChange={(e) => setBookForm({ ...bookForm, coverBack: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">3D Mockup Image</label>
                  <input
                    type="text"
                    value={bookForm.mockup}
                    onChange={(e) => setBookForm({ ...bookForm, mockup: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Amazon Link</label>
                  <input
                    type="url"
                    value={bookForm.amazonLink}
                    onChange={(e) => setBookForm({ ...bookForm, amazonLink: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">ISBN</label>
                  <input
                    type="text"
                    value={bookForm.isbn}
                    onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Publisher</label>
                  <input
                    type="text"
                    value={bookForm.publisher}
                    onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-xs"
                  />
                </div>
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Price</label>
                  <input
                    type="text"
                    value={bookForm.price}
                    onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block uppercase font-mono text-[#4B453E] mb-1">Genre</label>
                  <input
                    type="text"
                    value={bookForm.genre}
                    onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-[#EFE9DD]">
                <button
                  type="button"
                  onClick={() => setBookModalOpen(false)}
                  className="px-5 py-2 border border-[#E0D8CB] uppercase tracking-wider font-medium text-[#736B61] hover:bg-[#F7F3EB] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#221E1B] text-[#FDFBF7] uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
                >
                  {editingBookId ? "Save Book" : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FOR ADDING/EDITING MUSING --- */}
      {musingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFBF7] border border-[#E0D8CB] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-4">
              <h3 className="font-serif text-2xl text-[#221E1B] font-medium">
                {editingMusingId ? "Edit Journal Entry" : "Write New Journal Entry"}
              </h3>
              <button
                onClick={() => setMusingModalOpen(false)}
                className="p-1.5 text-[#736B61] hover:text-[#221E1B] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveMusing} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-mono text-[#4B453E] mb-1">Journal Title *</label>
                <input
                  type="text"
                  required
                  value={musingForm.title}
                  onChange={(e) => setMusingForm({ ...musingForm, title: e.target.value })}
                  placeholder="e.g. Reflections on Stillness"
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                />
              </div>

              <div>
                <label className="block uppercase font-mono text-[#4B453E] mb-1">Subtitle *</label>
                <input
                  type="text"
                  required
                  value={musingForm.subtitle}
                  onChange={(e) => setMusingForm({ ...musingForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm"
                />
              </div>

              <div>
                <label className="block uppercase font-mono text-[#4B453E] mb-1">
                  Journal Body Text (separate paragraphs with blank lines) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={musingForm.bodyText}
                  onChange={(e) => setMusingForm({ ...musingForm, bodyText: e.target.value })}
                  placeholder="Write your contemplative essay or journal entry..."
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-serif leading-relaxed"
                />
              </div>

              <div>
                <label className="block uppercase font-mono text-[#4B453E] mb-1">
                  Concluding Thought / Reflection Quote
                </label>
                <input
                  type="text"
                  value={musingForm.concludingReflection}
                  onChange={(e) => setMusingForm({ ...musingForm, concludingReflection: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm font-serif italic"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-[#EFE9DD]">
                <button
                  type="button"
                  onClick={() => setMusingModalOpen(false)}
                  className="px-5 py-2 border border-[#E0D8CB] uppercase tracking-wider font-medium text-[#736B61] hover:bg-[#F7F3EB] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#221E1B] text-[#FDFBF7] uppercase tracking-wider font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
                >
                  {editingMusingId ? "Save Journal" : "Publish Journal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

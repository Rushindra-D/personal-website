import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { PoetryPage } from "./pages/PoetryPage";
import { PoemDetailPage } from "./pages/PoemDetailPage";
import { MusingsPage } from "./pages/MusingsPage";
import { MusingDetailPage } from "./pages/MusingDetailPage";
import { BooksPage } from "./pages/BooksPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";
import { DataProvider } from "./context/DataContext";

export const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#24201D]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/poetry" element={<PoetryPage />} />
              <Route path="/poetry/:slug" element={<PoemDetailPage />} />
              <Route path="/musings" element={<MusingsPage />} />
              <Route path="/musings/:slug" element={<MusingDetailPage />} />
              <Route path="/art" element={<Navigate to="/musings" replace />} />
              <Route path="/music" element={<Navigate to="/musings" replace />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:slug" element={<BookDetailPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;

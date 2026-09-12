import React from "react";
import { useData } from "../context/DataContext";
import { BookCard } from "../components/BookCard";

export const BooksPage: React.FC = () => {
  const { books } = useData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E]">
          Published Literature
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#221E1B] font-medium tracking-tight">
          Books &amp; Publications
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#5C564E] leading-relaxed">
          &ldquo;When we truly accept that life is temporary, we begin to value each moment more deeply and learn to live with greater love, meaning, and clarity.&rdquo;
        </p>
      </div>

      {/* Books List */}
      <div className="space-y-12">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Future Anthologies Notice */}
      <div className="p-8 bg-[#F7F3EB] border border-[#EFE9DD] rounded-sm text-center max-w-xl mx-auto space-y-2">
        <h3 className="font-serif text-lg text-[#221E1B]">Upcoming Works &amp; Anthologies</h3>
        <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
          Rishitha Gorupati is also a co-author of several published anthologies. New standalone books and volumes will be featured here as they are officially announced.
        </p>
      </div>
    </div>
  );
};

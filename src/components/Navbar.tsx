import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "POETRY", path: "/poetry" },
    { name: "MUSINGS", path: "/musings" },
    { name: "BOOKS", path: "/books" },
    { name: "ACHIEVEMENTS", path: "/achievements" },
    { name: "ABOUT ME", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#EFE9DD] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Author Name */}
          <Link
            to="/"
            className="group flex flex-col items-start focus:outline-none focus:ring-1 focus:ring-[#856E4E] rounded px-1"
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#221E1B] group-hover:text-[#856E4E] transition-colors">
              Rishitha Gorupati
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#736B61] -mt-0.5">
              Author • Poet • Writer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors relative py-1 focus:outline-none focus:ring-1 focus:ring-[#856E4E] rounded ${
                    active
                      ? "text-[#221E1B]"
                      : "text-[#736B61] hover:text-[#221E1B]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#856E4E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden p-2 text-[#221E1B] hover:text-[#856E4E] focus:outline-none focus:ring-2 focus:ring-[#856E4E] rounded-md transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-50 bg-[#FDFBF7] flex flex-col justify-between px-8 py-10 overflow-y-auto animate-fadeIn md:hidden">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-serif tracking-wider uppercase transition-colors flex items-center justify-between border-b border-[#EFE9DD] pb-3 ${
                    active
                      ? "text-[#856E4E] font-semibold"
                      : "text-[#342F2A] hover:text-[#856E4E]"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="text-xs tracking-normal font-sans text-[#856E4E]">•</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[#EFE9DD] text-center">
            <p className="font-serif italic text-[#736B61] text-sm">
              &ldquo;Where thoughts become words, words become reflections, and words are woven into verses.&rdquo;
            </p>
            <p className="text-xs text-[#968D81] mt-3 uppercase tracking-widest">
              Rishitha Gorupati
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Playfair_Display, JetBrains_Mono, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const prices = [
  { label: "XAU/USD", value: "2,341.20", change: "+0.4%", isPositive: true },
  { label: "XAG/USD", value: "28.45", change: "-1.2%", isPositive: false },
  { label: "BTC/USD", value: "67,142.00", change: "+2.1%", isPositive: true },
];

const categories = [
  { name: "Macro", href: "/macro" },
  { name: "AI & Tech", href: "/ai-tech" },
  { name: "Storage", href: "/storage" },
  { name: "Estate", href: "/estate" },
  { name: "Green Energy", href: "/green-energy" },
  { name: "Scrap Metal", href: "/scrap-metal" },
  { name: "Off Grid", href: "/off-grid" },
  { name: "Numismatics", href: "/numismatics" },
  { name: "Coins & Bars", href: "/coins-bars" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  return (
    <header className="w-full bg-black sticky top-0 z-50">

      {/* ── Top Bar ── */}
      <nav className="px-4 md:px-7 py-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className={`${playfair.className} text-[#FDE99A] font-bold text-base lg:text-lg whitespace-nowrap`}
            >
              GoldSilver.de
            </Link>
          </div>

          {/* Price Tickers — desktop only, hidden when search open */}
          {!searchOpen && (
            <div className="hidden md:flex items-center gap-5 lg:gap-8">
              {prices.map((item) => (
                <div key={item.label} className="flex items-center gap-1 whitespace-nowrap">
                  <span className={`${jetbrainsMono.className} text-white text-xs lg:text-sm`}>
                    {item.label}:
                  </span>
                  <span className={`${jetbrainsMono.className} text-xs lg:text-sm ${item.isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {item.value} {item.change}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Desktop Expanded Search Bar */}
          {searchOpen && (
            <div className="hidden md:flex flex-1 mx-6 items-center border border-gray-600 rounded-lg overflow-hidden">
              <Search size={16} className="text-gray-400 ml-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics..."
                className={`${inter.className} bg-transparent text-white text-sm px-3 py-2 w-full outline-none placeholder-gray-500`}
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                className="text-gray-400 hover:text-white transition-colors pr-3"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              aria-label="Search"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
              className={`transition-colors ${searchOpen ? "text-[#FDE99A]" : "text-white hover:text-[#FDE99A]"}`}
            >
              <Search size={18} />
            </button>
            <button
              className={`${inter.className} hidden md:block text-[#B8860B] border border-[#B8860B] rounded-lg px-3 py-1 text-xs lg:text-sm hover:bg-[#B8860B] hover:text-black transition-colors duration-200`}
            >
              Subscribe
            </button>
            {/* Hamburger — mobile only */}
            <button
              aria-label="Toggle menu"
              className="md:hidden text-white hover:text-[#FDE99A] transition-colors"
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile inline search — shown below top bar when search icon tapped */}
        {searchOpen && (
          <div className="md:hidden mt-3 flex items-center border border-gray-600 rounded-lg overflow-hidden">
            <Search size={16} className="text-gray-400 ml-3 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics..."
              className={`${inter.className} bg-transparent text-white text-sm px-3 py-2 w-full outline-none placeholder-gray-500`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-white transition-colors pr-3"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
      </nav>

      {/* ── Desktop Category Nav ── */}
      <nav className="hidden md:block border-b border-gray-800 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
          {categories.map((category) => {
            const isActive = pathname === category.href;
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`${inter.className} text-xs lg:text-sm whitespace-nowrap transition-colors duration-200 pb-1 ${
                  isActive ? "text-[#FDE99A] border-b-2 border-[#B8860B]" : "text-[#B8860B] hover:text-[#FDE99A]"
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800 px-5 py-4 flex flex-col gap-4">

          {/* Price tickers */}
          <div className="grid grid-cols-3 gap-2">
            {prices.map((item) => (
              <div key={item.label} className="flex flex-col items-center bg-gray-900 rounded-lg py-2 px-1">
                <span className={`${jetbrainsMono.className} text-gray-400 text-[10px]`}>
                  {item.label}
                </span>
                <span className={`${jetbrainsMono.className} text-xs font-semibold ${item.isPositive ? "text-emerald-400" : "text-red-400"}`}>
                  {item.value}
                </span>
                <span className={`${jetbrainsMono.className} text-[10px] ${item.isPositive ? "text-emerald-400" : "text-red-400"}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800" />

          {/* Categories — collapsible on mobile */}
          <div>
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className={`${inter.className} flex items-center justify-between w-full text-[#B8860B] text-sm font-medium py-1`}
            >
              <span>Categories</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {categoriesOpen && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const isActive = pathname === category.href;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setMenuOpen(false)}
                      className={`${inter.className} text-sm px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-[#B8860B]/20 text-[#FDE99A] border border-[#B8860B]"
                          : "text-[#B8860B] bg-gray-900 hover:text-[#FDE99A]"
                      }`}
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-gray-800" />

          {/* Subscribe button */}
          <button
            className={`${inter.className} w-full text-[#B8860B] border border-[#B8860B] rounded-lg px-3 py-2 text-sm hover:bg-[#B8860B] hover:text-black transition-colors duration-200`}
          >
            Subscribe
          </button>
        </div>
      )}

    </header>
  );
}
"use client";

import { useState, useEffect } from "react";

const links = ["Collection", "About", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-6 md:py-8">
        <a
          href="/"
          className="font-body font-light text-[10px] tracking-[0.4em] uppercase hover:opacity-60 transition-opacity duration-300"
        >
          REN KITAGAWA
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <a
              key={item}
              href="#"
              className="font-body font-light text-[10px] tracking-[0.3em] text-white/40 uppercase hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              open ? "rotate-45 translate-y-[7px] w-5" : "w-5"
            }`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              open ? "opacity-0 w-5" : "w-3"
            }`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[7px] w-5" : "w-5"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "max-h-64 border-t border-white/5" : "max-h-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-7">
          {links.map((item) => (
            <a
              key={item}
              href="#"
              className="font-body font-light text-[11px] tracking-[0.35em] text-white/50 uppercase hover:text-white transition-colors duration-300"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

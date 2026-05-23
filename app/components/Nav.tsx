"use client";

import { useState } from "react";

const links = [
  { label: "Collection", href: "/#collection" },
  { label: "About",      href: "/about" },
  { label: "Contact",    href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/8">
      <div className="flex items-center justify-between px-6 md:px-12 py-5 md:py-6">

        {/* Left — brand name in Archivo Black */}
        <a
          href="/"
          className="font-heading text-[9px] tracking-[0.25em] uppercase text-white hover:opacity-50 transition-opacity duration-300"
        >
          REN KITAGAWA
        </a>

        {/* Right — desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-body font-light text-[9px] tracking-[0.25em] text-white/40 uppercase hover:text-white transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`block h-px bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[7px] w-5" : "w-5"}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${open ? "opacity-0 w-5" : "w-3"}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px] w-5" : "w-5"}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "max-h-56 border-t border-white/8" : "max-h-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-7">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-body font-light text-[9px] tracking-[0.25em] text-white/50 uppercase hover:text-white transition-colors duration-300"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

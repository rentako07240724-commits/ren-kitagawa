"use client";

import { useState, useEffect } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="loader-fadeout fixed inset-0 z-[200] flex flex-col items-center justify-center pointer-events-none"
      style={{ backgroundColor: "#0a0a0a" }}
      aria-hidden="true"
    >
      {/* Dot-noise background — 8% opacity */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.08,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-5">
        <p
          className="font-heading text-[clamp(1.2rem,6vw,3rem)] tracking-[0.3em] uppercase text-white animate-pulse"
        >
          REN KITAGAWA
        </p>
        <p className="font-body font-light text-[9px] tracking-[0.55em] text-white/60 uppercase">
          CALCULATED SILENCE.
        </p>
      </div>
    </div>
  );
}

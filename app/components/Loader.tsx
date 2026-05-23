"use client";

import { useState, useEffect } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide from DOM after animation completes (2.2s)
    const t = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="loader-fadeout fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Dot-noise background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Centered content */}
      <div className="relative flex flex-col items-center gap-5">
        <p
          className="font-heading text-[clamp(1.4rem,7vw,3.5rem)] tracking-[0.25em] uppercase text-white animate-pulse"
          style={{ letterSpacing: "0.25em" }}
        >
          REN KITAGAWA
        </p>
        <p className="font-body font-light text-[10px] tracking-[0.55em] text-white/35 uppercase">
          CALCULATED SILENCE.
        </p>
      </div>
    </div>
  );
}

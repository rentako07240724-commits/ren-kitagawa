"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [imgError, setImgError] = useState(false);

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
        <div className="animate-pulse flex items-center justify-center" style={{ width: 200, minHeight: 48 }}>
          {!imgError ? (
            <Image
              src="/images/logo.png"
              alt="REN KITAGAWA"
              width={200}
              height={80}
              style={{ objectFit: "contain", width: 200, height: "auto" }}
              priority
              onError={() => setImgError(true)}
            />
          ) : (
            // Fallback text when logo.png is not found
            <p className="font-heading text-[clamp(1.2rem,6vw,2.8rem)] tracking-[0.2em] uppercase text-white">
              REN KITAGAWA
            </p>
          )}
        </div>
        <p className="font-body font-light text-[10px] tracking-[0.55em] text-white/35 uppercase">
          CALCULATED SILENCE.
        </p>
      </div>
    </div>
  );
}

"use client"; 

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function randomString(length: number) {
  return Array.from({ length }, randomChar).join("");
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) {
      setVisible(false);
      return;
    }

    const lineInterval = setInterval(() => {
      setCodeLines((prev) => {
        const next = [...prev, randomString(Math.floor(Math.random() * 30) + 20)];
        return next.slice(-18);
      });
    }, 60);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);

    const brandTimer = setTimeout(() => {
      clearInterval(lineInterval);
      setShowBrand(true);
    }, 1800);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("loaded", "1");
    }, 3400);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(brandTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        fontFamily: "monospace",
        overflow: "hidden",
      }}
    >
      {!showBrand && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 2rem",
            gap: "0.3rem",
          }}
        >
          {codeLines.map((line, i) => (
            <div
              key={i}
              style={{
                color: `rgba(30, 80, 180, ${0.3 + (i / codeLines.length) * 0.7})`,
                fontSize: "clamp(10px, 1.5vw, 14px)",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}

      {showBrand && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            animation: "fadeIn 0.5s ease forwards",
          }}
        >
          <div
            style={{
              color: "#1e50b4",
              fontSize: "clamp(18px, 4vw, 32px)",
              letterSpacing: "0.4em",
              fontFamily: "var(--font-archivo-black), monospace",
              fontWeight: 900,
            }}
          >
            REN KITAGAWA
          </div>
          <div
            style={{
              color: "#1e50b4",
              fontSize: "clamp(10px, 1.5vw, 13px)",
              letterSpacing: "0.2em",
            }}
          >
            LOADING... {Math.min(progress, 100)}%
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

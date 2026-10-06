"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBrand, setShowBrand] = useState(false);
  const [grid, setGrid] = useState<string[][]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) {
      setVisible(false);
      return;
    }

    // グリッドサイズを計算
    const cols = Math.ceil(window.innerWidth / 14);
    const rows = Math.ceil(window.innerHeight / 22);
    const initial = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randomChar())
    );
    setGrid(initial);

    // 全セルをランダムに高速更新
    const gridInterval = setInterval(() => {
      setGrid((prev) =>
        prev.map((row) => row.map(() => randomChar()))
      );
    }, 50);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);

    const brandTimer = setTimeout(() => {
      clearInterval(gridInterval);
      setShowBrand(true);
    }, 1800);

    const fadeTimer = setTimeout(() => setFadeOut(true), 2800);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("loaded", "1");
    }, 3400);

    return () => {
      clearInterval(gridInterval);
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
        overflow: "hidden",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {!showBrand && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            lineHeight: "22px",
          }}
        >
          {grid.map((row, ri) => (
            <div key={ri} style={{ display: "flex" }}>
              {row.map((char, ci) => (
                <span
                  key={ci}
                  style={{
                    width: "14px",
                    color: `rgba(30, 80, 180, ${0.2 + Math.random() * 0.8})`,
                    fontSize: "13px",
                    fontFamily: "monospace",
                    textAlign: "center",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      {showBrand && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
              fontSize: "13px",
              letterSpacing: "0.2em",
              fontFamily: "monospace",
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

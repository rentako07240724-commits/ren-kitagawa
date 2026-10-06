"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function randomString(length: number) {
  return Array.from({ length }, randomChar).join("");
}

function noisyText(text: string, intensity: number) {
  return text.split("").map((char) =>
    char !== " " && Math.random() < intensity ? randomChar() : char
  ).join("");
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBrand, setShowBrand] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [brandText, setBrandText] = useState("REN KITAGAWA");

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) {
      setVisible(false);
      return;
    }

    const cols = Math.ceil((window.innerWidth - 80) / 14);
    const maxRows = Math.ceil((window.innerHeight - 80) / 22);

    // 行を1行ずつ追加
    let rowCount = 0;
    const addLineInterval = setInterval(() => {
      if (rowCount >= maxRows) {
        clearInterval(addLineInterval);
        return;
      }
      setLines((prev) => [...prev, randomString(cols)]);
      rowCount++;
    }, 80);

    // 既存の行をランダムに書き換え
    const updateInterval = setInterval(() => {
      setLines((prev) =>
        prev.map((line, i) =>
          i < prev.length - 1 ? randomString(cols) : line
        )
      );
    }, 100);

    // プログレス 0→100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return Math.min(100, prev + Math.floor(Math.random() * 3) + 1);
      });
    }, 50);

    const brandTimer = setTimeout(() => {
      clearInterval(addLineInterval);
      clearInterval(updateInterval);
      setLines([]);
      setShowBrand(true);
    }, maxRows * 80 + 200);

    return () => {
      clearInterval(addLineInterval);
      clearInterval(updateInterval);
      clearInterval(progressInterval);
      clearTimeout(brandTimer);
    };
  }, []);

  // 100%になったらロゴのノイズを消す
  useEffect(() => {
    if (!showBrand) return;
    const noiseInterval = setInterval(() => {
      const intensity = Math.max(0, (100 - progress) / 100 * 0.8);
      if (intensity === 0) {
        setBrandText("REN KITAGAWA");
      } else {
        setBrandText(noisyText("REN KITAGAWA", intensity));
      }
    }, 60);
    return () => clearInterval(noiseInterval);
  }, [showBrand, progress]);

  // 100%になったらフェードアウト
  useEffect(() => {
    if (progress >= 100 && showBrand) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 800);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("loaded", "1");
      }, 1400);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress, showBrand]);

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
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      {lines.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: "22px", width: "100%" }}>
          {lines.map((line, ri) => (
            <div key={ri} style={{ display: "flex" }}>
              {line.split("").map((char, ci) => (
                <span
                  key={ci}
                  style={{
                    width: "14px",
                    color: `rgba(30, 80, 180, ${0.2 + Math.random() * 0.7})`,
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
            animation: "fadeIn 0.4s ease forwards",
          }}
        >
          <div
            style={{
              color: "#1e50b4",
              fontSize: "clamp(28px, 6vw, 52px)",
              letterSpacing: "0.4em",
              fontFamily: "var(--font-archivo-black), monospace",
              fontWeight: 900,
            }}
          >
            {brandText}
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

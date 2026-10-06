"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&><=/\\|[]{}";
const BRAND = "REN KITAGAWA";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningBlink, setWarningBlink] = useState(true);
  const [progress, setProgress] = useState(0);
  const [brandText, setBrandText] = useState(BRAND);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) {
      setVisible(false);
      return;
    }
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const FONT_SIZE = 13;
    const LINE_H = 20;
    const PAD_X = 40;
    const PAD_Y = 40;
    const maxCols = Math.floor((W - PAD_X * 2) / FONT_SIZE);
    const rows = Math.floor((H - PAD_Y * 2) / LINE_H);
    ctx.font = `${FONT_SIZE}px monospace`;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    const rowLengths = Array.from({ length: rows }, () =>
      Math.floor(maxCols * (0.4 + Math.random() * 0.6))
    );
    const totalChars = rowLengths.reduce((a, b) => a + b, 0);
    const DURATION = 3000;
    const CHAR_INTERVAL = DURATION / totalChars;
    const grid: string[][] = Array.from({ length: rows }, (_, i) =>
      Array.from({ length: rowLengths[i] }, () => " ")
    );
    let currentRow = 0;
    let currentCol = 0;
    let lastTime = 0;
    let elapsed = 0;
    let done = false;
    let warningShown = false;
    let animId: number;

    function drawGrid() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < rowLengths[r]; c++) {
          const ch = grid[r][c];
          if (ch === " ") continue;
          const alpha = 0.2 + Math.random() * 0.7;
          ctx.fillStyle = `rgba(30,80,180,${alpha})`;
          ctx.fillText(ch, PAD_X + c * FONT_SIZE, PAD_Y + r * LINE_H + FONT_SIZE);
        }
      }
    }

    function tick(ts: number) {
      if (!lastTime) lastTime = ts;
      const dt = ts - lastTime;
      lastTime = ts;
      if (!done) {
        elapsed += dt;
        const charsToAdd = Math.floor(elapsed / CHAR_INTERVAL);
        elapsed -= charsToAdd * CHAR_INTERVAL;
        for (let i = 0; i < charsToAdd; i++) {
          if (currentRow >= rows) { done = true; break; }
          grid[currentRow][currentCol] = randomChar();
          currentCol++;
          if (currentCol >= rowLengths[currentRow]) {
            currentCol = 0;
            currentRow++;
          }
        }
        if (!warningShown && currentRow >= Math.floor(rows / 2)) {
          warningShown = true;
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 1500);
        }
        for (let r = 0; r < Math.min(currentRow + 1, rows); r++) {
          for (let c = 0; c < rowLengths[r]; c++) {
            if (grid[r][c] !== " " && Math.random() < 0.03) {
              grid[r][c] = randomChar();
            }
          }
        }
        drawGrid();
        if (done) {
          setTimeout(() => {
            cancelAnimationFrame(animId);
            setShowBrand(true);
          }, 200);
          return;
        }
      }
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (!showWarning) return;
    const blink = setInterval(() => {
      setWarningBlink((v) => !v);
    }, 80);
    return () => clearInterval(blink);
  }, [showWarning]);

  useEffect(() => {
    if (!showBrand) return;
    let prog = 0;
    setProgress(0);
    const interval = setInterval(() => {
      prog = Math.min(100, prog + Math.floor(Math.random() * 3) + 1);
      setProgress(prog);
      const intensity = (1 - prog / 100) * 0.9;
      if (intensity <= 0) {
        setBrandText(BRAND);
      } else {
        setBrandText(
          BRAND.split("").map((ch) =>
            ch !== " " && Math.random() < intensity ? randomChar() : ch
          ).join("")
        );
      }
      if (prog >= 100) {
        clearInterval(interval);
        setBrandText(BRAND);
        setTimeout(() => setFadeOut(true), 800);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("loaded", "1");
        }, 1400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [showBrand]);

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "#000", transition: "opacity 0.6s ease", opacity: fadeOut ? 0 : 1 }}>
      {!showBrand && <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />}
      {showWarning && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: warningBlink ? "translate(-50%, -50%) scale(1.03)" : "translate(-50%, -50%) scale(0.97)",
          zIndex: 10000,
          backgroundColor: "#0a0a0a",
          border: `2px solid ${warningBlink ? "#1e50b4" : "#0a2a6e"}`,
          padding: "24px 32px",
          minWidth: "320px",
          opacity: warningBlink ? 1 : 0.15,
          transition: "opacity 0.05s, transform 0.05s, border 0.05s",
          boxShadow: warningBlink ? "0 0 24px rgba(30,80,180,0.9), 0 0 60px rgba(30,80,180,0.4)" : "none",
        }}>
          <div style={{ color: warningBlink ? "#1e50b4" : "#0a2a6e", fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "12px", transition: "color 0.05s" }}>⚠ ALERT</div>
          <div style={{ color: warningBlink ? "#fff" : "#333", fontFamily: "monospace", fontSize: "13px", letterSpacing: "0.05em", marginBottom: "6px", transition: "color 0.05s" }}>Unknown signal intercepted.</div>
          <div style={{ color: warningBlink ? "#1e50b4" : "#0a2a6e", fontFamily: "monospace", fontSize: "12px", letterSpacing: "0.1em", transition: "color 0.05s" }}>Origin: REN KITAGAWA</div>
        </div>
      )}
      {showBrand && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", animation: "fadeIn 0.4s ease forwards" }}>
          <div style={{ color: "#1e50b4", fontSize: "clamp(28px, 6vw, 52px)", letterSpacing: "0.4em", fontFamily: "var(--font-archivo-black), monospace", fontWeight: 900 }}>{brandText}</div>
          <div style={{ color: "#1e50b4", fontSize: "13px", letterSpacing: "0.2em", fontFamily: "monospace" }}>LOADING... {progress}%</div>
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

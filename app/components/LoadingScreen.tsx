"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const BRAND = "REN KITAGAWA";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [progress, setProgress] = useState(0);
  const [brandText, setBrandText] = useState(BRAND);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    col: 0, row: 0, done: false,
    grid: [] as string[][],
    cols: 0, rows: 0,
  });

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

    const FONT_SIZE = 14;
    const LINE_H = 22;
    const PAD = 40;
    const cols = Math.floor((W - PAD * 2) / FONT_SIZE);
    const rows = Math.floor((H - PAD * 2) / LINE_H);

    ctx.font = `${FONT_SIZE}px monospace`;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);

    // グリッド初期化（空白）
    const grid: string[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => " ")
    );
    stateRef.current = { col: 0, row: 0, done: false, grid, cols, rows };

    let animId: number;

    function drawGrid() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ch = grid[r][c];
          if (ch === " ") continue;
          const alpha = 0.25 + Math.random() * 0.65;
          ctx.fillStyle = `rgba(30,80,180,${alpha})`;
          ctx.fillText(ch, PAD + c * FONT_SIZE, PAD + r * LINE_H + FONT_SIZE);
        }
      }
    }

    let charTimer = 0;
    const CHAR_INTERVAL = 12; // ms per char

    function tick(ts: number) {
      const s = stateRef.current;
      if (s.done) return;

      // 1文字ずつ追加
      if (ts - charTimer >= CHAR_INTERVAL) {
        charTimer = ts;
        grid[s.row][s.col] = randomChar();
        s.col++;
        if (s.col >= cols) {
          s.col = 0;
          s.row++;
          if (s.row >= rows) {
            s.done = true;
            drawGrid();
            setShowBrand(true);
            return;
          }
        }
      }

      // 既に書かれた文字をちらつかせる
      for (let r = 0; r <= s.row; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] !== " " && Math.random() < 0.05) {
            grid[r][c] = randomChar();
          }
        }
      }

      drawGrid();
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  // ブランド表示後: progress 0→100, ノイズはprogressに連動
  useEffect(() => {
    if (!showBrand) return;

    let prog = 0;
    setProgress(0);

    const interval = setInterval(() => {
      prog = Math.min(100, prog + Math.floor(Math.random() * 3) + 1);
      setProgress(prog);

      // ノイズ強度: 0%=激しい, 100%=0
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

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
            LOADING... {progress}%
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

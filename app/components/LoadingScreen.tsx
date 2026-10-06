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
  const [warningVisible, setWarningVisible] = useState(true);
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

        //

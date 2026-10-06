"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export type SlideImage = {
  src: string;
  label?: string;
};

type Props = {
  images: SlideImage[];
  productName: string;
};

export default function ImageSlider({ images, productName }: Props) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // スマホ: 横スクロール
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;
    const onScroll = () => {
      setCurrent(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // PC: 縦スクロール
  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;
    const onScroll = () => {
      setCurrent(Math.round(el.scrollTop / el.clientHeight));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (images.length === 0) {
    return <div className="w-full h-screen bg-[#0d0d0d]" />;
  }

  return (
    <div className="relative h-full">

      {/* スマホ: 横スクロール */}
      <div
        ref={mobileRef}
        className="md:hidden flex overflow-x-scroll snap-x snap-mandatory scrollbar-none h-screen"
      >
        {images.map((slide, i) => (
          <div key={i} className="flex-none w-full h-screen snap-start relative">
            <Image
              src={slide.src}
              alt={`${productName} ${i + 1}`}
              fill
              className="object-cover object-center"
              quality={100}
              priority={i === 0}
            />
            {slide.label && (
              <span className="absolute font-body font-light text-[7px] tracking-[0.45em] text-white/60 uppercase pointer-events-none" style={{ bottom: "20px", left: "20px" }}>
                {slide.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* PC: 縦スクロール (マウスホイールで次の写真へ) */}
      <div
        ref={desktopRef}
        className="hidden md:block overflow-y-scroll snap-y snap-mandatory scrollbar-none h-screen"
      >
        {images.map((slide, i) => (
          <div key={i} className="w-full h-screen snap-start relative">
            <Image
              src={slide.src}
              alt={`${productName} ${i + 1}`}
              fill
              className="object-cover object-center"
              quality={100}
              priority={i === 0}
            />
            {slide.label && (
              <span className="absolute font-body font-light text-[7px] tracking-[0.45em] text-white/60 uppercase pointer-events-none" style={{ bottom: "20px", left: "20px" }}>
                {slide.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ドットインジケーター */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-[7px] pointer-events-none">
          {images.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-[5px] h-[5px] bg-white"
                  : "w-[4px] h-[4px] bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

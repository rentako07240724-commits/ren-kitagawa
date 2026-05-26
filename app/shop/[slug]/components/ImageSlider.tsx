"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  productName: string;
};

export default function ImageSlider({ images, productName }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setCurrent(index);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (images.length === 0) {
    return <div className="w-full h-screen bg-[#0d0d0d]" />;
  }

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-none"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-none w-full h-screen snap-start relative"
          >
            <Image
              src={src}
              alt={`${productName} ${i + 1}`}
              fill
              className="object-cover object-center"
              quality={100}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Dot indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-[7px]">
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

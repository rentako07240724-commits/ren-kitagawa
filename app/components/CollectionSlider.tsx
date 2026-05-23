"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  placeholderCount: number;
};

export default function CollectionSlider({ images, placeholderCount }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const items = images.length > 0 ? images : Array<null>(placeholderCount).fill(null);

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

  return (
    <div>
      {/* Scroll container — snap-x mandatory, scrollbar hidden */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-none"
      >
        {items.map((src, i) => (
          <div key={i} className="flex-none w-full snap-start">
            <div className="relative w-full aspect-[3/4] bg-[#0d0d0d]">
              {src && (
                <Image
                  src={src}
                  alt={`Look ${i + 1}`}
                  fill
                  className="object-cover object-top"
                  quality={100}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicator */}
      {items.length > 1 && (
        <div className="flex justify-center items-center gap-[7px] mt-6">
          {items.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-[5px] h-[5px] bg-white"
                  : "w-[4px] h-[4px] bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

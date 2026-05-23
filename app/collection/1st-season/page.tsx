import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

function getImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "collection", "1st");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort()
      .map((f) => `/images/collection/1st/${f}`);
  } catch {
    return [];
  }
}

export default function FirstSeasonPage() {
  const images = getImages();
  const headerImage = images[0] ?? null;
  const bodyImages = images.slice(1);

  return (
    <main className="bg-black text-white min-h-screen">

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 md:py-6">
        <Link
          href="/"
          className="font-body font-light text-[9px] tracking-[0.3em] text-white/50 uppercase hover:text-white transition-colors duration-300"
        >
          ← BACK
        </Link>
        <Link
          href="/"
          className="font-heading text-[9px] tracking-[0.25em] uppercase text-white hover:opacity-50 transition-opacity duration-300"
        >
          REN KITAGAWA
        </Link>
      </div>

      {/* Hero image — full screen */}
      <div className="relative h-screen bg-[#0d0d0d]">
        {headerImage && (
          <Image
            src={headerImage}
            alt="1ST SEASON"
            fill
            className="object-cover object-center"
            quality={100}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
          <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/40 uppercase mb-3">
            SS 2026
          </p>
          <h1 className="font-heading text-[clamp(2rem,8vw,6rem)] uppercase leading-[0.85]">
            1ST SEASON
          </h1>
        </div>
      </div>

      {/* Body photos — 1 column */}
      <div className="flex flex-col gap-4 py-16 md:py-24">
        {bodyImages.length > 0
          ? bodyImages.map((src, i) => (
              <div key={i} className="relative w-full aspect-[3/4] bg-[#0d0d0d]">
                <Image
                  src={src}
                  alt={`Look ${i + 2}`}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative w-full aspect-[3/4] bg-[#0d0d0d]" />
            ))}
      </div>

    </main>
  );
}

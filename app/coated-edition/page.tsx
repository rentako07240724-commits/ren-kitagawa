import fs from "fs";
import path from "path";
import Link from "next/link";
import CollectionSlider from "@/app/components/CollectionSlider";

function getImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "coated-edition");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort((a, b) => {
        const aIsMain = a.toLowerCase().startsWith("main");
        const bIsMain = b.toLowerCase().startsWith("main");
        if (aIsMain && !bIsMain) return -1;
        if (!aIsMain && bIsMain) return 1;
        const aNum = parseInt(a, 10);
        const bNum = parseInt(b, 10);
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        return a.localeCompare(b);
      })
      .map((f) => `/images/coated-edition/${f}`);
  } catch {
    return [];
  }
}

export default function CoatedEditionPage() {
  const images = getImages();

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

      {/* Page header */}
      <div className="px-6 md:px-12 pt-[120px] pb-12">
        <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/30 uppercase mb-3">
          SS 2026
        </p>
        <h1 className="font-heading text-[clamp(2rem,8vw,6rem)] uppercase leading-[0.85]">
          Coated Edition
        </h1>
        <p className="font-body font-light text-[10px] tracking-[0.3em] text-white/40 uppercase mt-4">
          Frame Jeans / Flow Jeans
        </p>
        <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/25 uppercase mt-2">
          10.15 — One Day Only
        </p>
      </div>

      {/* Image slider */}
      <CollectionSlider images={images} placeholderCount={3} />

      {/* SHOP button */}
      <div className="px-6 md:px-12 py-20 md:py-28">
        <Link
          href="/shop"
          className="block w-full font-body font-light text-[8px] tracking-[0.5em] text-white uppercase border-[0.5px] border-white py-4 text-center hover:bg-white hover:text-black transition-colors duration-300"
        >
          SHOP
        </Link>
      </div>

    </main>
  );
}

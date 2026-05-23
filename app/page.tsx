import fs from "fs";
import path from "path";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import Loader from "@/app/components/Loader";
import VideoSection from "@/app/components/VideoSection";

/** ビルド時に public/images/collection/ の画像ファイル一覧を取得 */
function getCollectionImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "collection");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort()
      .map((f) => `/images/collection/${f}`);
  } catch {
    return [];
  }
}

/** 画像がない場合のプレースホルダー数 */
const PLACEHOLDER_COUNT = 4;

export default function Home() {
  const collectionImages = getCollectionImages();
  const hasImages = collectionImages.length > 0;

  return (
    <>
      <Loader />
      <Nav />
      <main className="bg-black text-white">

        {/* ── 1. Hero ──────────────────────────────────── */}
        <section className="relative h-screen overflow-hidden bg-black">
          <Image
            src="/images/hero.jpg"
            alt="REN KITAGAWA SS2026"
            fill
            className="object-cover object-center grayscale opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
            <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/35 uppercase mb-3">
              SS 2026
            </p>
            <h1 className="font-heading leading-[0.85] uppercase tracking-[-0.01em] text-2xl md:text-[clamp(2.5rem,9vw,8rem)] whitespace-nowrap">
              REN KITAGAWA
            </h1>
          </div>

          <div className="absolute bottom-10 right-6 md:right-12 opacity-20">
            <div className="h-10 w-px bg-white animate-pulse" />
          </div>
        </section>

        {/* ── 2. Concept ───────────────────────────────── */}
        <section className="px-6 md:px-12 py-28 md:py-48">
          <div className="max-w-lg">
            <p className="font-body font-light text-[11px] md:text-xs tracking-[0.22em] text-white/70 leading-[2.8] uppercase">
              Clothing built from silence.<br />
              Tension held in fabric.<br />
              Noise placed with intention.
            </p>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────────── */}
        <div className="px-6 md:px-12">
          <div className="h-px bg-white/8" />
        </div>

        {/* ── 3. Collection ────────────────────────────── */}
        <section id="collection" className="px-6 md:px-12 py-20 md:py-36">

          <div className="mb-10 md:mb-16">
            <h2 className="font-heading text-[10px] tracking-[0.5em] uppercase text-white/40">
              SS 2026
            </h2>
          </div>

          {hasImages ? (
            /* ── 画像あり: 2カラムグリッド ─────────────── */
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {collectionImages.map((src, i) => (
                <div key={src} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#0d0d0d]">
                    <Image
                      src={src}
                      alt={`Look ${String(i + 1).padStart(2, "0")}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                  </div>
                  <p className="font-body font-light text-[8px] tracking-[0.3em] text-white/20 uppercase mt-2">
                    Look {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* ── 画像なし: 黒プレースホルダー ──────────── */
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                <div key={i}>
                  <div className="relative aspect-[3/4] bg-[#0d0d0d]" />
                  <p className="font-body font-light text-[8px] tracking-[0.3em] text-white/10 uppercase mt-2">
                    Look {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Divider ──────────────────────────────────── */}
        <div className="px-6 md:px-12">
          <div className="h-px bg-white/8" />
        </div>

        {/* ── 4. Video ─────────────────────────────────── */}
        <VideoSection />

        {/* ── 5. Instagram ─────────────────────────────── */}
        <section className="px-6 md:px-12 py-24 md:py-44 flex flex-col items-center text-center gap-6">
          <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/25 uppercase">
            Follow
          </p>
          <a
            href="https://instagram.com/ren_kitagawa__"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-lg md:text-[clamp(1.25rem,4vw,3rem)] leading-none uppercase text-white hover:opacity-35 transition-opacity duration-500"
          >
            @ren_kitagawa__
          </a>
          <p className="font-body font-light text-[8px] tracking-[0.35em] text-white/20 uppercase">
            Instagram
          </p>
        </section>

        {/* ── 6. Footer ────────────────────────────────── */}
        <footer className="border-t border-white/8 px-6 md:px-12 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="font-body font-light text-[8px] tracking-[0.35em] text-white/15 uppercase">
              © 2026 REN KITAGAWA
            </p>
            <div className="flex items-center gap-8 md:gap-10">
              {[
                { label: "Shop",      href: "#" },
                { label: "Instagram", href: "https://instagram.com/ren_kitagawa__" },
                { label: "Contact",   href: "#contact" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-body font-light text-[8px] tracking-[0.3em] text-white/20 uppercase hover:text-white/60 transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Loader from "@/app/components/Loader";

/** ビルド時に各コレクションフォルダの先頭画像を取得（サムネイル用） */
function getFirstImage(subfolder: string): string | null {
  const dir = path.join(process.cwd(), "public", "images", "collection", subfolder);
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort();
    return files.length > 0 ? `/images/collection/${subfolder}/${files[0]}` : null;
  } catch {
    return null;
  }
}

export default function Home() {
  const collectionItems = [
    { label: "1ST SEASON", href: "/collection/1st-season", thumb: getFirstImage("1st") },
    { label: "2ND SEASON", href: "/collection/2nd-season", thumb: getFirstImage("2nd") },
    { label: "RUNWAY",     href: "/collection/runway",     thumb: getFirstImage("runway") },
  ];

  return (
    <>
      <Loader />
      <Nav />
      <main className="bg-black text-white">

        {/* ── 1. Hero ──────────────────────────────────── */}
        <section className="relative h-screen overflow-hidden bg-black mb-[120px]">
          <Image
            src="/images/hero.jpg"
            alt="REN KITAGAWA SS2026"
            fill
            className="object-cover object-center"
            quality={100}
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

        {/* ── 2. Sub-hero ──────────────────────────────── */}
        <section className="relative h-screen overflow-hidden bg-black mb-[120px]">
          <Image
            src="/images/hero2.jpg"
            alt="REN KITAGAWA"
            fill
            className="object-cover object-center"
            quality={100}
          />
          {/* Bottom-left concept text — ぎりぎり左下 */}
          <div className="absolute bottom-4 left-4 z-10">
            <p className="font-body font-light text-[10px] tracking-[0.28em] text-white/85 uppercase leading-[2.4]">
              Clothing built from silence.<br />
              Tension held in fabric.<br />
              Noise placed with intention.
            </p>
          </div>
        </section>

        {/* ── 3. Collection — grid ─────────────────────── */}
        <section id="collection" className="pb-24 md:pb-40">
          <div className="px-6 md:px-12 pt-20 md:pt-[80px] mb-10 md:mb-12">
            <p className="font-body font-light text-[10px] tracking-[0.5em] text-white uppercase">
              SS 2026
            </p>
          </div>

          <div className="flex flex-col gap-px">
            {collectionItems.map(({ label, href, thumb }) => (
              <Link
                key={label}
                href={href}
                className="relative w-full aspect-[3/4] bg-[#0d0d0d] block overflow-hidden group"
              >
                {thumb && (
                  <Image
                    src={thumb}
                    alt={label}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    quality={100}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-6 font-body font-light text-[8px] tracking-[0.45em] text-white/70 uppercase z-10">
                  {label}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 4. Concept ───────────────────────────────── */}
        <section className="px-6 md:px-12 py-28 md:py-48">
          <div className="max-w-lg">
            <p className="font-body font-light text-[11px] md:text-xs tracking-[0.22em] text-white/70 leading-[2.8] uppercase">
              Clothing built from silence.<br />
              Tension held in fabric.<br />
              Noise placed with intention.
            </p>
          </div>
        </section>

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

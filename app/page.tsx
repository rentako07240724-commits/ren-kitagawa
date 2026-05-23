import Image from "next/image";
import Nav from "@/app/components/Nav";
import Loader from "@/app/components/Loader";
import VideoSection from "@/app/components/VideoSection";

const looks = [
  { src: "/images/look1.jpg", label: "Look 01" },
  { src: "/images/look2.jpg", label: "Look 02" },
  { src: "/images/look3.jpg", label: "Look 03" },
  { src: "/images/look4.jpg", label: "Look 04" },
];

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main className="bg-black text-white">

        {/* ── 1. Hero ──────────────────────────────────── */}
        <section className="relative h-screen overflow-hidden bg-black">

          {/* Hero image — grayscale（なければ黒背景のまま） */}
          <Image
            src="/images/hero.jpg"
            alt="REN KITAGAWA SS2026"
            fill
            className="object-cover object-center grayscale opacity-70"
            priority
          />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Bottom-left brand name */}
          <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
            <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/35 uppercase mb-3">
              SS 2026
            </p>
            {/* Mobile: text-2xl / Desktop: scales with viewport */}
            <h1 className="font-heading leading-[0.85] uppercase tracking-[-0.01em] text-2xl md:text-[clamp(2.5rem,9vw,8rem)]">
              <span className="block">Ren</span>
              <span className="block">Kitagawa</span>
            </h1>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 right-6 md:right-12 opacity-20">
            <div className="h-10 w-px bg-white animate-pulse" />
          </div>
        </section>

        {/* ── 2. Collection ────────────────────────────── */}
        <section id="collection" className="px-6 md:px-12 py-20 md:py-36">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-16">
            <div>
              <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/25 uppercase mb-3">
                Upcoming
              </p>
              <h2 className="font-heading text-xl md:text-[clamp(1.5rem,5vw,4rem)] leading-[0.88] uppercase tracking-[-0.01em]">
                SS 2026
              </h2>
            </div>
            <p className="font-body font-light text-[9px] tracking-[0.2em] text-white/25 uppercase leading-[2.2] md:text-right">
              Collection Preview<br />
              June 2026<br />
              Tokyo — Paris
            </p>
          </div>

          {/* 2-column portrait grid */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {looks.map((look, i) => (
              <div key={i} className="group">
                {/* 黒プレースホルダー：画像がなければ #0d0d0d の矩形 */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0d0d0d]">
                  <Image
                    src={look.src}
                    alt={look.label}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                </div>
                <p className="font-body font-light text-[8px] tracking-[0.3em] text-white/20 uppercase mt-2">
                  {look.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ──────────────────────────────────── */}
        <div className="px-6 md:px-12">
          <div className="h-px bg-white/8" />
        </div>

        {/* ── 3. Video ─────────────────────────────────── */}
        <VideoSection />

        {/* ── 4. Instagram ─────────────────────────────── */}
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

        {/* ── 5. Footer ────────────────────────────────── */}
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

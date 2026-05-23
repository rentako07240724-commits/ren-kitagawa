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
          {/* Hero image — grayscale */}
          <Image
            src="/images/hero.jpg"
            alt="REN KITAGAWA SS2026"
            fill
            className="object-cover object-center grayscale opacity-70"
            priority
          />
          {/* Gradient overlay — bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Bottom-left brand name */}
          <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
            <p className="font-body font-light text-[9px] tracking-[0.5em] text-white/40 uppercase mb-4">
              SS 2026
            </p>
            <h1 className="font-heading leading-[0.85] uppercase text-[clamp(3.5rem,14vw,13rem)] tracking-[-0.01em]">
              <span className="block">Ren</span>
              <span className="block">Kitagawa</span>
            </h1>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-2 opacity-25">
            <div className="h-12 w-px bg-white animate-pulse" />
          </div>
        </section>

        {/* ── 2. Collection ────────────────────────────── */}
        <section id="collection" className="px-6 md:px-12 py-24 md:py-40">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div>
              <p className="font-body font-light text-[9px] tracking-[0.5em] text-white/30 uppercase mb-4">
                Upcoming
              </p>
              <h2 className="font-heading text-[clamp(2.5rem,9vw,7rem)] leading-[0.88] uppercase tracking-[-0.01em]">
                SS 2026
              </h2>
            </div>
            <p className="font-body font-light text-[10px] tracking-[0.25em] text-white/30 uppercase leading-[2.2] md:text-right">
              Collection Preview<br />
              June 2026<br />
              Tokyo — Paris
            </p>
          </div>

          {/* 2-column portrait grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {looks.map((look, i) => (
              <div key={i} className="group relative">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                  <Image
                    src={look.src}
                    alt={look.label}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <p className="font-body font-light text-[9px] tracking-[0.35em] text-white/25 uppercase mt-3">
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
        <section className="px-6 md:px-12 py-28 md:py-48 flex flex-col items-center text-center gap-8">
          <p className="font-body font-light text-[9px] tracking-[0.5em] text-white/30 uppercase">
            Follow
          </p>
          <a
            href="https://instagram.com/ren_kitagawa__"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-[clamp(1.4rem,6vw,5rem)] leading-none tracking-[-0.01em] uppercase text-white hover:opacity-40 transition-opacity duration-500"
          >
            @ren_kitagawa__
          </a>
          <p className="font-body font-light text-[9px] tracking-[0.35em] text-white/25 uppercase">
            Instagram
          </p>
        </section>

        {/* ── 5. Footer ────────────────────────────────── */}
        <footer className="border-t border-white/8 px-6 md:px-12 py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <p className="font-body font-light text-[9px] tracking-[0.4em] text-white/20 uppercase">
              © 2026 REN KITAGAWA
            </p>

            <div className="flex items-center gap-8 md:gap-10">
              {[
                { label: "Shop", href: "#" },
                { label: "Instagram", href: "https://instagram.com/ren_kitagawa__" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-body font-light text-[9px] tracking-[0.35em] text-white/25 uppercase hover:text-white/70 transition-colors duration-300"
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

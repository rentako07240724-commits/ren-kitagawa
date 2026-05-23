import Image from "next/image";
import Nav from "@/app/components/Nav";
import Loader from "@/app/components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main className="bg-black text-white">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-svh min-h-[600px] flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 overflow-hidden">

          {/* Hero background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="REN KITAGAWA SS2026"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/65" />
          </div>

          {/* Season label */}
          <div className="relative z-10 absolute top-24 right-6 md:right-12 animate-reveal delay-500">
            <p className="font-body font-light text-[9px] tracking-[0.45em] text-white/25 uppercase">
              SS 2026
            </p>
          </div>

          {/* Brand name — Archivo Black */}
          <div className="relative z-10 mb-8 md:mb-10">
            <h1 className="font-heading leading-[0.88] tracking-[-0.01em] uppercase">
              <span className="block text-[clamp(3.8rem,16vw,15rem)] animate-reveal delay-100">
                Ren
              </span>
              <span className="block text-[clamp(3.8rem,16vw,15rem)] animate-reveal delay-200">
                Kitagawa
              </span>
            </h1>
          </div>

          {/* Concept strip */}
          <div className="relative z-10 flex items-center gap-5 mb-8 animate-reveal delay-400">
            <div className="h-px w-10 bg-white/25" />
            <p className="font-body font-light text-[9px] tracking-[0.4em] text-white/40 uppercase">
              Modern Sharp
            </p>
          </div>

          {/* Scroll cue */}
          <div className="relative z-10 flex justify-center animate-reveal delay-700">
            <div className="absolute bottom-0 flex flex-col items-center gap-2 opacity-20">
              <div className="h-10 w-px bg-white animate-pulse" />
            </div>
          </div>
        </section>

        {/* ── Manifesto ────────────────────────────────── */}
        <section className="px-6 md:px-12 py-28 md:py-48">
          <div className="max-w-3xl">
            <p className="font-body font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.45] text-white/90">
              計算された沈黙、
              <br />
              そして意図されたノイズ。
            </p>
            <div className="mt-14 md:mt-20 max-w-xs">
              <p className="font-body font-light text-[11px] tracking-[0.18em] text-white/30 uppercase leading-[2]">
                A fashion house defined by the tension between restraint and
                expression. Every cut is a decision. Every silence, deliberate.
              </p>
            </div>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────────── */}
        <div className="px-6 md:px-12">
          <div className="h-px bg-white/10" />
        </div>

        {/* ── Collection Teaser ────────────────────────── */}
        <section className="px-6 md:px-12 py-28 md:py-48">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-16 md:gap-8">
            <div>
              <p className="font-body font-light text-[9px] tracking-[0.45em] text-white/30 uppercase mb-6">
                Upcoming Collection
              </p>
              <h2 className="font-heading leading-[0.88] tracking-[-0.01em] uppercase text-[clamp(3rem,11vw,9rem)]">
                SS&nbsp;2026
              </h2>
            </div>

            <div className="flex flex-col gap-6 md:items-end">
              <div className="h-px w-20 bg-white/15" />
              <p className="font-body font-light text-[9px] tracking-[0.4em] text-white/30 uppercase leading-[2.2]">
                Collection Preview
                <br />
                June 2026
                <br />
                Tokyo — Paris
              </p>
            </div>
          </div>
        </section>

        {/* ── Full-bleed statement ─────────────────────── */}
        <div className="border-y border-white/8 px-6 md:px-12 py-10 md:py-14 overflow-hidden">
          <p
            className="font-heading text-[clamp(1rem,3vw,2rem)] text-white/10 tracking-[0.25em] uppercase whitespace-nowrap"
            aria-hidden="true"
          >
            REN KITAGAWA — MODERN SHARP — SS 2026 — REN KITAGAWA — MODERN SHARP — SS 2026 —&nbsp;
            REN KITAGAWA — MODERN SHARP — SS 2026 — REN KITAGAWA — MODERN SHARP — SS 2026
          </p>
        </div>

        {/* ── Footer ───────────────────────────────────── */}
        <footer className="px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <p className="font-body font-light text-[9px] tracking-[0.4em] text-white/20 uppercase">
              © 2026 REN KITAGAWA. All rights reserved.
            </p>
            <div className="flex items-center gap-10">
              {["Instagram", "Contact", "Stockists"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-body font-light text-[9px] tracking-[0.35em] text-white/20 uppercase hover:text-white/60 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

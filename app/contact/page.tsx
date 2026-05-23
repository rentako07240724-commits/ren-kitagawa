import Link from "next/link";

export default function ContactPage() {
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

      {/* Content */}
      <div className="px-8 pt-[120px] pb-24 flex flex-col gap-14">

        {/* Instagram */}
        <div className="flex flex-col gap-3">
          <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/30 uppercase">
            Instagram
          </p>
          <a
            href="https://instagram.com/ren_kitagawa__"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-light text-[11px] tracking-[0.25em] text-white hover:text-white/50 transition-colors duration-300"
          >
            @ren_kitagawa__
          </a>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-3">
          <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/30 uppercase">
            Shop
          </p>
          <a
            href="https://ren-kitagawa04.stores.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-light text-[11px] tracking-[0.25em] text-white hover:text-white/50 transition-colors duration-300"
          >
            ren-kitagawa04.stores.jp
          </a>
        </div>

        {/* Mail */}
        <div className="flex flex-col gap-3">
          <p className="font-body font-light text-[8px] tracking-[0.5em] text-white/30 uppercase">
            Mail
          </p>
          <a
            href="mailto:ren.kitagawa@gmail.com"
            className="font-body font-light text-[11px] tracking-[0.25em] text-white hover:text-white/50 transition-colors duration-300"
          >
            ren.kitagawa@gmail.com
          </a>
        </div>

      </div>

    </main>
  );
}

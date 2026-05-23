"use client";

export default function VideoSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src="/videos/main.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Corner label */}
      <div className="absolute bottom-8 right-6 md:right-12">
        <p className="font-body font-light text-[9px] tracking-[0.45em] text-white/30 uppercase">
          SS 2026 — Film
        </p>
      </div>
    </section>
  );
}

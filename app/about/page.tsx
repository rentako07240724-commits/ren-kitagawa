import Link from "next/link";

export default function AboutPage() {
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
      <div className="px-8 pt-[120px] pb-24">
        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white">
          Calculated silence, intended noise.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          We are interested in tension — between control and collapse, structure and instinct, sharpness and erosion.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          Our garments are built from contradiction. Precision interrupted by imperfection. Familiar forms distorted through proportion, texture, weight, and memory. Clothing not only as an object to wear, but as something to experience, question, and slowly understand.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          We are drawn to the beauty of interruption — the fold left behind, the friction of time, surfaces that feel touched, damaged, rebuilt. A garment should not remain fixed. It should shift with movement, absorb atmosphere, and record presence.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          We do not chase perfection. We pursue intention.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          Each piece exists between discipline and disturbance. A balance of restraint and excess. Silence that carries tension. Noise that feels deliberate.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          The body is never treated as something to simply decorate. Instead, it becomes a site of structure, imbalance, and dialogue. Volume changes posture. Texture alters perception. Proportion reshapes familiarity.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          We are interested in garments that reveal themselves gradually — pieces that feel unfamiliar at first, yet inevitable with time.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          This is clothing built for contradiction.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          Sharp, but unstable. Controlled, but emotional. Quiet, but impossible to ignore.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          A study of modern tension.
        </p>

        <p className="font-body font-light text-sm tracking-[0.05em] leading-[2] text-white mt-10">
          A form of presence.
        </p>

        {/* Divider */}
        <div className="border-t border-[#222] mt-16 pt-10">
          <p className="font-body font-light text-[8px] tracking-[0.4em] text-white/30 uppercase leading-[2.8]">
            REN KITAGAWA<br />
            Founded 2025<br />
            Based in Tokyo, Japan
          </p>
        </div>
      </div>

    </main>
  );
}

import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import SizeSelector from "./components/SizeSelector";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

function getImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "products", slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort()
      .map((f) => `/images/products/${slug}/${f}`);
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const images = getImages(slug);

  return (
    <main className="bg-black text-white min-h-screen">

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 md:py-6">
        <Link
          href="/shop"
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

      {/* Product images */}
      <div className="flex flex-col pt-[60px]">
        {images.length > 0
          ? images.map((src, i) => (
              <div key={i} className="relative w-full aspect-[3/4] bg-[#0d0d0d]">
                <Image
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-contain"
                  quality={100}
                  priority={i === 0}
                />
              </div>
            ))
          : Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="relative w-full aspect-[3/4] bg-[#0d0d0d]" />
            ))}
      </div>

      {/* Product info */}
      <div className="px-6 md:px-12 pt-12 pb-28 flex flex-col gap-10">

        {/* Name & price */}
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-[clamp(1.75rem,7vw,5rem)] uppercase leading-[0.9]">
            {product.name}
          </h1>
          <p className="font-body font-light text-sm tracking-[0.05em] text-white/70">
            ¥{product.price.toLocaleString()}
          </p>
          <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/25 uppercase">
            Made to order
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/30 uppercase mb-4">
            About
          </p>
          <p className="font-body font-light text-sm tracking-[0.04em] text-white/55 leading-[2]">
            {product.description}
          </p>
        </div>

        {/* Size guide */}
        <div>
          <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/30 uppercase mb-4">
            Size Guide
          </p>
          <p className="font-body font-light text-sm tracking-[0.04em] text-white/55 leading-[2]">
            {product.sizeGuide}
          </p>
        </div>

        {/* Size selector + ORDER */}
        <SizeSelector priceId={product.priceId} />

      </div>
    </main>
  );
}

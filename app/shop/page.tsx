import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

/** サムネイル: subfolder の main.* → flat ファイル の順で探す */
function getProductImage(slug: string): string | null {
  const exts = ["jpg", "jpeg", "png", "webp", "avif"];
  // 1) public/images/products/[slug]/main.*
  for (const ext of exts) {
    const f = path.join(process.cwd(), "public", "images", "products", slug, `main.${ext}`);
    if (fs.existsSync(f)) return `/images/products/${slug}/main.${ext}`;
  }
  // 2) public/images/products/[slug].*（flat）
  for (const ext of exts) {
    const f = path.join(process.cwd(), "public", "images", "products", `${slug}.${ext}`);
    if (fs.existsSync(f)) return `/images/products/${slug}.${ext}`;
  }
  return null;
}

export default function ShopPage() {
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
          SHOP
        </h1>
        <p className="font-body font-light text-[8px] tracking-[0.35em] text-white/25 uppercase mt-5">
          All items are made to order — production begins upon purchase.
        </p>
      </div>

      {/* Product list */}
      <div className="flex flex-col pb-24">
        {products.map((product) => {
          const img = getProductImage(product.slug);
          return (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="border-t border-white/8 px-6 md:px-12 py-10 block group"
            >
              {/* Image */}
              <div className="relative w-full aspect-[3/4] bg-[#0d0d0d] mb-7 overflow-hidden">
                {img && (
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-opacity duration-500 group-hover:opacity-70"
                    quality={100}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-heading text-base uppercase tracking-[0.04em]">
                    {product.name}
                  </h2>
                  <p className="font-body font-light text-sm tracking-[0.05em] text-white/80 shrink-0">
                    ¥{product.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-body font-light text-[8px] tracking-[0.4em] text-white/25 uppercase">
                  Made to order
                </p>
                <p className="font-body font-light text-[8px] tracking-[0.35em] text-white/20 uppercase group-hover:text-white/50 transition-colors duration-300">
                  View →
                </p>
              </div>
            </Link>
          );
        })}
      </div>

    </main>
  );
}

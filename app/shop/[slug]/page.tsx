import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ImageSlider, { SlideImage } from "./components/ImageSlider";
import SizeSelector from "./components/SizeSelector";

export const dynamicParams = false; // generateStaticParams 以外のパスは 404

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

function getImages(slug: string, ageingSample: boolean): SlideImage[] {
  const dir = path.join(process.cwd(), "public", "images", "products", slug);
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort((a, b) => {
        // main.* を先頭に
        const aIsMain = a.toLowerCase().startsWith("main");
        const bIsMain = b.toLowerCase().startsWith("main");
        if (aIsMain && !bIsMain) return -1;
        if (!aIsMain && bIsMain) return 1;
        // 数字ファイル名は数値昇順（10.jpg が 2.jpg の後ろになるよう）
        const aNum = parseInt(a, 10);
        const bNum = parseInt(b, 10);
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        return a.localeCompare(b);
      });

    return files.map((f) => {
      const base = f.replace(/\.[^.]+$/, ""); // strip extension
      const num = parseInt(base, 10);
      // ageingSample フラグが立っている商品のみ 9.jpg 以降にラベルを付与
      const label = ageingSample && !isNaN(num) && num >= 9 ? "AGEING SAMPLE" : undefined;
      return { src: `/images/products/${slug}/${f}`, label };
    });
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

  const images = getImages(slug, product.ageingSample ?? false);

  return (
    <main className="bg-black text-white min-h-screen">

      {/* Fixed top bar */}
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

      {/* Image slider — full screen, swipe */}
      <ImageSlider images={images} productName={product.name} />

      {/* Product info */}
      <div className="px-6 md:px-12 pt-14 pb-28 flex flex-col gap-12">

        {/* Name & price */}
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-[clamp(2rem,8vw,6rem)] uppercase leading-[0.85]">
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
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/30 uppercase mb-5">
              About
            </p>
            {/* Japanese */}
            <p className="font-body font-light text-sm tracking-[0.04em] text-white/60 leading-[2.2] mb-8">
              {product.descriptionJa}
            </p>
            {/* English */}
            <p className="font-body font-light text-sm tracking-[0.04em] text-white/40 leading-[2.2]">
              {product.descriptionEn}
            </p>
          </div>
        </div>

        {/* Size guide table */}
        {product.sizeGuide.length > 0 && (
          <div>
            <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/30 uppercase mb-5">
              Size Guide
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left font-body font-light text-[8px] tracking-[0.35em] text-white/25 uppercase py-3 pr-4">
                    —
                  </th>
                  {product.sizes.map((s) => (
                    <th
                      key={s}
                      className="text-right font-body font-light text-[8px] tracking-[0.35em] text-white/25 uppercase py-3"
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.sizeGuide.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.08]">
                    <td className="font-body font-light text-[8px] tracking-[0.25em] text-white/45 uppercase py-3.5 pr-4">
                      {row.label} / {row.labelEn}
                    </td>
                    {row.values
                      ? row.values.map((v, j) => (
                          <td
                            key={j}
                            className="text-right font-body font-light text-[9px] tracking-[0.2em] text-white/65 py-3.5"
                          >
                            {v}
                          </td>
                        ))
                      : (
                          <td className="text-right font-body font-light text-[9px] tracking-[0.2em] text-white/65 py-3.5">
                            {row.value}
                          </td>
                        )
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Size selector + ORDER */}
        <SizeSelector priceId={product.priceId} sizes={product.sizes} orderNote={product.orderNote} productName={product.name} productPrice={product.price} />

      </div>
    </main>
  );
}

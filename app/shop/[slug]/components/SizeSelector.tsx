"use client";

import { useState } from "react";

const DEFAULT_ORDER_NOTE = "受注生産のため、発送まで1〜2ヶ月ほどお時間をいただきます。";

type Props = {
  priceId: string;
  sizes: string[];
  orderNote?: string;
};

export default function SizeSelector({ priceId, sizes, orderNote }: Props) {
  const isOneSize = sizes.length === 1 && sizes[0] === "ONE SIZE";

  // ONE SIZE は自動選択
  const [selectedSize, setSelectedSize] = useState<string | null>(
    isOneSize ? "ONE SIZE" : null
  );
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!selectedSize) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, size: selectedSize }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (e) {
      console.error(e);
      alert("決済の開始に失敗しました。しばらくしてから再度お試しください。");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">

      {/* Size label */}
      <div>
        <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/30 uppercase mb-4">
          Size
        </p>

        {isOneSize ? (
          /* ONE SIZE — 選択済み表示 */
          <div className="border-[0.5px] border-white px-5 py-2.5 w-fit">
            <span className="font-body font-light text-[9px] tracking-[0.3em] text-white uppercase">
              ONE SIZE
            </span>
          </div>
        ) : (
          /* S / M / L / XL */
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`font-body font-light text-[9px] tracking-[0.2em] uppercase border-[0.5px] w-12 h-10 transition-colors duration-200 ${
                  selectedSize === size
                    ? "border-white bg-white text-black"
                    : "border-white/30 text-white/50 hover:border-white hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {!isOneSize && !selectedSize && (
          <p className="font-body font-light text-[8px] tracking-[0.3em] text-white/20 uppercase mt-3">
            Please select a size
          </p>
        )}
      </div>

      {/* 注意書き */}
      <p className="font-body font-light text-[8px] tracking-[0.35em] text-white/60 leading-[2]">
        {orderNote ?? DEFAULT_ORDER_NOTE}
      </p>

      {/* ORDER — full width */}
      <button
        onClick={handleOrder}
        disabled={!selectedSize || loading}
        className="w-full font-body font-light text-[8px] tracking-[0.5em] text-white uppercase bg-black border-[0.5px] border-white py-4 hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
      >
        {loading ? "..." : "ORDER"}
      </button>

    </div>
  );
}

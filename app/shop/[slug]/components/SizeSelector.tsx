"use client";

import { useState } from "react";

type Props = {
  priceId: string;
};

const SIZES = ["S", "M", "L", "XL"] as const;

export default function SizeSelector({ priceId }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
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
    <div className="flex flex-col gap-8">

      {/* Size buttons */}
      <div>
        <p className="font-body font-light text-[8px] tracking-[0.45em] text-white/30 uppercase mb-4">
          Size
        </p>
        <div className="flex gap-3">
          {SIZES.map((size) => (
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
        {!selectedSize && (
          <p className="font-body font-light text-[8px] tracking-[0.3em] text-white/20 uppercase mt-3">
            Please select a size
          </p>
        )}
      </div>

      {/* ORDER button */}
      <button
        onClick={handleOrder}
        disabled={!selectedSize || loading}
        className="font-body font-light text-[8px] tracking-[0.45em] text-white uppercase border-[0.5px] border-white px-8 py-3 w-fit hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
      >
        {loading ? "..." : "ORDER"}
      </button>

    </div>
  );
}

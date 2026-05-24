"use client";

import { useState } from "react";

type Props = {
  name: string;
  price: number;
};

export default function OrderButton({ name, price }: Props) {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
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
    <button
      onClick={handleOrder}
      disabled={loading}
      className="font-body font-light text-[8px] tracking-[0.45em] text-white uppercase border-[0.5px] border-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {loading ? "..." : "ORDER"}
    </button>
  );
}

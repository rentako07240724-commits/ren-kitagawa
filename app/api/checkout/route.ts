import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;

  // キー確認ログ（先頭8文字だけ出力）
  console.log("[checkout] key prefix:", key?.slice(0, 8) ?? "MISSING");

  if (!key || key.includes("ここに貼る")) {
    console.error("[checkout] Stripe secret key is not configured");
    return NextResponse.json(
      { error: "Stripe secret key is not configured." },
      { status: 500 }
    );
  }

  try {
    const stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });

    const body = await req.json();
    const { priceId } = body;
    console.log("[checkout] priceId:", priceId);

    // Vercel ではリクエストヘッダーから URL を構築
    const proto = req.headers.get("x-forwarded-proto") ?? "https";
    const host  = req.headers.get("host") ?? "ren-kitagawa.vercel.app";
    const base  = `${proto}://${host}`;
    console.log("[checkout] base URL:", base);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${base}/shop?success=1`,
      cancel_url:  `${base}/shop`,
    });

    console.log("[checkout] session created:", session.id);
    return NextResponse.json({ url: session.url });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const code    = (err as { code?: string }).code ?? "";
    const type    = (err as { type?: string }).type ?? "";
    console.error("[checkout] Stripe error:", message, "| code:", code, "| type:", type);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

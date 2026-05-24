import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("ここに貼る")) {
    return NextResponse.json(
      { error: "Stripe secret key is not configured." },
      { status: 500 }
    );
  }

  try {
    const stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
    const { priceId } = await req.json();
    const origin =
      req.headers.get("origin") ?? "https://ren-kitagawa.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/shop?success=1`,
      cancel_url: `${origin}/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

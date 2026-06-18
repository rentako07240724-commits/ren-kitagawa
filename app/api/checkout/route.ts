import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key || !key.startsWith("sk_")) {
    return NextResponse.json(
      { error: "Stripe secret key is not configured." },
      { status: 500 }
    );
  }

  try {
    const { priceId, size, product } = await req.json();

    const proto = req.headers.get("x-forwarded-proto") ?? "https";
    const host  = req.headers.get("host") ?? "ren-kitagawa.vercel.app";
    const base  = `${proto}://${host}`;

    const params = new URLSearchParams();
    params.append("automatic_payment_methods[enabled]", "true");
    params.append("automatic_payment_methods[allow_redirects]", "never");
    params.append("customer_creation", "always");
    params.append("line_items[0][price]", priceId);
    params.append("line_items[0][quantity]", "1");
    params.append("mode", "payment");
    params.append("success_url", `${base}/shop?success=1`);
    params.append("cancel_url",  `${base}/shop`);
    params.append("shipping_address_collection[allowed_countries][]", "JP");
    params.append("phone_number_collection[enabled]", "true");
    if (size) {
      params.append("metadata[サイズ]", size);
    }
    if (product) {
      params.append("metadata[商品名]", product);
    }

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await stripeRes.json() as { url?: string; error?: { message: string } };

    if (!stripeRes.ok || data.error) {
      const msg = data.error?.message ?? "Stripe API error";
      console.error("[checkout] Stripe API error:", msg);
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout] unexpected error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

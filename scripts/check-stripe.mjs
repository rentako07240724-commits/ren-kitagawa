import Stripe from "stripe";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(path.join(__dirname, "../.env.local"), "utf-8");
const secretKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)?.[1]?.trim();

const stripe = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });

const priceIds = [
  "price_1TaeEB15Xhry8bPT1Zjec0uj",
  "price_1TaeEC15Xhry8bPTs2XFYLbR",
  "price_1TaeEE15Xhry8bPTXK92P1uR",
  "price_1TaeEE15Xhry8bPTXEU3mUVm",
  "price_1TaeEG15Xhry8bPThOzdI35s",
  "price_1TaeEH15Xhry8bPT923uiRgQ",
];

console.log("=== Price ID 確認 ===");
for (const id of priceIds) {
  try {
    const price = await stripe.prices.retrieve(id, { expand: ["product"] });
    const product = price.product;
    const name = typeof product === "object" && product !== null && "name" in product ? product.name : product;
    console.log(`✅ ${id} → ${name} ¥${price.unit_amount} active=${price.active}`);
  } catch (e) {
    console.log(`❌ ${id} → ERROR: ${e.message}`);
  }
}

console.log("\n=== Checkout Session テスト作成 ===");
try {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: priceIds[0], quantity: 1 }],
    mode: "payment",
    success_url: "https://ren-kitagawa.vercel.app/shop?success=1",
    cancel_url: "https://ren-kitagawa.vercel.app/shop",
  });
  console.log(`✅ Session 作成成功: ${session.url?.slice(0, 60)}...`);
} catch (e) {
  console.log(`❌ Session 作成エラー: ${e.message}`);
  console.log(`   type: ${e.type}`);
  console.log(`   code: ${e.code}`);
}

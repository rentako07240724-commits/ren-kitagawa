import Stripe from "stripe";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(path.join(__dirname, "../.env.local"), "utf-8");
const secretKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)?.[1]?.trim();

const stripe = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });

// ── テスト1: payment_method_types: ["card"] (現行コード) ──
console.log("テスト1: payment_method_types: ['card']");
try {
  const s1 = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: "price_1TaeEB15Xhry8bPT1Zjec0uj", quantity: 1 }],
    mode: "payment",
    success_url: "https://ren-kitagawa.vercel.app/shop?success=1",
    cancel_url:  "https://ren-kitagawa.vercel.app/shop",
  });
  console.log("✅ 成功:", s1.id);
} catch (e) {
  console.log("❌ 失敗:", e.message, "| code:", e.code, "| type:", e.type);
}

// ── テスト2: automatic_payment_methods (推奨) ──
console.log("\nテスト2: automatic_payment_methods: { enabled: true }");
try {
  const s2 = await stripe.checkout.sessions.create({
    automatic_payment_methods: { enabled: true },
    line_items: [{ price: "price_1TaeEB15Xhry8bPT1Zjec0uj", quantity: 1 }],
    mode: "payment",
    success_url: "https://ren-kitagawa.vercel.app/shop?success=1",
    cancel_url:  "https://ren-kitagawa.vercel.app/shop",
  });
  console.log("✅ 成功:", s2.id);
} catch (e) {
  console.log("❌ 失敗:", e.message, "| code:", e.code, "| type:", e.type);
}

// ── テスト3: Stripe アカウント情報 ──
console.log("\nテスト3: アカウント確認");
try {
  const acct = await stripe.accounts.retrieve();
  console.log("✅ Account:", acct.id, "| country:", acct.country, "| charges_enabled:", acct.charges_enabled);
} catch (e) {
  console.log("❌ アカウント取得失敗:", e.message);
}

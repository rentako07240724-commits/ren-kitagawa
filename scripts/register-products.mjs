import Stripe from "stripe";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// .env.local を手動で読む
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const secretKeyMatch = envContent.match(/STRIPE_SECRET_KEY=(.+)/);
const secretKey = secretKeyMatch?.[1]?.trim();

if (!secretKey || secretKey.includes("ここに貼る")) {
  console.error("STRIPE_SECRET_KEY が .env.local に設定されていません");
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });

const products = [
  { slug: "shy-hoodie",  name: "Shy Hoodie",  price: 31000 },
  { slug: "frame-jeans", name: "Frame Jeans", price: 26800 },
  { slug: "frow-jeans",  name: "Frow Jeans",  price: 24000 },
  { slug: "vector-ma1",  name: "Vector MA-1", price: 38000 },
  { slug: "core-tee",    name: "Core Tee",    price: 4600  },
  { slug: "shift-bag",   name: "Shift Bag",   price: 26000 },
];

console.log("Stripe に商品を登録中...\n");

const results = [];

for (const p of products) {
  // Product 作成
  const product = await stripe.products.create({
    name: p.name,
    metadata: { slug: p.slug, production_type: "made_to_order" },
  });

  // Price 作成（JPY、在庫管理なし）
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: p.price,
    currency: "jpy",
  });

  results.push({ slug: p.slug, name: p.name, price: p.price, priceId: price.id });
  console.log(`✅ ${p.name} → ${price.id}`);
}

console.log("\n登録完了。以下を shop/page.tsx に貼ってください：\n");
console.log(JSON.stringify(results, null, 2));

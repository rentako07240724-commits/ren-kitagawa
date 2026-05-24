export type Product = {
  slug: string;
  name: string;
  price: number;
  priceId: string;
  description: string;
  sizeGuide: string;
};

export const products: Product[] = [
  {
    slug: "shy-hoodie",
    name: "Shy Hoodie",
    price: 31000,
    priceId: "price_1TaeEB15Xhry8bPT1Zjec0uj",
    description: "— description coming soon —",
    sizeGuide: "— size guide coming soon —",
  },
  {
    slug: "frame-jeans",
    name: "Frame Jeans",
    price: 26800,
    priceId: "price_1TaeEC15Xhry8bPTs2XFYLbR",
    description: "— description coming soon —",
    sizeGuide: "— size guide coming soon —",
  },
  {
    slug: "frow-jeans",
    name: "Frow Jeans",
    price: 24000,
    priceId: "price_1TaeEE15Xhry8bPTXK92P1uR",
    description: "— description coming soon —",
    sizeGuide: "— size guide coming soon —",
  },
  {
    slug: "vector-ma1",
    name: "Vector MA-1",
    price: 38000,
    priceId: "price_1TaeEE15Xhry8bPTXEU3mUVm",
    description: "— description coming soon —",
    sizeGuide: "— size guide coming soon —",
  },
  {
    slug: "core-tee",
    name: "Core Tee",
    price: 4600,
    priceId: "price_1TaeEG15Xhry8bPThOzdI35s",
    description: "— description coming soon —",
    sizeGuide: "— size guide coming soon —",
  },
  {
    slug: "shift-bag",
    name: "Shift Bag",
    price: 26000,
    priceId: "price_1TaeEH15Xhry8bPT923uiRgQ",
    description: "— description coming soon —",
    sizeGuide: "— size guide coming soon —",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

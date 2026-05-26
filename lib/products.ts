export type SizeGuideRow = {
  label: string;
  labelEn: string;
  value: string;         // single-size products
  values?: string[];     // multi-size products (e.g. Frame Jeans: ["80cm", "85cm"])
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  priceId: string;
  descriptionJa: string;
  descriptionEn: string;
  sizes: string[];         // ["ONE SIZE"] or ["S", "M", "L", "XL"]
  sizeGuide: SizeGuideRow[];
};

export const products: Product[] = [
  {
    slug: "shy-hoodie",
    name: "Shy Hoodie",
    price: 31000,
    priceId: "price_1TaeEB15Xhry8bPT1Zjec0uj",
    descriptionJa:
      "顔を隠せるフェイスカバーを備えたフーディー。右胸にはイヤホンなどを掛けられるループを配置し、自分だけの時間へと入り込むための機能を付加。フェイスカバーはボタンの付け替えによって好みのデザインへカスタマイズが可能で、着用者自身がその形を再解釈できる仕様となっている。背面には螺旋状のタックを施し、音に没入しながら内側の世界へと加速していく過程を表現しています。静かに閉じながら、自分の輪郭を深めていく一着",
    descriptionEn:
      "A hoodie featuring a face cover designed to partially conceal the wearer. A loop detail placed on the right chest allows earphones or personal objects to hang naturally, adding a subtle function for entering one's own space. The face cover can be customized through interchangeable button placements, allowing the wearer to adjust and reinterpret its form. The spiral tuck across the back represents the process of accelerating inward — a gradual immersion into a private world through sound. Quietly closing itself, while deepening the outline of the self.",
    sizes: ["ONE SIZE"],
    sizeGuide: [
      { label: "着丈",  labelEn: "Length",         value: "67cm" },
      { label: "身幅",  labelEn: "Width",           value: "57cm" },
      { label: "肩幅",  labelEn: "Shoulder Width",  value: "46cm" },
      { label: "袖丈",  labelEn: "Sleeve Length",   value: "63cm" },
    ],
  },
  {
    slug: "frame-jeans",
    name: "Frame Jeans",
    price: 26800,
    priceId: "price_1TaeEC15Xhry8bPTs2XFYLbR",
    descriptionJa:
      "構造によって形成されたジーンズ。ダブルニーを再構築した切り替えと、身体を縁取るような構造線によって形作られたワイドジーンズ。深く大きく設計されたポケットとサイドポケットを備え、随所に打たれたリベットが機能性と存在感を補強する。背面ではポケットにも切り替えを連続させ、構造が一つのフレームとして流れるよう設計されている。ウエスト位置で着用すると整ったボリュームシルエットを描き、腰で履くことで裾に溜まりが生まれ、より重さのあるリラックスした形へ変化する。構造的でありながら、着崩される。ユーティリティと造形のあいだに存在する一本。",
    descriptionEn:
      "Designed through structure. Wide jeans defined by reconstructed double-knee paneling and framed seam lines across the body. Deep pockets and side storage are integrated throughout, while rivet details reinforce both function and presence. The back pocket construction continues the panel lines, allowing structure to move as one continuous frame. Worn at the waist, the silhouette falls with controlled volume. Worn lower on the hips, the fabric gathers at the hem, creating a heavier, relaxed shape. Structured, yet worn. Existing between utility and form.",
    sizes: ["1", "2"],
    sizeGuide: [
      { label: "ウエスト", labelEn: "Waist",        value: "80cm",  values: ["80cm",  "85cm"]  },
      { label: "股上",     labelEn: "Rise",         value: "33cm",  values: ["33cm",  "33cm"]  },
      { label: "股下",     labelEn: "Inseam",       value: "74cm",  values: ["74cm",  "77cm"]  },
      { label: "総丈",     labelEn: "Total Length", value: "110cm", values: ["110cm", "113cm"] },
    ],
  },
  {
    slug: "frow-jeans",
    name: "Frow Jeans",
    price: 24000,
    priceId: "price_1TaeEE15Xhry8bPTXK92P1uR",
    descriptionJa: "— 商品説明は近日公開予定 —",
    descriptionEn: "— Description coming soon —",
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: [],
  },
  {
    slug: "vector-ma1",
    name: "Vector MA-1",
    price: 38000,
    priceId: "price_1TaeEE15Xhry8bPTXEU3mUVm",
    descriptionJa: "— 商品説明は近日公開予定 —",
    descriptionEn: "— Description coming soon —",
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: [],
  },
  {
    slug: "core-tee",
    name: "Core Tee",
    price: 4600,
    priceId: "price_1TaeEG15Xhry8bPThOzdI35s",
    descriptionJa: "— 商品説明は近日公開予定 —",
    descriptionEn: "— Description coming soon —",
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: [],
  },
  {
    slug: "shift-bag",
    name: "Shift Bag",
    price: 26000,
    priceId: "price_1TaeEH15Xhry8bPT923uiRgQ",
    descriptionJa: "— 商品説明は近日公開予定 —",
    descriptionEn: "— Description coming soon —",
    sizes: ["ONE SIZE"],
    sizeGuide: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

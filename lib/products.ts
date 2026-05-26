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
  sizes: string[];         // ["ONE SIZE"] or ["S", "M", "L", "XL"] or ["1", "2"]
  sizeGuide: SizeGuideRow[];
  ageingSample?: boolean;  // true → 9.jpg 以降に "AGEING SAMPLE" を表示
};

export const products: Product[] = [
  {
    slug: "shy-hoodie",
    name: "Shy Hoodie",
    price: 31000,
    priceId: "price_1TbNNF04FSXNU1UEJcNLaMr2",
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
    priceId: "price_1TbNNG04FSXNU1UEWXGfK0Vk",
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
    ageingSample: true,
  },
  {
    slug: "frow-jeans",
    name: "Frow Jeans",
    price: 24000,
    priceId: "price_1TbNNI04FSXNU1UEk1Qv4ISm",
    descriptionJa:
      "動きに寄り添うためのジーンズ。身体を流れるように走る曲線の切り替えによって構成されたセミフレアジーンズ。背面では曲線の切り替えとポケットを一つの連続した線として繋げ、構造とシルエットの境界を曖昧にしながら身体の動きをなぞっていく。ウエスト位置で着用すると美しいセミフレアシルエットを描き、腰で履くことで裾に自然な溜まりが生まれ、よりリラックスした流れを形成する。静かに身体に沿いながら、流れる線がわずかな動きの感覚を生み出す。制御と流動性のあいだに存在する一本。",
    descriptionEn:
      "Designed to follow movement. Semi-flare jeans shaped by flowing curved panel lines that move naturally across the body. The back construction connects curved seams and pockets as one continuous line — tracing movement while softening the boundary between structure and silhouette. Worn at the waist, the silhouette falls into a clean semi-flare. Worn lower on the hips, the fabric gathers softly at the hem, creating a more relaxed flow. Quietly following the body, the flowing lines create a subtle sense of motion, existing between control and fluidity.",
    sizes: ["1", "2"],
    sizeGuide: [
      { label: "ウエスト", labelEn: "Waist",        value: "80cm",  values: ["80cm",  "86cm"]  },
      { label: "股上",     labelEn: "Rise",         value: "24cm",  values: ["24cm",  "24cm"]  },
      { label: "股下",     labelEn: "Inseam",       value: "78cm",  values: ["78cm",  "80cm"]  },
      { label: "総丈",     labelEn: "Total Length", value: "106cm", values: ["106cm", "108cm"] },
    ],
  },
  {
    slug: "vector-ma1",
    name: "Vector MA-1",
    price: 38000,
    priceId: "price_1TbNNK04FSXNU1UEU4udG7y9",
    descriptionJa:
      "方向性によって形成されたMA-1。身体を横断する直線的な切り替えによって構成された、ボリュームのあるMA-1。切り替えに沿ってポケットを配置し、袖に手を入れた際には身頃のラインと繋がるよう構造を調整。全体が一つの方向性として流れるよう設計されている。また、本来のMA-1には見られないサムホール仕様を加え、機能とシルエットの両方を拡張した。シンプルでありながら、静かに構築されている。ボリュームと精密さのあいだに存在する一着。",
    descriptionEn:
      "Designed through direction. A voluminous MA-1 defined by structured linear panel lines across the body. Pockets are integrated into the seams, while the sleeve construction is adjusted to connect with the body lines when hands are placed inside — allowing the structure to flow as one continuous direction. Thumbhole cuffs, uncommon to a traditional MA-1, extend both function and silhouette. Worn simply, yet quietly constructed. Existing between volume and precision.",
    sizes: ["ONE SIZE"],
    sizeGuide: [
      { label: "着丈", labelEn: "Length",        value: "70cm" },
      { label: "身幅", labelEn: "Width",          value: "75cm" },
      { label: "肩幅", labelEn: "Shoulder Width", value: "58cm" },
      { label: "袖丈", labelEn: "Sleeve Length",  value: "66cm" },
    ],
  },
  {
    slug: "core-tee",
    name: "Core Tee",
    price: 4600,
    priceId: "price_1TbNNM04FSXNU1UEgsS2vx9f",
    descriptionJa:
      "静かな基盤として設計されたTシャツ。CODE_04グラフィックと\"NO SHOUT STILL STAYS\"の言葉を配し、静かな存在感を形にした一着。身幅をタイトに設計することで、身体に静かに沿うクリーンなシルエットを形成。強く主張するのではなく、沈黙の中に意思を残しながら静かに在り続けることを表現している。シンプルでありながら、残り続ける。静止と表現のあいだに存在する一着。",
    descriptionEn:
      "Designed as a quiet foundation. A T-shirt built around subtle presence, featuring the CODE_04 graphic and the phrase \"NO SHOUT STILL STAYS.\" The body is designed with a slimmer width, creating a cleaner silhouette that sits quietly against the body. Rather than demanding attention, it remains — carrying a quiet sense of persistence through silence. Worn simply, yet remaining. Existing between stillness and expression.",
    sizes: ["1", "2", "3"],
    sizeGuide: [
      { label: "身幅", labelEn: "Width",          value: "44cm", values: ["44cm", "47cm", "50cm"] },
      { label: "着丈", labelEn: "Length",         value: "64cm", values: ["64cm", "67cm", "70cm"] },
      { label: "袖丈", labelEn: "Sleeve Length",  value: "20cm", values: ["20cm", "20cm", "20cm"] },
    ],
  },
  {
    slug: "shift-bag",
    name: "Shift Bag",
    price: 26000,
    priceId: "price_1TbNNO04FSXNU1UE3x9l7XWv",
    descriptionJa:
      "静かな違和感によって形成されたバッグ。直線的な切り替えと工業用パーツによって構成された、大容量のショルダーバッグ。本来機能として存在する要素を造形の一部として再解釈し、実用性とデザイン性を静かな構造の中で共存させている。ショルダー部分には滑り止めのチューブを採用し、身体の動きに沿いながらもズレ落ちにくい構造に設計されている。日常に溶け込みながら、わずかにズレている。機能と造形のあいだに存在するバッグ。",
    descriptionEn:
      "Designed through subtle disruption. A large-capacity shoulder bag defined by structured linear panel lines and industrial components. Functional parts are reinterpreted as elements of form, balancing utility and design through a quiet, structured silhouette. The shoulder strap features an anti-slip tube construction, allowing the bag to remain securely in place while moving naturally with the body. Worn daily, yet slightly displaced. Existing between function and form.",
    sizes: ["ONE SIZE"],
    sizeGuide: [
      { label: "ベルト", labelEn: "Strap",  value: "72cm" },
      { label: "高さ",   labelEn: "Height", value: "37cm" },
      { label: "幅",     labelEn: "Width",  value: "48cm" },
      { label: "奥行き", labelEn: "Depth",  value: "15cm" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

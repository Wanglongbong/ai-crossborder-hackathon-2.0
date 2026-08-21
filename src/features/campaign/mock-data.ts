export type AssetRole = "Hero" | "Detail" | "Lifestyle" | "Logo";

export type SourceAsset = {
  id: string;
  name: string;
  url: string;
  role: AssetRole;
  status: "approved" | "needs-review";
};

export type ProductMock = {
  id: string;
  name: string;
  sku: string;
  category: string;
  image: string;
  price: string;
  promotion: string;
  readiness: number;
  brand: { name: string; tone: string; colors: string[] };
  usp: string;
  requiredClaims: string[];
  restrictedClaims: string[];
  audience: string;
  market: string;
  assets: SourceAsset[];
};

const serumImages = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=85",
];

export const mockProducts: ProductMock[] = [
  {
    id: "mock-skinglow-pro",
    name: "SkinGlow Pro 10% Niacinamide Serum",
    sku: "SKG-SRM-10N",
    category: "Dermocosmetics & Skincare",
    image: serumImages[0],
    price: "$39.00",
    promotion: "Launch bundle: Buy 1, get cleanser free",
    readiness: 88,
    brand: { name: "SkinGlow Laboratories", tone: "Clinical, clean, evidence-led", colors: ["#4F46E5", "#06B6D4"] },
    usp: "10% niacinamide and multi-depth hyaluronic acid for a lightweight daily brightening routine.",
    requiredClaims: ["Alcohol-free", "Paraben-free", "Dermatologist tested"],
    restrictedClaims: ["Overnight cure", "Replaces prescription treatment", "Guaranteed medical result"],
    audience: "Working professionals aged 22–42 seeking a simple, proven skincare routine.",
    market: "Vietnam, Singapore and US TikTok Shop",
    assets: [
      { id: "hero", name: "Serum packshot", url: serumImages[0], role: "Hero", status: "approved" },
      { id: "detail", name: "Formula texture", url: serumImages[1], role: "Detail", status: "approved" },
      { id: "life", name: "Morning routine", url: serumImages[2], role: "Lifestyle", status: "approved" },
      { id: "logo", name: "Brand mark", url: serumImages[3], role: "Logo", status: "needs-review" },
    ],
  },
  {
    id: "mock-zenfresh",
    name: "ZenFresh Sparkling Kombucha",
    sku: "ZEN-KMB-06P",
    category: "Functional Beverage",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=85",
    price: "$24.00",
    promotion: "6-pack summer bundle",
    readiness: 72,
    brand: { name: "ZenFresh", tone: "Fresh, optimistic, energetic", colors: ["#10B981", "#F59E0B"] },
    usp: "A zero-sugar sparkling tea made for an active afternoon reset.",
    requiredClaims: ["Zero sugar", "Serve chilled"],
    restrictedClaims: ["Detox", "Cures bloating"],
    audience: "Health-conscious shoppers aged 20–35.",
    market: "Vietnam TikTok Shop",
    assets: [{ id: "hero", name: "Bottle hero", url: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=85", role: "Hero", status: "approved" }],
  },
];

export const getMockProduct = (id: string) => mockProducts.find((product) => product.id === id) ?? mockProducts[0];

export const campaignMock = {
  signal: "Post-summer barrier recovery + 9.9 sale window",
  objective: "Drive product-page conversions",
  routes: [
    { id: "route-a", label: "Route A", name: "Problem → proof", hook: "Still covering dark spots with makeup?", message: "Show the routine problem, then a clear product ritual.", platform: "TikTok Shop · 9:16", metric: "3s hold rate", color: "indigo" },
    { id: "route-b", label: "Route B", name: "The 3-drop ritual", hook: "Three drops for a calmer-looking morning routine.", message: "Aspirational clean-beauty routine and tactile product cues.", platform: "Reels + Meta Feed", metric: "CTR & CVR", color: "cyan" },
  ],
  copy: {
    title: "SkinGlow Pro 10% Niacinamide Serum – Lightweight Daily Brightening Care",
    primary: "Meet the no-fuss serum for your daily glow routine. Lightweight, alcohol-free and made for the moments your skin needs calm, consistent care.",
    headline: "Your three-drop daily reset",
    cta: "Shop launch bundle",
  },
};

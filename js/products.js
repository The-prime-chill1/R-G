/* ==========================================================================
   R & G COLLECTIONS - CURATED MENSWEAR PRODUCT CATALOG & LOOKBOOKS
   ========================================================================== */

const RG_PRODUCTS = [
  {
    id: "rg-item-01",
    name: "Classic Linen Overshirt",
    category: "shirts",
    categoryLabel: "Shirts",
    price: 32000,
    originalPrice: 45000,
    swatches: ["#d6cbb8", "#2c2c2e", "#ffffff"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/palm_graphic_tee_1789594532568.jpg",
    description: "Breathable pure linen button-down overshirt tailored for relaxed elegance in warm climates.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tag: "Essential",
    inStock: true
  },
  {
    id: "rg-item-02",
    name: "Relaxed Heavyweight Tee",
    category: "shirts",
    categoryLabel: "T-Shirts",
    price: 16000,
    originalPrice: 22000,
    swatches: ["#b8a898", "#1c1c1e", "#e5e5ea"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/palm_graphic_tee_1789594532568.jpg",
    description: "260 GSM combed cotton crewneck t-shirt with dropped shoulders and a boxy contemporary drape.",
    sizes: ["M", "L", "XL", "XXL"],
    tag: "New",
    inStock: true
  },
  {
    id: "rg-item-03",
    name: "Tailored Slim Trousers",
    category: "native",
    categoryLabel: "Pants & Native",
    price: 28000,
    originalPrice: 38000,
    swatches: ["#1c1c1e", "#3a3a3c", "#d6cbb8"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/black_senator_suit_1789594639019.jpg",
    description: "Precision-cut wool blend trousers with subtle stretch and clean ankle taper for versatile styling.",
    sizes: ["30", "32", "34", "36", "38"],
    tag: "Tailored",
    inStock: true
  },
  {
    id: "rg-item-04",
    name: "Overshirt Bomber Jacket",
    category: "shirts",
    categoryLabel: "Jackets",
    price: 42000,
    originalPrice: 58000,
    swatches: ["#18181a", "#48484a"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/hero_fashion_bg_1789594358357.jpg",
    description: "Minimalist structured zip jacket crafted with matte satin twill and brushed brass hardware.",
    sizes: ["M", "L", "XL", "XXL"],
    tag: "Bestseller",
    inStock: true
  },
  {
    id: "rg-item-05",
    name: "Italian Leather Loafers",
    category: "shoes",
    categoryLabel: "Shoes",
    price: 38000,
    originalPrice: 55000,
    swatches: ["#111111", "#4a2e18"],
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/luxury_loafers_1789594405120.jpg",
    description: "Genuine full-grain Italian leather loafers with hand-stitched welt and cushioned memory foam insole.",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    tag: "Premium",
    inStock: true
  },
  {
    id: "rg-item-06",
    name: "Royal Cream Gold Senator",
    category: "native",
    categoryLabel: "Native Wear",
    price: 45000,
    originalPrice: 65000,
    swatches: ["#f5f0e6", "#1c1c1e"],
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/native_wear_item_1789594391443.jpg",
    description: "Tailored cream cashmere senator suit with fine golden neckline embroidery and matching cap.",
    sizes: ["S", "M", "L", "XL", "XXL", "Custom Measurement"],
    tag: "Exclusive",
    inStock: true
  },
  {
    id: "rg-item-07",
    name: "Neo-Strike Designer High-Tops",
    category: "sneakers",
    categoryLabel: "Sneakers",
    price: 32000,
    originalPrice: 45000,
    swatches: ["#18181a", "#ffffff"],
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/luxury_sneakers_1789594426355.jpg",
    description: "Clean monochrome high-top sneakers with shock-absorbing soles and premium leather finish.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    tag: "Trending",
    inStock: true
  },
  {
    id: "rg-item-08",
    name: "Artisan Leather Palm Slippers",
    category: "palms",
    categoryLabel: "Palms & Slides",
    price: 22000,
    originalPrice: 30000,
    swatches: ["#3b2219", "#111111"],
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    localImage: "file:///C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/luxury_palm_slippers_1789594700182.jpg",
    description: "Handcrafted braided leather palm slippers with solid brass hardware for everyday luxury.",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    tag: "Handmade",
    inStock: true
  }
];

const RG_CURATED_EDITS = [
  {
    title: "SUMMER LINEN EDIT",
    desc: "Light. Breathable. Effortless.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    category: "shirts"
  },
  {
    title: "CITY ESSENTIALS",
    desc: "Modern staples for every day.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    category: "shirts"
  },
  {
    title: "SMART CASUAL",
    desc: "Polished looks that work anywhere.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    category: "shoes"
  },
  {
    title: "BESPOKE NATIVE EDIT",
    desc: "Executive senators and grand traditional wear.",
    image: "C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/native_wear_item_1789594391443.jpg",
    category: "native"
  }
];

const RG_OUTFIT_LOOKS = [
  {
    id: "look-1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    items: [
      { name: "Classic Linen Shirt", price: 32000 },
      { name: "Tailored Slim Trousers", price: 28000 },
      { name: "Italian Leather Loafers", price: 38000 }
    ],
    total: 98000
  },
  {
    id: "look-2",
    image: "C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/hero_fashion_bg_1789594358357.jpg",
    items: [
      { name: "Overshirt Bomber Jacket", price: 42000 },
      { name: "Relaxed Heavyweight Tee", price: 16000 },
      { name: "Tailored Trousers", price: 28000 },
      { name: "Neo-Strike Sneakers", price: 32000 }
    ],
    total: 118000
  },
  {
    id: "look-3",
    image: "C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/black_senator_suit_1789594639019.jpg",
    items: [
      { name: "Bespoke Midnight Senator", price: 48000 },
      { name: "Braided Leather Palm Slippers", price: 22000 },
      { name: "Italian Leather Loafers", price: 38000 }
    ],
    total: 108000
  }
];

const RG_LOCATIONS = [
  {
    city: "Lagos Dispatch Hub",
    area: "Island & Mainland Express",
    address: "Lekki Phase 1 & Ikeja Hub, Lagos State",
    phone: "09045231629",
    hours: "Mon - Sat: 8:00 AM - 8:00 PM"
  },
  {
    city: "Akure Showroom",
    area: "Ondo State Central",
    address: "Alagbaka / Oba Adesida Commercial Belt, Akure, Ondo State",
    phone: "07060610938",
    hours: "Mon - Sat: 8:30 AM - 7:30 PM"
  },
  {
    city: "Owo Hub (Achievers Univ.)",
    area: "Campus Express Service",
    address: "Achievers University Main Gate, Owo, Ondo State",
    phone: "09045231629",
    hours: "Mon - Sun: 8:00 AM - 9:00 PM"
  }
];

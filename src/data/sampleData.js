/* ==========================================================================
   R&G COLLECTIONS - SAMPLE DATA & STARTER DEFINITIONS
   Theme: Modern Luxury Menswear & Bespoke Sartorial Fashion
   Zero Emojis Policy
   ========================================================================== */

export const RG_CATEGORIES = [
  { id: 'shirts', name: 'Shirts', slug: 'shirts', description: 'Italian tailored and linen essentials', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80' },
  { id: 'native', name: 'Native Wear', slug: 'native', description: 'Master-crafted Senator suits & Kaftans', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
  { id: 'jackets', name: 'Jackets & Blazers', slug: 'jackets', description: 'Structured silhouettes for evening elegance', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { id: 'shoes', name: 'Shoes & Loafers', slug: 'shoes', description: 'Handmade Italian leather footwear', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80' },
  { id: 'palms', name: 'Palms & Slides', slug: 'palms', description: 'Premium leather daily slides', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Leather belts, timepieces & eyewear', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80' }
];

export const RG_PRODUCTS = [
  {
    id: 'rg-prod-001',
    name: 'Obsidian Velvet Senator Set',
    slug: 'obsidian-velvet-senator-set',
    category: 'native',
    categoryLabel: 'Native Wear',
    price: 65000,
    originalPrice: 80000,
    discount: '19% OFF',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    swatches: ['#09090b', '#262626', '#cfa135'],
    tag: 'Bestseller',
    featured: true,
    isNewArrival: true,
    inStock: true,
    stockQuantity: 18,
    sku: 'RG-NAT-001',
    description: 'Precision cut from high-density Nigerian woven cashmere with satin trimmed collar and gold-plated chest accents.'
  },
  {
    id: 'rg-prod-002',
    name: 'Riviera Linen Button-Down',
    slug: 'riviera-linen-button-down',
    category: 'shirts',
    categoryLabel: 'Shirts',
    price: 32000,
    originalPrice: 40000,
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    swatches: ['#ffffff', '#e5dfd3', '#1e293b'],
    tag: 'Essential',
    featured: true,
    isNewArrival: true,
    inStock: true,
    stockQuantity: 24,
    sku: 'RG-SHT-002',
    description: 'Breathable 100% French linen garment washed for ultimate softness. Tailored slim fit with mother-of-pearl buttons.'
  },
  {
    id: 'rg-prod-003',
    name: 'Firenze Double-Monk Loafers',
    slug: 'firenze-double-monk-loafers',
    category: 'shoes',
    categoryLabel: 'Shoes & Loafers',
    price: 58000,
    originalPrice: 70000,
    discount: '17% OFF',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    swatches: ['#2b1d0c', '#000000'],
    tag: 'Exclusive',
    featured: true,
    isNewArrival: false,
    inStock: true,
    stockQuantity: 12,
    sku: 'RG-SHO-003',
    description: 'Hand-burnished Italian calfskin leather with Blake-stitched Goodyear welting and polished brass double buckles.'
  },
  {
    id: 'rg-prod-004',
    name: 'Monaco Leather Cross-Palms',
    slug: 'monaco-leather-cross-palms',
    category: 'palms',
    categoryLabel: 'Palms & Slides',
    price: 24000,
    originalPrice: 30000,
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['40', '41', '42', '43', '44'],
    swatches: ['#1c1917', '#78350f', '#e5be58'],
    tag: 'New',
    featured: false,
    isNewArrival: true,
    inStock: true,
    stockQuantity: 15,
    sku: 'RG-PLM-004',
    description: 'Ergonomic orthopedic leather footbed with crossover full-grain leather straps and non-slip rubber outsoles.'
  }
];

export const RG_LOOKBOOKS = [
  {
    id: 'look-01',
    title: 'THE DIPLOMAT',
    subtitle: 'Ceremonial & Evening Grandeur',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    items: [
      { name: 'Obsidian Velvet Senator Set', price: 65000 },
      { name: 'Firenze Double-Monk Loafers', price: 58000 }
    ],
    total: 123000
  },
  {
    id: 'look-02',
    title: 'THE COASTAL WEEKEND',
    subtitle: 'Resort & Sartorial Leisure',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    items: [
      { name: 'Riviera Linen Button-Down', price: 32000 },
      { name: 'Monaco Leather Cross-Palms', price: 24000 }
    ],
    total: 56000
  }
];

export const RG_LOCATIONS = [
  {
    city: 'Lagos Hub',
    area: 'Victoria Island / Lekki Corridor',
    address: 'Admiralty Way, Lekki Phase 1, Lagos State',
    hours: 'Mon - Sat: 9:00 AM - 8:00 PM',
    phone: '09045231629'
  },
  {
    city: 'Akure Showroom',
    area: 'Alagbaka GRA',
    address: 'Bank Road, Opposite High Court, Akure, Ondo State',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    phone: '07060610938'
  },
  {
    city: 'Owo Campus Hub',
    area: 'Achievers University Express Delivery',
    address: 'Achievers University Main Gate / KM 1 Idasen-Ute Road, Owo',
    hours: 'Daily: 8:00 AM - 9:00 PM',
    phone: '09045231629'
  }
];

export const RG_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Engr. Babatunde A.',
    role: 'Lagos, Nigeria',
    rating: 5,
    comment: 'The fit on the Obsidian Senator suit is extraordinary. It arrived in Lagos within 24 hours of ordering.'
  },
  {
    id: 't-2',
    name: 'Dr. Chinedu O.',
    role: 'Achievers University Alumni',
    rating: 5,
    comment: 'R&G footwear quality rivals top Italian designer houses. Super comfortable for long days.'
  }
];

export const RG_FAQS = [
  {
    category: 'Orders & Delivery',
    question: 'How fast is dispatch to Lagos, Akure, and Achievers University?',
    answer: 'Orders within Lagos and Akure are delivered same-day or next-day. Campus express delivery to Achievers University Owo is completed within hours.'
  },
  {
    category: 'Payment & Sizing',
    question: 'What payment methods are supported on R&G?',
    answer: 'We support instant secure online payments via Paystack (Debit Cards, Bank Transfer, USSD) as well as direct order completion via WhatsApp.'
  },
  {
    category: 'Returns',
    question: 'What is your exchange and resizing policy?',
    answer: 'We offer hassle-free size exchanges within 7 days of delivery as long as garments remain unworn with original tags.'
  }
];

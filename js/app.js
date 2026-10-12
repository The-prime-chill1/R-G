/* ==========================================================================
   R & G COLLECTIONS - REACT 18 STOREFRONT (STANDALONE ZERO-CORS COMPATIBLE)
   Refined. Modern. Effortless.
   ========================================================================== */

const { useState, useEffect, createElement: h } = React;

const PRIMARY_WHATSAPP = '2349045231629';
const SECONDARY_WHATSAPP = '2347060610938';

function formatNaira(amount) {
  return 'NGN ' + Number(amount).toLocaleString('en-NG');
}

// React SVG Icon Components
const Icons = {
  Menu: () => h('svg', { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' })
  ),
  Search: () => h('svg', { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' })
  ),
  User: () => h('svg', { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' })
  ),
  Truck: () => h('svg', { width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, viewBox: '0 0 24 24' },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z' })
  ),
  Scissors: () => h('svg', { width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, viewBox: '0 0 24 24' },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' })
  ),
  WhatsApp: () => h('svg', { width: 18, height: 18, fill: 'currentColor', viewBox: '0 0 24 24' },
    h('path', { d: 'M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.769.78 2.796.78 3.182 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.741 0-3.376-.45-4.81-1.241L2 22l1.523-5.556C2.698 14.984 2.227 13.43 2.227 11.938c0-5.514 4.486-10 10-10 5.514 0 10 4.486 10 10z' })
  ),
  Phone: () => h('svg', { width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, viewBox: '0 0 24 24' },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z' })
  )
};

function MainApp() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    if (typeof productStore !== 'undefined') {
      const prods = await productStore.getAllProducts();
      setProducts(prods);
    }
  };

  const handleOpenQuickView = (item) => {
    setQuickViewItem(item);
    setActiveImageIndex(0);
    setSelectedSize(Array.isArray(item.sizes) && item.sizes.length > 0 ? item.sizes[0] : '');
  };

  const handleOrderWhatsApp = (item, customSize) => {
    const sizeToUse = customSize || selectedSize || (Array.isArray(item.sizes) ? item.sizes[0] : 'Standard');
    const msg = `*R & G COLLECTIONS - PRODUCT INQUIRY*\n` +
                `-----------------------------------\n` +
                `Item: ${item.name}\n` +
                `Category: ${item.categoryLabel || 'Essentials'}\n` +
                `Price: ${formatNaira(item.price)}\n` +
                `Selected Size: ${sizeToUse}\n` +
                `-----------------------------------\n` +
                `Hello, I would like to order this item. Please confirm availability and delivery to my location.`;

    window.open(`https://wa.me/${PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleOrderLookWhatsApp = (look) => {
    const itemsText = look.items.map(i => ` - ${i.name} (${formatNaira(i.price)})`).join('\n');
    const msg = `*R & G COLLECTIONS - FULL LOOKBOOK INQUIRY*\n` +
                `-----------------------------------\n` +
                `Look Items:\n${itemsText}\n` +
                `Total Set: ${formatNaira(look.total)}\n` +
                `-----------------------------------\n` +
                `Hello, I would like to order this full styled look. Please advise on sizing and dispatch.`;

    window.open(`https://wa.me/${PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleAccessoryWhatsApp = (name) => {
    const msg = `*R & G COLLECTIONS - ACCESSORIES INQUIRY*\n` +
                `-----------------------------------\n` +
                `Accessory: ${name}\n` +
                `-----------------------------------\n` +
                `Hello, please send me current available styles and prices for ${name}.`;

    window.open(`https://wa.me/${PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return h('div', null,
    // Top Notice Bar
    h('div', { className: 'top-notice-bar' },
      'OPENING PROMO: ',
      h('span', null, 'UP TO 30% OFF'),
      ' ON SELECTED ESSENTIALS \u2022 FAST DISPATCH TO LAGOS, AKURE & ACHIEVERS UNIVERSITY'
    ),

    // Main Header
    h('header', { className: 'main-header' },
      h('div', { className: 'container header-container' },
        h('div', { className: 'header-left-nav' },
          h('button', { className: 'header-menu-btn', onClick: () => setSideMenuOpen(true), title: 'Menu' },
            h(Icons.Menu)
          ),
          h('ul', { className: 'header-nav-links' },
            h('li', null, h('a', { href: '#new-arrivals' }, 'New In')),
            h('li', null, h('a', { href: '#curated-edits' }, 'Wardrobe Edits')),
            h('li', null, h('a', { href: '#outfit-looks' }, 'Looks')),
            h('li', null, h('a', { href: '#locations' }, 'Stores'))
          )
        ),

        h('a', { href: '#', className: 'header-brand' },
          h('div', { className: 'header-brand-name' }, 'R & G'),
          h('div', { className: 'header-brand-sub' }, 'MODERN ESSENTIALS')
        ),

        h('div', { className: 'header-actions' },
          h('a', { href: '#new-arrivals', className: 'header-action-icon', title: 'Search' }, h(Icons.Search)),
          h('a', { href: 'admin.html', className: 'header-action-icon', title: 'Admin Portal' }, h(Icons.User)),
          h('a', { href: `https://wa.me/${PRIMARY_WHATSAPP}?text=Hello%20R%26G%20Collections`, target: '_blank', className: 'btn-header-wa' },
            h('span', null, 'WhatsApp')
          )
        )
      )
    ),

    // Split Editorial Hero
    h('section', { className: 'editorial-hero' },
      h('div', { className: 'hero-editorial-left' },
        h('div', { className: 'hero-season-tag' }, 'NEW SEASON'),
        h('h1', { className: 'hero-headline' }, 'Refined.\nModern.\nEffortless.'),
        h('p', { className: 'hero-description' }, 'Timeless pieces. Contemporary silhouettes. Made to elevate your everyday presence.'),
        h('a', { href: '#new-arrivals', className: 'btn-hero-solid' }, 'SHOP NEW IN')
      ),
      h('div', { className: 'hero-editorial-right' },
        h('img', { src: 'C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/hero_fashion_bg_1789594358357.jpg', alt: 'R & G Menswear', className: 'hero-editorial-img', onError: (e) => { e.target.src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'; } })
      )
    ),

    // Category Icon Strip
    h('section', { className: 'category-strip' },
      h('div', { className: 'container category-icon-row' },
        ['all', 'shirts', 'native', 'jackets', 'shoes', 'palms'].map(catKey => {
          const labels = { all: 'ALL', shirts: 'SHIRTS', native: 'NATIVE WEAR', jackets: 'JACKETS', shoes: 'SHOES', palms: 'PALMS & SLIDES' };
          return h('div', {
            key: catKey,
            className: `category-icon-item ${activeCategory === catKey ? 'active' : ''}`,
            onClick: () => setActiveCategory(catKey)
          }, h('span', null, labels[catKey]));
        })
      )
    ),

    // 1. Curated Wardrobe Edits
    h('section', { className: 'section-spacer container', id: 'curated-edits' },
      h('div', { className: 'section-top-bar' },
        h('h2', { className: 'section-heading-clean' }, 'CURATED WARDROBE EDITS'),
        h('a', { href: '#new-arrivals', className: 'link-view-all' }, 'VIEW ALL')
      ),
      h('div', { className: 'curated-edits-grid' },
        RG_CURATED_EDITS.map((edit, idx) =>
          h('div', { key: idx, className: 'curated-edit-card', onClick: () => setActiveCategory(edit.category) },
            h('img', { src: edit.image, alt: edit.title, className: 'curated-edit-img', onError: (e) => { e.target.src = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'; } }),
            h('div', { className: 'curated-edit-overlay' },
              h('h3', { className: 'curated-edit-title' }, edit.title),
              h('p', { className: 'curated-edit-desc' }, edit.desc),
              h('span', { className: 'curated-edit-cta' }, 'Shop Now')
            )
          )
        )
      )
    ),

    // 2. New Arrivals (Admin Populated)
    h('section', { className: 'section-spacer container', id: 'new-arrivals' },
      h('div', { className: 'section-top-bar' },
        h('h2', { className: 'section-heading-clean' }, 'NEW ARRIVALS'),
        h('a', { href: '#new-arrivals', className: 'link-view-all' }, 'VIEW ALL')
      ),
      filteredProducts.length === 0
        ? h('div', { style: { textAlign: 'center', padding: '4rem 1rem', background: '#fff', border: '1px solid var(--border-light)', borderRadius: '4px' } },
            h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '0.5rem' } }, 'Collection is ready for administrator additions'),
            h('p', { style: { color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' } }, 'Use the Admin Dashboard to add new goods and manage pricing.'),
            h('a', { href: 'admin.html', className: 'btn-hero-solid', style: { background: 'var(--text-dark)', color: '#fff', fontSize: '0.78rem' } }, 'Open Admin Portal')
          )
        : h('div', { className: 'new-arrivals-grid' },
            filteredProducts.map(item =>
              h('div', { key: item.id, className: 'clean-product-card' },
                h('div', { className: 'clean-product-media', onClick: () => handleOpenQuickView(item), style: { cursor: 'pointer' } },
                  h('img', { src: item.image, alt: item.name, className: 'clean-product-img', onError: (e) => { e.target.src = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'; } }),
                  item.gallery && item.gallery.length > 0 && h('span', { style: { position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 } }, `${item.gallery.length + 1} Photos`)
                ),
                h('div', { className: 'clean-product-info' },
                  h('h4', { className: 'clean-product-title', onClick: () => handleOpenQuickView(item), style: { cursor: 'pointer' } }, item.name),
                  h('div', { className: 'clean-product-price' }, formatNaira(item.price)),
                  h('div', { className: 'swatch-dots' },
                    (item.swatches || ["#1c1c1e", "#d6cbb8", "#ffffff"]).map((c, i) =>
                      h('span', { key: i, className: 'swatch-dot', style: { backgroundColor: c, border: '1px solid rgba(0,0,0,0.1)' } })
                    )
                  ),
                  h('div', { style: { display: 'flex', gap: '6px', marginTop: 'auto' } },
                    h('button', { className: 'btn-clean-order-wa', style: { flex: 1 }, onClick: () => handleOrderWhatsApp(item) }, 'Order on WhatsApp'),
                    h('button', {
                      onClick: () => handleOpenQuickView(item),
                      style: { background: '#f4f4f5', border: '1px solid #e4e4e7', borderRadius: 'var(--radius-xs)', padding: '0 8px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dark)' },
                      title: 'View Details & Photos'
                    }, 'View')
                  )
                )
              )
            )
          )
    ),

    // 3. Outfit Inspiration
    h('section', { className: 'section-spacer container', id: 'outfit-looks' },
      h('div', { className: 'section-top-bar' },
        h('h2', { className: 'section-heading-clean' }, 'OUTFIT INSPIRATION'),
        h('a', { href: '#outfit-looks', className: 'link-view-all' }, 'VIEW ALL')
      ),
      h('div', { className: 'outfit-looks-grid' },
        RG_OUTFIT_LOOKS.map(look =>
          h('div', { key: look.id, className: 'outfit-look-card' },
            h('div', { className: 'look-media-col' },
              h('img', { src: look.image, alt: 'Lookbook', className: 'look-img', onError: (e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'; } })
            ),
            h('div', { className: 'look-info-col' },
              h('ul', { className: 'look-items-list' },
                look.items.map((i, idx) =>
                  h('li', { key: idx, className: 'look-item-entry' },
                    h('h5', null, i.name),
                    h('span', null, formatNaira(i.price))
                  )
                )
              ),
              h('div', null,
                h('div', { style: { fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '1rem' } }, 'Full Set: ' + formatNaira(look.total)),
                h('button', { className: 'btn-shop-look-arrow', onClick: () => handleOrderLookWhatsApp(look) }, 'Shop The Look \u2192')
              )
            )
          )
        )
      )
    ),

    // 4. The Finishing Touch
    h('section', { className: 'section-spacer container', id: 'accessories' },
      h('div', { className: 'finishing-touch-banner' },
        h('div', { className: 'finishing-intro' },
          h('h3', null, 'THE FINISHING TOUCH'),
          h('p', null, 'Accessories that complete your look.'),
          h('a', { href: `https://wa.me/${PRIMARY_WHATSAPP}?text=Hello%20R%26G%2C%20I%20am%20inquiring%20about%20accessories`, target: '_blank' }, 'SHOP ACCESSORIES \u2192')
        ),
        h('div', { className: 'finishing-items-row' },
          [
            { name: 'Leather Belts', label: 'BELTS', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=300&q=80' },
            { name: 'Weekend Bags', label: 'BAGS', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80' },
            { name: 'Luxury Watches', label: 'WATCHES', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80' },
            { name: 'Designer Sunglasses', label: 'SUNGLASSES', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80' }
          ].map((acc, idx) =>
            h('div', { key: idx, className: 'finishing-item-col', onClick: () => handleAccessoryWhatsApp(acc.name) },
              h('div', { className: 'finishing-item-thumb' },
                h('img', { src: acc.img, alt: acc.label })
              ),
              h('div', { className: 'finishing-item-label' }, acc.label)
            )
          )
        )
      )
    ),

    // 5. Locations
    h('section', { className: 'locations-section-clean', id: 'locations' },
      h('div', { className: 'container' },
        h('div', { className: 'section-top-bar' },
          h('h2', { className: 'section-heading-clean' }, 'OUR LOCATIONS & HUBS'),
          h('span', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } }, 'EXPRESS SAME-DAY DISPATCH')
        ),
        h('div', { className: 'locations-grid-clean' },
          RG_LOCATIONS.map((loc, idx) =>
            h('div', { key: idx, className: 'location-box' },
              h('h3', null, loc.city),
              h('div', { className: 'location-box-sub' }, loc.area),
              h('ul', { className: 'location-box-details' },
                h('li', null, h('strong', null, 'Address: '), loc.address),
                h('li', null, h('strong', null, 'Hours: '), loc.hours),
                h('li', null, h('strong', null, 'Contact: '), loc.phone)
              ),
              h('div', { style: { display: 'flex', gap: '0.5rem' } },
                h('a', { href: `tel:${loc.phone}`, className: 'btn-loc-action' }, 'Call Store'),
                h('a', { href: `https://wa.me/234${loc.phone.replace(/^0/, '')}?text=Hello%20R%26G%20Collections`, target: '_blank', className: 'btn-loc-action', style: { background: 'var(--text-dark)', color: '#fff' } }, 'WhatsApp')
              )
            )
          )
        )
      )
    ),

    // 6. Value Props Strip
    h('section', { className: 'value-props-strip' },
      h('div', { className: 'container value-props-grid' },
        [
          { icon: Icons.Truck, title: 'FREE DISPATCH', sub: 'On select orders across hubs' },
          { icon: Icons.Scissors, title: 'CUSTOM SIZING', sub: 'Bespoke fitting guarantee' },
          { icon: Icons.WhatsApp, title: 'DIRECT ORDER', sub: 'Instant WhatsApp checkout' },
          { icon: Icons.Phone, title: 'DIRECT SUPPORT', sub: '09045231629 / 07060610938' }
        ].map((v, i) =>
          h('div', { key: i, className: 'value-prop-item' },
            h('div', { className: 'value-prop-icon' }, h(v.icon)),
            h('div', null,
              h('h4', null, v.title),
              h('p', null, v.sub)
            )
          )
        )
      )
    ),

    // 7. Editorial Footer
    h('footer', { className: 'footer-editorial' },
      h('div', { className: 'container' },
        h('div', { className: 'footer-top-grid' },
          h('div', null,
            h('div', { className: 'footer-brand-title' }, 'R & G'),
            h('p', { style: { color: '#a1a1aa', fontSize: '0.88rem', maxWidth: '320px', marginBottom: '1.5rem' } },
              'Contemporary menswear brand designed for men of substance. Modern essentials, Italian footwear, and master-crafted native attire.'
            ),
            h('div', { style: { fontSize: '0.85rem', color: '#fff' } },
              'Email: ',
              h('a', { href: 'mailto:rasakanu2008@gmail.com', style: { color: 'var(--gold-accent)', textDecoration: 'underline' } }, 'rasakanu2008@gmail.com')
            )
          ),

          h('div', { className: 'footer-col' },
            h('h4', null, 'EXPLORE'),
            h('ul', { className: 'footer-links-list' },
              h('li', null, h('a', { href: '#new-arrivals' }, 'New Arrivals')),
              h('li', null, h('a', { href: '#curated-edits' }, 'Wardrobe Edits')),
              h('li', null, h('a', { href: '#outfit-looks' }, 'Shop The Look')),
              h('li', null, h('a', { href: '#accessories' }, 'Accessories'))
            )
          ),

          h('div', { className: 'footer-col' },
            h('h4', null, 'LOCATIONS'),
            h('ul', { className: 'footer-links-list' },
              h('li', null, h('a', { href: '#locations' }, 'Lagos Hub')),
              h('li', null, h('a', { href: '#locations' }, 'Akure Showroom')),
              h('li', null, h('a', { href: '#locations' }, 'Owo - Achievers Univ.')),
              h('li', null, h('a', { href: '#locations' }, 'Campus Delivery'))
            )
          ),

          h('div', { className: 'footer-col' },
            h('h4', null, 'CONNECT'),
            h('ul', { className: 'footer-links-list' },
              h('li', null, h('span', null, 'Phone: 09045231629')),
              h('li', null, h('span', null, 'Phone: 07060610938')),
              h('li', null, h('a', { href: 'https://www.tiktok.com', target: '_blank' }, 'TikTok: @R&G COLLECTION')),
              h('li', null, h('a', { href: 'admin.html', style: { color: 'var(--gold-accent)', fontWeight: 800 } }, 'Admin Dashboard'))
            )
          )
        ),

        h('div', { className: 'footer-bottom-bar' },
          h('div', null, '\u00A9 2026 R & G Collections. All Rights Reserved.'),
          h('div', { style: { display: 'flex', gap: '1.5rem' } },
            h('a', { href: '#' }, 'Privacy'),
            h('a', { href: '#' }, 'Terms'),
            h('a', { href: 'admin.html' }, 'Admin Portal')
          )
        )
      )
    ),

    // Product Quick View Modal (Multi-Angle Gallery & Direct WhatsApp Order)
    quickViewItem && h('div', { className: 'product-modal-backdrop active', onClick: () => setQuickViewItem(null) },
      h('div', { className: 'product-modal-card', onClick: e => e.stopPropagation() },
        h('button', { className: 'modal-close-btn', onClick: () => setQuickViewItem(null) }, 'X'),
        
        // Left Column: Images & Multi-Angle Thumbnails
        h('div', { className: 'modal-gallery-col' },
          h('div', { className: 'modal-main-img-wrap' },
            h('img', {
              src: (() => {
                const allImgs = [quickViewItem.image, ...(quickViewItem.gallery || [])].filter(Boolean);
                return allImgs[activeImageIndex] || quickViewItem.image;
              })(),
              alt: quickViewItem.name,
              className: 'modal-main-img'
            })
          ),
          
          // Thumbnails
          (() => {
            const allImgs = [quickViewItem.image, ...(quickViewItem.gallery || [])].filter(Boolean);
            if (allImgs.length <= 1) return null;
            return h('div', { className: 'modal-thumbs-row' },
              allImgs.map((imgSrc, idx) =>
                h('button', {
                  key: idx,
                  className: `modal-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`,
                  onClick: () => setActiveImageIndex(idx)
                },
                  h('img', { src: imgSrc, alt: `Angle ${idx + 1}` })
                )
              )
            );
          })()
        ),

        // Right Column: Details & Direct WhatsApp Order
        h('div', { className: 'modal-info-col' },
          h('div', { className: 'modal-tag' }, quickViewItem.tag || 'R & G ESSENTIAL'),
          h('h3', { className: 'modal-title' }, quickViewItem.name),
          h('div', { className: 'modal-price' }, formatNaira(quickViewItem.price)),
          
          quickViewItem.description && h('p', { className: 'modal-desc' }, quickViewItem.description),
          
          // Sizes selection
          Array.isArray(quickViewItem.sizes) && quickViewItem.sizes.length > 0 && h('div', null,
            h('div', { className: 'modal-sizes-title' }, 'SELECT SIZE:'),
            h('div', { className: 'modal-sizes-row' },
              quickViewItem.sizes.map((sz, idx) =>
                h('button', {
                  key: idx,
                  className: `modal-size-pill ${selectedSize === sz ? 'active' : ''}`,
                  onClick: () => setSelectedSize(sz)
                }, sz)
              )
            )
          ),

          // Swatches
          Array.isArray(quickViewItem.swatches) && quickViewItem.swatches.length > 0 && h('div', { style: { marginBottom: '1.5rem' } },
            h('div', { className: 'modal-sizes-title' }, 'COLOR TONES:'),
            h('div', { className: 'swatch-dots' },
              quickViewItem.swatches.map((c, i) =>
                h('span', { key: i, className: 'swatch-dot', style: { backgroundColor: c, width: '12px', height: '12px', border: '1px solid rgba(0,0,0,0.15)' } })
              )
            )
          ),

          h('button', {
            className: 'btn-modal-wa',
            onClick: () => handleOrderWhatsApp(quickViewItem, selectedSize)
          }, 'Order via WhatsApp \u2192')
        )
      )
    )
  );
}

// Mount React Root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(h(MainApp));
}

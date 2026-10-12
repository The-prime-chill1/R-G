/* ==========================================================================
   R&G COLLECTIONS - SHOP CATALOG PAGE
   Strict Rules: React Icons Only, Zero Emojis, Live Dynamic Filtering
   ========================================================================== */

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductGrid from '../components/ProductGrid.jsx';
import QuickViewModal from '../components/QuickViewModal.jsx';
import { useShop } from '../context/ShopContext.jsx';
import '../styles/shop.css';

export default function ShopPage() {
  const { products, categories } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const initialCat = searchParams.get('cat') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedSize, setSelectedSize] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceSort, setPriceSort] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  React.useEffect(() => {
    document.title = "Shop Menswear Catalog | R&G Collections";
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (initialSearch) {
        const q = initialSearch.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = (p.categoryLabel || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCat) return false;
      }
      // Size
      if (selectedSize !== 'all') {
        if (!Array.isArray(p.sizes) || !p.sizes.includes(selectedSize)) {
          return false;
        }
      }
      // Stock
      if (inStockOnly && p.inStock === false) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (priceSort === 'price-low') return a.price - b.price;
      if (priceSort === 'price-high') return b.price - a.price;
      if (priceSort === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return 0;
    });
  }, [products, selectedCategory, initialSearch, selectedSize, inStockOnly, priceSort]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setInStockOnly(false);
    setPriceSort('featured');
    setSearchParams({});
  };

  return (
    <div className="container shop-page-container">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <h1 className="shop-headline">
          {selectedCategory === 'all' ? 'The Complete Catalog' : (categories.find(c => c.id === selectedCategory)?.name || 'Collection')}
        </h1>
        <p className="shop-subheadline">
          Master-crafted Nigerian ceremonial native attire, Italian footwear, and refined wardrobe essentials.
        </p>
      </div>

      <div className="shop-layout-grid">
        {/* Desktop Sidebar Filters */}
        <aside className="shop-sidebar-filters">
          <div className="filter-group-header">
            <h3>Filter Goods</h3>
            <button className="btn-clear-filters" onClick={handleClearFilters}>Reset</button>
          </div>

          {/* Categories */}
          <div className="filter-block">
            <h4 className="filter-block-title">Category</h4>
            <ul className="filter-list">
              <li>
                <label className="filter-item-label">
                  <span>
                    <input 
                      type="radio" 
                      name="categoryFilter" 
                      checked={selectedCategory === 'all'} 
                      onChange={() => setSelectedCategory('all')} 
                    /> All Categories
                  </span>
                  <span>({products.length})</span>
                </label>
              </li>
              {categories.map(cat => {
                const count = products.filter(p => p.category === cat.id).length;
                return (
                  <li key={cat.id}>
                    <label className="filter-item-label">
                      <span>
                        <input 
                          type="radio" 
                          name="categoryFilter" 
                          checked={selectedCategory === cat.id} 
                          onChange={() => setSelectedCategory(cat.id)} 
                        /> {cat.name}
                      </span>
                      <span>({count})</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sizes */}
          <div className="filter-block">
            <h4 className="filter-block-title">Size</h4>
            <div className="size-filter-chips">
              {['all', 'S', 'M', 'L', 'XL', 'XXL', '40', '41', '42', '43', '44', '45'].map(sz => (
                <button 
                  key={sz} 
                  className={`size-filter-chip ${selectedSize === sz ? 'active' : ''}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="filter-block">
            <label className="filter-item-label" style={{ fontWeight: 700, color: 'var(--rg-black)' }}>
              <span>
                <input 
                  type="checkbox" 
                  checked={inStockOnly} 
                  onChange={e => setInStockOnly(e.target.checked)} 
                /> In-Stock Only
              </span>
            </label>
          </div>
        </aside>

        {/* Products Column */}
        <main>
          {/* Top Controls */}
          <div className="shop-controls-top">
            <div className="product-count-text">
              Showing <strong>{filteredProducts.length}</strong> items {initialSearch && <span>for "{initialSearch}"</span>}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                className="mobile-filter-drawer-btn" 
                onClick={() => setMobileFilterOpen(true)}
              >
                <FiFilter /> Filters
              </button>

              <select 
                className="shop-sort-select"
                value={priceSort}
                onChange={e => setPriceSort(e.target.value)}
              >
                <option value="featured">Featured Collection</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid or Empty Catalog Coming Soon State */}
          {products.length === 0 ? (
            <div className="catalog-coming-soon-banner" style={{ margin: '2rem 0' }}>
              <div className="coming-soon-crest">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="var(--rg-gold-400, #d4af37)">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
                </svg>
              </div>
              <span className="coming-soon-badge">NEW CATALOG ARRIVING</span>
              <h3 className="coming-soon-title">Atelier Goods Coming Soon</h3>
              <p className="coming-soon-desc">
                Our catalog is currently being updated with the latest bespoke menswear and tailored pieces. When items are published by our atelier, they will be instantly available for ordering here.
              </p>
              <div className="coming-soon-actions">
                <a 
                  href="https://wa.me/2349045231629?text=Hello%20R%26G%20Collections%2C%20I%20would%20like%20to%20inquire%20about%20ordering%20exclusive%20menswear."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '0.85rem 1.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.82rem' }}
                >
                  Order via WhatsApp Concierge
                </a>
              </div>
            </div>
          ) : (
            <ProductGrid 
              products={filteredProducts} 
              columns={3} 
              onQuickView={p => setSelectedQuickView(p)} 
            />
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      {selectedQuickView && (
        <QuickViewModal 
          product={selectedQuickView} 
          onClose={() => setSelectedQuickView(null)} 
        />
      )}
    </div>
  );
}

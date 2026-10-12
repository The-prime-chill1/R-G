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

          {/* Products Grid */}
          <ProductGrid 
            products={filteredProducts} 
            columns={3} 
            onQuickView={p => setSelectedQuickView(p)} 
          />
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

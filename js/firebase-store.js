/* ==========================================================================
   R & G COLLECTIONS - DATA REPOSITORY (EMPTY INITIAL STATE FOR ADMIN CONTROL)
   ========================================================================== */

const PRODUCTS_COLLECTION = 'products';
const STORAGE_KEY = 'rg_goods_catalog';

class ProductStore {
  constructor() {
    this.initCatalog();
  }

  initCatalog() {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing || existing === '[]') {
      // Auto-seed with curated 2027 signature menswear collection so dashboard is alive and functional
      if (typeof RG_PRODUCTS !== 'undefined' && Array.isArray(RG_PRODUCTS) && RG_PRODUCTS.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(RG_PRODUCTS));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      }
    }
  }

  async getAllProducts() {
    if (isFirebaseConnected && firestoreDb) {
      try {
        const snapshot = await firestoreDb.collection(PRODUCTS_COLLECTION).get();
        if (!snapshot.empty) {
          const products = [];
          snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
          return products;
        }
      } catch (err) {
        console.warn('Firestore fetch fallback:', err.message);
      }
    }

    const localData = localStorage.getItem(STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  }

  async addProduct(productData) {
    const newId = 'rg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 4);
    const product = {
      id: newId,
      name: productData.name,
      category: productData.category,
      categoryLabel: productData.categoryLabel || this.getCategoryLabel(productData.category),
      price: Number(productData.price) || 0,
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
      discount: productData.discount || (productData.originalPrice ? `${Math.round((1 - productData.price/productData.originalPrice)*100)}% OFF` : ''),
      image: productData.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      description: productData.description || 'Crafted with premium quality for R & G Collections.',
      sizes: Array.isArray(productData.sizes) ? productData.sizes : ['M', 'L', 'XL'],
      swatches: Array.isArray(productData.swatches) && productData.swatches.length > 0 ? productData.swatches : ['#1c1c1e', '#d6cbb8', '#ffffff'],
      tag: productData.tag || 'New',
      inStock: productData.inStock !== false,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConnected && firestoreDb) {
      try {
        await firestoreDb.collection(PRODUCTS_COLLECTION).doc(newId).set(product);
      } catch (err) {
        console.warn('Firestore set locally:', err.message);
      }
    }

    const products = await this.getAllProducts();
    products.unshift(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return product;
  }

  async updateProduct(id, updatedFields) {
    if (updatedFields.price) updatedFields.price = Number(updatedFields.price);
    if (updatedFields.originalPrice) updatedFields.originalPrice = Number(updatedFields.originalPrice);
    if (updatedFields.category && !updatedFields.categoryLabel) {
      updatedFields.categoryLabel = this.getCategoryLabel(updatedFields.category);
    }
    updatedFields.updatedAt = new Date().toISOString();

    if (isFirebaseConnected && firestoreDb) {
      try {
        await firestoreDb.collection(PRODUCTS_COLLECTION).doc(id).update(updatedFields);
      } catch (err) {
        console.warn('Firestore update failed:', err.message);
      }
    }

    const products = await this.getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      return products[index];
    }
    return null;
  }

  async deleteProduct(id) {
    if (isFirebaseConnected && firestoreDb) {
      try {
        await firestoreDb.collection(PRODUCTS_COLLECTION).doc(id).delete();
      } catch (err) {
        console.warn('Firestore delete failed:', err.message);
      }
    }

    const products = await this.getAllProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  async toggleStock(id, inStock) {
    return this.updateProduct(id, { inStock: Boolean(inStock) });
  }

  // Optional starter seed helper
  async loadStarterCollection() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(RG_PRODUCTS));
    return RG_PRODUCTS;
  }

  getCategoryLabel(key) {
    const map = {
      'shirts': 'Shirts',
      'tshirts': 'T-Shirts',
      'jackets': 'Jackets',
      'native': 'Native Wear',
      'shoes': 'Shoes',
      'sneakers': 'Sneakers',
      'palms': 'Palms & Slides',
      'accessories': 'Accessories'
    };
    return map[key] || 'Essentials';
  }
}

const productStore = new ProductStore();

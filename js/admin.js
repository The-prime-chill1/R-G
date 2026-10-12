/* ==========================================================================
   R & G COLLECTIONS - ADMIN CONTROLLER
   Credentials: rasakanu2008@gmail.com | Password: Orezi@!!Raj
   ========================================================================== */

const ADMIN_MASTER_PASSWORD = "Orezi@!!Raj";
const ADMIN_MASTER_EMAIL = "rasakanu2008@gmail.com";

let adminState = {
  products: [],
  searchQuery: '',
  categoryFilter: 'all',
  editingProductId: null,
  deletingProductId: null
};

document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  setupAdminListeners();
});

// Check Authentication
function checkAdminAuth() {
  const isAuth = sessionStorage.getItem('rg_admin_authenticated') === 'true';
  const authScreen = document.getElementById('adminAuthScreen');
  const mainContent = document.getElementById('adminMainContent');

  if (isAuth) {
    if (authScreen) authScreen.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    loadAdminDashboard();
  } else {
    if (authScreen) authScreen.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'none';
  }
}

// Handle Admin Login
function handleAdminLogin(event) {
  event.preventDefault();
  const email = (document.getElementById('adminLoginEmail')?.value || '').trim();
  const password = (document.getElementById('adminLoginPassword')?.value || '').trim();
  const errorBanner = document.getElementById('adminAuthError');

  if (password === ADMIN_MASTER_PASSWORD) {
    sessionStorage.setItem('rg_admin_authenticated', 'true');
    sessionStorage.setItem('rg_admin_user', email || ADMIN_MASTER_EMAIL);
    if (errorBanner) errorBanner.style.display = 'none';
    checkAdminAuth();
    showAdminToast('Welcome back, Admin. Dashboard loaded successfully.');
  } else {
    if (errorBanner) {
      errorBanner.textContent = 'Invalid administrator password. Access denied.';
      errorBanner.style.display = 'block';
    }
  }
}

// Admin Logout
function handleAdminLogout() {
  sessionStorage.removeItem('rg_admin_authenticated');
  sessionStorage.removeItem('rg_admin_user');
  checkAdminAuth();
}

// Format Currency
function formatNaira(amount) {
  return 'NGN ' + Number(amount).toLocaleString('en-NG');
}

// Load and Render Dashboard
async function loadAdminDashboard() {
  adminState.products = await productStore.getAllProducts();
  renderStats();
  renderProductsTable();
}

// Render Summary Statistics
function renderStats() {
  const totalEl = document.getElementById('statTotalGoods');
  const nativeEl = document.getElementById('statNativeStyles');
  const footwearEl = document.getElementById('statFootwearStyles');
  const stockEl = document.getElementById('statInStock');

  const total = adminState.products.length;
  const nativeCount = adminState.products.filter(p => p.category === 'native').length;
  const footwearCount = adminState.products.filter(p => ['shoes', 'sneakers', 'slides', 'palms'].includes(p.category)).length;
  const inStockCount = adminState.products.filter(p => p.inStock !== false).length;

  if (totalEl) totalEl.textContent = total;
  if (nativeEl) nativeEl.textContent = nativeCount;
  if (footwearEl) footwearEl.textContent = footwearCount;
  if (stockEl) stockEl.textContent = inStockCount;
}

// Render Products Table
function renderProductsTable() {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  const filtered = adminState.products.filter(p => {
    const matchesCategory = adminState.categoryFilter === 'all' || p.category === adminState.categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(adminState.searchQuery.toLowerCase()) ||
                          p.categoryLabel.toLowerCase().includes(adminState.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          No goods matching your current search or category filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(product => {
    const imgSrc = product.localImage || product.image;
    const inStock = product.inStock !== false;
    const sizesText = Array.isArray(product.sizes) ? product.sizes.join(', ') : 'Standard';

    return `
      <tr>
        <td>
          <div class="product-cell">
            <img src="${imgSrc}" alt="${product.name}" class="product-thumb" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=100&q=80';">
            <div class="product-cell-info">
              <h4>${product.name}</h4>
              <span>Sizes: ${sizesText}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="category-tag">${product.categoryLabel}</span>
        </td>
        <td>
          <strong style="color: var(--gold-300);">${formatNaira(product.price)}</strong>
          ${product.originalPrice ? `<div style="font-size: 0.75rem; color: var(--text-muted); text-decoration: line-through;">${formatNaira(product.originalPrice)}</div>` : ''}
        </td>
        <td>
          <span class="stock-badge ${inStock ? 'in-stock' : 'out-stock'}" onclick="toggleProductStock('${product.id}', ${!inStock})">
            ${inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </td>
        <td>
          <span style="font-size: 0.78rem; color: var(--gold-400); font-weight: 700;">${product.tag || 'Standard'}</span>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-action-edit" onclick="openEditProductModal('${product.id}')">Edit</button>
            <button class="btn-action-delete" onclick="confirmDeleteProduct('${product.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Open Add Product Modal
function openAddProductModal() {
  adminState.editingProductId = null;
  const modal = document.getElementById('productFormModal');
  const title = document.getElementById('productModalTitle');
  const form = document.getElementById('productForm');

  if (title) title.textContent = 'Add New Good / Product';
  if (form) form.reset();
  document.getElementById('previewImgElement').src = 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=400&q=80';

  if (modal) modal.classList.add('active');
}

// Open Edit Product Modal
function openEditProductModal(productId) {
  const product = adminState.products.find(p => p.id === productId);
  if (!product) return;

  adminState.editingProductId = productId;
  const modal = document.getElementById('productFormModal');
  const title = document.getElementById('productModalTitle');

  if (title) title.textContent = 'Edit Good - ' + product.name;

  document.getElementById('prodNameInput').value = product.name;
  document.getElementById('prodCategoryInput').value = product.category;
  document.getElementById('prodPriceInput').value = product.price;
  document.getElementById('prodOriginalPriceInput').value = product.originalPrice || '';
  document.getElementById('prodTagInput').value = product.tag || '';
  document.getElementById('prodSizesInput').value = Array.isArray(product.sizes) ? product.sizes.join(', ') : '';
  document.getElementById('prodImageInput').value = product.image || '';
  document.getElementById('prodDescInput').value = product.description || '';
  document.getElementById('prodStockInput').checked = product.inStock !== false;

  const preview = document.getElementById('previewImgElement');
  if (preview) {
    preview.src = product.localImage || product.image || '';
  }

  if (modal) modal.classList.add('active');
}

// Save Product (Create or Update)
async function handleSaveProduct(event) {
  event.preventDefault();

  const name = document.getElementById('prodNameInput').value.trim();
  const category = document.getElementById('prodCategoryInput').value;
  const price = Number(document.getElementById('prodPriceInput').value);
  const originalPrice = document.getElementById('prodOriginalPriceInput').value ? Number(document.getElementById('prodOriginalPriceInput').value) : null;
  const tag = document.getElementById('prodTagInput').value.trim();
  const sizesRaw = document.getElementById('prodSizesInput').value.trim();
  const image = document.getElementById('prodImageInput').value.trim() || 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80';
  const description = document.getElementById('prodDescInput').value.trim();
  const inStock = document.getElementById('prodStockInput').checked;

  const sizes = sizesRaw ? sizesRaw.split(',').map(s => s.trim()).filter(Boolean) : ['M', 'L', 'XL'];

  const productData = {
    name,
    category,
    price,
    originalPrice,
    tag: tag || 'Exclusive',
    sizes,
    image,
    description,
    inStock
  };

  if (adminState.editingProductId) {
    await productStore.updateProduct(adminState.editingProductId, productData);
    showAdminToast('Good updated successfully.');
  } else {
    await productStore.addProduct(productData);
    showAdminToast('New good added to catalog and live storefront.');
  }

  closeProductModal();
  await loadAdminDashboard();
}

// Toggle Stock
async function toggleProductStock(productId, newStatus) {
  await productStore.toggleStock(productId, newStatus);
  showAdminToast(`Stock status updated to ${newStatus ? 'In Stock' : 'Out of Stock'}.`);
  await loadAdminDashboard();
}

// Confirm Delete Dialog
function confirmDeleteProduct(productId) {
  adminState.deletingProductId = productId;
  const product = adminState.products.find(p => p.id === productId);
  const nameEl = document.getElementById('deleteProductName');
  if (nameEl && product) nameEl.textContent = product.name;

  const modal = document.getElementById('deleteConfirmModal');
  if (modal) modal.classList.add('active');
}

// Execute Delete
async function executeDeleteProduct() {
  if (!adminState.deletingProductId) return;
  await productStore.deleteProduct(adminState.deletingProductId);
  showAdminToast('Good removed from catalog.');
  closeDeleteModal();
  await loadAdminDashboard();
}

// Reset Catalog to Default
async function resetDefaultCatalog() {
  if (confirm('Are you sure you want to reset the catalog to default R&G Collections products?')) {
    await productStore.resetToDefault();
    showAdminToast('Catalog reset to factory default.');
    await loadAdminDashboard();
  }
}

// Open / Close Modals
function closeProductModal() {
  const modal = document.getElementById('productFormModal');
  if (modal) modal.classList.remove('active');
  adminState.editingProductId = null;
}

function closeDeleteModal() {
  const modal = document.getElementById('deleteConfirmModal');
  if (modal) modal.classList.remove('active');
  adminState.deletingProductId = null;
}

function openFirebaseModal() {
  const config = getFirebaseConfig();
  document.getElementById('fbApiKey').value = config.apiKey || '';
  document.getElementById('fbProjectId').value = config.projectId || '';
  document.getElementById('fbAuthDomain').value = config.authDomain || '';
  document.getElementById('fbStorageBucket').value = config.storageBucket || '';
  document.getElementById('fbAppId').value = config.appId || '';

  const modal = document.getElementById('firebaseConfigModal');
  if (modal) modal.classList.add('active');
}

function closeFirebaseModal() {
  const modal = document.getElementById('firebaseConfigModal');
  if (modal) modal.classList.remove('active');
}

function handleSaveFirebaseConfig(event) {
  event.preventDefault();
  const config = {
    apiKey: document.getElementById('fbApiKey').value.trim(),
    projectId: document.getElementById('fbProjectId').value.trim(),
    authDomain: document.getElementById('fbAuthDomain').value.trim(),
    storageBucket: document.getElementById('fbStorageBucket').value.trim(),
    appId: document.getElementById('fbAppId').value.trim()
  };

  saveFirebaseConfig(config);
  showAdminToast('Firebase configuration saved. Reloading connection...');
  closeFirebaseModal();
  setTimeout(() => location.reload(), 1000);
}

// Setup Event Listeners
function setupAdminListeners() {
  // Search
  const searchInput = document.getElementById('adminSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      adminState.searchQuery = e.target.value;
      renderProductsTable();
    });
  }

  // Category
  const catSelect = document.getElementById('adminCategoryFilter');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      adminState.categoryFilter = e.target.value;
      renderProductsTable();
    });
  }

  // Image Input live preview
  const imgInput = document.getElementById('prodImageInput');
  if (imgInput) {
    imgInput.addEventListener('input', (e) => {
      const preview = document.getElementById('previewImgElement');
      if (preview && e.target.value) {
        preview.src = e.target.value;
      }
    });
  }
}

// Toast Alert (No Emojis)
function showAdminToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="var(--gold-400)" stroke-width="2.5" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

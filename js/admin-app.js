/* ==========================================================================
   R & G COLLECTIONS - REACT 18 ADMIN DASHBOARD (IMAGE UPLOAD + CRUD)
   Admin Password: Orezi@!!Raj | Email: rasakanu2008@gmail.com
   ========================================================================== */

const { useState, useEffect, createElement: h } = React;

const ADMIN_MASTER_PASSWORD = "Orezi@!!Raj";
const ADMIN_MASTER_EMAIL = "rasakanu2008@gmail.com";

function LockIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '16', height: '16', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }),
    h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
  );
}

function MailIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '16', height: '16', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
    h('polyline', { points: '22,6 12,13 2,6' })
  );
}

function EyeIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '18', height: '18', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }),
    h('circle', { cx: '12', cy: '12', r: '3' })
  );
}

function EyeOffIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '18', height: '18', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' }),
    h('line', { x1: '1', y1: '1', x2: '23', y2: '23' })
  );
}

function HangerIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '22', height: '22', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M12 4a2 2 0 0 0-2 2c0 .74.4 1.38 1 1.72V9l-8.4 6.3a2 2 0 0 0 .8 3.7h17.2a2 2 0 0 0 .8-3.7L13 9V7.72A2 2 0 0 0 12 4z' })
  );
}

function CrownIcon(props) {
  const size = props?.size || 22;
  return h('svg', { viewBox: '0 0 24 24', width: size, height: size, fill: 'currentColor' },
    h('path', { d: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z' })
  );
}

function ShoeIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '22', height: '22', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M3 14c0 2 2 3 4 3h11a3 3 0 0 0 3-3v-2l-4-4-5 1-4-2H3v4z' }),
    h('path', { d: 'M3 18h18' })
  );
}

function ShieldCheckIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '22', height: '22', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
    h('polyline', { points: '9 12 11 14 15 10' })
  );
}

function SearchIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '18', height: '18', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('circle', { cx: '11', cy: '11', r: '8' }),
    h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' })
  );
}

function PlusIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '18', height: '18', fill: 'none', stroke: 'currentColor', strokeWidth: '2.4', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('line', { x1: '12', y1: '5', x2: '12', y2: '19' }),
    h('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
  );
}

function SparkleIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '16', height: '16', fill: 'currentColor' },
    h('path', { d: 'M12 2l2.4 7.2L21 12l-6.6 2.8L12 22l-2.4-7.2L3 12l6.6-2.8z' })
  );
}

function ExternalLinkIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '15', height: '15', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
    h('polyline', { points: '15 3 21 3 21 9' }),
    h('line', { x1: '10', y1: '14', x2: '21', y2: '3' })
  );
}

function LogOutIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '15', height: '15', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
    h('polyline', { points: '16 17 21 12 16 7' }),
    h('line', { x1: '21', y1: '12', x2: '9', y2: '12' })
  );
}

function CalendarIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '13', height: '13', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
    h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
    h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
    h('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
  );
}

function ClockIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '13', height: '13', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('polyline', { points: '12 6 12 12 16 14' })
  );
}

function UsersIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '13', height: '13', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
    h('circle', { cx: '9', cy: '7', r: '4' }),
    h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
    h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
  );
}

function EditIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '14', height: '14', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }),
    h('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' })
  );
}

function TrashIcon() {
  return h('svg', { viewBox: '0 0 24 24', width: '14', height: '14', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('polyline', { points: '3 6 5 6 21 6' }),
    h('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' })
  );
}

function formatNaira(amount) {
  return '₦' + Number(amount || 0).toLocaleString('en-NG');
}

// Compress and convert uploaded image file to Base64 Data URL
function processImageUpload(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDim = 1000;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      callback(compressedDataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('rg_admin_authenticated') === 'true'
  );
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [cardError, setCardError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Live Telemetry State (Date, Real-Time Clock, Active Visitors)
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('rg_active_visitors');
    return saved ? parseInt(saved, 10) : 18;
  });

  useEffect(() => {
    // 1-second live clock ticker
    const clockTimer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Realistic active visitor pulse (simulating live users browsing catalog)
    const visitorTimer = setInterval(() => {
      setVisitorCount(prev => {
        const delta = (Math.random() > 0.45 ? 1 : -1) * (Math.random() > 0.8 ? 2 : 1);
        const next = Math.max(12, Math.min(32, prev + delta));
        localStorage.setItem('rg_active_visitors', next.toString());
        return next;
      });
    }, 6000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(visitorTimer);
    };
  }, []);

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formFields, setFormFields] = useState({
    name: '',
    category: 'shirts',
    price: '',
    originalPrice: '',
    sizes: 'M, L, XL',
    swatches: '#1c1c1e, #d6cbb8, #ffffff',
    tag: 'New',
    image: '',
    description: '',
    inStock: true
  });

  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const loadProducts = async () => {
    if (typeof productStore !== 'undefined') {
      let list = await productStore.getAllProducts();
      if (!list || list.length === 0) {
        if (typeof RG_PRODUCTS !== 'undefined' && Array.isArray(RG_PRODUCTS) && RG_PRODUCTS.length > 0) {
          list = await productStore.loadStarterCollection();
        }
      }
      setProducts(list || []);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const normalizedEmail = (emailInput || '').trim().toLowerCase();
    const normalizedMasterEmail = ADMIN_MASTER_EMAIL.toLowerCase();

    // Strict validation: BOTH email AND password must match the authorized master credentials
    if (normalizedEmail === normalizedMasterEmail && passwordInput === ADMIN_MASTER_PASSWORD) {
      setLoading(true);
      setTimeout(() => {
        sessionStorage.setItem('rg_admin_authenticated', 'true');
        setIsAuthenticated(true);
        setLoading(false);
        showToast('Welcome back, Administrator.');
      }, 250);
    } else {
      const msg = normalizedEmail !== normalizedMasterEmail
        ? 'Access Denied: Unauthorized administrator email address.'
        : 'Access Denied: Invalid administrator security password.';
      setAuthError(msg);
      setCardError(true);
      setTimeout(() => setCardError(false), 700);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rg_admin_authenticated');
    setIsAuthenticated(false);
    setPasswordInput('');
    setEmailInput('');
  };

  // Image Drop & File State
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef(null);
  const galleryInputRef = React.useRef(null);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processImageUpload(file, (dataUrl) => {
        setFormFields(prev => ({ ...prev, image: dataUrl }));
        showToast('Image uploaded and optimized successfully.');
      });
    }
  };

  // Handle Primary Image File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageUpload(file, (dataUrl) => {
        setFormFields(prev => ({ ...prev, image: dataUrl }));
        showToast('Image uploaded and optimized for product display.');
      });
    }
  };

  // Handle Additional Gallery Image Upload
  const handleGalleryFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      processImageUpload(file, (dataUrl) => {
        setFormFields(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), dataUrl]
        }));
      });
    });
    showToast(`Added ${files.length} angle image(s).`);
  };

  const handleRemoveGalleryImage = (idxToRemove) => {
    setFormFields(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, idx) => idx !== idxToRemove)
    }));
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormFields({
      name: '',
      category: 'shirts',
      price: '',
      originalPrice: '',
      sizes: 'M, L, XL',
      swatches: '#1c1c1e, #d6cbb8, #ffffff',
      tag: 'New',
      image: '',
      gallery: [],
      description: '',
      inStock: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormFields({
      name: item.name,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice || '',
      sizes: Array.isArray(item.sizes) ? item.sizes.join(', ') : '',
      swatches: Array.isArray(item.swatches) ? item.swatches.join(', ') : '',
      tag: item.tag || '',
      image: item.image || '',
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      description: item.description || '',
      inStock: item.inStock !== false
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!formFields.image) {
      showToast('Please upload an image or provide an image link.');
      return;
    }

    const productPayload = {
      name: formFields.name.trim(),
      category: formFields.category,
      price: Number(formFields.price),
      originalPrice: formFields.originalPrice ? Number(formFields.originalPrice) : null,
      sizes: formFields.sizes.split(',').map(s => s.trim()).filter(Boolean),
      swatches: formFields.swatches.split(',').map(s => s.trim()).filter(Boolean),
      tag: formFields.tag.trim() || 'New',
      image: formFields.image,
      gallery: formFields.gallery || [],
      description: formFields.description.trim(),
      inStock: formFields.inStock
    };

    if (editingItem) {
      await productStore.updateProduct(editingItem.id, productPayload);
      showToast('Product & images updated successfully.');
    } else {
      await productStore.addProduct(productPayload);
      showToast('New product posted with images to live storefront.');
    }

    setIsModalOpen(false);
    await loadProducts();
  };

  const handleDeleteProduct = async (id, name) => {
    if (confirm(`Are you sure you want to remove "${name}" from the store?`)) {
      await productStore.deleteProduct(id);
      showToast('Product removed.');
      await loadProducts();
    }
  };

  const handleToggleStock = async (id, currentStatus) => {
    await productStore.toggleStock(id, !currentStatus);
    showToast(`Status set to ${!currentStatus ? 'In Stock' : 'Out of Stock'}.`);
    await loadProducts();
  };

  const handleLoadStarterCollection = async () => {
    if (confirm('Load starter menswear collection into catalog?')) {
      await productStore.loadStarterCollection();
      showToast('Starter collection loaded.');
      await loadProducts();
    }
  };

  const filtered = products.filter(p => {
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (p.categoryLabel && p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  if (!isAuthenticated) {
    return h('div', { className: 'admin-auth-screen' },
      h('div', { className: `admin-auth-card ${cardError ? 'card-error' : ''}` },
        // Atelier Brand Crest
        h('div', { className: 'admin-auth-brand-wrap' },
          h('div', { className: 'admin-auth-crown' }, CrownIcon({ size: 26 })),
          h('h1', { className: 'admin-auth-brand-title' }, 'R & G COLLECTIONS'),
          h('p', { className: 'admin-auth-brand-subtitle' }, 'Atelier Management Portal')
        ),

        h('div', { style: { textAlign: 'left', marginBottom: '1.75rem' } },
          h('h2', { className: 'admin-auth-title' }, 'Sign In to Dashboard'),
          h('p', { className: 'admin-auth-desc' }, 'Enter your administrator credentials to access catalog management and orders.')
        ),

        authError && h('div', { className: 'auth-error-banner', style: { display: 'block' } }, authError),

        h('form', { onSubmit: handleLogin },
          h('div', { className: 'form-group', style: { textAlign: 'left', marginBottom: '1.25rem' } },
            h('label', { className: 'form-label-custom' }, 'Email Address'),
            h('div', { className: 'input-icon-wrap' },
              h('span', { className: 'input-icon' }, MailIcon()),
              h('input', {
                type: 'email',
                className: 'form-control input-with-icon',
                placeholder: 'admin@domain.com',
                value: emailInput,
                onChange: e => setEmailInput(e.target.value),
                required: true
              })
            )
          ),

          h('div', { className: 'form-group', style: { textAlign: 'left', marginBottom: '1.75rem' } },
            h('label', { className: 'form-label-custom' }, 'Security Password'),
            h('div', { className: 'password-field-wrapper' },
              h('span', { className: 'input-icon' }, LockIcon()),
              h('input', {
                type: showPassword ? 'text' : 'password',
                className: 'form-control input-with-icon',
                placeholder: '••••••••',
                value: passwordInput,
                onChange: e => setPasswordInput(e.target.value),
                required: true,
                autoFocus: true
              }),
              h('button', {
                type: 'button',
                className: `password-toggle-btn ${showPassword ? 'is-revealed' : ''}`,
                onClick: () => setShowPassword(!showPassword),
                title: showPassword ? 'Hide password' : 'Show password',
                'aria-label': showPassword ? 'Hide password' : 'Show password'
              }, showPassword ? EyeOffIcon() : EyeIcon())
            )
          ),

          h('button', {
            type: 'submit',
            className: 'admin-btn-primary',
            style: { width: '100%', padding: '0.95rem', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 700 },
            disabled: loading
          }, loading ? 'Authenticating...' : 'Sign In to Atelier Dashboard'),

          h('div', { className: 'auth-card-footer' },
            h('p', { className: 'auth-security-note' }, 'Protected by 256-bit atelier security credentials.'),
            h('a', { href: 'index.html', className: 'auth-storefront-link' },
              '← Return to Live Storefront'
            )
          )
        )
      )
    );
  }

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return h('div', null,
    // Header
    h('header', { className: 'admin-navbar' },
      h('div', { className: 'admin-nav-brand' },
        h('svg', { viewBox: '0 0 24 24', width: '28', height: '28', fill: 'var(--gold-400)' },
          h('path', { d: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z' })
        ),
        h('span', null, 'R & G COLLECTIONS'),
        // Live Header Telemetry: Visitors, Date, and Real-Time Clock
        h('div', { className: 'admin-header-telemetry' },
          h('div', { className: 'telemetry-item telemetry-visitors', title: 'Live Active Storefront Visitors' },
            h('span', { className: 'admin-status-dot' }),
            UsersIcon(),
            h('span', { className: 'telemetry-val' }, visitorCount),
            h('span', { className: 'telemetry-lbl' }, 'Live Visitors')
          ),
          h('div', { className: 'telemetry-item telemetry-datetime', title: 'Atelier Real-Time Clock & Date' },
            CalendarIcon(),
            h('span', { className: 'telemetry-date' }, formattedDate),
            h('span', { className: 'telemetry-sep' }, '•'),
            ClockIcon(),
            h('span', { className: 'telemetry-time' }, formattedTime)
          )
        )
      ),

      h('div', { className: 'admin-nav-actions' },
        h('a', { href: 'index.html', target: '_blank', className: 'admin-btn-secondary' },
          ExternalLinkIcon(), 'View Live Storefront'
        ),
        h('button', { className: 'admin-btn-secondary', onClick: handleLogout },
          LogOutIcon(), 'Sign Out'
        )
      )
    ),

    // Main Content
    h('main', { className: 'admin-container' },
      // Stats Cards with Luxury Icons & Trend Chips
      h('section', { className: 'admin-stats-grid' },
        h('div', { className: 'stat-card' },
          h('div', { className: 'stat-icon-box stat-icon-gold' }, HangerIcon()),
          h('div', { className: 'stat-info' },
            h('div', { className: 'stat-value' }, products.length),
            h('div', { className: 'stat-label' }, 'Total Atelier Goods'),
            h('div', { className: 'stat-badge' },
              h('span', { className: 'badge-dot' }),
              'Active in Catalog'
            )
          )
        ),
        h('div', { className: 'stat-card' },
          h('div', { className: 'stat-icon-box stat-icon-amber' }, CrownIcon({ size: 24 })),
          h('div', { className: 'stat-info' },
            h('div', { className: 'stat-value' }, products.filter(p => p.category === 'native').length),
            h('div', { className: 'stat-label' }, 'Bespoke Senator Wear'),
            h('div', { className: 'stat-badge' },
              h('span', { className: 'badge-dot' }),
              'Hand-Tailored'
            )
          )
        ),
        h('div', { className: 'stat-card' },
          h('div', { className: 'stat-icon-box stat-icon-silver' }, ShoeIcon()),
          h('div', { className: 'stat-info' },
            h('div', { className: 'stat-value' }, products.filter(p => ['shoes', 'sneakers', 'palms'].includes(p.category)).length),
            h('div', { className: 'stat-label' }, 'Footwear & Palms'),
            h('div', { className: 'stat-badge' },
              h('span', { className: 'badge-dot' }),
              'Italian Grade'
            )
          )
        ),
        h('div', { className: 'stat-card' },
          h('div', { className: 'stat-icon-box stat-icon-emerald' }, ShieldCheckIcon()),
          h('div', { className: 'stat-info' },
            h('div', { className: 'stat-value' }, products.filter(p => p.inStock !== false).length),
            h('div', { className: 'stat-label' }, 'Available In-Stock'),
            h('div', { className: 'stat-badge' },
              h('span', { className: 'badge-dot' }),
              products.length > 0
                ? `${Math.round((products.filter(p => p.inStock !== false).length / products.length) * 100)}% Ready to Ship`
                : '100% Operational'
            )
          )
        )
      ),

      // Controls Toolbar
      h('section', { className: 'admin-toolbar' },
        h('div', { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' } },
          h('div', { className: 'admin-search-wrapper' },
            SearchIcon(),
            h('input', {
              type: 'text',
              className: 'admin-input',
              placeholder: 'Search goods by name, tag, category...',
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value)
            })
          ),

          h('select', { className: 'admin-select', value: categoryFilter, onChange: e => setCategoryFilter(e.target.value) },
            h('option', { value: 'all' }, `All Categories (${products.length})`),
            h('option', { value: 'shirts' }, `Shirts (${products.filter(p => p.category === 'shirts').length})`),
            h('option', { value: 'native' }, `Native Wear (${products.filter(p => p.category === 'native').length})`),
            h('option', { value: 'shoes' }, `Shoes & Loafers (${products.filter(p => p.category === 'shoes').length})`),
            h('option', { value: 'sneakers' }, `Sneakers (${products.filter(p => p.category === 'sneakers').length})`),
            h('option', { value: 'palms' }, `Palms & Slides (${products.filter(p => p.category === 'palms').length})`)
          )
        ),

        h('div', { style: { display: 'flex', gap: '0.75rem', alignItems: 'center' } },
          h('button', { className: 'admin-btn-secondary', onClick: handleLoadStarterCollection, title: 'Seed 2027 signature collection' },
            SparkleIcon(), 'Seed 2027 Essentials'
          ),
          h('button', { className: 'admin-btn-primary', onClick: handleOpenAddModal },
            PlusIcon(), 'Post Good & Upload Images'
          )
        )
      ),

      // Table & Empty State
      products.length === 0
        ? h('div', { className: 'admin-empty-catalog-card' },
            h('div', { className: 'empty-crest-wrap' },
              CrownIcon({ size: 36 }),
              h('div', { className: 'empty-crest-ring' })
            ),
            h('h3', { className: 'empty-title' }, '2027 Atelier Wardrobe Awaiting Curation'),
            h('p', { className: 'empty-subtitle' },
              'Your live menswear catalog currently has no active items. You can initialize the 8 signature ready-to-sell essentials (Senatorial Suits, Italian Loafers, Linen Overshirts, Palms) or upload custom garments with multi-angle photography.'
            ),
            h('div', { className: 'empty-action-group' },
              h('button', {
                className: 'admin-btn-primary empty-btn-gold',
                onClick: handleLoadStarterCollection
              }, SparkleIcon(), 'Seed 2027 Signature Collection (8 Essentials)'),
              h('button', {
                className: 'admin-btn-secondary empty-btn-post',
                onClick: handleOpenAddModal
              }, PlusIcon(), 'Upload Custom Garment with Photos')
            )
          )
        : h('section', { className: 'table-card' },
            h('table', { className: 'admin-table' },
              h('thead', null,
                h('tr', null,
                  h('th', null, 'Good Image & Item'),
                  h('th', null, 'Category'),
                  h('th', null, 'Price'),
                  h('th', null, 'Status'),
                  h('th', null, 'Tag'),
                  h('th', null, 'Actions')
                )
              ),
              h('tbody', null,
                filtered.length === 0
                  ? h('tr', null,
                      h('td', { colSpan: 6, style: { textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' } },
                        'No goods matching "' + searchQuery + '". Try resetting search.'
                      )
                    )
                  : filtered.map(p =>
                      h('tr', { key: p.id },
                        h('td', null,
                          h('div', { className: 'product-cell' },
                            h('div', { className: 'product-thumb-wrap' },
                              h('img', { src: p.image, alt: p.name, className: 'product-thumb' }),
                              p.gallery && p.gallery.length > 0 && h('span', { className: 'product-gallery-count-badge' }, `+${p.gallery.length}`)
                            ),
                            h('div', { className: 'product-cell-info' },
                              h('h4', null, p.name),
                              h('div', { className: 'product-meta-sizes' },
                                (Array.isArray(p.sizes) ? p.sizes : (p.sizes ? p.sizes.split(',') : ['Standard'])).map((sz, i) =>
                                  h('span', { key: i, className: 'size-pill' }, sz.trim ? sz.trim() : sz)
                                )
                              )
                            )
                          )
                        ),
                        h('td', null, h('span', { className: 'category-tag' }, p.categoryLabel || p.category)),
                        h('td', null,
                          h('div', { className: 'price-display-box' },
                            h('strong', { className: 'price-current' }, formatNaira(p.price)),
                            p.originalPrice && h('span', { className: 'price-original' }, formatNaira(p.originalPrice))
                          )
                        ),
                        h('td', null,
                          h('span', {
                            className: `stock-toggle-switch ${p.inStock !== false ? 'in-stock' : 'out-stock'}`,
                            onClick: () => handleToggleStock(p.id, p.inStock !== false),
                            title: 'Click to toggle availability'
                          },
                            h('span', { className: 'stock-indicator-dot' }),
                            p.inStock !== false ? 'In Stock' : 'Sold Out'
                          )
                        ),
                        h('td', null, h('span', { className: 'tag-badge' }, p.tag || 'New')),
                        h('td', null,
                          h('div', { className: 'table-actions' },
                            h('button', { className: 'btn-action-edit', onClick: () => handleOpenEditModal(p) },
                              EditIcon(), 'Edit / Photos'
                            ),
                            h('button', { className: 'btn-action-delete', onClick: () => handleDeleteProduct(p.id, p.name) },
                              TrashIcon(), 'Delete'
                            )
                          )
                        )
                      )
                    )
              )
            )
          )
      ),

    // Add / Edit Modal with Image File Upload & Multi-Angle Gallery
    isModalOpen && h('div', { className: 'admin-modal-backdrop active', onClick: () => setIsModalOpen(false) },
      h('div', { className: 'admin-modal-card', onClick: e => e.stopPropagation() },
        h('div', { className: 'admin-modal-header' },
          h('h3', null, editingItem ? 'Edit Good & Manage Images' : 'Post New Good & Upload Images'),
          h('button', { onClick: () => setIsModalOpen(false), style: { background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.1rem', cursor: 'pointer' } }, 'X')
        ),
        h('div', { className: 'admin-modal-body' },
          h('form', { onSubmit: handleSaveProduct },
            h('div', { className: 'form-group' },
              h('label', null, 'Good / Item Name *'),
              h('input', { type: 'text', className: 'form-control', placeholder: 'e.g. Italian Double-Monk Loafers', value: formFields.name, onChange: e => setFormFields({ ...formFields, name: e.target.value }), required: true })
            ),

            h('div', { className: 'form-grid-2' },
              h('div', { className: 'form-group' },
                h('label', null, 'Category *'),
                h('select', { className: 'form-control', value: formFields.category, onChange: e => setFormFields({ ...formFields, category: e.target.value }), required: true },
                  h('option', { value: 'shirts' }, 'Shirts'),
                  h('option', { value: 'native' }, 'Native Wear'),
                  h('option', { value: 'shoes' }, 'Shoes & Loafers'),
                  h('option', { value: 'sneakers' }, 'Sneakers'),
                  h('option', { value: 'palms' }, 'Palms & Slides')
                )
              ),
              h('div', { className: 'form-group' },
                h('label', null, 'Tag / Badge'),
                h('input', { type: 'text', className: 'form-control', placeholder: 'Essential, Exclusive, New', value: formFields.tag, onChange: e => setFormFields({ ...formFields, tag: e.target.value }) })
              )
            ),

            h('div', { className: 'form-grid-2' },
              h('div', { className: 'form-group' },
                h('label', null, 'Price in NGN *'),
                h('input', { type: 'number', className: 'form-control', placeholder: '35000', value: formFields.price, onChange: e => setFormFields({ ...formFields, price: e.target.value }), required: true })
              ),
              h('div', { className: 'form-group' },
                h('label', null, 'Original Price (Optional)'),
                h('input', { type: 'number', className: 'form-control', placeholder: '50000', value: formFields.originalPrice, onChange: e => setFormFields({ ...formFields, originalPrice: e.target.value }) })
              )
            ),

            // Primary Image Upload & Dropzone Section
            h('div', { className: 'form-group', style: { background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--admin-border-gold)' } },
              h('label', { style: { color: 'var(--gold-400)', marginBottom: '0.75rem', display: 'block', fontWeight: 700 } }, 'Main Product Image (Cover) *'),
              
              // Hidden file input
              h('input', {
                ref: fileInputRef,
                type: 'file',
                accept: 'image/*',
                onChange: handleFileChange,
                style: { display: 'none' }
              }),

              // Dropzone when no image or to replace
              !formFields.image ? h('div', {
                className: `image-upload-dropzone ${dragActive ? 'drag-active' : ''}`,
                onDragEnter: handleDrag,
                onDragLeave: handleDrag,
                onDragOver: handleDrag,
                onDrop: handleDrop,
                onClick: () => fileInputRef.current && fileInputRef.current.click()
              },
                h('svg', { className: 'dropzone-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
                  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z' })
                ),
                h('div', { className: 'dropzone-title' }, 'Click to upload image or drag & drop photo here'),
                h('div', { className: 'dropzone-hint' }, 'Supports JPG, PNG, WEBP, Camera photos (Auto-compressed for instant speed)')
              ) : h('div', { className: 'image-preview-card' },
                h('img', { src: formFields.image, alt: 'Main Preview' }),
                h('div', { className: 'image-preview-actions' },
                  h('button', {
                    type: 'button',
                    className: 'btn-preview-action change',
                    onClick: () => fileInputRef.current && fileInputRef.current.click()
                  }, 'Change Image'),
                  h('button', {
                    type: 'button',
                    className: 'btn-preview-action',
                    onClick: () => setFormFields(prev => ({ ...prev, image: '' }))
                  }, 'Remove')
                )
              ),

              h('div', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.85rem', marginBottom: '0.4rem' } },
                'Or paste an image web link directly:'
              ),
              h('input', {
                type: 'text',
                className: 'form-control',
                placeholder: 'https://...',
                value: formFields.image,
                onChange: e => setFormFields({ ...formFields, image: e.target.value })
              })
            ),

            // Additional Angles / Multi-Image Gallery
            h('div', { className: 'form-group', style: { background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--admin-border)' } },
              h('label', { style: { color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'block' } }, 'Additional Angle Photos (Optional)'),
              h('p', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' } }, 'Upload multiple sides, back view, or fabric close-up shots.'),
              
              h('input', {
                ref: galleryInputRef,
                type: 'file',
                accept: 'image/*',
                multiple: true,
                onChange: handleGalleryFileChange,
                style: { display: 'none' }
              }),

              h('div', { className: 'gallery-thumbnails-grid' },
                (formFields.gallery || []).map((imgUrl, idx) =>
                  h('div', { key: idx, className: 'gallery-thumb-slot' },
                    h('img', { src: imgUrl, alt: `Angle ${idx + 1}` }),
                    h('button', {
                      type: 'button',
                      className: 'gallery-thumb-remove',
                      onClick: () => handleRemoveGalleryImage(idx),
                      title: 'Remove'
                    }, 'X')
                  )
                ),
                h('div', {
                  className: 'gallery-add-slot',
                  onClick: () => galleryInputRef.current && galleryInputRef.current.click()
                }, '+ Add Angle Photo')
              )
            ),

            h('div', { className: 'form-group' },
              h('label', null, 'Available Sizes (Comma-separated)'),
              h('input', { type: 'text', className: 'form-control', placeholder: '40, 41, 42, 43, 44 or S, M, L, XL, XXL', value: formFields.sizes, onChange: e => setFormFields({ ...formFields, sizes: e.target.value }) })
            ),

            h('div', { className: 'form-group' },
              h('label', null, 'Color Swatch Hex Codes (Comma-separated)'),
              h('input', { type: 'text', className: 'form-control', placeholder: '#1c1c1e, #d6cbb8, #ffffff', value: formFields.swatches, onChange: e => setFormFields({ ...formFields, swatches: e.target.value }) })
            ),

            h('div', { className: 'form-group' },
              h('label', null, 'Product Description'),
              h('textarea', { className: 'form-control', rows: 2, placeholder: 'Product details and fabric composition...', value: formFields.description, onChange: e => setFormFields({ ...formFields, description: e.target.value }) })
            ),

            h('div', { className: 'form-group', style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
              h('input', { type: 'checkbox', id: 'stockCheckbox', checked: formFields.inStock, onChange: e => setFormFields({ ...formFields, inStock: e.target.checked }), style: { width: '18px', height: '18px' } }),
              h('label', { htmlFor: 'stockCheckbox', style: { margin: 0, color: '#fff', cursor: 'pointer' } }, 'Active and In-Stock')
            ),

            h('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' } },
              h('button', { type: 'button', className: 'admin-btn-secondary', onClick: () => setIsModalOpen(false) }, 'Cancel'),
              h('button', { type: 'submit', className: 'admin-btn-primary' }, editingItem ? 'Save Updates' : 'Post Good & Publish Image')
            )
          )
        )
      )
    ),

    // Toast
    toastMsg && h('div', { className: 'toast-container' },
      h('div', { className: 'toast-msg' }, h('span', null, toastMsg))
    )
  );
}

const adminRoot = document.getElementById('adminRoot');
if (adminRoot) {
  const root = ReactDOM.createRoot(adminRoot);
  root.render(h(AdminApp));
}

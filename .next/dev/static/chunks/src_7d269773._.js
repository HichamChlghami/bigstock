(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/context/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CartProvider = ({ children })=>{
    _s();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [wishlist, setWishlist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load from local storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            const savedCart = localStorage.getItem('cart');
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedCart) setCart(JSON.parse(savedCart));
            if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        }
    }["CartProvider.useEffect"], []);
    // Save to local storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }["CartProvider.useEffect"], [
        cart,
        wishlist
    ]);
    const addToCart = (product, quantity = 1, size, color, preventDrawer = false)=>{
        setCart((prev)=>{
            const existing = prev.find((item)=>item.id === product.id && item.selectedSize === size && item.selectedColor === color);
            if (existing) {
                return prev.map((item)=>item.id === product.id && item.selectedSize === size && item.selectedColor === color ? {
                        ...item,
                        quantity: item.quantity + quantity
                    } : item);
            }
            return [
                ...prev,
                {
                    ...product,
                    quantity,
                    selectedSize: size,
                    selectedColor: color
                }
            ];
        });
        if (!preventDrawer) {
            setIsCartOpen(true);
        }
    };
    const removeFromCart = (id)=>{
        setCart((prev)=>prev.filter((item)=>item.id !== id));
    };
    const updateQuantity = (id, quantity)=>{
        if (quantity < 1) return;
        setCart((prev)=>prev.map((item)=>item.id === id ? {
                    ...item,
                    quantity
                } : item));
    };
    const clearCart = ()=>setCart([]);
    const toggleWishlist = (id)=>{
        setWishlist((prev)=>prev.includes(id) ? prev.filter((pid)=>pid !== id) : [
                ...prev,
                id
            ]);
    };
    const cartTotal = cart.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            setIsCartOpen,
            wishlist,
            toggleWishlist
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CartContext.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartProvider, "SEd8pyEQ/arCLe8CtDdt7zgqk2M=");
_c = CartProvider;
const useCart = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/lib/supabase.ts")}`;
    }
};
;
const supabaseUrl = __TURBOPACK__import$2e$meta__.env.VITE_SUPABASE_URL;
const supabaseAnonKey = __TURBOPACK__import$2e$meta__.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Please check your .env file or Vercel project settings.');
}
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/slugify.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Basic slugify for simple cases
__turbopack_context__.s([
    "generateUniqueSlug",
    ()=>generateUniqueSlug,
    "slugify",
    ()=>slugify
]);
const slugify = (text)=>{
    if (!text) return '';
    return text.toString().toLowerCase().trim().replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};
const generateUniqueSlug = (title, existingSlugs)=>{
    if (!title) return '';
    // Normalize: lowercase, remove special chars, split by space
    const cleanTitle = title.toLowerCase().replace(/[^\w\s-]/g, '').trim();
    const words = cleanTitle.split(/\s+/).filter((w)=>w.length > 0);
    if (words.length === 0) return `product-${Date.now()}`;
    // Rule 1: Take first 3 words (or fewer if title is short)
    const limit = Math.min(words.length, 3);
    let candidate = words.slice(0, limit).join('-');
    // Check uniqueness
    if (!existingSlugs.includes(candidate)) {
        return candidate;
    }
    // Rule 2: If exists, try taking 4 words (if available)
    if (words.length >= 4) {
        const candidate4 = words.slice(0, 4).join('-');
        if (!existingSlugs.includes(candidate4)) {
            return candidate4;
        }
        // If 4 words also exist, we will use the 4-word version as base for numbering
        candidate = candidate4;
    }
    // Rule 3: Append number (1, 2, 3...) until unique
    let counter = 1;
    while(true){
        const numberedCandidate = `${candidate}-${counter}`;
        if (!existingSlugs.includes(numberedCandidate)) {
            return numberedCandidate;
        }
        counter++;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/DataContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataProvider",
    ()=>DataProvider,
    "useData",
    ()=>useData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$slugify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/slugify.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
// Initial Products for seeding (FRENCH)
const initialProducts = [
    {
        id: '1',
        name: 'Richelieu Oxford Cuir',
        price: 189.00,
        originalPrice: 240.00,
        categories: [
            'Chaussures',
            'Hommes'
        ],
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Fabriqué à la main en cuir italien de première qualité.',
        description: 'Ces chaussures Richelieu définissent la sophistication. Parfaites pour les occasions formelles.',
        sizes: [
            '40',
            '41',
            '42',
            '43',
            '44'
        ],
        colors: [
            'Marron',
            'Noir'
        ],
        isNew: true,
        rating: 4.8,
        reviews: 124,
        stockQuantity: 50,
        inStock: true,
        tags: [
            'hommes',
            'formel'
        ],
        isFeatured: true
    },
    {
        id: '2',
        name: 'Mocassin Daim Minimaliste',
        price: 145.00,
        categories: [
            'Chaussures',
            'Hommes'
        ],
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Le style sans effort rencontre le confort.',
        description: 'Ces mocassins en daim disposent d\'une semelle intérieure rembourrée pour un confort optimal.',
        sizes: [
            '39',
            '40',
            '41',
            '42'
        ],
        colors: [
            'Beige',
            'Bleu Marine'
        ],
        rating: 4.5,
        reviews: 89,
        stockQuantity: 30,
        inStock: true,
        tags: [
            'hommes',
            'décontracté'
        ]
    },
    {
        id: '3',
        name: 'Manteau en Laine Minuit',
        price: 350.00,
        originalPrice: 450.00,
        categories: [
            'Vestes',
            'Femmes'
        ],
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Une silhouette intemporelle taillée dans un mélange de laine luxueux.',
        description: 'Restez au chaud avec style grâce à ce manteau en laine de haute qualité.',
        sizes: [
            'S',
            'M',
            'L',
            'XL'
        ],
        colors: [
            'Gris Anthracite',
            'Noir'
        ],
        isNew: true,
        rating: 4.9,
        reviews: 56,
        stockQuantity: 20,
        inStock: true,
        tags: [
            'femmes',
            'hiver'
        ],
        isFeatured: true
    },
    {
        id: '4',
        name: 'Blouson Motard Cuir Vintage',
        price: 299.00,
        categories: [
            'Vestes',
            'Hommes'
        ],
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Robuste mais raffiné. Ce blouson développe une patine unique.',
        description: 'Cuir véritable qui s\'améliore avec l\'âge. Un classique pour toute garde-robe.',
        sizes: [
            'M',
            'L',
            'XL'
        ],
        colors: [
            'Marron'
        ],
        rating: 4.7,
        reviews: 210,
        stockQuantity: 15,
        inStock: true,
        tags: [
            'hommes',
            'décontracté'
        ]
    },
    {
        id: '5',
        name: 'Papier Peint Damassé Victorien',
        price: 85.00,
        categories: [
            'Papier Peint'
        ],
        image: 'https://images.unsplash.com/photo-1615800098779-1be4350c5957?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1615800098779-1be4350c5957?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Ajoutez une touche d\'élégance royale à votre intérieur.',
        description: 'Papier peint texturé avec motifs damassés classiques.',
        colors: [
            'Or/Noir',
            'Argent/Blanc'
        ],
        rating: 4.6,
        reviews: 34,
        stockQuantity: 100,
        inStock: true,
        tags: [
            'maison',
            'décoration'
        ]
    },
    {
        id: '7',
        name: 'Costume Classique Homme',
        price: 450.00,
        originalPrice: 599.00,
        categories: [
            'Hommes',
            'Chaussures'
        ],
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa2e7?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1593030761757-71fae45fa2e7?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Costume ajusté pour le gentleman moderne.',
        description: 'Coupe parfaite et tissu respirant pour un confort toute la journée.',
        sizes: [
            '48',
            '50',
            '52',
            '54'
        ],
        colors: [
            'Bleu Marine',
            'Noir',
            'Gris'
        ],
        rating: 4.9,
        reviews: 45,
        stockQuantity: 25,
        inStock: true,
        isFeatured: true,
        tags: [
            'hommes',
            'formel'
        ]
    },
    {
        id: '9',
        name: 'Robe de Soirée Élégante',
        price: 280.00,
        categories: [
            'Femmes'
        ],
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Robe longue éblouissante pour les occasions spéciales.',
        description: 'Faites tourner les têtes avec cette robe de soirée sophistiquée.',
        sizes: [
            'XS',
            'S',
            'M',
            'L'
        ],
        colors: [
            'Rouge',
            'Noir',
            'Émeraude'
        ],
        rating: 4.8,
        reviews: 67,
        stockQuantity: 15,
        inStock: true,
        isFeatured: true,
        tags: [
            'femmes',
            'formel'
        ]
    },
    {
        id: '11',
        name: 'Veste en Jean Enfant',
        price: 45.00,
        categories: [
            'Enfants',
            'Vestes'
        ],
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop'
        ],
        shortDescription: 'Veste en jean durable et élégante pour les enfants.',
        description: 'Parfaite pour l\'école ou les jeux. Résistante et confortable.',
        sizes: [
            '4A',
            '6A',
            '8A',
            '10A'
        ],
        colors: [
            'Bleu'
        ],
        rating: 4.7,
        reviews: 88,
        stockQuantity: 40,
        inStock: true,
        tags: [
            'enfants',
            'décontracté'
        ]
    }
];
const DataContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const DataProvider = ({ children })=>{
    _s();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const refreshData = async ()=>{
        setIsLoading(true);
        try {
            // Fetch Products
            // Note: We keep created_at for products if it exists, or it might need change too if products fail.
            // But user specifically asked for orders fix.
            const { data: prodData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').order('created_at', {
                ascending: false
            });
            if (prodData) {
                const mappedProducts = prodData.map((p)=>({
                        id: p.id,
                        name: p.name,
                        slug: p.slug || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$slugify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slugify"])(p.name),
                        price: Number(p.price),
                        originalPrice: p.original_price ? Number(p.original_price) : undefined,
                        categories: p.categories || [
                            p.category
                        ].filter(Boolean) || [],
                        image: p.image,
                        images: p.images || [],
                        shortDescription: p.short_description,
                        description: p.description,
                        sizes: p.sizes,
                        colors: p.colors,
                        inStock: p.in_stock,
                        isFeatured: p.is_featured,
                        isBestSeller: p.is_best_seller,
                        isNew: p.is_new,
                        rating: Number(p.rating),
                        reviews: Number(p.reviews),
                        stockQuantity: Number(p.stock_quantity),
                        tags: p.tags
                    }));
                setProducts(mappedProducts);
            }
            // Fetch Orders
            // CHANGED: Sorting by 'date' instead of 'created_at' because 'created_at' might be missing in schema
            const { data: orderData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').select('*').order('date', {
                ascending: false
            });
            if (orderData) {
                const mappedOrders = orderData.map((o)=>{
                    // Robustly construct customer object from both JSON column and flat columns
                    const customerData = {
                        name: o.customer?.name || o.customer_name || 'Client Inconnu',
                        phone: o.customer?.phone || o.customer_phone || '',
                        address: o.customer?.address || o.customer_address || '',
                        city: o.customer?.city || o.customer_city || '',
                        notes: o.customer?.notes || ''
                    };
                    return {
                        id: o.id,
                        items: o.items || [],
                        total: Number(o.total),
                        customer: customerData,
                        date: o.date || o.created_at,
                        status: o.status
                    };
                });
                setOrders(mappedOrders);
            }
            // Fetch Categories
            const { data: catData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').select('*');
            if (catData && catData.length > 0) {
                setCategories(catData);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataProvider.useEffect": ()=>{
            refreshData();
        }
    }["DataProvider.useEffect"], []);
    const addProduct = async (product)=>{
        const existingSlugs = products.map((p)=>p.slug || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$slugify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slugify"])(p.name));
        let slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$slugify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUniqueSlug"])(product.name, existingSlugs);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = product;
        const dbProduct = {
            name: product.name,
            slug: slug,
            price: product.price,
            original_price: product.originalPrice,
            categories: product.categories,
            category: product.categories[0] || '',
            image: product.image,
            images: product.images,
            short_description: product.shortDescription,
            description: product.description,
            sizes: product.sizes,
            colors: product.colors,
            in_stock: product.inStock,
            is_featured: product.isFeatured,
            is_best_seller: product.isBestSeller,
            stock_quantity: product.stockQuantity,
            rating: product.rating,
            reviews: product.reviews
        };
        let { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').insert([
            dbProduct
        ]);
        if (error && error.code === '23505' && error.message?.includes('slug')) {
            const newSlug = `${slug}-${Math.floor(Math.random() * 10000)}`;
            dbProduct.slug = newSlug;
            const retryResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').insert([
                dbProduct
            ]);
            error = retryResult.error;
        }
        if (!error) {
            refreshData();
        } else {
            console.error("Error adding product:", error);
            throw error;
        }
    };
    const updateProduct = async (product)=>{
        const dbProduct = {
            name: product.name,
            price: product.price,
            original_price: product.originalPrice,
            categories: product.categories,
            category: product.categories[0] || '',
            image: product.image,
            images: product.images,
            short_description: product.shortDescription,
            description: product.description,
            sizes: product.sizes,
            colors: product.colors,
            in_stock: product.inStock,
            is_featured: product.isFeatured,
            is_best_seller: product.isBestSeller,
            stock_quantity: product.stockQuantity
        };
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').update(dbProduct).eq('id', product.id);
        if (!error) refreshData();
    };
    const deleteProduct = async (id)=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').delete().eq('id', id);
        if (!error) refreshData();
    };
    const addOrder = async (order)=>{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = order;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').insert([
            {
                items: order.items,
                total: order.total,
                customer: order.customer,
                customer_name: order.customer.name,
                customer_phone: order.customer.phone,
                customer_address: order.customer.address,
                customer_city: order.customer.city,
                status: order.status,
                date: order.date
            }
        ]);
        if (error) {
            console.error("Error adding order:", error);
            throw error;
        }
        refreshData();
    };
    const updateOrderStatus = async (id, status)=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').update({
            status
        }).eq('id', id);
        if (!error) refreshData();
    };
    const deleteOrder = async (id)=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').delete().eq('id', id);
        if (!error) refreshData();
    };
    const addCategory = async (category)=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').insert([
            category
        ]);
        if (!error) refreshData();
    };
    const deleteCategory = async (id)=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').delete().eq('id', id);
        if (!error) refreshData();
    };
    const seedDatabase = async ()=>{
        setIsLoading(true);
        try {
            // 1. Seed Categories - SKIPPED AS REQUESTED
            // Categories must be added manually by the admin.
            // 2. Seed Products
            const { count } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*', {
                count: 'exact',
                head: true
            });
            if (count === 0) {
                const dbProducts = [];
                const usedSlugs = [];
                for (const p of initialProducts){
                    const slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$slugify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUniqueSlug"])(p.name, usedSlugs);
                    usedSlugs.push(slug);
                    dbProducts.push({
                        name: p.name,
                        slug: slug,
                        price: p.price,
                        original_price: p.originalPrice,
                        categories: p.categories,
                        category: p.categories[0],
                        image: p.image,
                        images: p.images,
                        short_description: p.shortDescription,
                        description: p.description,
                        sizes: p.sizes,
                        colors: p.colors,
                        in_stock: p.inStock,
                        is_featured: p.isFeatured,
                        is_best_seller: false,
                        is_new: p.isNew,
                        rating: p.rating,
                        reviews: p.reviews,
                        stock_quantity: p.stockQuantity,
                        tags: p.tags
                    });
                }
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').insert(dbProducts);
                if (error) console.error('Error seeding products:', error);
            }
            await refreshData();
        } catch (err) {
            console.error("Seeding failed", err);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataContext.Provider, {
        value: {
            products,
            orders,
            categories,
            addProduct,
            updateProduct,
            deleteProduct,
            addOrder,
            updateOrderStatus,
            deleteOrder,
            addCategory,
            deleteCategory,
            refreshData,
            seedDatabase,
            isLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/DataContext.tsx",
        lineNumber: 428,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DataProvider, "/Mj+R1NWriINb036LcXtRyafA+8=");
_c = DataProvider;
const useData = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DataContext);
    if (!context) throw new Error('useData must be used within a DataProvider');
    return context;
};
_s1(useData, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "DataProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    // Initialize directly from storage to prevent redirect loop on refresh
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AuthProvider.useState": ()=>{
            const authLocal = localStorage.getItem('admin_auth');
            const authSession = sessionStorage.getItem('admin_auth');
            return authLocal === 'true' || authSession === 'true';
        }
    }["AuthProvider.useState"]);
    const [adminEmail, setAdminEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('admin@luxe.com');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Fetch current admin email for display purposes
            fetchAdminEmail();
        }
    }["AuthProvider.useEffect"], []);
    const fetchAdminEmail = async ()=>{
        try {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('app_settings').select('value').eq('key', 'admin_email').single();
            if (data) {
                setAdminEmail(data.value);
            }
        } catch (error) {
            console.error("Error fetching admin email:", error);
        }
    };
    const login = async (email, pass, remember)=>{
        try {
            // Fetch credentials from DB
            const { data: emailData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('app_settings').select('value').eq('key', 'admin_email').single();
            const { data: passData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('app_settings').select('value').eq('key', 'admin_password').single();
            const dbEmail = emailData?.value || 'admin@luxe.com';
            const dbPass = passData?.value || 'admin123';
            if (email === dbEmail && pass === dbPass) {
                setIsAuthenticated(true);
                setAdminEmail(dbEmail);
                if (remember) {
                    localStorage.setItem('admin_auth', 'true');
                } else {
                    sessionStorage.setItem('admin_auth', 'true');
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            // Fallback to hardcoded if DB fails (safety net)
            if (email === 'admin@luxe.com' && pass === 'admin123') {
                setIsAuthenticated(true);
                return true;
            }
            return false;
        }
    };
    const logout = ()=>{
        setIsAuthenticated(false);
        localStorage.removeItem('admin_auth');
        sessionStorage.removeItem('admin_auth');
    };
    const updateCredentials = async (email, pass)=>{
        try {
            // Update Email
            const { error: emailError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('app_settings').upsert({
                key: 'admin_email',
                value: email
            });
            // Update Password
            const { error: passError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('app_settings').upsert({
                key: 'admin_password',
                value: pass
            });
            if (emailError || passError) throw new Error("Failed to update credentials");
            setAdminEmail(email);
        } catch (error) {
            console.error("Error updating credentials:", error);
            throw error;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            isAuthenticated,
            login,
            logout,
            updateCredentials,
            adminEmail
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "oVBoO1sQK62plzTgNg33y1LMcNQ=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) throw new Error('useAuth must be used within a AuthProvider');
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/cn.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cn.ts [app-client] (ecmascript)");
;
;
const Button = ({ children, className, variant = 'primary', size = 'md', fullWidth = false, ...props })=>{
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg",
        secondary: "bg-primary text-white hover:bg-gray-800",
        outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
        ghost: "text-primary hover:bg-gray-100"
    };
    const sizes = {
        sm: "text-xs px-4 py-2 rounded-sm",
        md: "text-sm px-6 py-3 rounded-md",
        lg: "text-base px-8 py-4 rounded-md"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseStyles, variants[variant], sizes[size], fullWidth ? "w-full" : "", className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Button.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/cart/CartDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartDrawer",
    ()=>CartDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const CartDrawer = ()=>{
    _s();
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleCheckout = ()=>{
        setIsCartOpen(false);
        router.push('/checkout');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isCartOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>setIsCartOpen(false),
                    className: "fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: '100%'
                    },
                    animate: {
                        x: 0
                    },
                    exit: {
                        x: '100%'
                    },
                    transition: {
                        type: 'spring',
                        damping: 25,
                        stiffness: 200
                    },
                    className: "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between p-6 border-b border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-serif font-bold text-primary",
                                    children: [
                                        "Panier (",
                                        cart.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsCartOpen(false),
                                    className: "text-gray-400 hover:text-primary transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-6 space-y-6",
                            children: cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center h-full text-gray-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: "Votre panier est vide"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                        lineNumber: 51,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: ()=>setIsCartOpen(false),
                                        children: "Continuer vos achats"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                        lineNumber: 52,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : cart.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-20 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center p-1 border border-gray-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.image,
                                                alt: item.name,
                                                className: "w-full h-full object-contain object-center"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                lineNumber: 59,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 58,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex flex-col justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-medium text-primary line-clamp-1",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                            lineNumber: 63,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 mt-1",
                                                            children: [
                                                                item.selectedSize && `Taille: ${item.selectedSize}`,
                                                                item.selectedSize && item.selectedColor && ' | ',
                                                                item.selectedColor && `Couleur: ${item.selectedColor}`
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                            lineNumber: 64,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center border border-gray-200 rounded-md",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateQuantity(item.id, item.quantity - 1),
                                                                    className: "p-1 hover:bg-gray-50 text-gray-500",
                                                                    disabled: item.quantity <= 1,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                        lineNumber: 77,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                    lineNumber: 72,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-2 text-sm font-medium",
                                                                    children: item.quantity
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                    lineNumber: 79,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateQuantity(item.id, item.quantity + 1),
                                                                    className: "p-1 hover:bg-gray-50 text-gray-500",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                        lineNumber: 84,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                    lineNumber: 80,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                            lineNumber: 71,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-accent",
                                                                    children: [
                                                                        (item.price * item.quantity).toFixed(2),
                                                                        " MAD"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                    lineNumber: 88,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeFromCart(item.id),
                                                                    className: "text-gray-400 hover:text-red-500 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                        lineNumber: 93,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                                    lineNumber: 89,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                            lineNumber: 87,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 61,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, `${item.id}-${item.selectedSize}-${item.selectedColor}`, true, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 56,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 border-t border-gray-100 bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mb-4 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500",
                                            children: "Sous-total"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 106,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-primary",
                                            children: [
                                                cartTotal.toFixed(2),
                                                " MAD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 105,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mb-6 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500",
                                            children: "Livraison"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 110,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600 font-medium",
                                            children: "Gratuite"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 109,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mb-6 text-lg font-bold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-accent",
                                            children: [
                                                cartTotal.toFixed(2),
                                                " MAD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 113,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    fullWidth: true,
                                    onClick: handleCheckout,
                                    children: "Commander"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 117,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-xs text-gray-400 mt-3",
                                    children: "Paiement à la livraison"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 120,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                            lineNumber: 104,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/cart/CartDrawer.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartDrawer, "+Et3GpuKJKJoHpLkIUcoyMz247M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CartDrawer;
var _c;
__turbopack_context__.k.register(_c, "CartDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7d269773._.js.map
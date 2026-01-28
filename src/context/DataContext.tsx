import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Category, OrderStatus } from '../types';
import { supabase } from '../lib/supabase';
import { generateUniqueSlug, slugify } from '../utils/slugify';

// Initial Products for seeding (FRENCH)
const initialProducts: Product[] = [
    {
      id: '1',
      name: 'Richelieu Oxford Cuir',
      price: 189.00,
      originalPrice: 240.00,
      categories: ['Chaussures', 'Hommes'],
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Fabriqué à la main en cuir italien de première qualité.',
      description: 'Ces chaussures Richelieu définissent la sophistication. Parfaites pour les occasions formelles.',
      sizes: ['40', '41', '42', '43', '44'],
      colors: ['Marron', 'Noir'],
      isNew: true,
      rating: 4.8,
      reviews: 124,
      stockQuantity: 50,
      inStock: true,
      tags: ['hommes', 'formel'],
      isFeatured: true
    },
    {
      id: '2',
      name: 'Mocassin Daim Minimaliste',
      price: 145.00,
      categories: ['Chaussures', 'Hommes'],
      image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Le style sans effort rencontre le confort.',
      description: 'Ces mocassins en daim disposent d\'une semelle intérieure rembourrée pour un confort optimal.',
      sizes: ['39', '40', '41', '42'],
      colors: ['Beige', 'Bleu Marine'],
      rating: 4.5,
      reviews: 89,
      stockQuantity: 30,
      inStock: true,
      tags: ['hommes', 'décontracté']
    },
    {
      id: '3',
      name: 'Manteau en Laine Minuit',
      price: 350.00,
      originalPrice: 450.00,
      categories: ['Vestes', 'Femmes'],
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Une silhouette intemporelle taillée dans un mélange de laine luxueux.',
      description: 'Restez au chaud avec style grâce à ce manteau en laine de haute qualité.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Gris Anthracite', 'Noir'],
      isNew: true,
      rating: 4.9,
      reviews: 56,
      stockQuantity: 20,
      inStock: true,
      tags: ['femmes', 'hiver'],
      isFeatured: true
    },
    {
      id: '4',
      name: 'Blouson Motard Cuir Vintage',
      price: 299.00,
      categories: ['Vestes', 'Hommes'],
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Robuste mais raffiné. Ce blouson développe une patine unique.',
      description: 'Cuir véritable qui s\'améliore avec l\'âge. Un classique pour toute garde-robe.',
      sizes: ['M', 'L', 'XL'],
      colors: ['Marron'],
      rating: 4.7,
      reviews: 210,
      stockQuantity: 15,
      inStock: true,
      tags: ['hommes', 'décontracté']
    },
    {
      id: '5',
      name: 'Papier Peint Damassé Victorien',
      price: 85.00,
      categories: ['Papier Peint'],
      image: 'https://images.unsplash.com/photo-1615800098779-1be4350c5957?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1615800098779-1be4350c5957?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Ajoutez une touche d\'élégance royale à votre intérieur.',
      description: 'Papier peint texturé avec motifs damassés classiques.',
      colors: ['Or/Noir', 'Argent/Blanc'],
      rating: 4.6,
      reviews: 34,
      stockQuantity: 100,
      inStock: true,
      tags: ['maison', 'décoration']
    },
    {
      id: '7',
      name: 'Costume Classique Homme',
      price: 450.00,
      originalPrice: 599.00,
      categories: ['Hommes', 'Chaussures'], 
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa2e7?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa2e7?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Costume ajusté pour le gentleman moderne.',
      description: 'Coupe parfaite et tissu respirant pour un confort toute la journée.',
      sizes: ['48', '50', '52', '54'],
      colors: ['Bleu Marine', 'Noir', 'Gris'],
      rating: 4.9,
      reviews: 45,
      stockQuantity: 25,
      inStock: true,
      isFeatured: true,
      tags: ['hommes', 'formel']
    },
    {
      id: '9',
      name: 'Robe de Soirée Élégante',
      price: 280.00,
      categories: ['Femmes'],
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Robe longue éblouissante pour les occasions spéciales.',
      description: 'Faites tourner les têtes avec cette robe de soirée sophistiquée.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Rouge', 'Noir', 'Émeraude'],
      rating: 4.8,
      reviews: 67,
      stockQuantity: 15,
      inStock: true,
      isFeatured: true,
      tags: ['femmes', 'formel']
    },
    {
      id: '11',
      name: 'Veste en Jean Enfant',
      price: 45.00,
      categories: ['Enfants', 'Vestes'],
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop'],
      shortDescription: 'Veste en jean durable et élégante pour les enfants.',
      description: 'Parfaite pour l\'école ou les jeux. Résistante et confortable.',
      sizes: ['4A', '6A', '8A', '10A'],
      colors: ['Bleu'],
      rating: 4.7,
      reviews: 88,
      stockQuantity: 40,
      inStock: true,
      tags: ['enfants', 'décontracté']
    }
];

interface DataContextType {
  products: Product[];
  orders: Order[];
  categories: Category[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  refreshData: () => void;
  seedDatabase: () => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Fetch Products
      // Note: We keep created_at for products if it exists, or it might need change too if products fail.
      // But user specifically asked for orders fix.
      const { data: prodData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (prodData) {
        const mappedProducts: Product[] = prodData.map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug || slugify(p.name),
          price: Number(p.price),
          originalPrice: p.original_price ? Number(p.original_price) : undefined,
          categories: p.categories || [p.category].filter(Boolean) || [], 
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
      const { data: orderData } = await supabase.from('orders').select('*').order('date', { ascending: false });
      if (orderData) {
        const mappedOrders: Order[] = orderData.map(o => {
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
      const { data: catData } = await supabase.from('categories').select('*');
      if (catData && catData.length > 0) {
        setCategories(catData);
      } else {
        setCategories([]); 
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addProduct = async (product: Product) => {
    const existingSlugs = products.map(p => p.slug || slugify(p.name));
    let slug = generateUniqueSlug(product.name, existingSlugs);

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
    
    let { error } = await supabase.from('products').insert([dbProduct]);
    
    if (error && error.code === '23505' && error.message?.includes('slug')) {
        const newSlug = `${slug}-${Math.floor(Math.random() * 10000)}`;
        dbProduct.slug = newSlug;
        const retryResult = await supabase.from('products').insert([dbProduct]);
        error = retryResult.error;
    }

    if (!error) {
        refreshData();
    } else {
        console.error("Error adding product:", error);
        throw error;
    }
  };

  const updateProduct = async (product: Product) => {
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

    const { error } = await supabase.from('products').update(dbProduct).eq('id', product.id);
    if (!error) refreshData();
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) refreshData();
  };

  const addOrder = async (order: Order) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = order;
    const { error } = await supabase.from('orders').insert([{
      items: order.items,
      total: order.total,
      customer: order.customer,
      customer_name: order.customer.name, // Explicitly add customer_name to satisfy DB constraint
      customer_phone: order.customer.phone, // Explicitly add customer_phone to satisfy DB constraint
      customer_address: order.customer.address, // Explicitly add customer_address to satisfy DB constraint
      customer_city: order.customer.city, // Explicitly add customer_city to satisfy DB constraint
      status: order.status,
      date: order.date
    }]);
    
    if (error) {
      console.error("Error adding order:", error);
      throw error;
    }
    
    refreshData();
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (!error) refreshData();
  };

  const deleteOrder = async (id: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (!error) refreshData();
  };

  const addCategory = async (category: Category) => {
    const { error } = await supabase.from('categories').insert([category]);
    if (!error) refreshData();
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) refreshData();
  };

  const seedDatabase = async () => {
    setIsLoading(true);
    try {
      // 1. Seed Categories - SKIPPED AS REQUESTED
      // Categories must be added manually by the admin.

      // 2. Seed Products
      const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
      
      if (count === 0) {
        const dbProducts = [];
        const usedSlugs: string[] = [];

        for (const p of initialProducts) {
          const slug = generateUniqueSlug(p.name, usedSlugs);
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
        
        const { error } = await supabase.from('products').insert(dbProducts);
        if (error) console.error('Error seeding products:', error);
      }
      
      await refreshData();
    } catch (err) {
      console.error("Seeding failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{
      products, orders, categories,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus, deleteOrder,
      addCategory, deleteCategory,
      refreshData, seedDatabase, isLoading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

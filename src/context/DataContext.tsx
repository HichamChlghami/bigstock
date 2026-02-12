'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Category, OrderStatus } from '../types';
import { slugify } from '../utils/slugify';

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
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      // Fetch Orders
      const orderRes = await fetch('/api/orders');
      if (orderRes.ok) {
        const orderData = await orderRes.json();
        setOrders(orderData);
      }

      // Fetch Categories
      const catRes = await fetch('/api/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...productData } = product;
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...productData,
        slug: product.slug || slugify(product.name)
      }),
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add product');
    }
  };

  const updateProduct = async (product: Product) => {
    const { id, ...productData } = product;
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update product');
    }
  };

  const deleteProduct = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete product');
    }
  };

  const addOrder = async (order: Order) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...orderData } = order;
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add order');
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update order status');
    }
  };

  const deleteOrder = async (id: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete order');
    }
  };

  const addCategory = async (category: Category) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add category');
    }
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      refreshData();
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete category');
    }
  };

  return (
    <DataContext.Provider value={{
      products, orders, categories,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus, deleteOrder,
      addCategory, deleteCategory,
      refreshData, isLoading
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

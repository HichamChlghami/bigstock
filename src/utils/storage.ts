import { Product, Order, Category } from '../types';
import { products as initialProducts } from '../data/products';

// Removed initial categories
const initialCategories: Category[] = [];

export const storage = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem('products');
    return data ? JSON.parse(data) : initialProducts;
  },
  setProducts: (products: Product[]) => {
    localStorage.setItem('products', JSON.stringify(products));
  },
  getOrders: (): Order[] => {
    const data = localStorage.getItem('orders');
    return data ? JSON.parse(data) : [];
  },
  setOrders: (orders: Order[]) => {
    localStorage.setItem('orders', JSON.stringify(orders));
  },
  getCategories: (): Category[] => {
    const data = localStorage.getItem('categories');
    return data ? JSON.parse(data) : initialCategories;
  },
  setCategories: (categories: Category[]) => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }
};

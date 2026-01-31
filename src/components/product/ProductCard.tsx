import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { slugify } from '../../utils/slugify';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  const displayOriginalPrice = product.originalPrice || product.price * 1.25;
  const productSlug = product.slug || slugify(product.name);

  // Display primary category or first available
  const displayCategory = product.categories && product.categories.length > 0
    ? product.categories[0]
    : product.category || 'Produit';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
    >
      <div className="relative aspect-square overflow-hidden bg-white p-4 flex items-center justify-center">
        <Link href={`/products/${productSlug}`} className="block w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex-1 bg-accent text-white hover:bg-accent-hover py-2.5 px-4 text-sm font-medium transition-colors shadow-lg mr-2 flex items-center justify-center gap-2 rounded-sm"
          >
            <ShoppingCart size={16} /> Ajouter
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`p-2.5 bg-white shadow-lg transition-colors rounded-sm ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{displayCategory}</p>
        <Link href={`/products/${productSlug}`} className="block mb-2">
          <h3 className="text-base font-medium text-primary truncate group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-center gap-3">
          <span className="text-lg font-bold text-accent">{product.price.toFixed(2)} MAD</span>
          <span className="text-sm text-gray-400 line-through">{displayOriginalPrice.toFixed(2)} MAD</span>
        </div>
      </div>
    </motion.div>
  );
};

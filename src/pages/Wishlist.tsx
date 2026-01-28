import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const Wishlist: React.FC = () => {
  const { wishlist } = useCart();
  const { products } = useData();

  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div className="container py-12 min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">Mes Favoris</h1>
        <div className="w-16 h-1 bg-accent mx-auto" />
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <Heart size={40} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Votre liste de favoris est vide</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Enregistrez les articles que vous aimez. Retrouvez-les à tout moment et ajoutez-les facilement au panier.
          </p>
          <Link to="/shop">
            <Button size="lg">Commencer vos achats</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-primary">Panier ({cart.length})</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p className="mb-4">Votre panier est vide</p>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continuer vos achats</Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    {/* STRICTLY FIT CONTENT */}
                    <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center p-1 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain object-center" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-primary line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.selectedSize && `Taille: ${item.selectedSize}`} 
                          {item.selectedSize && item.selectedColor && ' | '}
                          {item.selectedColor && `Couleur: ${item.selectedColor}`}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-50 text-gray-500"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-50 text-gray-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-accent">{(item.price * item.quantity).toFixed(2)} MAD</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-gray-500">Sous-total</span>
                  <span className="font-bold text-primary">{cartTotal.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between mb-6 text-sm">
                  <span className="text-gray-500">Livraison</span>
                  <span className="text-green-600 font-medium">Gratuite</span>
                </div>
                <div className="flex justify-between mb-6 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">{cartTotal.toFixed(2)} MAD</span>
                </div>
                <Button fullWidth onClick={handleCheckout}>
                  Commander
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Paiement à la livraison
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

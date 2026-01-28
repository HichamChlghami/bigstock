import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Package } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { analytics } from '../utils/analytics';

export const OrderSuccess: React.FC = () => {
  useEffect(() => {
    // Track purchase event when page loads
    const orderId = `ORD-${Date.now()}`;
    const value = 150.00; // Average order value or pass actual value via location state if needed
    analytics.trackPurchase(orderId, value, 'MAD');
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative"
      >
        {/* Top Accent Line */}
        <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <div className="p-8 md:p-12 text-center">
          {/* Animated Checkmark */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm relative"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="absolute inset-0 rounded-full border-4 border-green-100 animate-ping opacity-20"
            />
            <CheckCircle size={48} className="text-green-500" strokeWidth={2.5} />
          </motion.div>

          {/* Main Message */}
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3 leading-tight">
            🎉 Votre demande a été reçue avec succès
          </h1>
          
          <h2 className="text-lg font-medium text-accent mb-6 font-sans">
            Merci pour votre confiance
          </h2>

          <p className="text-gray-600 mb-8 text-base leading-relaxed">
            Notre équipe vous contactera dans les plus brefs délais pour confirmer votre demande et finaliser les démarches. Si vous avez des questions, n'hésitez pas à nous contacter.
          </p>

          {/* Order Details Card */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100 text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-primary">Livraison Estimée</p>
                  <p className="text-xs text-gray-500">1-2 Jours Ouvrables</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-primary">Méthode de Paiement</p>
                  <p className="text-xs text-gray-500">Paiement à la livraison</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link to="/shop" className="block">
              <Button fullWidth size="lg" className="py-4 text-base shadow-lg hover:shadow-xl transition-all group bg-primary hover:bg-gray-800">
                Continuer vos achats <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/" className="block">
              <Button variant="ghost" fullWidth className="text-gray-500 hover:text-primary hover:bg-gray-50">
                <Home size={18} className="mr-2" /> Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

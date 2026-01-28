import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-serif font-bold text-gray-200 mb-4 select-none">
            404
          </h1>
          
          <div className="-mt-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Page Non Trouvée
            </h2>
            <p className="text-gray-500 mb-8 text-lg leading-relaxed">
              Désolé, la page que vous recherchez semble avoir été déplacée, supprimée ou n'a jamais existé.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg">
                  <Home size={18} /> Retour à l'accueil
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  <Search size={18} /> Voir la boutique
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

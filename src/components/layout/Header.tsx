import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useData } from '../../context/DataContext';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const { categories } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(true);
  const categoryRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between w-full relative">
            <button 
              className="text-white hover:text-accent transition-colors relative p-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img 
                src="https://tes.marchecom.com/bigstock-logo-removebg-preview.png" 
                alt="BigStock" 
                className="h-10 w-auto object-contain" 
              />
            </Link>

            <button 
              className="p-2 text-white hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Desktop Logo */}
          <Link to="/" className="hidden lg:block">
            <img 
              src="https://tes.marchecom.com/bigstock-logo-removebg-preview.png" 
              alt="BigStock" 
              className="h-12 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/"
              className={cn(
                "text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent",
                location.pathname === '/' ? "text-accent" : "text-gray-300"
              )}
            >
              ACCUEIL
            </Link>
            
            <Link 
              to="/shop"
              className={cn(
                "text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent",
                location.pathname === '/shop' ? "text-accent" : "text-gray-300"
              )}
            >
              BOUTIQUE
            </Link>

            <div className="relative" ref={categoryRef}>
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={cn(
                  "flex items-center text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent focus:outline-none",
                  location.pathname.includes('/category/') || isCategoryOpen ? "text-accent" : "text-gray-300"
                )}
              >
                CATÉGORIES <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md overflow-hidden py-2 mt-2"
                  >
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id}
                        to={`/category/${cat.name}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/contact"
              className={cn(
                "text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent",
                location.pathname === '/contact' ? "text-accent" : "text-gray-300"
              )}
            >
              CONTACT
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/wishlist" className="text-gray-300 hover:text-accent transition-colors relative" title="Favoris">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button 
              className="text-gray-300 hover:text-accent transition-colors relative"
              onClick={() => setIsCartOpen(true)}
              title="Panier"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 lg:hidden"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-[70%] bg-primary border-l border-gray-800 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <span className="text-lg font-serif font-bold text-white uppercase">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/" 
                    className="text-base font-medium text-white hover:text-accent flex items-center justify-between group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ACCUEIL <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                  
                  <Link 
                    to="/shop" 
                    className="text-base font-medium text-white hover:text-accent flex items-center justify-between group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    BOUTIQUE <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                  
                  <div>
                    <button 
                      onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                      className="w-full text-base font-medium text-white hover:text-accent flex items-center justify-between group"
                    >
                      CATÉGORIES 
                      <ChevronRight 
                        size={18} 
                        className={`text-gray-500 transition-transform duration-300 ${isMobileCategoryOpen ? 'rotate-90 text-accent' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isMobileCategoryOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col space-y-2 pl-3 pt-2 border-l border-gray-800 ml-1 mt-1">
                            {categories.map((cat) => (
                              <Link 
                                key={cat.id}
                                to={`/category/${cat.name}`}
                                className="text-gray-400 hover:text-white text-sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link 
                    to="/contact" 
                    className="text-base font-medium text-white hover:text-accent flex items-center justify-between group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    CONTACT <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </nav>
              </div>

              <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/wishlist" 
                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="relative mb-1">
                      <Heart size={20} className="text-gray-300 group-hover:text-red-500 transition-colors" />
                      {wishlist.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                          {wishlist.length}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 group-hover:text-white">Favoris</span>
                  </Link>

                  <button 
                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                  >
                    <div className="relative mb-1">
                      <ShoppingBag size={20} className="text-gray-300 group-hover:text-accent transition-colors" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 group-hover:text-white">Panier</span>
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full bg-accent text-white font-bold py-2 rounded-md hover:bg-accent-hover transition-colors shadow-lg text-sm">
                      Commencer vos achats
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

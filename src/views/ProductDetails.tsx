'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { Truck, RotateCcw, Lock, Zap, ShoppingCart, Star, Heart, Loader2 } from 'lucide-react';
import { slugify } from '../utils/slugify';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { products, isLoading } = useData();
  const { addToCart, toggleWishlist, wishlist } = useCart();

  // Find product by slug or fallback to checking slugified name
  const product = products.find(p => (p.slug === slug) || (slugify(p.name) === slug));

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0]);
      setSelectedColor(product.colors?.[0]);
      setActiveImage(0);
    }
  }, [product]);

  const quantity = 1;

  // LOADING STATE: Critical for Vercel/Production to prevent "Not Found" flash
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
          <p className="text-gray-500 font-medium">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Produit non trouvé</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Le produit que vous cherchez n'existe pas ou a été déplacé.
        </p>
        <Button onClick={() => router.push('/shop')}>
          Retour à la boutique
        </Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => {
      const hasSharedCategory = p.categories?.some(c => product.categories?.includes(c));
      return hasSharedCategory && p.id !== product.id;
    })
    .slice(0, 4);

  const finalRelatedProducts = relatedProducts.length > 0
    ? relatedProducts
    : products.filter(p => p.id !== product.id).slice(0, 4);

  const handleOrderNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor, true);
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor, false);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? 'text-accent fill-accent' : 'text-gray-300'}`}
      />
    ));
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="bg-white">
      <div className="container pt-8 pb-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-0">

          {/* LEFT: IMAGES */}
          <div className="space-y-4">
            <div className="w-full relative bg-white border border-gray-100 rounded-lg overflow-hidden flex justify-center items-center p-4">
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>

            {product.images.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-[80px] h-[80px] rounded-md overflow-hidden border-2 transition-all flex-shrink-0 bg-white p-1 ${activeImage === idx ? 'border-accent opacity-100' : 'border-gray-100 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: INFO */}
          <div className="flex flex-col justify-start items-start text-left pt-0">

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-3">
              <span className="text-2xl md:text-3xl font-bold text-accent">{product.price.toFixed(2)} MAD</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{product.originalPrice.toFixed(2)} MAD</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500 font-medium border-b border-gray-300 pb-0.5">
                {product.reviews || 124} Avis
              </span>
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-4 max-w-lg">
              {product.shortDescription || product.description?.split('.').slice(0, 2).join('.') + '.'}
            </p>

            <div className="mb-8">
              {product.inStock ? (
                product.stockQuantity < 10 ? (
                  <span className="text-orange-600 font-medium text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    Plus que {product.stockQuantity} articles en stock !
                  </span>
                ) : (
                  <span className="text-green-600 font-medium text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    En Stock & Prêt à Expédier
                  </span>
                )
              ) : (
                <span className="text-red-500 font-medium text-sm">Rupture de Stock</span>
              )}
            </div>

            {/* Options Section */}
            <div className="w-full mb-8 space-y-8">
              {/* Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">Choisir la Taille</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3.5rem] h-12 px-4 rounded-md border flex items-center justify-center text-sm font-medium transition-all
                          ${selectedSize === size
                            ? 'border-accent bg-accent text-white shadow-md'
                            : 'border-gray-200 hover:border-gray-400 text-gray-700 bg-white'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-sm font-bold text-primary uppercase tracking-wide block mb-3">Choisir la Couleur</span>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative w-12 h-12 rounded-full border flex items-center justify-center transition-all bg-white
                          ${selectedColor === color ? 'border-accent ring-1 ring-accent ring-offset-2' : 'border-gray-200 hover:border-gray-400'}`}
                        title={color}
                      >
                        <span
                          className="w-8 h-8 rounded-full border border-black/5 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons - FIXED FOR MOBILE FIT */}
            <div className="w-full mb-8 flex flex-row gap-2 items-center">
              <Button
                onClick={handleOrderNow}
                className="flex-1 text-xs sm:text-sm font-bold py-3 shadow-md hover:shadow-lg transition-all h-12 whitespace-nowrap px-1 sm:px-2"
                disabled={!product.inStock}
              >
                {product.inStock ? 'Commander' : 'ÉPUISÉ'}
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 text-xs sm:text-sm font-bold py-3 border-2 h-12 whitespace-nowrap px-1 sm:px-2"
                disabled={!product.inStock}
              >
                <ShoppingCart size={16} className="mr-1 hidden sm:inline" />
                <span className="inline">Ajouter</span>
              </Button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`h-12 w-12 flex-shrink-0 flex items-center justify-center border-2 rounded-md transition-colors ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500'}`}
                title="Ajouter aux favoris"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <p className="text-xs text-gray-500 -mt-4 text-center w-full font-medium">
              Payez à la réception de votre commande
            </p>

          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="w-full bg-gray-50 border-y border-gray-100 py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-2">
              <div className="p-3 bg-white rounded-full text-accent shadow-sm mb-3"><Truck size={24} /></div>
              <h4 className="text-base font-bold text-primary mb-1">Paiement à la livraison</h4>
              <p className="text-xs text-gray-500">Payez à votre porte</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="p-3 bg-white rounded-full text-accent shadow-sm mb-3"><Zap size={24} /></div>
              <h4 className="text-base font-bold text-primary mb-1">Livraison Rapide</h4>
              <p className="text-xs text-gray-500">Livraison en 2-4 jours</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="p-3 bg-white rounded-full text-accent shadow-sm mb-3"><RotateCcw size={24} /></div>
              <h4 className="text-base font-bold text-primary mb-1">Retours Gratuits</h4>
              <p className="text-xs text-gray-500">30 jours pour changer d'avis</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="p-3 bg-white rounded-full text-accent shadow-sm mb-3"><Lock size={24} /></div>
              <h4 className="text-base font-bold text-primary mb-1">Paiement Sécurisé</h4>
              <p className="text-xs text-gray-500">Commande 100% sûre</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {product.description && (
          <div className="w-full md:w-[80%] mx-auto mb-12">
            <div className="border-b border-gray-200 mb-8 text-center">
              <h3 className="text-xl font-serif font-bold text-primary inline-block border-b-2 border-accent pb-3 px-4">Description du Produit</h3>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed text-base whitespace-pre-line">
              {product.description}
            </div>
          </div>
        )}

        {finalRelatedProducts.length > 0 && (
          <section className="border-t border-gray-100 pt-12 mb-16">
            <h2 className="text-2xl font-serif font-bold mb-8 text-center text-primary">Vous Aimerez Aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {finalRelatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

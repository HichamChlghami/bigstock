import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Truck, ShieldCheck, RefreshCw, Lock, Star
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSkeleton } from '../components/product/ProductSkeleton';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const { products, isLoading } = useData();
  
  // 1. Featured Products (Produits Phares)
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  
  // 2. Best Sellers (Meilleures Ventes)
  const manualBestSellers = products.filter(p => p.isBestSeller);
  const bestSellers = manualBestSellers.length > 0 
    ? manualBestSellers.slice(0, 8) 
    : products.filter(p => p.rating > 4.5).slice(0, 8);
  
  // 3. Wallpaper Products (Papier Peint)
  const wallpaperProducts = products.filter(p => 
    p.categories?.some(c => c.toLowerCase().includes('papier peint')) || 
    p.category === 'Wallpaper'
  ).slice(0, 4);

  // Demographic Collections
  const menProducts = products.filter(p => 
    p.categories && p.categories.some(c => c.toLowerCase().includes('hommes'))
  ).slice(0, 3);
  
  const womenProducts = products.filter(p => 
    p.categories && p.categories.some(c => c.toLowerCase().includes('femmes'))
  ).slice(0, 3);
  
  const kidsProducts = products.filter(p => 
    p.categories && p.categories.some(c => c.toLowerCase().includes('enfants'))
  ).slice(0, 3);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  // Helper to render skeletons
  const renderSkeletons = (count: number) => (
    Array(count).fill(0).map((_, i) => <ProductSkeleton key={i} />)
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="Intérieur Magasin Luxe" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              Élevez Votre Style
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Découvrez notre sélection premium de vêtements, chaussures et décoration. Conçu pour les connaisseurs modernes.
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-10 py-4 text-sm font-bold tracking-widest uppercase shadow-xl">
                TOUS LES PRODUITS
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR - Updated for Mobile 2x2 Grid */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Truck, text: "PAIEMENT À LA LIVRAISON" },
              { icon: ShieldCheck, text: "LIVRAISON RAPIDE" },
              { icon: RefreshCw, text: "RETOURS FACILES" },
              { icon: Lock, text: "COMMANDES SÉCURISÉES" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 group text-center md:text-left">
                <item.icon size={24} className="text-accent group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-xs md:text-sm font-bold text-primary tracking-wide uppercase">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Produits Phares) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-accent font-bold tracking-widest text-xs uppercase mb-2 block">Sélection Exclusive</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Produits Phares</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {isLoading ? renderSkeletons(4) : featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
                Voir Tout
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. COLLECTIONS (Men / Women / Kids) */}
      <div className="space-y-0">
        
        {/* Men */}
        <section className="py-16 bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col xl:flex-row gap-10 items-center">
              <div className="xl:w-1/4 w-full text-center xl:text-left flex flex-col items-center xl:items-start">
                <span className="text-gray-500 font-medium tracking-widest text-xs uppercase mb-2">Pour Lui</span>
                <h2 className="text-4xl font-serif font-bold text-primary mb-4">Hommes</h2>
                <p className="text-gray-600 mb-8 text-base max-w-xs leading-relaxed">
                  Styles raffinés pour l'homme moderne.
                </p>
                <Link to="/category/Hommes">
                  <Button size="md" className="xl:w-auto shadow-lg">Voir Hommes</Button>
                </Link>
              </div>
              <div className="xl:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? renderSkeletons(3) : menProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        </section>

        {/* Women */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col xl:flex-row-reverse gap-10 items-center">
              <div className="xl:w-1/4 w-full text-center xl:text-left flex flex-col items-center xl:items-start">
                <span className="text-gray-500 font-medium tracking-widest text-xs uppercase mb-2">Pour Elle</span>
                <h2 className="text-4xl font-serif font-bold text-primary mb-4">Femmes</h2>
                <p className="text-gray-600 mb-8 text-base max-w-xs leading-relaxed">
                  Pièces intemporelles conçues pour inspirer.
                </p>
                <Link to="/category/Femmes">
                  <Button size="md" className="xl:w-auto shadow-lg">Voir Femmes</Button>
                </Link>
              </div>
              <div className="xl:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? renderSkeletons(3) : womenProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        </section>

        {/* Kids */}
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col xl:flex-row gap-10 items-center">
              <div className="xl:w-1/4 w-full text-center xl:text-left flex flex-col items-center xl:items-start">
                <span className="text-gray-500 font-medium tracking-widest text-xs uppercase mb-2">Pour Les Petits</span>
                <h2 className="text-4xl font-serif font-bold text-primary mb-4">Enfants</h2>
                <p className="text-gray-600 mb-8 text-base max-w-xs leading-relaxed">
                  Vêtements confortables et élégants.
                </p>
                <Link to="/category/Enfants">
                  <Button size="md" className="xl:w-auto shadow-lg">Voir Enfants</Button>
                </Link>
              </div>
              <div className="xl:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? renderSkeletons(3) : kidsProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. PROMO / BANNER SECTION */}
      <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary opacity-90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block">Arrivage Récent</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Nouvelle Collection 2025</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto font-light">
              Découvrez le futur de la mode. Designs audacieux, matériaux durables et qualité sans compromis.
            </p>
            <Link to="/shop">
              <Button size="lg" className="px-12 py-4 bg-white text-primary hover:bg-gray-100 border-none shadow-xl">
                Voir la Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. WALLPAPER SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-gray-400 font-medium tracking-widest text-xs uppercase mb-2 block">Intérieur & Design</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Papier Peint & Déco</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {isLoading ? renderSkeletons(4) : wallpaperProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/category/Papier Peint">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
                Voir Tout Déco
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* 7. BEST SELLERS */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="text-accent fill-accent" size={16} />
              <span className="text-accent font-bold tracking-widest text-xs uppercase">Les Plus Aimés</span>
              <Star className="text-accent fill-accent" size={16} />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Meilleures Ventes</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Nos articles les plus populaires, choisis par vous.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? renderSkeletons(4) : bestSellers.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROMOTIONAL BANNER (COD) */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Truck size={64} strokeWidth={1.5} className="text-accent mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
              Paiement à la Livraison Disponible
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Achetez en toute confiance. Payez uniquement lorsque vous recevez votre commande à votre porte. Aucun paiement en ligne requis.
            </p>
            <Link to="/shop">
              <Button size="lg" className="px-10 py-4 text-base font-bold shadow-xl hover:shadow-accent/20 transition-transform hover:-translate-y-1">
                Commencer vos achats
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

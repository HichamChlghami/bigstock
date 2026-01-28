import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSkeleton } from '../components/product/ProductSkeleton';
import { useData } from '../context/DataContext';
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export const Shop: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { products, categories, isLoading } = useData();
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState<string>(category || 'Tout');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    let result = products;
    
    if (activeCategory !== 'Tout') {
      result = result.filter(p => 
        p.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase())
      );
    }

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [activeCategory, products, searchQuery]);

  useEffect(() => {
    if (category) {
      setActiveCategory(category.charAt(0).toUpperCase() + category.slice(1));
    } else {
      setActiveCategory('Tout');
    }
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categoryNames = ['Tout', ...categories.map(c => c.name)];

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            {activeCategory === 'Tout' ? 'Tous les Produits' : activeCategory}
          </h1>
          <p className="text-gray-500">
            {isLoading ? 'Chargement...' : `Affichage de ${filteredProducts.length} résultats`}
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative w-full md:w-auto md:min-w-[400px]">
          <input 
            type="text" 
            placeholder="Rechercher des produits..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            
            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter size={18} /> Catégories
              </h3>
              <ul className="space-y-2">
                {categoryNames.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm w-full text-left py-2 px-3 rounded-md transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-md font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-accent text-white shadow-md' 
                          : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-900">Aucun produit trouvé</h3>
              <p className="text-gray-500 mt-2">Essayez d'ajuster vos filtres ou votre recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

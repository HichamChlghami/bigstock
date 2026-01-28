import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { Plus, Edit, Trash2, Search, ExternalLink, Copy, Check } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { Link } from 'react-router-dom';

export const Products: React.FC = () => {
  const { products, deleteProduct } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase();
    const nameMatch = p.name?.toLowerCase().includes(term);
    // Safely check category (deprecated field)
    const categoryMatch = p.category?.toLowerCase().includes(term);
    // Check new categories array
    const categoriesMatch = p.categories?.some(c => c.toLowerCase().includes(term));
    
    return nameMatch || categoryMatch || categoriesMatch;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      deleteProduct(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  const copyToClipboard = (slug: string) => {
    const url = `${window.location.origin}/products/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  if (isFormOpen) {
    return <ProductForm product={editingProduct} onClose={handleCloseForm} />;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-primary">Produits</h1>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Ajouter Produit
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher des produits..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Lien (Slug)</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="w-10 h-10 rounded object-contain bg-gray-100 border border-gray-200" />
                      <div>
                        <p className="font-medium text-primary text-sm">{product.name}</p>
                        <div className="flex gap-1 mt-1">
                          {product.isFeatured && <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded">En Vedette</span>}
                          {product.isBestSeller && <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">Top Vente</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <span className="truncate bg-gray-100 px-2 py-1 rounded text-xs font-mono" title={product.slug}>
                        /{product.slug}
                      </span>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => product.slug && copyToClipboard(product.slug)}
                          className="text-gray-400 hover:text-accent p-1"
                          title="Copier Lien"
                        >
                          {copiedSlug === product.slug ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                        </button>
                        <Link to={`/products/${product.slug}`} target="_blank" className="text-gray-400 hover:text-accent p-1" title="Voir Page">
                          <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {product.price.toFixed(2)} MAD
                    {product.discountPrice && <span className="text-xs text-gray-400 line-through ml-2">{product.discountPrice} MAD</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.stockQuantity}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.inStock ? 'En Stock' : 'Épuisé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

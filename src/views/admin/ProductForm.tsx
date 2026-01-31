import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { X, Plus, Check } from 'lucide-react';
import { ImageInput } from '../../components/admin/ImageInput';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct, categories } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    categories: [], 
    shortDescription: '',
    description: '',
    image: '',
    images: [],
    sizes: [],
    colors: [],
    stockQuantity: 50,
    inStock: true,
    isFeatured: false,
    isBestSeller: false,
    rating: 5,
    reviews: 124 // Default reviews set to 124
  });

  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        categories: product.categories && product.categories.length > 0 ? product.categories : (product.category ? [product.category] : []),
        shortDescription: product.shortDescription || product.description?.substring(0, 100) || '',
        description: product.description || ''
      });
      if (product.description) setShowDescription(true);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const finalImages = formData.images && formData.images.length > 0 
        ? formData.images 
        : (formData.image ? [formData.image] : []);

      const finalProduct = {
        ...formData,
        id: product?.id || '', 
        images: finalImages,
        image: finalImages[0] || '',
        description: showDescription && formData.description ? formData.description : undefined,
        categories: formData.categories && formData.categories.length > 0 ? formData.categories : ['Non classé'],
        // Ensure numbers are numbers
        price: Number(formData.price) || 0,
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stockQuantity: Number(formData.stockQuantity) || 0,
        reviews: Number(formData.reviews) || 124, // Ensure fallback
      } as Product;

      if (product) {
        await updateProduct(finalProduct);
      } else {
        await addProduct(finalProduct);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Échec de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCategory = (catName: string) => {
    setFormData(prev => {
      const currentCats = prev.categories || [];
      if (currentCats.includes(catName)) {
        return { ...prev, categories: currentCats.filter(c => c !== catName) };
      } else {
        return { ...prev, categories: [...currentCats, catName] };
      }
    });
  };

  const handleAddSize = () => {
    if (sizeInput) {
      setFormData(prev => ({ ...prev, sizes: [...(prev.sizes || []), sizeInput] }));
      setSizeInput('');
    }
  };

  const handleAddColor = () => {
    if (colorInput) {
      setFormData(prev => ({ ...prev, colors: [...(prev.colors || []), colorInput] }));
      setColorInput('');
    }
  };

  const handleImageUpdate = (index: number, value: string) => {
    setFormData(prev => {
      const currentImages = [...(prev.images || [])];
      while (currentImages.length < index) currentImages.push('');
      currentImages[index] = value;
      const cleanImages = currentImages.filter(img => img);
      return {
        ...prev,
        images: cleanImages,
        image: cleanImages[0] || ''
      };
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = prev.images?.filter((_, i) => i !== index) || [];
      return {
        ...prev,
        images: newImages,
        image: newImages[0] || ''
      };
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-4xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">{product ? 'Modifier Produit' : 'Ajouter Nouveau Produit'}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-primary"><X size={24} /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input 
              required
              type="text" 
              value={formData.name || ''}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
              placeholder="Titre du produit"
            />
          </div>
          
          {/* Multi-Select Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
            <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[42px]">
              {categories.map(c => {
                const isSelected = formData.categories?.includes(c.name);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.name)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1 border ${
                      isSelected 
                        ? 'bg-accent text-white border-accent' 
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                    {c.name}
                  </button>
                );
              })}
              {categories.length === 0 && <span className="text-xs text-gray-400 italic">Aucune catégorie disponible</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix Réel (MAD)</label>
            <input 
              required
              type="number" 
              step="0.01"
              value={formData.price ?? ''}
              onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ancien Prix (MAD)</label>
            <input 
              type="number" 
              step="0.01"
              value={formData.originalPrice ?? ''}
              onChange={e => setFormData({...formData, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantité en Stock</label>
            <input 
              required
              type="number" 
              value={formData.stockQuantity ?? ''}
              onChange={e => setFormData({...formData, stockQuantity: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
            />
          </div>
          
          {/* UPDATED: Selection Options */}
          <div className="flex flex-wrap items-center gap-6 pt-6 bg-gray-50 p-4 rounded-md border border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={!!formData.inStock}
                onChange={e => setFormData({...formData, inStock: e.target.checked})}
                className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <span className="text-sm font-medium text-gray-700">En Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={!!formData.isFeatured}
                onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <span className="text-sm font-bold text-accent">Produits Phares</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={!!formData.isBestSeller}
                onChange={e => setFormData({...formData, isBestSeller: e.target.checked})}
                className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <span className="text-sm font-bold text-primary">Meilleures Ventes</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Petite Description</label>
          <textarea 
            required
            rows={2}
            value={formData.shortDescription || ''}
            onChange={e => setFormData({...formData, shortDescription: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
            placeholder="Résumé court..."
          />
        </div>

        {/* Sizes & Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tailles</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={sizeInput}
                onChange={e => setSizeInput(e.target.value)}
                placeholder="ex: 42, M, XL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
              />
              <button type="button" onClick={handleAddSize} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">Ajouter</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.sizes?.map((size, idx) => (
                <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {size} <button type="button" onClick={() => setFormData(prev => ({ ...prev, sizes: prev.sizes?.filter(s => s !== size) }))}><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleurs (Nom ou Hex)</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={colorInput}
                onChange={e => setColorInput(e.target.value)}
                placeholder="Bleu ou #0000FF"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
              />
              <button type="button" onClick={handleAddColor} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">Ajouter</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.colors?.map((color, idx) => (
                <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: color }} />
                  {color} <button type="button" onClick={() => setFormData(prev => ({ ...prev, colors: prev.colors?.filter(c => c !== color) }))}><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Image Gallery Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images (La première est principale)</label>
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <ImageInput
                key={index}
                value={formData.images?.[index]}
                onChange={(val) => handleImageUpdate(index, val)}
                onRemove={formData.images?.[index] ? () => removeImage(index) : undefined}
              />
            ))}
          </div>
        </div>

        {/* Optional Description */}
        <div>
          {!showDescription ? (
            <Button type="button" variant="outline" onClick={() => setShowDescription(true)} className="flex items-center gap-2">
              <Plus size={16} /> Ajouter Description (Optionnel)
            </Button>
          ) : (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Description Détaillée</label>
                <button type="button" onClick={() => setShowDescription(false)} className="text-xs text-red-500 hover:underline">Supprimer</button>
              </div>
              <textarea 
                rows={6}
                value={formData.description || ''}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
                placeholder="Détails complets du produit..."
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>Annuler</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
};

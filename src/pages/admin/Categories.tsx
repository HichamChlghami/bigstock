import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, X, Tag } from 'lucide-react';

export const Categories: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName) {
      addCategory({
        id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        name: newCategoryName,
        image: '' // No image required anymore
      });
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Catégories</h1>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> Ajouter Catégorie
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 max-w-xl">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Nouvelle Catégorie</h3>
            <button onClick={() => setIsAdding(false)}><X size={20} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la Catégorie</label>
              <input 
                type="text" 
                placeholder="ex: Collection Été" 
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
                required
              />
            </div>
            
            <Button type="submit" fullWidth>Créer Catégorie</Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <Tag size={20} />
              </div>
              <h3 className="font-bold text-primary">{cat.name}</h3>
            </div>
            <button 
              onClick={() => { if(window.confirm('Supprimer la catégorie ?')) deleteCategory(cat.id) }}
              className="text-gray-400 hover:text-red-500 transition-colors p-2"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            Aucune catégorie trouvée. Ajoutez-en une pour commencer.
          </div>
        )}
      </div>
    </div>
  );
};

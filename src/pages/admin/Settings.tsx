import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/Button';
import { Save, Database, CheckCircle, AlertCircle, BarChart3, Plus, Trash2, Edit2, X, Check, Loader2 } from 'lucide-react';

export const Settings: React.FC = () => {
  const { adminEmail, updateCredentials } = useAuth();
  const { seedDatabase, isLoading: isDataLoading } = useData();
  
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSavingCreds, setIsSavingCreds] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [gaId, setGaId] = useState('');
  
  // Multi-pixel states
  const [pixelIds, setPixelIds] = useState<string[]>([]);
  const [tiktokIds, setTiktokIds] = useState<string[]>([]);
  
  // Temp inputs for adding new IDs
  const [newPixelId, setNewPixelId] = useState('');
  const [newTiktokId, setNewTiktokId] = useState('');

  // Editing state
  const [editingItem, setEditingItem] = useState<{ type: 'pixel' | 'tiktok', index: number, value: string } | null>(null);

  useEffect(() => {
    setEmail(adminEmail);
  }, [adminEmail]);

  useEffect(() => {
    setGaId(localStorage.getItem('ga_id') || '');
    
    // Load Meta Pixels
    try {
      const savedPixels = JSON.parse(localStorage.getItem('pixel_ids') || '[]');
      setPixelIds(savedPixels);
    } catch {
      const oldId = localStorage.getItem('pixel_id');
      if (oldId) setPixelIds([oldId]);
    }

    // Load TikTok Pixels
    try {
      const savedTiktoks = JSON.parse(localStorage.getItem('tiktok_ids') || '[]');
      setTiktokIds(savedTiktoks);
    } catch {
      const oldId = localStorage.getItem('tiktok_id');
      if (oldId) setTiktokIds([oldId]);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showMessage = (msg: string, isError = false) => {
    setMessage(msg);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(''), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsSavingCreds(true);
      try {
        await updateCredentials(email, password);
        showMessage('Identifiants mis à jour avec succès !');
        setPassword(''); // Clear password field after save
      } catch (error) {
        showMessage('Erreur lors de la mise à jour.', true);
      } finally {
        setIsSavingCreds(false);
      }
    }
  };

  const handleAnalyticsSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ga_id', gaId);
    localStorage.setItem('pixel_ids', JSON.stringify(pixelIds));
    localStorage.setItem('tiktok_ids', JSON.stringify(tiktokIds));
    showMessage('Paramètres analytiques enregistrés ! Rafraîchissez pour appliquer.');
  };

  // --- Pixel Logic ---

  const addPixelId = () => {
    if (newPixelId && !pixelIds.includes(newPixelId)) {
      setPixelIds([...pixelIds, newPixelId]);
      setNewPixelId('');
    }
  };

  const removePixelId = (index: number) => {
    const newIds = [...pixelIds];
    newIds.splice(index, 1);
    setPixelIds(newIds);
  };

  const startEditPixel = (index: number) => {
    setEditingItem({ type: 'pixel', index, value: pixelIds[index] });
  };

  // --- TikTok Logic ---

  const addTiktokId = () => {
    if (newTiktokId && !tiktokIds.includes(newTiktokId)) {
      setTiktokIds([...tiktokIds, newTiktokId]);
      setNewTiktokId('');
    }
  };

  const removeTiktokId = (index: number) => {
    const newIds = [...tiktokIds];
    newIds.splice(index, 1);
    setTiktokIds(newIds);
  };

  const startEditTiktok = (index: number) => {
    setEditingItem({ type: 'tiktok', index, value: tiktokIds[index] });
  };

  // --- Common Edit Logic ---

  const saveEdit = () => {
    if (!editingItem) return;
    
    if (editingItem.type === 'pixel') {
      const newIds = [...pixelIds];
      newIds[editingItem.index] = editingItem.value;
      setPixelIds(newIds);
    } else {
      const newIds = [...tiktokIds];
      newIds[editingItem.index] = editingItem.value;
      setTiktokIds(newIds);
    }
    setEditingItem(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const handleSeed = async () => {
    if (window.confirm('Cela remplira la base de données avec les produits de démonstration. Aucune catégorie ne sera créée (vous devez les ajouter manuellement). Continuer ?')) {
      try {
        await seedDatabase();
        setSeedStatus('success');
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setSeedStatus('idle'), 3000);
      } catch (e) {
        setSeedStatus('error');
      }
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-primary mb-8">Paramètres Admin</h1>

      {message && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 text-green-600 text-sm p-4 rounded-md shadow-lg border border-green-100 flex items-center gap-2 animate-in slide-in-from-right">
          <CheckCircle size={16} /> {message}
        </div>
      )}

      <div className="space-y-8">
        
        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-accent" /> Intégration Analytique
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Gérez vos pixels de suivi ici. Vous pouvez ajouter, modifier ou supprimer plusieurs pixels pour Meta et TikTok.
          </p>
          
          <form onSubmit={handleAnalyticsSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics 4 (ID de mesure)</label>
              <input
                type="text"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            {/* Meta Pixels */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Pixel IDs (Facebook)</label>
              <div className="space-y-2 mb-2">
                {pixelIds.map((id, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                    {editingItem?.type === 'pixel' && editingItem.index === index ? (
                      <div className="flex items-center gap-2 w-full">
                        <input 
                          type="text" 
                          value={editingItem.value} 
                          onChange={(e) => setEditingItem({...editingItem, value: e.target.value})}
                          className="flex-1 px-2 py-1 text-sm border border-accent rounded outline-none"
                        />
                        <button type="button" onClick={saveEdit} className="text-green-600"><Check size={16} /></button>
                        <button type="button" onClick={cancelEdit} className="text-gray-500"><X size={16} /></button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-mono text-gray-700">{id}</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => startEditPixel(index)} className="text-blue-500 hover:text-blue-700">
                            <Edit2 size={16} />
                          </button>
                          <button type="button" onClick={() => removePixelId(index)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPixelId}
                  onChange={(e) => setNewPixelId(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none text-sm"
                  placeholder="Ajouter un ID Meta Pixel"
                />
                <button type="button" onClick={addPixelId} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* TikTok Pixels */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Pixel IDs</label>
              <div className="space-y-2 mb-2">
                {tiktokIds.map((id, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                    {editingItem?.type === 'tiktok' && editingItem.index === index ? (
                      <div className="flex items-center gap-2 w-full">
                        <input 
                          type="text" 
                          value={editingItem.value} 
                          onChange={(e) => setEditingItem({...editingItem, value: e.target.value})}
                          className="flex-1 px-2 py-1 text-sm border border-accent rounded outline-none"
                        />
                        <button type="button" onClick={saveEdit} className="text-green-600"><Check size={16} /></button>
                        <button type="button" onClick={cancelEdit} className="text-gray-500"><X size={16} /></button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-mono text-gray-700">{id}</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => startEditTiktok(index)} className="text-blue-500 hover:text-blue-700">
                            <Edit2 size={16} />
                          </button>
                          <button type="button" onClick={() => removeTiktokId(index)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTiktokId}
                  onChange={(e) => setNewTiktokId(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none text-sm"
                  placeholder="Ajouter un ID TikTok Pixel"
                />
                <button type="button" onClick={addTiktokId} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <Button type="submit" variant="secondary" className="mt-2">
              Enregistrer les Paramètres
            </Button>
          </form>
        </div>

        {/* Credentials Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Save size={20} className="text-accent" /> Mettre à jour les identifiants
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Ces identifiants seront mis à jour pour tous les appareils.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouvelle Adresse Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau Mot de Passe</label>
              <input
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-accent outline-none"
                placeholder="Entrez le nouveau mot de passe"
              />
            </div>
            <Button type="submit" className="flex items-center gap-2" disabled={isSavingCreds}>
              {isSavingCreds ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              {isSavingCreds ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </form>
        </div>

        {/* Database Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Database size={20} className="text-accent" /> Gestion de la Base de Données
          </h2>
          
          <p className="text-gray-600 text-sm mb-6">
            Si votre boutique est vide, vous pouvez la remplir avec les produits de démonstration initiaux.
          </p>

          {seedStatus === 'success' && (
            <div className="bg-green-50 text-green-600 text-sm p-3 rounded-md mb-4 border border-green-100 flex items-center gap-2">
              <CheckCircle size={16} /> Base de données remplie avec succès !
            </div>
          )}
          
          {seedStatus === 'error' && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4 border border-red-100 flex items-center gap-2">
              <AlertCircle size={16} /> Échec du remplissage de la base de données.
            </div>
          )}

          <Button 
            onClick={handleSeed} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={isDataLoading}
          >
            {isDataLoading ? 'Traitement...' : 'Remplir la BD avec Données Démo'}
          </Button>
        </div>
      </div>
    </div>
  );
};

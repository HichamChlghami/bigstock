import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Lock, Eye, EyeOff, Home, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        navigate('/admin');
      } else {
        setError('Identifiants invalides.');
      }
    } catch (err) {
      setError('Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium">
        <Home size={20} /> Retour au Site
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-accent">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Portail Admin</h1>
          <p className="text-gray-500 text-sm">Accès sécurisé pour la gestion</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              placeholder="Entrez email admin"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>

          <Button fullWidth type="submit" className="flex items-center justify-center gap-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />} 
            {isLoading ? 'Vérification...' : 'Connexion'}
          </Button>
        </form>
      </div>
    </div>
  );
};

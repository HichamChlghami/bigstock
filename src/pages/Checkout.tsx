import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Truck, ShieldCheck, MapPin, Phone, User, FileText, Loader2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Flag to prevent redirect loop
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  // Redirect if cart is empty (ONLY if not successful)
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      navigate('/shop');
    }
  }, [cart, navigate, isSuccess]);

  if (cart.length === 0 && !isSuccess) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newOrder = {
      id: Date.now().toString(),
      items: cart,
      total: cartTotal,
      customer: {
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes
      },
      date: new Date().toISOString(),
      status: 'Pending' as const
    };

    try {
      await addOrder(newOrder);
      setIsSuccess(true); // Mark as success BEFORE clearing cart
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Une erreur est survenue lors de la commande. Veuillez vérifier votre connexion et réessayer.");
      setIsSubmitting(false); // Only reset submitting if error
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-primary text-white py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Paiement Sécurisé</h1>
          <p className="text-gray-400 text-sm">Complétez votre commande avec le paiement à la livraison</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Truck size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Informations de Livraison</h2>
                  <p className="text-xs text-gray-500">Où devons-nous envoyer votre commande ?</p>
                </div>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User size={14} className="text-gray-400" /> Nom Complet
                    </label>
                    <input 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" /> Téléphone
                    </label>
                    <input 
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      placeholder="+212 600-000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" /> Adresse
                  </label>
                  <input 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="123 Avenue de la Mode, Apt 4B"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" /> Ville
                  </label>
                  <input 
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="Casablanca"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText size={14} className="text-gray-400" /> Notes (Optionnel)
                  </label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                    placeholder="Instructions spéciales pour la livraison..."
                  />
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100">Récapitulatif</h2>
              
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center p-1">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain object-center" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-primary truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Qté: {item.quantity} 
                        {item.selectedSize && <span className="mx-1">•</span>}
                        {item.selectedSize && `Taille: ${item.selectedSize}`}
                      </p>
                    </div>
                    <div className="font-bold text-sm text-primary">{(item.price * item.quantity).toFixed(2)} MAD</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-4 border-t border-gray-100 bg-gray-50/50 -mx-8 px-8 pb-6 mb-6">
                <div className="flex justify-between text-sm pt-4">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium text-primary">{cartTotal.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Livraison</span>
                  <span className="text-green-600 font-bold flex items-center gap-1"><ShieldCheck size={14} /> Gratuite</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 mt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-accent">{cartTotal.toFixed(2)} MAD</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                fullWidth 
                size="lg" 
                disabled={isSubmitting}
                className="text-lg font-bold py-4 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Traitement...
                  </>
                ) : (
                  'Commander Maintenant'
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 bg-gray-50 py-2 rounded-lg">
                <Truck size={14} className="text-accent" />
                <span>Paiement à la livraison</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

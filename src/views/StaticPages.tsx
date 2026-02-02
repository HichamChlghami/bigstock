'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { submitToGoogleSheets } from '../utils/googleSheets';

export const About: React.FC = () => (
  <div className="container py-20 max-w-4xl">
    <h1 className="text-4xl font-serif font-bold mb-8 text-center">À Propos de BigStock</h1>
    <div className="prose prose-lg mx-auto text-gray-600">
      <p className="mb-6">
        Fondé en 2026, BigStock est né du désir d'apporter des produits de mode et de lifestyle de qualité supérieure au client exigeant. Nous croyons que le vrai luxe réside dans les détails—la couture d'une chaussure en cuir, la texture d'un papier peint, la coupe d'une veste.
      </p>
      <p className="mb-6">
        Notre mission est simple : curer une collection qui incarne l'élégance, la durabilité et le style intemporel. Nous travaillons directement avec des artisans et des fabricants pour nous assurer que chaque produit répond à nos normes rigoureuses.
      </p>
      <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" alt="Notre Magasin" className="w-full rounded-lg my-8 shadow-lg" />
      <h3 className="text-2xl font-bold text-primary mb-4">Nos Valeurs</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Qualité d'abord :</strong> Nous ne faisons aucun compromis sur les matériaux ou l'artisanat.</li>
        <li><strong>Centré sur le client :</strong> Votre satisfaction est notre priorité absolue.</li>
        <li><strong>Luxe durable :</strong> Nous nous efforçons d'assurer un approvisionnement et une production éthiques.</li>
      </ul>
    </div>
  </div>
);



export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Google Sheets
      await submitToGoogleSheets('contact', {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        subject: 'general',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <div className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Contactez-nous</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-xl font-light">
            Nous sommes là pour vous aider. Contactez notre équipe pour toute question concernant nos collections ou services.
          </p>
        </div>
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6 relative inline-block">
                Informations de Contact
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent"></span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Que vous ayez une question sur un produit, la livraison ou simplement pour dire bonjour, nous serions ravis de vous entendre.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-1">Support Téléphonique</h3>
                  <p className="text-gray-500 text-sm mb-2">Lun-Ven de 9h à 18h</p>
                  <a href="tel:0763321581" className="text-lg font-medium text-primary hover:text-accent transition-colors border-b border-transparent hover:border-accent">0763321581</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-1">Email</h3>
                  <p className="text-gray-500 text-sm mb-2">Nous répondons sous 24h</p>
                  <a href="mailto:Bouabbimajid@gmail.com" className="text-lg font-medium text-primary hover:text-accent transition-colors border-b border-transparent hover:border-accent">Bouabbimajid@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-1">Magasin Principal</h3>
                  <p className="text-gray-500 text-sm mb-2">Venez visiter notre showroom</p>
                  <p className="text-lg font-medium text-primary">Rue Salem cherkaoui 23, Quartier des hôpitaux casablanca</p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-xl overflow-hidden shadow-lg border border-gray-100 h-64 relative bg-gray-100 group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
                alt="Carte"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <Button variant="secondary" size="sm" className="shadow-xl">Voir sur Google Maps</Button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center text-center h-full py-12"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Message Envoyé !</h3>
                  <p className="text-gray-500 mb-8">
                    Merci de nous avoir contactés. Notre équipe a bien reçu votre message et vous répondra dans les plus brefs délais.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl font-serif font-bold text-primary mb-2">Envoyer un Message</h2>
                  <p className="text-gray-500 mb-8">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <input
                          type="text"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="peer w-full border-b-2 border-gray-200 py-3 placeholder-transparent focus:border-accent focus:outline-none transition-colors bg-transparent"
                          placeholder="Prénom"
                        />
                        <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-accent">
                          Prénom
                        </label>
                      </div>
                      <div className="relative group">
                        <input
                          type="text"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="peer w-full border-b-2 border-gray-200 py-3 placeholder-transparent focus:border-accent focus:outline-none transition-colors bg-transparent"
                          placeholder="Nom"
                        />
                        <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-accent">
                          Nom
                        </label>
                      </div>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="peer w-full border-b-2 border-gray-200 py-3 placeholder-transparent focus:border-accent focus:outline-none transition-colors bg-transparent"
                        placeholder="Téléphone"
                      />
                      <label htmlFor="phone" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-accent">
                        Téléphone
                      </label>
                    </div>

                    <div className="relative group">
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="peer w-full border-b-2 border-gray-200 py-3 bg-transparent focus:border-accent focus:outline-none transition-colors text-gray-700 cursor-pointer"
                      >
                        <option value="" disabled>Sélectionnez un sujet</option>
                        <option value="general">Question Générale</option>
                        <option value="order">Statut de Commande</option>
                        <option value="returns">Retours & Échanges</option>
                        <option value="product">Information Produit</option>
                      </select>
                    </div>

                    <div className="relative group">
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="peer w-full border-b-2 border-gray-200 py-3 placeholder-transparent focus:border-accent focus:outline-none transition-colors resize-none bg-transparent"
                        placeholder="Message"
                      ></textarea>
                      <label htmlFor="message" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-accent">
                        Comment pouvons-nous vous aider ?
                      </label>
                    </div>

                    <Button
                      size="lg"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-6 flex items-center justify-center gap-3 py-4 text-lg"
                    >
                      {isSubmitting ? 'Envoi...' : 'Envoyer'} <Send size={20} />
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Shipping: React.FC = () => (
  <div className="container py-20 max-w-3xl">
    <h1 className="text-3xl font-serif font-bold mb-6">Politique de Livraison</h1>
    <div className="space-y-4 text-gray-600">
      <p>Nous offrons la livraison standard gratuite sur toutes les commandes de plus de 1000 MAD.</p>
      <p><strong>Temps de Traitement :</strong> Les commandes sont traitées sous 1-2 jours ouvrables.</p>
      <p><strong>Délai de Livraison :</strong> La livraison standard prend 3-5 jours ouvrables. La livraison express prend 1-2 jours ouvrables.</p>
      <p>Nous livrons actuellement partout au Maroc.</p>
    </div>
  </div>
);

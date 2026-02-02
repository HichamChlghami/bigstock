import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="https://tes.marchecom.com/bigstock-logo-removebg-preview.png"
                alt="BigStock"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Une sélection de produits lifestyle premium pour l'individu moderne. Qualité, élégance et sophistication dans chaque détail.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Boutique</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">Tous les produits</Link></li>
              <li><Link href="/category/Chaussures" className="hover:text-white transition-colors">Chaussures</Link></li>
              <li><Link href="/category/Vestes" className="hover:text-white transition-colors">Vestes</Link></li>
              <li><Link href="/category/Papier Peint" className="hover:text-white transition-colors">Papier Peint</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Aide</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contactez-nous</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Livraison</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Retours & Échanges</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 text-accent" />
                <span>Rue Salem cherkaoui 23,<br />Quartier des hôpitaux casablanca</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-accent" />
                <span>0763321581</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-accent" />
                <span>Bouabbimajid@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2026 BigStock. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-300">Politique de confidentialité</Link>
            <Link href="/terms" className="hover:text-gray-300">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

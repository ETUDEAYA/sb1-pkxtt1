import React, { useState } from 'react';
import { Home, Mail, Phone, Facebook, Twitter, Instagram, Youtube, CreditCard, MapPin } from 'lucide-react';
import SubscriptionPlansModal from './SubscriptionPlansModal';

export default function Footer() {
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'search':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'about':
        // Scroll to about section or navigate to about page
        break;
      case 'subscriptions':
        setShowSubscriptionPlans(true);
        break;
      default:
        break;
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">MaNouvelleMaison</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Fondée en 2024, MaNouvelleMaison révolutionne l'immobilier en Côte d'Ivoire avec une plateforme innovante et sécurisée.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation('search')}
                  className="hover:text-blue-500 transition-colors"
                >
                  Rechercher
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('subscriptions')}
                  className="hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Plans d'abonnement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="hover:text-blue-500 transition-colors"
                >
                  À Propos
                </button>
              </li>
            </ul>
          </div>

          {/* Communes */}
          <div>
            <h3 className="text-white font-semibold mb-3">Communes</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Cocody</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Marcory</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Plateau</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Yopougon</a></li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+225 07 07 07 07 07</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>contact@manouvellemaison.ci</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p>Cocody, Riviera Palmeraie</p>
                  <p>Non loin du restaurant Roi du Poulet</p>
                  <p>Rue I 128, 1er étage porte 4</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} MaNouvelleMaison. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500 transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>

      <SubscriptionPlansModal
        isOpen={showSubscriptionPlans}
        onClose={() => setShowSubscriptionPlans(false)}
      />
    </footer>
  );
}
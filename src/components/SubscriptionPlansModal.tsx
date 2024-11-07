import React from 'react';
import { X, Check } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  price: string;
}

export default function SubscriptionModal({ isOpen, onClose, location, price }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const basePrice = parseInt(price.replace(/[^0-9]/g, ''));
  const subscriptionTiers = [
    {
      name: 'Basic',
      price: Math.round(basePrice * 0.01),
      features: [
        'Voir les détails des biens',
        'Filtres de recherche basiques',
        'Enregistrer vos favoris',
        'Support par email'
      ]
    },
    {
      name: 'Premium',
      price: Math.round(basePrice * 0.015),
      features: [
        'Tous les avantages Basic',
        'Visites virtuelles',
        'Planification prioritaire des visites',
        'Contact direct avec les propriétaires',
        'Support téléphonique 24/7'
      ]
    },
    {
      name: 'Elite',
      price: Math.round(basePrice * 0.02),
      features: [
        'Tous les avantages Premium',
        'Conseiller immobilier personnel',
        'Révision des documents juridiques',
        'Assistance au déménagement',
        'Accès exclusif aux biens',
        'Service de conciergerie'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Plans d'abonnement pour {location}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <p className="mt-2 text-gray-600">Choisissez le plan parfait pour votre recherche immobilière</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionTiers.map((tier) => (
            <div key={tier.name} className="border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">{new Intl.NumberFormat('fr-FR').format(tier.price)}</span>
                <span className="ml-2 text-gray-500">FCFA/mois</span>
              </div>
              <ul className="mt-6 space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                S'abonner maintenant
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
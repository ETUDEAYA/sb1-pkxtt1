import React from 'react';
import { 
  Home, 
  Building, 
  Hotel, 
  Warehouse, 
  Briefcase, 
  Store, 
  Key,
  Shield,
  Search,
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
}

const propertyTypes: PropertyType[] = [
  {
    id: 'apartment',
    name: 'Appartements',
    description: 'Studios, F2, F3, F4 et plus',
    icon: <Building className="w-8 h-8" />,
    count: 245
  },
  {
    id: 'house',
    name: 'Maisons',
    description: 'Maisons individuelles, jumelées',
    icon: <Home className="w-8 h-8" />,
    count: 183
  },
  {
    id: 'villa',
    name: 'Villas',
    description: 'Villas de luxe, résidences',
    icon: <Hotel className="w-8 h-8" />,
    count: 97
  },
  {
    id: 'warehouse',
    name: 'Entrepôts',
    description: 'Espaces de stockage, hangars',
    icon: <Warehouse className="w-8 h-8" />,
    count: 42
  },
  {
    id: 'office',
    name: 'Bureaux',
    description: 'Espaces professionnels',
    icon: <Briefcase className="w-8 h-8" />,
    count: 156
  },
  {
    id: 'commercial',
    name: 'Commerces',
    description: 'Boutiques, restaurants, locaux',
    icon: <Store className="w-8 h-8" />,
    count: 89
  }
];

export default function RentPage() {
  const { t } = useLanguage();

  const handleTypeClick = (typeId: string) => {
    // Handle property type selection
    console.log('Selected property type:', typeId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Que souhaitez-vous louer ?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sélectionnez le type de bien qui vous intéresse pour commencer votre recherche
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeClick(type.id)}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-xl">
                {type.count} disponibles
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {type.name}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {type.description}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <Key className="w-5 h-5" />
                  Voir les biens
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Pourquoi louer avec MaisonVue ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Locations Sécurisées</h3>
              <p className="text-gray-600">
                Tous nos biens sont vérifiés et les propriétaires sont identifiés
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Recherche Personnalisée</h3>
              <p className="text-gray-600">
                Trouvez exactement ce que vous cherchez grâce à nos filtres avancés
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Accompagnement Complet</h3>
              <p className="text-gray-600">
                De la visite à la signature, nous vous accompagnons à chaque étape
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const priceRanges = [
  { min: 0, max: 100000 },
  { min: 100000, max: 200000 },
  { min: 200000, max: 500000 },
  { min: 500000, max: 1000000 },
  { min: 1000000, max: null }
];

const zones = [
  { id: 'abobo', name: 'Abobo', city: 'Abidjan' },
  { id: 'adjame', name: 'Adjamé', city: 'Abidjan' },
  { id: 'attecoube', name: 'Attécoubé', city: 'Abidjan' },
  { id: 'cocody', name: 'Cocody', city: 'Abidjan' },
  { id: 'koumassi', name: 'Koumassi', city: 'Abidjan' },
  { id: 'marcory', name: 'Marcory', city: 'Abidjan' },
  { id: 'plateau', name: 'Plateau', city: 'Abidjan' },
  { id: 'portbouet', name: 'Port-Bouët', city: 'Abidjan' },
  { id: 'treichville', name: 'Treichville', city: 'Abidjan' },
  { id: 'yopougon', name: 'Yopougon', city: 'Abidjan' },
  { id: 'riviera', name: 'Riviera', city: 'Abidjan', district: 'Cocody' },
  { id: 'deuxplateau', name: 'Deux Plateaux', city: 'Abidjan', district: 'Cocody' },
  { id: 'angre', name: 'Angré', city: 'Abidjan', district: 'Cocody' },
  { id: 'zone4', name: 'Zone 4', city: 'Abidjan', district: 'Marcory' },
  { id: 'bietry', name: 'Biétry', city: 'Abidjan', district: 'Marcory' }
];

interface SearchFiltersProps {
  onSearch: (location: string) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showZones, setShowZones] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const filteredZones = zones.filter(zone => 
    (!selectedCity || zone.city === selectedCity) &&
    (!searchTerm || 
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (zone.district && zone.district.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const cities = [...new Set(zones.map(zone => zone.city))];

  const handleSearch = () => {
    if (!searchTerm) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSearch(searchTerm);
    }, 800);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Rechercher par commune ou quartier..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowZones(true);
            }}
            onFocus={() => setShowZones(true)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          
          {showZones && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredZones.length > 0 ? (
                filteredZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setSearchTerm(`${zone.name}${zone.district ? `, ${zone.district}` : ''}, ${zone.city}`);
                      setShowZones(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>
                      {zone.name}
                      {zone.district && <span className="text-gray-500">, {zone.district}</span>}
                      <span className="text-gray-500">, {zone.city}</span>
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">Aucune zone trouvée</div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('allCities')}</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select 
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('priceRange')}</option>
            {priceRanges.map((range, index) => (
              <option key={index} value={`${range.min}-${range.max}`}>
                {range.max 
                  ? `${formatPrice(range.min)} - ${formatPrice(range.max)} FCFA`
                  : `${formatPrice(range.min)}+ FCFA`}
              </option>
            ))}
          </select>
          
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>{t('propertyType')}</option>
            <option>{t('house')}</option>
            <option>{t('apartment')}</option>
            <option>{t('villa')}</option>
            <option>{t('studio')}</option>
          </select>
          
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            {t('moreFilters')}
          </button>
        </div>
      </div>

      {(searchTerm || selectedCity) && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {selectedCity && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {selectedCity}
              <button
                onClick={() => setSelectedCity('')}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchTerm}
          className={`
            px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold
            transform transition-all duration-200
            ${isLoading || !searchTerm ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105'}
            flex items-center gap-2 shadow-lg hover:shadow-xl
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              {t('searching')}
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {t('searchNow')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
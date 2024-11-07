import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpDown, MapPin, ArrowLeft } from 'lucide-react';
import PropertyCard from './PropertyCard';

interface SearchResultsProps {
  location: string;
  onBackToSearch: () => void;
}

export default function SearchResults({ location, onBackToSearch }: SearchResultsProps) {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState('newest');

  // Simulated property data for the selected location
  const searchResults = [
    {
      title: "Villa Moderne",
      price: "450,000",
      location: location,
      beds: 4,
      baths: 3,
      size: "280 m²",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375469031.hd.mp4?s=9f25f4a9d4caa726f9dd3d6d1439ef96ca129d42&profile_id=174&oauth2_token_id=57447761",
    },
    {
      title: "Appartement Luxueux",
      price: "280,000",
      location: location,
      beds: 3,
      baths: 2,
      size: "150 m²",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375468808.hd.mp4?s=382361c37bb3ad3cb50b424ef84eb54dd386bf54&profile_id=174&oauth2_token_id=57447761",
    },
    {
      title: "Maison Familiale",
      price: "320,000",
      location: location,
      beds: 5,
      baths: 3,
      size: "220 m²",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375468748.hd.mp4?s=4f31d8fcd0e5c666c6b6a9ff3a959fc4b0aa03c4&profile_id=174&oauth2_token_id=57447761",
    },
    {
      title: "Studio Moderne",
      price: "150,000",
      location: location,
      beds: 1,
      baths: 1,
      size: "45 m²",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375469031.hd.mp4?s=9f25f4a9d4caa726f9dd3d6d1439ef96ca129d42&profile_id=174&oauth2_token_id=57447761",
    },
    {
      title: "Penthouse Vue Mer",
      price: "580,000",
      location: location,
      beds: 4,
      baths: 3,
      size: "300 m²",
      imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375468748.hd.mp4?s=4f31d8fcd0e5c666c6b6a9ff3a959fc4b0aa03c4&profile_id=174&oauth2_token_id=57447761",
    },
    {
      title: "Duplex Contemporain",
      price: "420,000",
      location: location,
      beds: 3,
      baths: 2,
      size: "180 m²",
      imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375469031.hd.mp4?s=9f25f4a9d4caa726f9dd3d6d1439ef96ca129d42&profile_id=174&oauth2_token_id=57447761",
    },
    {
      title: "Loft Industrial",
      price: "290,000",
      location: location,
      beds: 2,
      baths: 2,
      size: "120 m²",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375468808.hd.mp4?s=382361c37bb3ad3cb50b424ef84eb54dd386bf54&profile_id=174&oauth2_token_id=57447761",
    },
    {
      title: "Villa avec Piscine",
      price: "650,000",
      location: location,
      beds: 6,
      baths: 4,
      size: "400 m²",
      imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
      videoUrl: "https://player.vimeo.com/external/375468748.hd.mp4?s=4f31d8fcd0e5c666c6b6a9ff3a959fc4b0aa03c4&profile_id=174&oauth2_token_id=57447761",
    }
  ];

  // Sort properties based on selected option
  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case 'priceLowToHigh':
        return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
      case 'priceHighToLow':
        return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBackToSearch}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('backToSearch')}
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('searchResults')}</h1>
            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <MapPin className="w-5 h-5" />
              {t('propertiesFound')} {location}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <ArrowUpDown className="w-5 h-5 text-gray-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-none bg-transparent focus:ring-0 text-gray-600 pr-8"
            >
              <option value="newest">{t('newest')}</option>
              <option value="priceLowToHigh">{t('priceLowToHigh')}</option>
              <option value="priceHighToLow">{t('priceHighToLow')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedResults.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}
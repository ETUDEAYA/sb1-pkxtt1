import React, { useState } from 'react';
import { MapPin, Phone, Mail, Building, Star, Calendar } from 'lucide-react';
import PropertyCard from './PropertyCard';
import AppointmentModal from './AppointmentModal';
import { useLanguage } from '../contexts/LanguageContext';

interface Property {
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  size: string;
  imageUrl: string;
  videoUrl: string;
  available: boolean;
}

interface Notary {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  address: string;
  phone: string;
  email: string;
  experience: string;
  rating: number;
  specialties: string[];
  properties: Property[];
}

const notaries: Notary[] = [
  {
    id: 1,
    name: "Me. Sophie Dubois",
    title: "Notaire Principal",
    imageUrl: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80",
    address: "10 Avenue des Champs-Élysées, Cocody",
    phone: "+225 27 22 44 45 46",
    email: "sophie.dubois@notaires.ci",
    experience: "15 ans d'expérience",
    rating: 4.9,
    specialties: ["Immobilier résidentiel", "Droit successoral"],
    properties: [
      {
        title: "Villa Moderne Cocody",
        price: "450000",
        location: "Cocody",
        beds: 4,
        baths: 3,
        size: "280 m²",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
        videoUrl: "https://player.vimeo.com/external/375469031.hd.mp4?s=9f25f4a9d4caa726f9dd3d6d1439ef96ca129d42&profile_id=174&oauth2_token_id=57447761",
        available: true
      },
      {
        title: "Appartement Riviera",
        price: "280000",
        location: "Riviera",
        beds: 3,
        baths: 2,
        size: "150 m²",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
        videoUrl: "https://player.vimeo.com/external/375468808.hd.mp4?s=382361c37bb3ad3cb50b424ef84eb54dd386bf54&profile_id=174&oauth2_token_id=57447761",
        available: true
      }
    ]
  },
  {
    id: 2,
    name: "Me. Jean Kouassi",
    title: "Notaire Associé",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    address: "25 Boulevard de Marseille, Marcory",
    phone: "+225 27 22 41 42 43",
    email: "jean.kouassi@notaires.ci",
    experience: "20 ans d'expérience",
    rating: 4.8,
    specialties: ["Immobilier commercial", "Droit des sociétés"],
    properties: []
  },
  {
    id: 3,
    name: "Me. Marie Koné",
    title: "Notaire Conseil",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    address: "5 Rue des Jardins, Plateau",
    phone: "+225 27 22 47 48 49",
    email: "marie.kone@notaires.ci",
    experience: "12 ans d'expérience",
    rating: 4.7,
    specialties: ["Immobilier de luxe", "Droit patrimonial"],
    properties: [
      {
        title: "Penthouse Plateau",
        price: "580000",
        location: "Plateau",
        beds: 4,
        baths: 3,
        size: "300 m²",
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80",
        videoUrl: "https://player.vimeo.com/external/375468748.hd.mp4?s=4f31d8fcd0e5c666c6b6a9ff3a959fc4b0aa03c4&profile_id=174&oauth2_token_id=57447761",
        available: true
      }
    ]
  },
  {
    id: 4,
    name: "Me. Paul Aka",
    title: "Notaire Senior",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    address: "15 Avenue de la République, Yopougon",
    phone: "+225 27 22 40 41 42",
    email: "paul.aka@notaires.ci",
    experience: "18 ans d'expérience",
    rating: 4.6,
    specialties: ["Immobilier résidentiel", "Droit familial"],
    properties: [
      {
        title: "Villa Yopougon",
        price: "320000",
        location: "Yopougon",
        beds: 5,
        baths: 3,
        size: "220 m²",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
        videoUrl: "https://player.vimeo.com/external/375468748.hd.mp4?s=4f31d8fcd0e5c666c6b6a9ff3a959fc4b0aa03c4&profile_id=174&oauth2_token_id=57447761",
        available: true
      }
    ]
  },
  {
    id: 5,
    name: "Me. Claire Diallo",
    title: "Notaire Conseil",
    imageUrl: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80",
    address: "30 Rue du Commerce, Treichville",
    phone: "+225 27 22 43 44 45",
    email: "claire.diallo@notaires.ci",
    experience: "10 ans d'expérience",
    rating: 4.5,
    specialties: ["Immobilier neuf", "Droit des contrats"],
    properties: []
  }
];

export default function NotariesPage() {
  const { t } = useLanguage();
  const [selectedNotary, setSelectedNotary] = useState<Notary | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentNotary, setAppointmentNotary] = useState<Notary | null>(null);

  const handleAppointmentRequest = (notary: Notary) => {
    setAppointmentNotary(notary);
    setShowAppointmentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notaires Partenaires</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre réseau de notaires certifiés pour vos transactions immobilières
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notaries.map((notary) => (
            <div key={notary.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src={notary.imageUrl} 
                  alt={notary.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{notary.rating}</span>
                </div>
                {notary.properties.length > 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-blue-800 font-medium text-sm pulse-properties">
                    {notary.properties.length} bien{notary.properties.length > 1 ? 's' : ''} disponible{notary.properties.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{notary.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{notary.title}</p>
                
                <div className="space-y-3 text-gray-600 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{notary.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{notary.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{notary.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-400" />
                    <span>{notary.experience}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {notary.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleAppointmentRequest(notary)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                  </button>

                  {notary.properties.length > 0 && (
                    <button
                      onClick={() => setSelectedNotary(selectedNotary?.id === notary.id ? null : notary)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2
                        ${selectedNotary?.id === notary.id 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <Building className="w-5 h-5" />
                      {selectedNotary?.id === notary.id ? 'Masquer les biens' : `Voir les ${notary.properties.length} biens disponibles`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedNotary && selectedNotary.properties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Biens disponibles chez {selectedNotary.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedNotary.properties.map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
          </div>
        )}

        {appointmentNotary && (
          <AppointmentModal
            isOpen={showAppointmentModal}
            onClose={() => setShowAppointmentModal(false)}
            notary={appointmentNotary}
          />
        )}
      </div>
    </div>
  );
}
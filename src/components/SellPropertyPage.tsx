import React, { useState } from 'react';
import { Upload, Home, MapPin, Building, Ruler, Camera, FileText, AlertCircle, X } from 'lucide-react';

interface PropertyForm {
  title: string;
  type: string;
  address: string;
  size: string;
  bedrooms: string;
  bathrooms: string;
  price: string;
  description: string;
  ownershipProof: File | null;
  identityProof: File | null;
  propertyPhotos: File[];
}

export default function SellPropertyPage() {
  const [formData, setFormData] = useState<PropertyForm>({
    title: '',
    type: '',
    address: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    description: '',
    ownershipProof: null,
    identityProof: null,
    propertyPhotos: []
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'ownershipProof' | 'identityProof' | 'propertyPhotos') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'propertyPhotos') {
      setFormData(prev => ({
        ...prev,
        propertyPhotos: [...prev.propertyPhotos, ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      setFormData(prev => ({
        ...prev,
        propertyPhotos: [...prev.propertyPhotos, ...Array.from(files)]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      propertyPhotos: prev.propertyPhotos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ownershipProof || !formData.identityProof) {
      alert('Veuillez fournir les documents requis (titre de propriété et pièce d\'identité)');
      return;
    }

    if (formData.propertyPhotos.length < 3) {
      alert('Veuillez ajouter au moins 3 photos de votre bien');
      return;
    }

    // Handle form submission
    console.log('Property submission:', formData);
    alert('Votre bien a été soumis avec succès ! Notre équipe va examiner votre dossier.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vendre votre bien</h1>
          <p className="text-xl text-gray-600">
            Remplissez le formulaire ci-dessous avec les informations de votre bien
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Informations de base</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de l'annonce
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Villa moderne avec piscine"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type de bien
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="house">Maison</option>
                      <option value="apartment">Appartement</option>
                      <option value="villa">Villa</option>
                      <option value="land">Terrain</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse complète
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Adresse complète du bien"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Superficie (m²)
                  </label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: 150"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Prix demandé (FCFA)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₣</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: 75000000"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Détails du bien</h2>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description détaillée
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Décrivez votre bien en détail..."
                  required
                />
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Documents requis</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Documents obligatoires</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Pour garantir la sécurité des transactions, nous exigeons une preuve de propriété
                      valide et une pièce d'identité. Ces documents seront vérifiés par notre équipe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de propriété
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'ownershipProof')}
                      className="hidden"
                      id="ownershipProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <label
                      htmlFor="ownershipProof"
                      className="flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {formData.ownershipProof ? formData.ownershipProof.name : 'Ajouter le titre de propriété'}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pièce d'identité
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'identityProof')}
                      className="hidden"
                      id="identityProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <label
                      htmlFor="identityProof"
                      className="flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {formData.identityProof ? formData.identityProof.name : 'Ajouter une pièce d\'identité'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Photos */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Photos du bien</h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-600 mb-4">
                    Glissez vos photos ici ou
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer ml-1">
                      parcourez
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'propertyPhotos')}
                        className="hidden"
                        multiple
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Format accepté: JPG, PNG. Taille maximale: 5MB
                  </p>
                </div>
              </div>

              {formData.propertyPhotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.propertyPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Property photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Soumettre mon bien
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
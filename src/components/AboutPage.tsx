import React from 'react';
import { Home, Users, Award, Shield, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À Propos de MaisonVue</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre partenaire de confiance pour trouver le logement idéal en Côte d'Ivoire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Notre Mission</h3>
            <p className="text-gray-600">
              Simplifier la recherche de logement en Côte d'Ivoire en offrant une plateforme moderne, 
              transparente et efficace pour connecter propriétaires et locataires.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Notre Engagement</h3>
            <p className="text-gray-600">
              Garantir une expérience utilisateur exceptionnelle avec des annonces vérifiées, 
              des visites virtuelles et un accompagnement personnalisé.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Nos Valeurs</h3>
            <p className="text-gray-600">
              Intégrité, innovation et satisfaction client sont au cœur de notre approche 
              pour révolutionner le marché immobilier ivoirien.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Pourquoi Choisir MaisonVue ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Annonces Vérifiées</h4>
                    <p className="text-gray-600">Toutes nos annonces sont minutieusement vérifiées pour garantir leur authenticité.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Visites Virtuelles</h4>
                    <p className="text-gray-600">Explorez les propriétés en détail grâce à nos visites virtuelles immersives.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Support 24/7</h4>
                    <p className="text-gray-600">Une équipe dédiée à votre service pour vous accompagner à chaque étape.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Processus Simplifié</h4>
                    <p className="text-gray-600">Une plateforme intuitive pour une recherche de logement sans stress.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
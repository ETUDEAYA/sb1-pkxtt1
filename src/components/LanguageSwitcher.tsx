import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Globe className="w-5 h-5" />
      <span className="font-medium">{language.toUpperCase()}</span>
    </button>
  );
}
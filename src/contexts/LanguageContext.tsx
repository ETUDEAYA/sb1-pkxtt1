import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

export const translations: Translations = {
  findDreamHome: {
    en: "Find Your Dream Home",
    fr: "Trouvez la Maison de vos Rêves"
  },
  searchResults: {
    en: "Search Results",
    fr: "Résultats de Recherche"
  },
  propertiesFound: {
    en: "Properties found in",
    fr: "Propriétés trouvées à"
  },
  newest: {
    en: "Newest First",
    fr: "Plus Récent"
  },
  priceLowToHigh: {
    en: "Price: Low to High",
    fr: "Prix: Croissant"
  },
  priceHighToLow: {
    en: "Price: High to Low",
    fr: "Prix: Décroissant"
  },
  backToSearch: {
    en: "Back to Search",
    fr: "Retour à la Recherche"
  },
  rent: {
    en: "Rent",
    fr: "Louer"
  },
  buy: {
    en: "Buy",
    fr: "Acheter"
  },
  sell: {
    en: "Sell",
    fr: "Vendre"
  },
  about: {
    en: "About",
    fr: "À Propos"
  },
  signIn: {
    en: "Sign In",
    fr: "Se Connecter"
  },
  createAccount: {
    en: "Create Account",
    fr: "Créer un Compte"
  },
  fullName: {
    en: "Full Name",
    fr: "Nom Complet"
  },
  email: {
    en: "Email",
    fr: "Email"
  },
  password: {
    en: "Password",
    fr: "Mot de passe"
  },
  enterFullName: {
    en: "Enter your full name",
    fr: "Entrez votre nom complet"
  },
  enterEmail: {
    en: "Enter your email",
    fr: "Entrez votre email"
  },
  enterPassword: {
    en: "Enter your password",
    fr: "Entrez votre mot de passe"
  },
  forgotPassword: {
    en: "Forgot Password?",
    fr: "Mot de passe oublié ?"
  },
  noAccount: {
    en: "Don't have an account?",
    fr: "Vous n'avez pas de compte ?"
  },
  alreadyHaveAccount: {
    en: "Already have an account?",
    fr: "Vous avez déjà un compte ?"
  },
  allCities: {
    en: "All Cities",
    fr: "Toutes les villes"
  },
  priceRange: {
    en: "Price Range",
    fr: "Fourchette de prix"
  },
  propertyType: {
    en: "Property Type",
    fr: "Type de bien"
  },
  house: {
    en: "House",
    fr: "Maison"
  },
  apartment: {
    en: "Apartment",
    fr: "Appartement"
  },
  villa: {
    en: "Villa",
    fr: "Villa"
  },
  studio: {
    en: "Studio",
    fr: "Studio"
  },
  moreFilters: {
    en: "More Filters",
    fr: "Plus de filtres"
  },
  searching: {
    en: "Searching...",
    fr: "Recherche en cours..."
  },
  searchNow: {
    en: "Search Now",
    fr: "Rechercher maintenant"
  },
  perMonth: {
    en: "/month",
    fr: "/mois"
  },
  currency: {
    en: "FCFA",
    fr: "FCFA"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
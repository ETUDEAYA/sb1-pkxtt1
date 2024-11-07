import React, { useState } from 'react';
import { Home, Bell, User, Menu } from 'lucide-react';
import PropertyCard from './components/PropertyCard';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import AuthModal from './components/AuthModal';
import AboutPage from './components/AboutPage';
import NotariesPage from './components/NotariesPage';
import SellPropertyPage from './components/SellPropertyPage';
import RentPage from './components/RentPage';
import { useLanguage } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showNotaries, setShowNotaries] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [showRent, setShowRent] = useState(false);
  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (location: string) => {
    setSearchLocation(location);
    setShowAbout(false);
    setShowNotaries(false);
    setShowSell(false);
    setShowRent(false);
  };

  const handleBackToSearch = () => {
    setSearchLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
              setShowAbout(false);
              setSearchLocation(null);
              setShowNotaries(false);
              setShowSell(false);
              setShowRent(false);
            }}>
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">MaNouvelleMaison</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => {
                  setShowRent(true);
                  setShowAbout(false);
                  setSearchLocation(null);
                  setShowNotaries(false);
                  setShowSell(false);
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t('rent')}
              </button>
              <button 
                onClick={() => {
                  setShowNotaries(true);
                  setShowAbout(false);
                  setSearchLocation(null);
                  setShowSell(false);
                  setShowRent(false);
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Notaires
              </button>
              <button 
                onClick={() => {
                  setShowSell(true);
                  setShowAbout(false);
                  setSearchLocation(null);
                  setShowNotaries(false);
                  setShowRent(false);
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t('sell')}
              </button>
              <button 
                onClick={() => {
                  setShowAbout(true);
                  setSearchLocation(null);
                  setShowNotaries(false);
                  setShowSell(false);
                  setShowRent(false);
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t('about')}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
              
              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <User className="w-6 h-6" />
                    <span>{user?.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('signIn')}
                </button>
              )}
              
              <button className="md:hidden">
                <Menu className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {!searchLocation && !showAbout && !showNotaries && !showSell && !showRent && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('findDreamHome')}
              </h1>
            </div>
            <SearchFilters onSearch={handleSearch} />
          </div>
        )}

        {searchLocation && (
          <SearchResults 
            location={searchLocation}
            onBackToSearch={handleBackToSearch}
          />
        )}

        {showAbout && <AboutPage />}
        {showNotaries && <NotariesPage />}
        {showSell && <SellPropertyPage />}
        {showRent && <RentPage />}
      </main>

      <Footer />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default App;
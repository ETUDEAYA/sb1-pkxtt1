import React, { useState, useRef } from 'react';
import { Heart, Share2, Play, Calendar, Key, AlertCircle, Loader2, Pause } from 'lucide-react';
import AppointmentModal from './AppointmentModal';
import AuthModal from './AuthModal';
import RentalTermsModal from './RentalTermsModal';
import VisitRequestModal from './VisitRequestModal';
import SubscriptionModal from './SubscriptionModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface PropertyProps {
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  size: string;
  imageUrl: string;
  videoUrl: string;
  available: boolean;
  notary?: {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    email: string;
  };
}

export default function PropertyCard({
  title,
  price,
  location,
  beds,
  baths,
  size,
  imageUrl,
  videoUrl,
  available,
  notary
}: PropertyProps) {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRentalTermsModal, setShowRentalTermsModal] = useState(false);
  const [showVisitRequestModal, setShowVisitRequestModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingAction, setPendingAction] = useState<'visit' | 'rent' | null>(null);

  const formattedPrice = new Intl.NumberFormat('fr-FR').format(parseInt(price.replace(/[^0-9]/g, '')));

  const toggleVideo = () => {
    if (!showVideo) {
      setShowVideo(true);
      setIsPlaying(true);
    } else {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleInterestClick = () => {
    if (!available) return;

    if (notary) {
      if (isAuthenticated) {
        setShowAppointmentModal(true);
      } else {
        setPendingAction('visit');
        setShowAuthModal(true);
      }
    } else {
      if (isAuthenticated) {
        setShowActionMenu(!showActionMenu);
      } else {
        setShowAuthModal(true);
      }
    }
  };

  const handleAction = async (action: 'visit' | 'rent') => {
    if (!isAuthenticated) {
      setPendingAction(action);
      setShowAuthModal(true);
      return;
    }

    setShowActionMenu(false);
    setIsProcessing(true);

    try {
      if (action === 'visit') {
        setShowVisitRequestModal(true);
      } else {
        setShowRentalTermsModal(true);
      }
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    
    if (pendingAction) {
      handleAction(pendingAction);
      setPendingAction(null);
    } else {
      setShowActionMenu(true);
    }
  };

  const handleRentalComplete = () => {
    setShowRentalTermsModal(false);
  };

  const handleVisitComplete = () => {
    setShowVisitRequestModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative">
          {showVideo ? (
            <div className="relative">
              <video 
                ref={videoRef}
                className="w-full h-64 object-cover"
                src={videoUrl}
                autoPlay
                onEnded={handleVideoEnded}
              />
              <button
                onClick={toggleVideo}
                className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-blue-600" />
                ) : (
                  <Play className="w-5 h-5 text-blue-600" />
                )}
              </button>
            </div>
          ) : (
            <>
              <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
              <button
                onClick={toggleVideo}
                className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Play className="w-5 h-5 text-blue-600" />
              </button>
            </>
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => !isAuthenticated && setShowAuthModal(true)}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-1 rounded-full text-white font-medium text-sm ${available ? 'blink-available' : 'blink-unavailable'}`}>
              {available ? 'Disponible' : 'Indisponible'}
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-500">{location}</p>
            </div>
            <p className="text-xl font-bold text-blue-600">
              {formattedPrice} {t('currency')}
            </p>
          </div>
          <div className="flex justify-between text-gray-600 border-t pt-4">
            <span>{beds} Beds</span>
            <span>{baths} Baths</span>
            <span>{size}</span>
          </div>

          {notary && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Géré par Me. {notary.name}
              </p>
            </div>
          )}
          
          <div className="mt-4 relative">
            <button
              onClick={handleInterestClick}
              disabled={!available || isProcessing}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2
                ${isProcessing 
                  ? 'bg-gray-100 text-gray-400 cursor-wait'
                  : available 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Traitement en cours...
                </>
              ) : notary ? (
                <>
                  <Calendar className="w-5 h-5" />
                  Prendre rendez-vous avec le notaire
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  Je suis intéressé
                </>
              )}
            </button>

            {showActionMenu && available && !notary && !isProcessing && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border overflow-hidden z-10">
                <button
                  onClick={() => handleAction('visit')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Planifier une visite</div>
                    <div className="text-sm text-gray-500">Voir le bien en personne</div>
                  </div>
                </button>
                <button
                  onClick={() => handleAction('rent')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Key className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Louer maintenant</div>
                    <div className="text-sm text-gray-500">Processus de location en ligne</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {!isAuthenticated && !notary && available && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Connectez-vous pour planifier une visite ou louer ce bien
              </p>
            </div>
          )}

          <button 
            onClick={() => setShowSubscriptionModal(true)}
            className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Voir les plans d'abonnement
          </button>
        </div>
      </div>

      {notary && (
        <AppointmentModal 
          isOpen={showAppointmentModal}
          onClose={() => setShowAppointmentModal(false)}
          notary={notary}
        />
      )}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingAction(null);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        location={location}
        price={price}
      />

      <RentalTermsModal
        isOpen={showRentalTermsModal}
        onClose={() => setShowRentalTermsModal(false)}
        onComplete={handleRentalComplete}
      />

      <VisitRequestModal
        isOpen={showVisitRequestModal}
        onClose={() => setShowVisitRequestModal(false)}
        onComplete={handleVisitComplete}
        propertyTitle={title}
        propertyLocation={location}
      />
    </>
  );
}
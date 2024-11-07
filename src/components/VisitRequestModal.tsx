import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

interface VisitRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  propertyTitle: string;
  propertyLocation: string;
}

export default function VisitRequestModal({ isOpen, onClose, onComplete, propertyTitle, propertyLocation }: VisitRequestModalProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Veuillez sélectionner un mode de paiement.');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(3);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      alert('Une erreur est survenue lors du paiement. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 && "Planifier une visite"}
              {step === 2 && "Paiement des frais de visite"}
              {step === 3 && "Confirmation"}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={isProcessing}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmitRequest} className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">{propertyTitle}</h3>
                <p className="text-blue-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {propertyLocation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date souhaitée
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Heure souhaitée
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes supplémentaires (optionnel)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Questions ou informations complémentaires..."
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Frais de visite</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Des frais de visite de 5 000 FCFA sont requis pour confirmer votre rendez-vous.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continuer vers le paiement
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Frais de visite:</span>
                  <span className="text-xl font-bold">5 000 FCFA</span>
                </div>
                <p className="text-sm text-gray-600">
                  Sélectionnez votre mode de paiement préféré ci-dessous.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="orangeMoney"
                    name="payment"
                    value="orangeMoney"
                    checked={paymentMethod === 'orangeMoney'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="orangeMoney">Orange Money</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="moovMoney"
                    name="payment"
                    value="moovMoney"
                    checked={paymentMethod === 'moovMoney'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="moovMoney">Moov Money</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="mtnMoney"
                    name="payment"
                    value="mtnMoney"
                    checked={paymentMethod === 'mtnMoney'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="mtnMoney">MTN Money</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="waveMoney"
                    name="payment"
                    value="waveMoney"
                    checked={paymentMethod === 'waveMoney'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="waveMoney">Wave</label>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Payer maintenant
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Visite planifiée avec succès!
              </h3>
              <p className="text-gray-600">
                Votre demande de visite a été confirmée. Vous recevrez un email avec tous les détails du rendez-vous.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
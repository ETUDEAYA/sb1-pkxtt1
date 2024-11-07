import React, { useState } from 'react';
import { X, FileCheck, CreditCard, AlertCircle, Upload, Loader2, CheckCircle } from 'lucide-react';

interface RentalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function RentalTermsModal({ isOpen, onClose, onComplete }: RentalTermsModalProps) {
  const [step, setStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [identityDocument, setIdentityDocument] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setIdentityDocument(files[0]);
    }
  };

  const handlePayment = async () => {
    if (!identityDocument || !paymentMethod) {
      alert('Veuillez fournir tous les documents requis et sélectionner un mode de paiement.');
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
              {step === 1 && "Conditions de location"}
              {step === 2 && "Documents et paiement"}
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
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Important</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Pour initier votre demande de location, des frais d'ouverture de dossier de 12 000 FCFA sont requis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <h3>Conditions Générales de Location</h3>
                <p>1. Les frais d'ouverture de dossier sont non remboursables.</p>
                <p>2. La fourniture de faux documents entraînera des poursuites judiciaires.</p>
                <p>3. Le paiement des frais ne garantit pas l'obtention du logement.</p>
                <p>4. Un délai de traitement de 48h ouvrées est nécessaire.</p>
                {/* Add more terms as needed */}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  J'ai lu et j'accepte les conditions générales de location et je m'engage à payer les frais d'ouverture de dossier de 12 000 FCFA
                </label>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!acceptedTerms}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                Continuer
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">1. Pièce d'identité</h3>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="identityDoc"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <label
                    htmlFor="identityDoc"
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">
                      {identityDocument ? identityDocument.name : "Ajouter votre pièce d'identité"}
                    </span>
                  </label>
                </div>

                <h3 className="font-semibold text-gray-900 pt-4">2. Paiement</h3>
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

                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total à payer:</span>
                    <span className="text-xl font-bold">12 000 FCFA</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!identityDocument || !paymentMethod || isProcessing}
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
                    Procéder au paiement
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Paiement effectué avec succès!
              </h3>
              <p className="text-gray-600">
                Votre dossier de location a été initié. Vous recevrez un email de confirmation avec les prochaines étapes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
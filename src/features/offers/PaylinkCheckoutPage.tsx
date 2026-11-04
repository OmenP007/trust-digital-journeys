import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@/lib/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { Button } from '@/components/ui/TrustButton';
import { Card, CardContent } from '@/components/ui/TrustCard';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { formatFCFA, formatDate } from '@/lib/utils';
import { Offer } from '@/types/escrow';
import { TrustLogo } from '@/components/ui/TrustLogo';
import { TrustLoader } from '@/components/ui/TrustLoader';

export const PaylinkCheckoutPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    // Indicateur public : aucun blocage si l'appel échoue.
    api.getPublicConfig()
      .then((config) => setTestMode(Boolean(config.test_mode)))
      .catch(() => setTestMode(false));
  }, []);

  useEffect(() => {
    const fetchOffer = async () => {
      setLoading(true);
      try {
        if (!code) return;
        const res = await api.getOffer(code);
        setOffer(res);
      } catch {
        setError('Offre introuvable ou inactive.');
      } finally {
        setLoading(false);
      }
    };
    if (code) fetchOffer();
  }, [code]);

  const handleCheckout = async () => {
    if (!code) return;
    if (!isAuthenticated) {
      sessionStorage.setItem('checkout_redirect', code || '');
      navigate(`/login?next=/pay/${code}`, {
        state: { message: 'Vous devez vous connecter pour finaliser ce paiement sécurisé.' },
      });
      return;
    }
    setError(null);
    setCheckingOut(true);
    try {
      const res = await api.checkoutOffer(code);
      if (res.checkout_url && res.status === 'CREATED') {
        window.location.href = res.checkout_url;
        return;
      }
      if (res && res.id) {
        navigate(`/escrow/${res.id}`);
      } else {
        navigate('/escrow');
      }
    } catch (err: any) {
      setError(err.message || 'Impossible de finaliser le paiement.');
      setCheckingOut(false);
    }
  };

  if (!loading && !offer) {
    return <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground"><p>{error || "Offre introuvable ou inactive."}</p><Button onClick={() => navigate("/")}>Retour à TRUST</Button></div>;
  }

  if (loading || !offer) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F14] flex items-center justify-center p-4">
        <TrustLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F14] text-slate-900 dark:text-[#F4F6FC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'rgba(123,61,255,0.08)' }}
      />
      <div className="max-w-lg w-full mx-auto space-y-6 opacity-0 animate-enter stagger-1" style={{ animationFillMode: 'forwards' }}>
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center mb-2">
            <TrustLogo variant="full" height={28} />
          </div>
          <p className="text-xs text-slate-400">Paiement Sécurisé Garanti par Séquestre</p>
        </div>

        {testMode && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>
              <strong>Environnement de test — aucun paiement réel.</strong>{' '}
              Les montants affichés sont fictifs : aucun débit ne sera effectué sur votre compte.
            </span>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Checkout Card */}
        <Card className="p-6 sm:p-8 space-y-6 border-slate-200/80 dark:border-slate-800/80 shadow-2xl opacity-0 animate-modal-enter" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Offre Commerciale
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {offer.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Vendeur vérifié : <strong className="text-slate-700 dark:text-slate-300">@{offer.seller_username}</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-[#7B3DFF] dark:text-[#a277ff]">
                {formatFCFA(offer.amount)}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1A2030] text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <p className="font-semibold text-slate-900 dark:text-white">Description de l'article :</p>
            <p>{offer.description}</p>
            {offer.delivery_terms && (
              <p className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <strong>Conditions :</strong> {offer.delivery_terms}
              </p>
            )}
          </div>

          {/* Guarantee info */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck size={16} />
              <span>Garantie Séquestre TRUST</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Votre argent est conservé sous séquestre. Le vendeur ne sera payé que lorsque vous lui transmettrez votre code secret OTP lors de la livraison.
            </p>
          </div>

          {/* QR Code Quick Mobile Payment */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B3DFF] dark:text-[#00E5FF] hover:underline"
            >
              <QrCode size={14} />
              <span>{showQr ? 'Masquer le QR Code' : 'Payer depuis mon mobile (Scanner le QR Code)'}</span>
            </button>

            {showQr && (
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#1A2030] border border-slate-200 dark:border-slate-800 text-center animate-enter">
                <div className="p-3 bg-white rounded-xl inline-block mx-auto shadow-md">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=4&data=${encodeURIComponent(
                      window.location.href
                    )}`}
                    alt="QR Code Paylink"
                    className="w-36 h-36 object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Scannez avec votre téléphone pour ouvrir le paiement Wave / Orange Money.
                </p>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            isLoading={checkingOut}
            onClick={handleCheckout}
            className="w-full gap-2 shadow-[0_4px_16px_rgba(123,61,255,0.3)]"
          >
            <Lock size={16} />
            <span>Séquestrer {formatFCFA(offer.amount)}</span>
            <ArrowRight size={16} />
          </Button>
        </Card>
      </div>
    </div>
  );
};

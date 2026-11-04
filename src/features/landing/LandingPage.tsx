import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@/lib/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle,
  FileText,
  Key,
  CreditCard,
  Building2,
  Users,
  ChevronDown,
  Zap,
  RefreshCw,
  ExternalLink,
  Sun,
  Moon,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/TrustButton';
import { useTheme } from '@/context/ThemeContext';
import { TrustLogo } from '@/components/ui/TrustLogo';

/* ─── HOOK: useScrollReveal ────────────────────────────────────────────────
 * Active automatiquement les animations d'apparition au scroll via
 * IntersectionObserver (léger, natif, 0 dépendance externe).
 * ──────────────────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stat'
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── COMPOSANT VIDÉO RÉUTILISABLE: HeroMotionVideo ───────────────────────
 * Emplacement dédié et optimisé pour la future vidéo motion design TRUST.
 * Bascule dynamiquement selon le thème clair / sombre.
 * Dispose d'une bordure lumineuse cyberpunk/fintech et d'un conteneur 16:9.
 * ──────────────────────────────────────────────────────────────────────── */
export interface HeroMotionVideoProps {
  resolvedTheme: string;
  className?: string;
  poster?: string;
}

export const HeroMotionVideo: React.FC<HeroMotionVideoProps> = ({
  resolvedTheme,
  className = '',
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  const videoSrc =
    resolvedTheme === 'dark'
      ? '/__l5e/assets-v1/ecb091ff-7155-44cb-8bb8-b60b722bb8b6/trust-motion-sombre.mp4'
      : '/__l5e/assets-v1/0c6e64d3-30a2-4975-8d71-d5da89ef8034/trust-motion-clair.mp4';

  useEffect(() => {
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [videoSrc]);

  return (
    <div className={`relative w-full max-w-xl mx-auto lg:max-w-none ${className}`}>
      {/* Halo d'ambiance dégradé cyan / violet */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#7B3DFF] via-[#00E5FF] to-[#7B3DFF] opacity-30 dark:opacity-40 blur-xl animate-glow-float pointer-events-none" />

      {/* Cadre mockup haute finition */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#0E131C]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 group hover:border-[#7B3DFF]/50">
        {/* Barre supérieure épurée style lecteur / app */}
        <div className="h-8 px-4 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center bg-slate-100/50 dark:bg-slate-900/50 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* Zone Vidéo avec ratio préservé */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
          {!hasError ? (
            <video
              ref={videoRef}
              key={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              poster={poster}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover transition-opacity duration-500"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            /* Fallback gracieux si la vidéo est en cours de chargement */
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <div className="w-16 h-16 rounded-2xl bg-[#7B3DFF]/10 text-[#7B3DFF] flex items-center justify-center mb-4">
                <Play size={28} className="translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Overlay dégradé subtil bas de vidéo */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

/* ─── COMPOSANT BRANDING MOTION DÉCORATIF ────────────────────────────────── */
const MotionBrandAsset: React.FC<{ resolvedTheme: string; className?: string }> = ({
  resolvedTheme,
  className = '',
}) => {
  const src =
    resolvedTheme === 'dark'
      ? '/__l5e/assets-v1/f3d44012-dbb8-44c3-8150-46de405968e3/trust-motion-sombre.svg'
      : '/__l5e/assets-v1/1991700e-df0c-469d-832e-0f8e466186fe/trust-motion-clair.svg';

  return (
    <img
      src={src}
      alt="TRUST Motion Branding"
      className={`object-contain pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  // Initialisation de la détection au scroll
  useScrollReveal();

  // Effet d'élévation sur la navbar au défilement
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Création & Accord',
      desc: "L'acheteur ou le vendeur initie la transaction en précisant le montant, la description et les conditions de livraison.",
      icon: FileText,
      color: 'text-[#7B3DFF]',
      bg: 'bg-[#7B3DFF]/10',
      border: 'border-[#7B3DFF]/20',
    },
    {
      num: '02',
      title: 'Séquestre Sécurisé',
      desc: "L'acheteur dépose les fonds sur TRUST. L'argent est conservé de manière inviolable pendant toute la durée de la prestation.",
      icon: Lock,
      color: 'text-[#00E5FF]',
      bg: 'bg-[#00E5FF]/10',
      border: 'border-[#00E5FF]/20',
    },
    {
      num: '03',
      title: 'Livraison & Code OTP',
      desc: "Le vendeur expédie ou livre le bien. L'acheteur vérifie la conformité et transmet son code OTP secret unique pour valider.",
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      num: '04',
      title: 'Déblocage des Fonds',
      desc: "Dès validation du code de livraison ou du délai convenu, les fonds nets sont immédiatement libérés vers le portefeuille du vendeur.",
      icon: CheckCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

  const advantages = [
    {
      icon: Lock,
      color: 'text-[#7B3DFF]',
      bg: 'bg-purple-500/10',
      title: 'Sécurité & Séquestre Inviolable',
      desc: "Les montants sont isolés dans des coffres numériques. Aucun vendeur ne peut encaisser prématurément, et aucun acheteur ne peut récupérer ses fonds sans motif légitime.",
    },
    {
      icon: Zap,
      color: 'text-[#00E5FF]',
      bg: 'bg-[#00E5FF]/10',
      title: 'Transparence Totale',
      desc: "Chaque étape est enregistrée avec horodatage immuable. Les deux parties voient exactement l'état de l'escrow : Bloqué, Livraison en cours, ou Libéré.",
    },
    {
      icon: RefreshCw,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      title: 'Auto-Release & Médiation',
      desc: "Un mécanisme automatisé débloque les fonds après le délai de carence si aucune contestation n'est formulée, assurant aux vendeurs d'être toujours payés.",
    },
  ];

  const faqs = [
    {
      q: 'Comment fonctionne la garantie de séquestre sur TRUST ?',
      a: "Lorsque vous effectuez un paiement, l'argent ne va pas directement au vendeur. Il est consigné sur un compte séquestre technique dédié. Le vendeur est notifié que les fonds sont sécurisés et procède à la livraison en toute tranquillité. L'argent ne lui est transféré qu'une fois que vous confirmez la bonne réception.",
    },
    {
      q: 'Quel est le rôle du code OTP de livraison ?',
      a: "Pour les remises en main propre ou livraisons physiques, un code OTP à 6 chiffres est généré exclusivement pour l'acheteur. Le livreur ou vendeur saisit ce code lors de la remise pour prouver mathématiquement la livraison sans contestation possible.",
    },
    {
      q: 'Quels sont les frais appliqués sur les transactions ?',
      a: "La commission de service TRUST est transparente et fixe : 1,00% du montant de la transaction, calculée automatiquement lors du séquestre. Aucun frais caché.",
    },
    {
      q: 'Que se passe-t-il en cas de non-conformité ou de litige ?',
      a: "Si l'article reçu ne correspond pas à l'accord, un litige peut être ouvert en 1 clic. Les fonds restent bloqués et notre équipe de médiation intervient pour examiner les preuves et procéder soit à la résolution, soit au remboursement intégral de l'acheteur.",
    },
    {
      q: 'Comment intégrer TRUST sur ma boutique ou mon application ?',
      a: "TRUST propose une API REST complète et documentée (format OpenAPI/Swagger), des webhooks temps réel et un système de génération de clés d'API avec scopes de permissions pour les développeurs.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F14] text-slate-900 dark:text-[#F4F6FC] transition-colors selection:bg-[#7B3DFF]/30">
      {/* ─── NAVBAR FIXE & AÉRIENNE ────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
          navScrolled
            ? 'bg-white/90 dark:bg-[#0B0F14]/90 border-b border-slate-200/90 dark:border-slate-800/90 shadow-sm shadow-slate-900/5'
            : 'bg-white/70 dark:bg-[#0B0F14]/70 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center transition-transform duration-200 group-hover:scale-[1.02]">
              <TrustLogo variant="full" height={28} />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {[
              ['#how-it-works', 'Fonctionnement'],
              ['#advantages', 'Avantages'],
              ['#solutions', 'Solutions'],
              ['#developers', 'Développeurs'],
              ['#faq', 'FAQ'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="relative py-1 hover:text-[#7B3DFF] dark:hover:text-[#a277ff] transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#7B3DFF] after:to-[#00E5FF] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Bouton de bascule de thème */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-transform active:scale-95"
              title={resolvedTheme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
              aria-label="Basculer le thème"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="hover:text-[#7B3DFF]"
            >
              Connexion
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/register')}
              className="shadow-[0_4px_16px_rgba(123,61,255,0.25)] hover:shadow-[0_8px_24px_rgba(123,61,255,0.40)] hover:-translate-y-0.5 transition-all"
            >
              Créer un compte
            </Button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION HAUT DE GAMME ───────────────────────────────── */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Halos lumineux d'ambiance multicouches */}
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#7B3DFF]/15 dark:bg-[#7B3DFF]/20 blur-[130px] rounded-full pointer-events-none animate-blob"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-[#00E5FF]/12 dark:bg-[#00E5FF]/15 blur-[120px] rounded-full pointer-events-none animate-blob-delay"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#7B3DFF]/10 blur-[100px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Colonne Gauche : Argumentaire & Actions (7 cols) */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Titre Principal */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-900 dark:text-[#F4F6FC] opacity-0 animate-enter stagger-1"
                style={{ animationFillMode: 'forwards' }}
              >
                Avec{' '}
                <span className="bg-gradient-to-r from-[#7B3DFF] via-[#00E5FF] to-[#9e6bfa] bg-clip-text text-transparent animate-text-shimmer">
                  Trust
                </span>
                , vos transactions{' '}
                <span className="bg-gradient-to-r from-[#7B3DFF] via-[#9e6bfa] to-[#00E5FF] bg-clip-text text-transparent">
                  en toute confiance.
                </span>
              </h1>

              {/* Sous-titre avec meilleur contraste */}
              <p
                className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-enter stagger-2"
                style={{ animationFillMode: 'forwards' }}
              >
                TRUST sécurise chaque échange entre acheteurs et vendeurs. Les fonds sont conservés en séquestre inviolable et ne sont débloqués qu'après validation conforme de la livraison.
              </p>

              {/* Boutons d'Action avec micro-interactions */}
              <div
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 animate-enter stagger-3"
                style={{ animationFillMode: 'forwards' }}
              >
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto text-base px-8 h-12 btn-glow-primary group"
                >
                  <span>Créer un compte sécurisé</span>
                  <ArrowRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto text-base px-8 h-12 border-slate-300 dark:border-slate-700 hover:border-[#7B3DFF]/50 hover:-translate-y-0.5 transition-all"
                >
                  Découvrir comment ça marche
                </Button>
              </div>

              {/* Statistiques & Métriques Clés */}
              <div
                className="mt-12 pt-8 border-t border-slate-200/70 dark:border-slate-800/70 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0 opacity-0 animate-enter stagger-4"
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="transition-transform hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1,00 %</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Frais fixes & transparents</p>
                </div>
                <div className="transition-transform hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#7B3DFF]">Code OTP</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Validation physique</p>
                </div>
                <div className="transition-transform hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#00E5FF]">3 Jours</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Auto-libération garantie</p>
                </div>
                <div className="transition-transform hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500">100 %</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fonds protégés</p>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Vitrine Motion Design & Composant Vidéo (5 cols) */}
            <div
              className="lg:col-span-5 opacity-0 animate-enter stagger-2"
              style={{ animationFillMode: 'forwards' }}
            >
              <HeroMotionVideo resolvedTheme={resolvedTheme} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS SECTION ──────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 bg-white dark:bg-[#0E131C] border-y border-slate-200/80 dark:border-slate-800/80 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="text-xs font-semibold text-[#7B3DFF] uppercase tracking-wider">
              Processus Étape par Étape
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F6FC] mt-2">
              Comment fonctionne l'escrow TRUST ?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base">
              Un cycle de transaction transparent, sans intermédiaire opaque, guidé par des règles contractuelles strictes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st, idx) => (
              <div
                key={st.num}
                className={`reveal card-premium relative rounded-2xl p-6 bg-slate-50 dark:bg-[#131820] border border-slate-200/80 dark:border-slate-800/80 hover:border-[#7B3DFF]/40 group reveal-d${idx + 1}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${st.bg} ${st.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    <st.icon size={22} />
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-slate-400 dark:group-hover:text-slate-600 transition-colors">
                    {st.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F4F6FC]">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ADVANTAGES SECTION ────────────────────────────────────────── */}
      <section id="advantages" className="py-24 relative overflow-hidden">
        {/* Filigrane discret du symbole motion TRUST en arrière-plan */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none select-none"
          aria-hidden="true"
        >
          <MotionBrandAsset resolvedTheme={resolvedTheme} className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">
              Avantages Clés
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F6FC] mt-2">
              Construit pour la rigueur FinTech
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => (
              <div
                key={adv.title}
                className={`reveal card-premium p-8 rounded-2xl bg-white dark:bg-[#131820] border border-slate-200/80 dark:border-slate-800/80 group reveal-d${idx + 1}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${adv.bg} ${adv.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <adv.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-[#F4F6FC]">
                  {adv.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS FOR BUSINESS & INDIVIDUALS ───────────────────────── */}
      <section
        id="solutions"
        className="py-24 bg-white dark:bg-[#0E131C] border-y border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Carte Particuliers */}
            <div className="reveal reveal-left card-premium p-8 rounded-3xl bg-slate-50 dark:bg-[#131820] border border-slate-200/80 dark:border-slate-800/80 group">
              <div className="inline-flex p-3 rounded-2xl bg-[#7B3DFF]/10 text-[#7B3DFF] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-[#F4F6FC]">
                Pour les Particuliers & Freelances
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed">
                Achetez du matériel d'occasion, réglez une prestation de développement, de design ou commandez des articles sans jamais risquer de perdre votre avance.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  Génération de liens Paylink pour se faire payer
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  Code OTP secret remis uniquement lors de la réception
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  Remboursement garanti si l'article n'est pas envoyé
                </li>
              </ul>
            </div>

            {/* Carte Entreprises */}
            <div className="reveal reveal-right card-premium p-8 rounded-3xl bg-slate-50 dark:bg-[#131820] border border-slate-200/80 dark:border-slate-800/80 group">
              <div className="inline-flex p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-[#F4F6FC]">
                Pour les Entreprises & E-commerçants
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed">
                Augmentez votre taux de conversion en offrant à vos clients la garantie qu'ils ne paient qu'à la réception. Zéro chargeback abusif pour les marchands.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  Intégration API e-commerce en quelques lignes de code
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  Conformité KYC et facturation normalisée
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  Gestion de volumes et webhooks en temps réel
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEVELOPERS API SECTION ────────────────────────────────────── */}
      <section id="developers" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal reveal-scale rounded-3xl bg-gradient-to-br from-[#131820] via-[#0E131C] to-[#0A0E15] border border-slate-800 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Halo lumineux subtil */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#7B3DFF]/10 blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start relative z-10">
              <div>
                {/* Logo animé TRUST à gauche, surélevé et aéré au-dessus du badge */}
                <div className="mb-8 inline-flex items-center">
                  <div className="px-3.5 py-2 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-lg shadow-black/25 transition-transform hover:scale-[1.02]">
                    <img
                      src="/__l5e/assets-v1/8f35bdb1-adb6-44e4-90d3-da8de428e99a/trust-loader-logo-sombre.svg"
                      alt="TRUST"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold">
                    <Key size={14} />
                    <span>API Développeurs & Webhooks</span>
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight">
                  Intégrez l'escrow TRUST en 10 minutes
                </h2>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  Clés d'API avec scopes granulaires (<code className="text-[#00E5FF]">read</code>,{' '}
                  <code className="text-[#00E5FF]">write</code>,{' '}
                  <code className="text-[#00E5FF]">payments</code>). Webhooks cryptographiquement vérifiés pour automatiser vos livraisons.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    variant="accent"
                    onClick={() => navigate('/api-keys')}
                    className="hover:-translate-y-0.5 transition-transform"
                  >
                    Obtenir une clé API
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all hover:-translate-y-0.5"
                    onClick={() => window.open('http://localhost:8000/api/schema/swagger/', '_blank')}
                  >
                    Documentation Swagger <ExternalLink size={14} className="ml-1" />
                  </Button>
                </div>
              </div>

              {/* Code snippet mock */}
              <div className="bg-[#06080D] rounded-2xl p-5 border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto shadow-2xl transition-all hover:border-[#7B3DFF]/40">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-500 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-400 font-sans">POST /api/payments/</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#00E5FF]">REST API</span>
                </div>
                <pre className="text-slate-300 leading-relaxed">
{`// Créer une transaction de séquestre
const response = await fetch("https://api.trust.ci/api/payments/", {
  method: "POST",
  headers: {
    "Authorization": "Bearer tr_live_...",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    amount: 1450000,
    seller_username: "moussa_store",
    item_title: "MacBook Pro 16 M2 Max",
    delivery_terms: "Remise en main propre contre OTP"
  })
});
const escrow = await response.json();
console.log(escrow.reference, escrow.status); // TR-98214-XOF, BLOCKED`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ───────────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-24 bg-white dark:bg-[#0E131C] border-t border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs font-semibold text-[#7B3DFF] uppercase tracking-wider">
              Foire Aux Questions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-[#F4F6FC] mt-2">
              Questions Fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                // Le wrapper porte uniquement la classe de révélation, stable.
                // L'IntersectionObserver ajoute `.revealed` de façon impérative ;
                // si React réécrivait ce className au clic, l'attribut serait
                // perdu et la carte resterait à opacity: 0 (disparition).
                <div
                  key={idx}
                  className={`reveal reveal-d${Math.min(idx + 1, 5)}`}
                >
                  <div
                    className={`rounded-2xl border bg-slate-50/50 dark:bg-[#131820]/60 transition-all duration-200 ${
                      isOpen
                        ? 'border-[#7B3DFF]/50 shadow-sm shadow-[#7B3DFF]/10'
                        : 'border-slate-200/80 dark:border-slate-800/80 hover:border-[#7B3DFF]/30'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <h3
                        className={`text-base font-semibold transition-colors duration-200 ${
                          isOpen ? 'text-[#7B3DFF] dark:text-[#a277ff]' : 'text-slate-900 dark:text-[#F4F6FC]'
                        }`}
                      >
                        {faq.q}
                      </h3>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#7B3DFF]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-200/60 dark:border-slate-800/60 mt-1 animate-enter">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FOOTER PRESTIGE ───────────────────────────────────────────── */}
      <footer className="py-12 bg-slate-100 dark:bg-[#070A0F] border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <TrustLogo variant="full" height={22} />
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">—</span>
              <span className="hidden sm:inline font-medium">Trust every transaction.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Conditions Générales
              </a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Documentation API
              </a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact Support
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-600">
            <span>© {new Date().getFullYear()} TRUST FinTech Escrow. Tous droits réservés.</span>
            <div className="flex items-center gap-2">
              <img
                src="/__l5e/assets-v1/7c253326-7c8f-4aff-be96-bd7368e327d0/trust-symbole.svg"
                alt=""
                className="w-3.5 h-3.5 object-contain dark:hidden opacity-60"
                aria-hidden="true"
              />
              <img
                src="/__l5e/assets-v1/c25fd41f-cacf-469d-8536-8c4fe88d86d3/trust-symbole-blanc.svg"
                alt=""
                className="w-3.5 h-3.5 object-contain hidden dark:block opacity-60"
                aria-hidden="true"
              />
              <span>Sécurité bancaire & tiers de confiance numérique</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

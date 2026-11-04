import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, FileText, LockKeyhole, Menu, Moon, PackageCheck, ShieldCheck, Sun, Users, Wallet, X } from 'lucide-react';
import { useNavigate } from '@/lib/navigation';
import { Button } from '@/components/ui/TrustButton';
import { TrustLogo } from '@/components/ui/TrustLogo';
import { useTheme } from '@/context/ThemeContext';
import { useHomeMotion } from './useHomeMotion';
import { PresentationVideo } from './components/PresentationVideo';
import { OriginalMotion } from './components/OriginalMotion';
import commerceHero from '@/assets/trust-commerce-hero.jpg';

const navigation = [['#how-it-works', 'Fonctionnement'], ['#advantages', 'Avantages'], ['#solutions', 'Solutions'], ['#developers', 'Développeurs'], ['#faq', 'FAQ']];
const steps = [
  { icon: FileText, title: 'Un accord clair.', description: 'Définissez le montant, le bien ou la prestation et les conditions de livraison.' },
  { icon: LockKeyhole, title: 'Des fonds protégés.', description: 'L’acheteur dépose les fonds. Ils restent en séquestre pendant la transaction.' },
  { icon: PackageCheck, title: 'Une livraison validée.', description: 'Vérifiez la réception puis confirmez avec votre code OTP personnel.' },
  { icon: Wallet, title: 'Le vendeur est payé.', description: 'Les fonds sont libérés après validation ou à l’issue du délai convenu.' },
];
const faqs = [
  { q: 'Comment fonctionne la garantie de séquestre sur TRUST ?', a: 'L’argent ne va pas directement au vendeur. Il est conservé en séquestre, le vendeur est informé que les fonds sont sécurisés et procède à la livraison. Le transfert intervient après confirmation de la réception, selon les conditions de la transaction.' },
  { q: 'Quel est le rôle du code OTP de livraison ?', a: 'Un code OTP à 6 chiffres est généré exclusivement pour l’acheteur. Lors de la remise, le vendeur ou le livreur saisit ce code pour confirmer la livraison. Ne le communiquez qu’après avoir vérifié votre commande.' },
  { q: 'Quels sont les frais appliqués sur les transactions ?', a: 'La commission de service TRUST est de 1,00 % du montant de la transaction. Elle est calculée automatiquement lors du séquestre, sans frais cachés.' },
  { q: 'Que se passe-t-il en cas de non-conformité ou de litige ?', a: 'Vous pouvez ouvrir un litige. Les fonds restent bloqués pendant l’examen des preuves par la médiation, qui détermine la résolution ou le remboursement.' },
  { q: 'Comment intégrer TRUST sur ma boutique ou mon application ?', a: 'TRUST propose une API REST, des webhooks et des clés d’API avec des permissions dédiées. Accédez à vos clés depuis votre espace TRUST.' },
];

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  useHomeMotion(root);
  const navigate = useNavigate();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [audience, setAudience] = useState<'personal' | 'business'>('personal');
  return <div ref={root} className="trust-home">
    <div className="home-announcement"><ShieldCheck size={14} /><span>Votre confiance mérite plus qu’une promesse.</span><a href="#how-it-works">Découvrez TRUST <ArrowUpRight size={14} /></a></div>
    <header className="home-header">
      <nav className="home-nav home-container" aria-label="Navigation principale">
        <a href="/" aria-label="TRUST — Accueil"><TrustLogo height={27} /></a>
        <div className="home-desktop-nav">{navigation.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</div>
        <div className="home-nav-actions">
          <Button variant="ghost" size="icon" className="home-theme" aria-label="Basculer le thème" title={resolvedTheme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'} onClick={toggleTheme}>{resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</Button>
          <Button variant="ghost" size="sm" className="home-login" onClick={() => navigate('/login')}>Connexion <ArrowUpRight size={14} /></Button>
          <Button variant="primary" size="sm" className="home-nav-signup" onClick={() => navigate('/register')}>Créer un compte</Button>
          <Button variant="ghost" size="icon" className="home-menu-toggle" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} aria-controls="home-mobile-menu" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</Button>
        </div>
      </nav>
      {menuOpen && <div className="home-mobile-menu" id="home-mobile-menu">{navigation.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}<Button onClick={() => navigate('/register')}>Créer un compte <ArrowRight size={16} /></Button></div>}
    </header>
    <main>
      <section className="home-hero" aria-labelledby="home-title">
        <img className="home-hero-image" src={commerceHero} alt="Une commerçante prépare une commande et un entrepreneur consulte son téléphone." width={1920} height={1088} fetchPriority="high" />
        <div className="home-hero-content home-container">
          <div data-home-enter className="home-eyebrow"><span className="home-live-dot" />LA CONFIANCE, À CHAQUE TRANSACTION</div>
          <div data-home-enter><OriginalMotion /></div>
          <h1 id="home-title" data-home-enter><span>Payez en confiance.</span><span className="home-title-accent">Vendez sereinement.</span></h1>
          <p data-home-enter>Entre le paiement et la livraison,<br className="hidden sm:block" /> il y a TRUST. Vos fonds protégés, votre accord respecté.</p>
          <div data-home-enter className="home-hero-actions"><Button size="lg" onClick={() => navigate('/register')}>Créer mon compte <ArrowUpRight size={18} /></Button><a className="home-text-link" href="#presentation"><span className="home-play-icon">▶</span> Voir TRUST en action</a></div>
          <div data-home-enter className="home-hero-proof"><ShieldCheck size={16} /> Fonds en séquestre <span /> Validation par code OTP</div>
        </div>
        <a href="#how-it-works" className="home-scroll-cue" aria-label="Découvrir le fonctionnement"><ChevronDown size={20} /></a>
      </section>
      <div className="home-principles"><div className="home-container"><span><LockKeyhole size={19} /> Paiement protégé</span><span><PackageCheck size={19} /> Livraison confirmée</span><span><ShieldCheck size={19} /> Médiation en cas de litige</span><span><Wallet size={19} /> Frais transparents : 1,00 %</span></div></div>
      <section id="how-it-works" className="home-section">
        <div className="home-container">
          <div data-home-reveal className="home-section-heading"><div><span className="home-label">SIMPLE PAR NATURE. SÛR PAR CONCEPTION.</span><h2>Un accord.<br />Quatre étapes. Zéro doute.</h2></div><p>De la première poignée de main au dernier paiement, chacun sait où en est la transaction.</p></div>
          <div className="home-steps">{steps.map((step, index) => <article data-home-reveal key={step.title} className="home-step"><div className="home-step-top"><step.icon size={25} strokeWidth={1.5} /><span>0{index + 1}</span></div><h3>{step.title}</h3><p>{step.description}</p>{index < 3 && <ArrowRight className="home-step-arrow" size={18} />}</article>)}</div>
          <div className="home-process-note"><ShieldCheck size={16} /><span>Le paiement et la livraison avancent ensemble. Jamais l’un sans l’autre.</span></div>
        </div>
      </section>
      <section id="presentation" className="home-section home-film-section">
        <div className="home-container">
          <div data-home-reveal className="home-film-heading"><span className="home-label">L’EXPÉRIENCE TRUST</span><h2>Moins d’incertitude.<br />Plus de mouvement.</h2><p>Transactions, portefeuille, livraison : votre activité, dans un seul espace.</p></div>
          <div data-home-reveal><PresentationVideo /></div>
          <p className="home-film-caption">TRUST · Motion design original</p>
        </div>
      </section>
      <section id="advantages" className="home-section">
        <div className="home-container home-benefits-layout">
          <div data-home-reveal><span className="home-label">LA TRANQUILLITÉ N’EST PAS UNE OPTION</span><h2>Votre argent ne<br />prend pas de risques.</h2><p className="home-section-description">Un cadre transparent pour que les acheteurs et les vendeurs avancent avec la même confiance.</p><Button variant="outline" className="mt-7" onClick={() => navigate('/register')}>Choisir la confiance <ArrowUpRight size={17} /></Button></div>
          <div className="home-benefit-list">{[{ icon: LockKeyhole, title: 'Protégé, jusqu’à la réception.', text: 'Les fonds restent isolés en séquestre pendant la livraison. Le vendeur ne les encaisse pas prématurément.' }, { icon: ShieldCheck, title: 'Une validation qui vous appartient.', text: 'Votre code OTP confirme la remise. Vous gardez le contrôle au moment qui compte.' }, { icon: Users, title: 'Un désaccord ? Pas une impasse.', text: 'Un litige maintient les fonds bloqués pendant la médiation. Chaque étape reste visible pour les deux parties.' }].map(item => <article data-home-reveal key={item.title}><item.icon size={23} /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div>
      </section>
      <section id="solutions" className="home-section home-solutions-section">
        <div className="home-container">
          <div data-home-reveal className="home-section-heading"><div><span className="home-label">VOTRE ACTIVITÉ. VOTRE TRUST.</span><h2>La confiance n’a<br />pas qu’un seul profil.</h2></div><div className="home-audience-tabs" role="tablist" aria-label="Votre profil"><Button id="personal-tab" role="tab" aria-controls="audience-panel" aria-selected={audience === 'personal'} variant={audience === 'personal' ? 'primary' : 'ghost'} onClick={() => setAudience('personal')}>Particuliers & freelances</Button><Button id="business-tab" role="tab" aria-controls="audience-panel" aria-selected={audience === 'business'} variant={audience === 'business' ? 'primary' : 'ghost'} onClick={() => setAudience('business')}>Entreprises</Button></div></div>
          <div className="home-audience-panel" id="audience-panel" role="tabpanel" aria-labelledby={audience === 'personal' ? 'personal-tab' : 'business-tab'}>
            <div className="home-audience-visual"><img src={commerceHero} loading="lazy" width={1920} height={1088} alt={audience === 'personal' ? 'Une commerçante prépare un colis.' : 'Un entrepreneur consulte ses commandes.'} className={audience === 'business' ? 'home-photo-business' : 'home-photo-personal'} /><span><ShieldCheck size={18} /> La confiance fait avancer vos échanges.</span></div>
            <div className="home-audience-copy" key={audience}><span className="home-label">{audience === 'personal' ? 'ACHETER. VENDRE. COLLABORER.' : 'DÉVELOPPER. CONNECTER. ENCAISSER.'}</span><h3>{audience === 'personal' ? 'Vos projets méritent un accord solide.' : 'Faites grandir votre commerce, pas les risques.'}</h3><p>{audience === 'personal' ? 'Un achat d’occasion, une mission freelance, une commande à distance. Gardez la sérénité, même quand vous ne vous connaissez pas encore.' : 'Offrez à vos clients un paiement encadré et suivez vos transactions depuis votre espace professionnel.'}</p><ul>{(audience === 'personal' ? ['Liens Paylink pour vous faire payer', 'Validation de réception par code OTP', 'Suivi du paiement et de la livraison'] : ['Intégration API et clés dédiées', 'Webhooks pour suivre les événements', 'Portefeuille et suivi des transactions']).map(text => <li key={text}><Check size={17} />{text}</li>)}</ul><Button onClick={() => navigate('/register')}>Commencer avec TRUST <ArrowUpRight size={17} /></Button></div>
          </div>
        </div>
      </section>
      <section id="developers" className="home-section home-developer-section">
        <div className="home-container home-developer-layout"><div data-home-reveal><span className="home-label"><Code2 size={16} /> PENSÉ AUSSI POUR LES DÉVELOPPEURS</span><h2>Votre code.<br />Notre couche de confiance.</h2><p>Connectez vos paiements à TRUST avec une API REST, des clés à permissions dédiées et des webhooks.</p><Button variant="accent" onClick={() => navigate('/api-keys')}>Obtenir une clé API <ArrowUpRight size={17} /></Button></div><div data-home-reveal className="home-code"><div><span>TRUST API</span><span>POST /api/payments/</span></div><pre><code>{`// Un accord devient une transaction.\n{\n  "amount": 1450000,\n  "seller_username": "moussa_store",\n  "item_title": "MacBook Pro 16 M2 Max",\n  "delivery_terms": "Remise contre OTP"\n}\n\n// Puis suivez chaque étape par webhook.`}</code></pre><div className="home-code-footer"><LockKeyhole size={14} /> Séquestre · Livraison · Validation</div></div></div>
      </section>
      <section id="faq" className="home-section">
        <div className="home-container home-faq-layout"><div data-home-reveal><span className="home-label">TOUT SIMPLEMENT</span><h2>Les bonnes questions.<br />Des réponses claires.</h2></div><div>{faqs.map((faq, index) => <div className="home-faq-item" key={faq.q}><Button variant="ghost" className="home-faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`}><span>{faq.q}</span><ChevronDown size={19} className={openFaq === index ? 'rotate-180' : ''} /></Button>{openFaq === index && <div id={`faq-answer-${index}`} className="home-faq-answer">{faq.a}</div>}</div>)}</div></div>
      </section>
      <section className="home-final"><div data-home-reveal className="home-container"><ShieldCheck size={35} strokeWidth={1.4} /><h2>Le prochain échange ?<br />Faites-en un échange TRUST.</h2><Button size="lg" onClick={() => navigate('/register')}>Créer mon compte <ArrowUpRight size={18} /></Button></div></section>
    </main>
    <footer className="home-footer"><div className="home-container"><div className="home-footer-top"><a href="/" aria-label="Accueil TRUST"><TrustLogo theme="white" height={29} /></a><p>Trust every transaction.</p><div><a href="#how-it-works">Fonctionnement</a><a href="#developers">API</a><a href="#faq">FAQ</a><a href="/login">Mon espace <ArrowUpRight size={14} /></a></div></div><div className="home-footer-bottom"><span>© 2026 TRUST. Tous droits réservés.</span><span><ShieldCheck size={14} /> Tiers de confiance numérique</span></div></div></footer>
  </div>;
}

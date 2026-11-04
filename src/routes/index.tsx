import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '@/features/landing/LandingPage';
export const Route = createFileRoute('/')({
 head: () => ({meta: [{title: 'TRUST — Accueil'}, {name:'description', content:'TRUST — Accueil. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Accueil'}, {property:'og:description', content:'TRUST — Accueil. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: LandingPage,
});

import { createFileRoute } from '@tanstack/react-router';
import { PaylinkCheckoutPage } from '@/features/offers/PaylinkCheckoutPage';
export const Route = createFileRoute('/pay/$code')({
 head: () => ({meta: [{title: 'TRUST — Paiement sécurisé'}, {name:'description', content:'TRUST — Paiement sécurisé. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Paiement sécurisé'}, {property:'og:description', content:'TRUST — Paiement sécurisé. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: PaylinkCheckoutPage,
});

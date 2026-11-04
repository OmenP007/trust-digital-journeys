import { createFileRoute } from '@tanstack/react-router';
import { OffersPage } from '@/features/offers/OffersPage';
export const Route = createFileRoute('/_authenticated/offers')({
 head: () => ({meta: [{title: 'TRUST — Liens Paylink'}, {name:'description', content:'TRUST — Liens Paylink. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Liens Paylink'}, {property:'og:description', content:'TRUST — Liens Paylink. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: OffersPage,
});

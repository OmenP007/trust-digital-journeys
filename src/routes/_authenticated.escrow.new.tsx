import { createFileRoute } from '@tanstack/react-router';
import { NewEscrowPage } from '@/features/escrow/NewEscrowPage';
export const Route = createFileRoute('/_authenticated/escrow/new')({
 head: () => ({meta: [{title: 'TRUST — Nouveau séquestre'}, {name:'description', content:'TRUST — Nouveau séquestre. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Nouveau séquestre'}, {property:'og:description', content:'TRUST — Nouveau séquestre. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: NewEscrowPage,
});

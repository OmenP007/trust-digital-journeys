import { createFileRoute } from '@tanstack/react-router';
import { EscrowDetailPage } from '@/features/escrow/EscrowDetailPage';
export const Route = createFileRoute('/_authenticated/escrow/$id')({
 head: () => ({meta: [{title: 'TRUST — Détail du séquestre'}, {name:'description', content:'TRUST — Détail du séquestre. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Détail du séquestre'}, {property:'og:description', content:'TRUST — Détail du séquestre. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: EscrowDetailPage,
});

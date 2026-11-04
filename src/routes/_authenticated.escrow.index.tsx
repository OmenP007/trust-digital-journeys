import { createFileRoute } from '@tanstack/react-router';
import { EscrowListPage } from '@/features/escrow/EscrowListPage';
export const Route = createFileRoute('/_authenticated/escrow')({
 head: () => ({meta: [{title: 'TRUST — Mes séquestres'}, {name:'description', content:'TRUST — Mes séquestres. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Mes séquestres'}, {property:'og:description', content:'TRUST — Mes séquestres. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: EscrowListPage,
});

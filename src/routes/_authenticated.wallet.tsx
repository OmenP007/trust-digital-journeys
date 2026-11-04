import { createFileRoute } from '@tanstack/react-router';
import { WalletPage } from '@/features/wallet/WalletPage';
export const Route = createFileRoute('/_authenticated/wallet')({
 head: () => ({meta: [{title: 'TRUST — Portefeuille'}, {name:'description', content:'TRUST — Portefeuille. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Portefeuille'}, {property:'og:description', content:'TRUST — Portefeuille. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: WalletPage,
});

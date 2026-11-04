import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/features/transactions/TransactionsPage';
export const Route = createFileRoute('/_authenticated/transactions')({
 head: () => ({meta: [{title: 'TRUST — Transactions'}, {name:'description', content:'TRUST — Transactions. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Transactions'}, {property:'og:description', content:'TRUST — Transactions. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: TransactionsPage,
});

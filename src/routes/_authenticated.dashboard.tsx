import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
export const Route = createFileRoute('/_authenticated/dashboard')({
 head: () => ({meta: [{title: 'TRUST — Tableau de bord'}, {name:'description', content:'TRUST — Tableau de bord. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Tableau de bord'}, {property:'og:description', content:'TRUST — Tableau de bord. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: DashboardPage,
});

import { createFileRoute } from '@tanstack/react-router';
import { SecurityPage } from '@/features/security/SecurityPage';
export const Route = createFileRoute('/_authenticated/security')({
 head: () => ({meta: [{title: 'TRUST — Sécurité et KYC'}, {name:'description', content:'TRUST — Sécurité et KYC. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Sécurité et KYC'}, {property:'og:description', content:'TRUST — Sécurité et KYC. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: SecurityPage,
});

import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@/features/profile/ProfilePage';
export const Route = createFileRoute('/_authenticated/profile')({
 head: () => ({meta: [{title: 'TRUST — Profil'}, {name:'description', content:'TRUST — Profil. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Profil'}, {property:'og:description', content:'TRUST — Profil. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: ProfilePage,
});

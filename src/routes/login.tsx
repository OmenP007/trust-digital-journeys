import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/LoginPage';
export const Route = createFileRoute('/login')({
 head: () => ({meta: [{title: 'TRUST — Connexion'}, {name:'description', content:'TRUST — Connexion. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Connexion'}, {property:'og:description', content:'TRUST — Connexion. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: LoginPage,
});

import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '@/features/auth/RegisterPage';
export const Route = createFileRoute('/register')({
 head: () => ({meta: [{title: 'TRUST — Créer un compte'}, {name:'description', content:'TRUST — Créer un compte. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Créer un compte'}, {property:'og:description', content:'TRUST — Créer un compte. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: RegisterPage,
});

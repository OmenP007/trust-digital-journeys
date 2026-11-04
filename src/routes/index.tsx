import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '@/features/landing/LandingPage';
export const Route = createFileRoute('/')({
 head: () => ({meta: [{title: 'TRUST — Payez en confiance, vendez sereinement'}, {name:'description', content:'Découvrez TRUST : fonds en séquestre, livraison confirmée par OTP et suivi de vos transactions entre acheteurs et vendeurs.'}, {property:'og:title', content:'TRUST — Payez en confiance, vendez sereinement'}, {property:'og:description', content:'Un accord clair, des fonds protégés et une livraison confirmée. Découvrez l’expérience TRUST.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: LandingPage,
});

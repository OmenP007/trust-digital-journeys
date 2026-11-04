import { createFileRoute } from '@tanstack/react-router';
import { NotificationsPage } from '@/features/notifications/NotificationsPage';
export const Route = createFileRoute('/_authenticated/notifications')({
 head: () => ({meta: [{title: 'TRUST — Notifications'}, {name:'description', content:'TRUST — Notifications. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Notifications'}, {property:'og:description', content:'TRUST — Notifications. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: NotificationsPage,
});

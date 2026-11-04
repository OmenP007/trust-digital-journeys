import { createFileRoute } from '@tanstack/react-router';
import { ApiKeysPage } from '@/features/api_keys/ApiKeysPage';
export const Route = createFileRoute('/_authenticated/api-keys')({
 head: () => ({meta: [{title: 'TRUST — Clés API'}, {name:'description', content:'TRUST — Clés API. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Clés API'}, {property:'og:description', content:'TRUST — Clés API. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: ApiKeysPage,
});

import { createFileRoute } from '@tanstack/react-router';
import { AdminPage } from '@/features/admin/AdminPage';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from '@/lib/navigation';
export const Route = createFileRoute('/_authenticated/admin')({
 head: () => ({meta: [{title: 'TRUST — Administration'}, {name:'description', content:'TRUST — Administration. Paiements et transactions protégés par séquestre.'}, {property:'og:title', content:'TRUST — Administration'}, {property:'og:description', content:'TRUST — Administration. Paiements et transactions protégés par séquestre.'}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}]}),
 component: AdminPageGuard,
});
function AdminPageGuard() { const {user} = useAuth(); return user?.role === 'deaph' ? <AdminPage /> : <Navigate to='/dashboard' replace />; }

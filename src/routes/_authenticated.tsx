import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from '@/lib/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
export const Route = createFileRoute('/_authenticated')({component: ProtectedLayout});
function ProtectedLayout() {
 const {isAuthenticated,isLoading} = useAuth();
 if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">TRUST</div>;
 if (!isAuthenticated) return <Navigate to="/login" replace />;
 return <DashboardLayout />;
}

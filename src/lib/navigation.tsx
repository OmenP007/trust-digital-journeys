import React from 'react';
import { Link as RouterLink, Navigate as RouterNavigate, Outlet, useLocation as useRouterLocation, useNavigate as useRouterNavigate, useRouter, useParams as useRouterParams } from '@tanstack/react-router';
export { Outlet };
export function useNavigate() {
 const navigate = useRouterNavigate();
 const router = useRouter();
 return (to: string | number, options?: {replace?: boolean; state?: unknown}) => {
  if (typeof to === 'number') { router.history.go(to); return; }
  return navigate({href: to, replace: options?.replace ?? false});
 };
}
export const useLocation = useRouterLocation;
export function useParams<T extends Record<string,string>>() { return useRouterParams({strict:false}) as Partial<T>; }
export function useSearchParams() { const location = useRouterLocation(); return [new URLSearchParams(location.searchStr)] as const; }
type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> & {to: string; className?: string | ((state: {isActive:boolean}) => string)};
export function Link({to, className, ...props}: LinkProps) {
 const location = useRouterLocation();
 const isActive = to === '/' ? location.pathname === '/' : location.pathname === to || location.pathname.startsWith(`${to}/`);
 return <RouterLink to={to} {...props} className={typeof className === 'function' ? className({isActive}) : className} />;
}
export const NavLink = Link;
export function Navigate({to, replace}: {to: string; replace?: boolean; state?: unknown}) { return <RouterNavigate to={to} replace={replace ?? false} />; }

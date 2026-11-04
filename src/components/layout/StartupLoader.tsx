import { useEffect, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { TrustLoader } from '@/components/ui/TrustLoader';

export function StartupLoader() {
  const [starting, setStarting] = useState(true);
  const pending = useRouterState({ select: state => state.status === 'pending' });
  useEffect(() => {
    // A bounded introduction never blocks a page on a failed network request.
    const timer = window.setTimeout(() => setStarting(false), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, []);
  return starting || pending ? <TrustLoader fullscreen /> : null;
}
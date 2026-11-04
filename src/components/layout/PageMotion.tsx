import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';

export function PageMotion({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: location => location.pathname });
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = root.querySelectorAll<HTMLElement>('main > div > *, main > section, [data-trust-card]');
    items.forEach((item, index) => {
      item.dataset['motionOrder'] = String(index % 5);
      item.dataset['motionVisible'] = reduced ? 'true' : 'false';
    });
    if (reduced) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset['motionVisible'] = 'true';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return <div ref={container} key={pathname} className={`trust-page-motion${pathname === '/' ? '' : ' trust-interface'}`} data-motion-page={pathname}>{children}</div>;
}
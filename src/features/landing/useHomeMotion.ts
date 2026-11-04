import { useEffect, type RefObject } from 'react';

export function useHomeMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    async function animate() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'), import('gsap/ScrollTrigger'),
      ]);
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.from('[data-home-enter]', { y: 26, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'all' });
          gsap.utils.toArray<HTMLElement>('[data-home-reveal]').forEach(element => {
            gsap.from(element, { y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
          });
          gsap.to('.home-hero-image', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
        }, root);
        return () => context.revert();
      });
      cleanup = () => media.revert();
    }
    void animate();
    return () => { disposed = true; cleanup?.(); };
  }, [root]);
}
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Pause, Play, ShieldCheck, Store, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/TrustButton';
import { TrustLogo } from '@/components/ui/TrustLogo';
import { useTheme } from '@/context/ThemeContext';

export function AuthMotion() {
  const { resolvedTheme } = useTheme();
  const scene = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = scene.current;
    const artwork = plane.current;
    if (!container || !artwork || paused) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const x = gsap.quickTo(artwork, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const y = gsap.quickTo(artwork, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const move = (event: PointerEvent) => {
        const bounds = container.getBoundingClientRect();
        x(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
        y(((event.clientY - bounds.top) / bounds.height - 0.5) * -18);
      };
      const reset = () => { x(0); y(0); };
      container.addEventListener('pointermove', move);
      container.addEventListener('pointerleave', reset);
      return () => {
        container.removeEventListener('pointermove', move);
        container.removeEventListener('pointerleave', reset);
        gsap.set(artwork, { clearProps: 'transform' });
      };
    });
    return () => media.revert();
  }, [paused]);

  return (
    <aside className="auth-motion" aria-label="TRUST, la confiance à chaque transaction" data-paused={paused}>
      <div className="auth-motion-brand"><TrustLogo height={30} theme={resolvedTheme === 'dark' ? 'white' : 'black'} /></div>
      <div ref={scene} className="auth-motion-scene">
        <div ref={plane} className="auth-motion-plane" aria-hidden="true">
          <svg className="auth-motion-lines" viewBox="0 0 440 440" fill="none">
            <path className="auth-motion-frame" d="M220 38 402 220 220 402 38 220Z" />
            <path className="auth-motion-route" d="M70 220H220L350 90M220 220L350 350" />
            <path className="auth-motion-flow" d="M70 220H220L350 90M220 220L350 350" />
            <path className="auth-motion-frame" d="M220 90V350M90 220H350" />
          </svg>
          <div className="auth-motion-hub"><TrustLogo variant="symbol" size={90} theme={resolvedTheme === 'dark' ? 'white' : 'black'} /></div>
          <div className="auth-motion-node auth-motion-buyer"><UserRound size={25} /><span>Acheteur</span></div>
          <div className="auth-motion-node auth-motion-seller"><Store size={25} /><span>Vendeur</span></div>
          <div className="auth-motion-node auth-motion-protection"><ShieldCheck size={25} /><span>Protection</span></div>
        </div>
      </div>
      <div className="auth-motion-caption"><span>LA CONFIANCE, À CHAQUE TRANSACTION</span><p>Payez en confiance.<br />Vendez sereinement.</p></div>
      <Button className="auth-motion-toggle" size="icon" variant="ghost" onClick={() => setPaused(value => !value)} aria-label={paused ? "Reprendre l’animation" : "Mettre l’animation en pause"} title={paused ? "Reprendre l’animation" : "Mettre l’animation en pause"}>{paused ? <Play size={18} /> : <Pause size={18} />}</Button>
    </aside>
  );
}
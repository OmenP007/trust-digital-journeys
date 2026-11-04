import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { TrustLogo } from '@/components/ui/TrustLogo';
import { Button } from '@/components/ui/TrustButton';
import lightMotion from '@/assets/trust-import/trust-motion-clair.mp4.asset.json';
import darkMotion from '@/assets/trust-import/trust-motion-sombre.mp4.asset.json';

export function OriginalMotion() {
  const { resolvedTheme } = useTheme();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const source = resolvedTheme === 'dark' ? darkMotion.url : lightMotion.url;
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    setFailed(false);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !preference.matches) void player.play().catch(() => {});
      else player.pause();
    }, { threshold: 0.3 });
    observer.observe(player);
    const stop = () => { if (preference.matches) player.pause(); };
    preference.addEventListener('change', stop);
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); };
  }, [source]);
  return <div className="home-original-motion">
    <div className="home-original-visual">{failed ? <TrustLogo height={58} /> : <video ref={video} key={source} src={source} muted playsInline loop preload="auto" aria-label="Motion design original TRUST" onError={() => setFailed(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}</div>
    <Button size="icon" variant="ghost" className="home-original-control" aria-label={playing ? 'Mettre le logo animé en pause' : 'Lire le logo animé'} title={playing ? 'Mettre le logo animé en pause' : 'Lire le logo animé'} onClick={() => { const player = video.current; if (!player) return; if (player.paused) void player.play().catch(() => setFailed(true)); else player.pause(); }}>{playing ? <Pause size={14} /> : <Play size={14} />}</Button>
  </div>;
}
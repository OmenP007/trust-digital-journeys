import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/TrustButton';
import presentation from '@/assets/trust-home/trust-presentation-pages.mp4.asset.json';

export function PresentationVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !preference.matches) void player.play().catch(() => {});
      else player.pause();
    }, { threshold: 0.4 });
    const stop = () => { if (preference.matches) player.pause(); };
    preference.addEventListener('change', stop);
    observer.observe(player);
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); };
  }, []);
  return <div className="home-video">
    <video ref={video} src={presentation.url} muted={muted} playsInline loop preload="metadata" aria-label="Présentation animée des pages TRUST" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    {failed && <p className="home-video-error">La présentation est indisponible pour le moment.</p>}
    <div className="home-video-controls">
      <span>TRUST / LE FILM <span className="home-video-duration">00:25</span></span>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="home-video-control" title={playing ? 'Mettre en pause' : 'Lire la présentation'} aria-label={playing ? 'Mettre en pause' : 'Lire la présentation'} onClick={() => { const player = video.current; if (!player) return; if (player.paused) void player.play().catch(() => setFailed(true)); else player.pause(); }}>{playing ? <Pause size={18} /> : <Play size={18} />}</Button>
        <Button variant="ghost" size="icon" className="home-video-control" title={muted ? 'Activer le son' : 'Couper le son'} aria-label={muted ? 'Activer le son' : 'Couper le son'} onClick={() => setMuted(value => !value)}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</Button>
      </div>
    </div>
  </div>;
}
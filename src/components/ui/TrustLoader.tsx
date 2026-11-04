import lightMotion from '@/assets/trust-import/trust-motion-clair.svg.asset.json';
import darkMotion from '@/assets/trust-import/trust-motion-sombre.svg.asset.json';
import { useTheme } from '@/context/ThemeContext';

export function TrustLoader({ fullscreen = false }: { fullscreen?: boolean }) {
  const { resolvedTheme } = useTheme();
  return <div className={fullscreen ? 'trust-loader trust-loader-fullscreen' : 'trust-loader'} role="status" aria-label="Chargement TRUST">
    <img className="trust-loader-original" src={resolvedTheme === 'dark' ? darkMotion.url : lightMotion.url} width={603} height={206} alt="TRUST" />
    <span className="sr-only">Chargement en cours</span>
  </div>;
}
import { TrustLogo } from './TrustLogo';

export function TrustLoader({ fullscreen = false }: { fullscreen?: boolean }) {
  return <div className={fullscreen ? 'trust-loader trust-loader-fullscreen' : 'trust-loader'} role="status" aria-label="Chargement TRUST">
    <div className="trust-loader-mark"><TrustLogo variant="symbol" size={48} /></div>
    <div className="trust-loader-track"><span /></div>
    <span className="sr-only">Chargement en cours</span>
  </div>;
}
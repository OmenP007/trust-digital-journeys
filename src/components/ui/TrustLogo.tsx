import React from 'react';

export interface TrustLogoProps {
  /**
   * 'full': Logo complet avec symbole + mot "TRUST"
   * 'symbol': Symbole seul (icône stylisée)
   * 'icon': Icône d'application (fond sombre avec symbole)
   */
  variant?: 'full' | 'symbol' | 'icon';
  /**
   * 'auto': S'adapte automatiquement au thème clair/sombre
   * 'light': Adapté aux fonds clairs (texte foncé)
   * 'dark': Adapté aux fonds sombres (texte blanc)
   * 'white': Monochrome blanc
   * 'black': Monochrome noir
   */
  theme?: 'auto' | 'light' | 'dark' | 'white' | 'black';
  className?: string;
  size?: number;
  height?: number;
  width?: number;
}

export const TrustLogo: React.FC<TrustLogoProps> = ({
  variant = 'full',
  theme = 'auto',
  className = '',
  size,
  height,
  width,
}) => {
  // Icône d'application (carré arrondi avec fond)
  if (variant === 'icon') {
    const dim = size || height || width || 36;
    return (
      <img
        src="/__l5e/assets-v1/26d4a786-2403-488c-9d32-6586f8d671b7/trust-icone-app.svg"
        alt="TRUST"
        width={dim}
        height={dim}
        className={`rounded-xl object-contain shrink-0 ${className}`}
      />
    );
  }

  // Symbole seul (1:1)
  if (variant === 'symbol') {
    const dim = size || height || width || 36;
    let src = '/__l5e/assets-v1/7c253326-7c8f-4aff-be96-bd7368e327d0/trust-symbole.svg';
    if (theme === 'white') src = '/__l5e/assets-v1/c25fd41f-cacf-469d-8536-8c4fe88d86d3/trust-symbole-blanc.svg';
    if (theme === 'black') src = '/__l5e/assets-v1/593002fb-2df0-47a8-be38-7d4e45a5cd4e/trust-symbole-noir.svg';

    return (
      <img
        src={src}
        alt="TRUST"
        width={dim}
        height={dim}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  // Logo complet (symbole + typographie "TRUST") — ratio ~3.28:1
  const h = height || size || 32;

  if (theme === 'dark') {
    return (
      <img
        src="/__l5e/assets-v1/ad3fc984-6cba-424b-84be-8a8bee6a19a6/trust-logo-sombre.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  if (theme === 'light') {
    return (
      <img
        src="/__l5e/assets-v1/7bce192b-1122-44f9-b6a9-39cde6eea892/trust-logo-clair.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  if (theme === 'white') {
    return (
      <img
        src="/__l5e/assets-v1/9c3854b5-6ff4-4b27-ad78-3fdac9ee4bea/trust-logo-blanc.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  if (theme === 'black') {
    return (
      <img
        src="/__l5e/assets-v1/4bbc23b3-61b3-4d4c-a2c8-021efacc7979/trust-logo-noir.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  // Mode 'auto' : bascule propre entre clair et sombre selon le mode actif
  return (
    <span className={`inline-flex items-center shrink-0 ${className}`}>
      <img
        src="/__l5e/assets-v1/7bce192b-1122-44f9-b6a9-39cde6eea892/trust-logo-clair.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className="dark:hidden object-contain"
      />
      <img
        src="/__l5e/assets-v1/ad3fc984-6cba-424b-84be-8a8bee6a19a6/trust-logo-sombre.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className="hidden dark:block object-contain"
      />
    </span>
  );
};

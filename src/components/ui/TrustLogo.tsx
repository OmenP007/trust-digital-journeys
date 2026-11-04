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
        src="/trust-icone-app.svg"
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
    let src = '/trust-symbole.svg';
    if (theme === 'white') src = '/trust-symbole-blanc.svg';
    if (theme === 'black') src = '/trust-symbole-noir.svg';

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
        src="/trust-logo-sombre.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  if (theme === 'light') {
    return (
      <img
        src="/trust-logo-clair.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  if (theme === 'white') {
    return (
      <img
        src="/trust-logo-blanc.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  if (theme === 'black') {
    return (
      <img
        src="/trust-logo-noir.svg"
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
        src="/trust-logo-clair.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className="dark:hidden object-contain"
      />
      <img
        src="/trust-logo-sombre.svg"
        alt="TRUST"
        style={{ height: h, width: width || 'auto' }}
        className="hidden dark:block object-contain"
      />
    </span>
  );
};

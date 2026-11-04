import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const WaveLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <img
    src="/Wave.png"
    alt="Wave"
    width={size}
    height={size}
    className={`rounded-xl object-contain shrink-0 ${className}`}
    style={{ width: size, height: size }}
  />
);

export const OrangeMoneyLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <img
    src="/Orange/Orange_id6mWAUROI_1.svg"
    alt="Orange Money"
    width={size}
    height={size}
    className={`rounded-xl object-contain shrink-0 ${className}`}
    style={{ width: size, height: size }}
  />
);

export const MtnLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <img
    src="/MTN_Group_id6u4FvWmZ_1.svg"
    alt="MTN MoMo"
    width={size}
    height={size}
    className={`rounded-xl object-contain shrink-0 ${className}`}
    style={{ width: size, height: size }}
  />
);

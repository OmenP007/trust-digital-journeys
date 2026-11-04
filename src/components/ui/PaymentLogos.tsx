import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const WaveLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <img
    src="/__l5e/assets-v1/01dedebc-14bd-4e1b-bd66-8ddaf534b38a/Wave.png"
    alt="Wave"
    width={size}
    height={size}
    className={`rounded-xl object-contain shrink-0 ${className}`}
    style={{ width: size, height: size }}
  />
);

export const OrangeMoneyLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <img
    src="/__l5e/assets-v1/3612d835-05d9-4964-bd74-be5e88e3dbfe/Orange_id6mWAUROI_1.svg"
    alt="Orange Money"
    width={size}
    height={size}
    className={`rounded-xl object-contain shrink-0 ${className}`}
    style={{ width: size, height: size }}
  />
);

export const MtnLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <img
    src="/__l5e/assets-v1/5eac2522-3586-49d4-a31d-5106aa6e026a/MTN_Group_id6u4FvWmZ_1.svg"
    alt="MTN MoMo"
    width={size}
    height={size}
    className={`rounded-xl object-contain shrink-0 ${className}`}
    style={{ width: size, height: size }}
  />
);

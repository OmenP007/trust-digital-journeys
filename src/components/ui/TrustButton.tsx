import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Motion: Premium/Corporate archetype (FinTech)
 * Press: scale 0.98, opacity 0.95 → 150ms, ease-snappy (0.2,0,0,1)  → 0% overshoot
 * Hover: shadow lift + background shift → < 100ms
 * Focus ring: scale 0.95→1 opacity 0→1, 150ms
 * No bouncy overshoot on financial buttons (Corporate rule: 0–3% max)
 * ───────────────────────────────────────────────────────────────────────────── */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium ' +
      'transition-all duration-150 ease-[cubic-bezier(0.2,0,0,1)] ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
      'disabled:opacity-50 disabled:pointer-events-none select-none rounded-xl ' +
      'trust-motion-button active:scale-[0.97] active:opacity-90';

    const variants: Record<string, string> = {
      primary:
        'trust-button-primary bg-primary text-primary-foreground focus-visible:ring-ring',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-muted border border-border',
      outline:
        'border border-border text-foreground hover:bg-secondary',
      ghost:
        'text-muted-foreground hover:text-foreground hover:bg-secondary',
      danger:
        'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground focus-visible:ring-destructive',
      accent:
        'trust-button-accent bg-accent text-accent-foreground font-semibold focus-visible:ring-accent',
    };

    const sizes: Record<string, string> = {
      sm:   'text-xs px-3 py-1.5 h-8 gap-1.5',
      md:   'text-sm px-4 py-2.5 h-10 gap-2',
      lg:   'text-base px-6 py-3.5 h-12 gap-2.5 font-semibold',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Chargement...
          </span>
        ) : children}
      </button>
    );
  }
);
Button.displayName = 'Button';

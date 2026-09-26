import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  icon?: LucideIcon;
  /**
   * `dark` : badge sur fond sombre — bordure #388caf à 50 %, fond #0b305a à
   * 40 %, texte #388caf (§ 6.2).
   * `light` : badge sur fond clair — bordure et fond #388caf translucides.
   * Le texte passe en #1372a2 car #388caf ne tient pas le 4,5:1 sur blanc.
   */
  tone?: 'dark' | 'light';
  className?: string;
  uppercase?: boolean;
}

export function Badge({
  children,
  icon: Icon,
  tone = 'light',
  className,
  uppercase = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium',
        uppercase && 'tracking-wider uppercase',
        tone === 'dark'
          ? 'border-accent/50 bg-secondary/40 text-accent backdrop-blur-sm'
          : 'border-accent/50 bg-accent/10 text-primary',
        className,
      )}
    >
      {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}

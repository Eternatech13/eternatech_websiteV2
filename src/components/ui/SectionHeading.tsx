import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from './Badge';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: ReactNode;
  subtitle?: string;
  /** `dark` : section à fond sombre (Hero, À propos, Footer). */
  tone?: 'light' | 'dark';
  align?: 'start' | 'center';
  className?: string;
  children?: ReactNode;
}

/** En-tête de section commun (§ 7.1, § 8.1, § 9.1). */
export function SectionHeading({
  badge,
  badgeIcon,
  title,
  subtitle,
  tone = 'light',
  align = 'start',
  className,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className,
      )}
    >
      {badge && (
        <Badge tone={tone} icon={badgeIcon}>
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          'mt-5 text-3xl leading-tight font-light tracking-tight sm:text-4xl md:text-5xl',
          tone === 'dark' ? 'text-white' : 'text-secondary',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-base leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-on-dark' : 'text-secondary/70',
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </Reveal>
  );
}

import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'solid' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-brand font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-sm sm:text-base',
};

const variants: Record<Variant, string> = {
  // Bouton principal : fond dégradé de marque + ombre #1372a2 à 20 % (§ 6.2)
  primary:
    'bg-brand-gradient text-white shadow-lg shadow-primary/20 outline-2 -outline-offset-2 outline-white/20 hover:shadow-xl hover:shadow-primary/30',
  // Bouton secondaire : contour en dégradé de marque (§ 6.1)
  outline: 'bg-brand-gradient p-px text-white',
  // Bouton plein : fond #1372a2, survol #0b305a (§ 8.4)
  solid: 'bg-primary text-white hover:bg-secondary',
  ghost: 'border border-secondary/15 bg-white text-secondary hover:border-accent hover:text-primary',
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/** Contenu interne du variant `outline`, qui a besoin d'un fond opaque. */
function Inner({ children, size }: { children: ReactNode; size: Size }) {
  return (
    <span
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-[9px] bg-secondary-900 font-medium text-white',
        sizes[size],
      )}
    >
      {children}
    </span>
  );
}

interface ButtonLinkProps extends CommonProps {
  href: string;
  /** Lien externe : ouvre dans un nouvel onglet, hors routage localisé. */
  external?: boolean;
}

export function ButtonLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], variant !== 'outline' && sizes[size], className);
  const content = variant === 'outline' ? <Inner size={size}>{children}</Inner> : children;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

interface ButtonProps extends CommonProps, Omit<ComponentProps<'button'>, 'className' | 'children'> {}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], variant !== 'outline' && sizes[size], className)}
      {...props}
    >
      {variant === 'outline' ? <Inner size={size}>{children}</Inner> : children}
    </button>
  );
}

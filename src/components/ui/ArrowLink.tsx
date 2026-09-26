import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Souligne le lien d'une bordure basse #388caf (§ 7.2 — « Voir tous »). */
  underline?: boolean;
  /**
   * Rend un `<span>` au lieu d'un `<a>`. Nécessaire quand le lien se trouve
   * déjà dans une carte cliquable : le modèle Blog4 imbriquait deux `<a>`, ce
   * qui est du HTML invalide (§ 16.2).
   */
  asSpan?: boolean;
}

/**
 * Lien avec flèche qui glisse au survol. La flèche pivote de 180° en arabe
 * pour suivre le sens de lecture (§ 11 — éléments inversés).
 */
export function ArrowLink({
  href,
  children,
  className,
  underline = false,
  asSpan = false,
}: ArrowLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        aria-hidden="true"
      />
    </>
  );

  const classes = cn(
    'group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent',
    underline && 'border-b border-accent pb-1',
    className,
  );

  if (asSpan) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

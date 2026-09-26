import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** `light` : texte blanc pour fond sombre. `dark` : texte #0b305a. */
  tone?: 'light' | 'dark';
  className?: string;
  /** Rend le logo sans lien, pour les en-têtes de fiche (§ 7.5). */
  asLink?: boolean;
  showWordmark?: boolean;
}

/**
 * Logo Eterna Tech.
 *
 * Le fichier actuel est le PNG du site existant. Le § 6.4 demande un SVG en
 * version claire pour fond sombre : le remplacer dans public/logo.png suffira,
 * les dimensions et le rendu sont déjà en place.
 */
export function Logo({
  tone = 'light',
  className,
  asLink = true,
  showWordmark = true,
}: LogoProps) {
  const t = useTranslations('common');

  const content = (
    <>
      <Image
        src="/logo.png"
        alt={asLink ? '' : t('brandLogoAlt')}
        aria-hidden={asLink ? 'true' : undefined}
        width={40}
        height={40}
        priority
        className="size-9 shrink-0 object-contain"
      />
      {showWordmark && (
        <span
          className={cn(
            'text-base font-light tracking-wide whitespace-nowrap sm:text-lg',
            tone === 'light' ? 'text-white' : 'text-secondary',
          )}
        >
          Eterna Tech
        </span>
      )}
    </>
  );

  if (!asLink) {
    return <span className={cn('flex items-center gap-2.5', className)}>{content}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={t('homeLinkLabel')}
      className={cn('flex items-center gap-2.5', className)}
    >
      {content}
    </Link>
  );
}

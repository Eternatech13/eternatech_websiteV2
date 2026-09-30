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
  /** `md` : header. `lg` : bloc de marque du footer (§ 10.1). */
  size?: 'md' | 'lg';
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
  size = 'md',
}: LogoProps) {
  const t = useTranslations('common');
  const isLarge = size === 'lg';

  const content = (
    <>
      <Image
        src="/logo.png"
        alt={asLink ? '' : t('brandLogoAlt')}
        aria-hidden={asLink ? 'true' : undefined}
        width={48}
        height={48}
        priority
        className={cn('shrink-0 object-contain', isLarge ? 'size-10' : 'size-9')}
      />
      {showWordmark && (
        <span
          className={cn(
            'tracking-tight whitespace-nowrap',
            isLarge
              ? 'text-xl font-medium md:text-2xl'
              : 'text-base font-light tracking-wide sm:text-lg',
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

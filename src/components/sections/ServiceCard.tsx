import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ServiceItem } from '@/content/types';
import { getIcon } from '@/lib/icons';
import { accentClasses, cn, resolveAccent } from '@/lib/utils';
import { ServiceVisual } from '@/components/ui/ServiceVisual';

/**
 * Carte de service (§ 7.1), sur le modèle Blog4.
 *
 * Deux corrections par rapport au modèle (§ 16.2) : le lien « En savoir plus »
 * est un `<span>` et non un second `<a>` imbriqué, ce qui rendait le HTML
 * invalide ; et la carte porte une description, absente du modèle.
 */
export function ServiceCard({ service, priority = false }: { service: ServiceItem; priority?: boolean }) {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const Icon = getIcon(service.icon);
  const accent = resolveAccent(service.accent);
  const colors = accentClasses[accent];

  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={t('cardLinkAria', { name: service.name })}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-secondary/10 bg-white shadow-sm transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-brand',
        colors.ring,
      )}
    >
      <div className="relative">
        <ServiceVisual icon={Icon} accent={accent} image={service.image} priority={priority} />
        {/* Pastille ronde blanche avec l'icône du service, à la fin de ligne */}
        <span
          aria-hidden="true"
          className="absolute end-4 top-4 flex size-11 items-center justify-center rounded-full bg-white shadow-md"
        >
          <Icon className={cn('size-5', colors.text)} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Ligne d'information : point de couleur + catégorie */}
        <p className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-secondary/60">
          <span aria-hidden="true" className={cn('size-1.5 rounded-full', colors.dot)} />
          <span className="sr-only">{t('categoryLabel')}: </span>
          {service.category}
        </p>

        <h3 className="mt-3 text-lg leading-snug font-semibold text-secondary transition-colors group-hover:text-primary">
          {service.name}
        </h3>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-secondary/70">
          {service.description}
        </p>

        <span className={cn('mt-5 inline-flex items-center gap-2 text-sm font-medium', colors.text)}>
          {tCommon('readMore')}
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

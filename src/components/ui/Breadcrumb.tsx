import { getTranslations } from 'next-intl/server';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Fil d'Ariane (§ 9.2 bloc 1).
 *
 * Le séparateur est un chevron pivoté, qui s'inverse en arabe pour suivre le
 * sens de lecture (§ 11).
 */
export async function Breadcrumb({ items }: { items: Crumb[] }) {
  const t = await getTranslations('breadcrumb');

  return (
    <nav aria-label={t('label')}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-on-dark-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-accent">
            {t('home')}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            <ChevronDown
              aria-hidden="true"
              className="size-3.5 -rotate-90 text-on-dark-muted/60 rtl:rotate-90"
            />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-on-dark">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

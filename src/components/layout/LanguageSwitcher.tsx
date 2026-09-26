'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronDown, Globe, LoaderCircle } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { localeLabels, locales, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * Sélecteur de langue FR / EN / AR (§ 4).
 *
 * Le changement de langue conserve la page en cours : `usePathname` de
 * next-intl renvoie le chemin sans préfixe de langue, et `router.replace`
 * réapplique le préfixe de la langue choisie.
 */
export function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const t = useTranslations('language');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const change = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const isLight = tone === 'light';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('switcherLabel')}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-brand border px-3 py-2 text-sm font-medium transition-colors',
          isLight
            ? 'border-white/20 text-white hover:border-accent hover:text-accent'
            : 'border-secondary/15 text-secondary hover:border-accent hover:text-primary',
        )}
      >
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Globe className="size-4" aria-hidden="true" />
        )}
        <span>{localeLabels[locale].short}</span>
        <ChevronDown
          className={cn('size-3.5 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <>
          {/* Fermeture au clic extérieur */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label={t('label')}
            className="absolute end-0 z-20 mt-2 min-w-44 overflow-hidden rounded-brand border border-secondary/10 bg-white py-1 shadow-brand"
          >
            {locales.map((item) => {
              const selected = item === locale;
              return (
                <li key={item} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => change(item)}
                    lang={item}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors',
                      selected
                        ? 'font-medium text-primary'
                        : 'text-secondary hover:bg-accent/10 hover:text-primary',
                    )}
                  >
                    <span>{localeLabels[item].name}</span>
                    {selected && <Check className="size-4 shrink-0" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

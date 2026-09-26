'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * En-tête simplifié des fiches service et solution (§ 4 et § 7.5) :
 * bouton « Retour » au début de la ligne, logo à la fin.
 *
 * La flèche pivote en arabe pour suivre le sens de lecture (§ 11).
 * Le bouton revient dans l'historique quand c'est possible, et retombe sur la
 * page de liste sinon (accès direct, partage de lien).
 */
export function SimpleHeader({ fallbackHref }: { fallbackHref: string }) {
  const t = useTranslations('common');
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-secondary-900/95 backdrop-blur-md">
      <div className="container-page flex items-center justify-between py-4">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-brand border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          {t('back')}
        </button>

        <div className="flex items-center gap-3">
          <LanguageSwitcher tone="light" />
          <Link href="/" aria-label={t('homeLinkLabel')}>
            <Logo tone="light" asLink={false} showWordmark={false} />
          </Link>
        </div>
      </div>
    </header>
  );
}

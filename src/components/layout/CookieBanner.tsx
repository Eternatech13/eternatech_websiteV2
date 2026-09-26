'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import {
  OPEN_SETTINGS_EVENT,
  openCookieSettings,
  readConsent,
  writeConsent,
} from '@/lib/consent';
import { Button } from '@/components/ui/Button';

/** Bannière de consentement cookies (§ 4). */
export function CookieBanner() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const decide = (value: 'accepted' | 'rejected') => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="false"
          aria-label={t('title')}
          className="fixed inset-x-0 bottom-0 z-60 border-t border-white/10 bg-secondary-900/98 backdrop-blur-md"
        >
          <div className="container-page flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-sm font-semibold text-white">{t('title')}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-on-dark">{t('body')}</p>
              <Link
                href="/politique-confidentialite"
                className="mt-1.5 inline-block text-sm text-accent underline-offset-4 transition-colors hover:underline"
              >
                {t('privacyLink')}
              </Link>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => decide('rejected')}
                className="rounded-brand border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
              >
                {t('reject')}
              </button>
              <Button type="button" onClick={() => decide('accepted')}>
                {t('accept')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Lien « Gestion des cookies » de la bande basse du footer (§ 10.3). */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="transition-colors hover:text-accent"
    >
      {label}
    </button>
  );
}

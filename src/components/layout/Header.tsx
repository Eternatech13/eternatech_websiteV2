'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import type { NavItem } from '@/content/types';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  nav: NavItem[];
  /**
   * `overlay` : header transparent posé sur la Hero sombre de l'accueil, qui
   * devient opaque au défilement. `solid` : fond #0b305a dès le chargement,
   * pour les pages dont le haut est clair.
   */
  variant?: 'overlay' | 'solid';
}

/**
 * Header fixe avec navigation, sélecteur de langue et bouton « Contactez-nous »
 * (§ 4 et § 6.1). Le bouton « Se connecter » du modèle Hero4 est retiré tant
 * qu'il n'y a pas d'espace client.
 */
export function Header({ nav, variant = 'solid' }: HeaderProps) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Le menu plein écran bloque le défilement de la page derrière lui.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Fermeture du menu à la navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const opaque = variant === 'solid' || scrolled;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        opaque
          ? 'border-b border-white/10 bg-secondary-900/95 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="container-page flex items-center justify-between py-4">
        <Logo tone="light" />

        <nav aria-label={t('mainNavigation')} className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'text-sm font-normal transition-colors',
                isActive(item.href) ? 'text-accent' : 'text-on-dark hover:text-white',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher tone="light" />
          <ButtonLink href="/contact" variant="primary">
            {t('contactCta')}
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={t('openMenu')}
          aria-expanded={menuOpen}
          className="flex items-center justify-center rounded-brand p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Menu mobile plein écran, semi-transparent avec flou (§ 6.3) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-secondary-900/95 p-6 backdrop-blur-md lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('mainNavigation')}
          >
            <div className="flex items-center justify-between">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t('closeMenu')}
                className="flex items-center justify-center rounded-brand p-2 text-white transition-colors hover:bg-white/10"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'border-b border-white/10 py-4 text-lg font-medium transition-colors hover:text-accent',
                    isActive(item.href) ? 'text-accent' : 'text-white',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 pt-8">
              <LanguageSwitcher tone="light" />
              <ButtonLink href="/contact" variant="primary" size="lg" className="w-full">
                {t('contactCta')}
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

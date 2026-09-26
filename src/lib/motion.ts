'use client';

import { useLocale } from 'next-intl';
import { useReducedMotion, type Variants } from 'motion/react';
import { getDirection, type Locale } from '@/i18n/routing';

/**
 * Animations de la plateforme (§ 6.3, § 7.2, § 8.5, § 9.6, § 10.5).
 *
 * Deux règles transverses :
 *  - le glissement latéral suit le sens de lecture, donc s'inverse en arabe
 *    (§ 11 — éléments inversés en RTL) ;
 *  - toutes les animations sont neutralisées si l'utilisateur a demandé de
 *    réduire les animations (§ 5 et § 11).
 */

/** Retourne +1 en lecture de gauche à droite, -1 en arabe. */
export function useDirectionFactor(): number {
  const locale = useLocale() as Locale;
  return getDirection(locale) === 'rtl' ? -1 : 1;
}

export function useMotionSettings() {
  const prefersReduced = useReducedMotion();
  const factor = useDirectionFactor();
  return { prefersReduced: Boolean(prefersReduced), factor };
}

/** Conteneur à apparition échelonnée (0,15 s entre éléments, § 6.3). */
export function containerVariants(stagger = 0.15, delayChildren = 0.2): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren, staggerChildren: stagger },
    },
  };
}

/**
 * Élément qui apparaît en fondu, avec glissement latéral et flou qui disparaît
 * (§ 6.3). `factor` inverse le glissement en arabe.
 */
export function slideInVariants(factor: number, prefersReduced: boolean): Variants {
  if (prefersReduced) {
    return { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } };
  }
  return {
    hidden: { opacity: 0, x: -30 * factor, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 70, damping: 20 },
    },
  };
}

/** Élément qui monte en fondu — utilisé par les grilles de cartes. */
export function riseVariants(prefersReduced: boolean, distance = 24): Variants {
  if (prefersReduced) {
    return { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } };
  }
  return {
    hidden: { opacity: 0, y: distance, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/** Réglage de viewport commun : animation déclenchée une seule fois. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

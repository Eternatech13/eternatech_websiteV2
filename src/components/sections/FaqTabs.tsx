'use client';

import { useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import type { FaqCategory } from '@/content/types';
import { getIcon } from '@/lib/icons';
import { containerVariants, riseVariants, useMotionSettings } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Onglets de thèmes et accordéon de questions.
 *
 * Structure du modèle FAQ2 : barre d'onglets en pilule, puis accordéon à
 * ouverture unique. Couleurs adaptées à la palette : onglet actif en dégradé
 * #1372a2 → #388caf, onglet inactif en #0b305a à 60 % avec survol #388caf à
 * 10 %, pastille d'ouverture qui passe au dégradé de marque une fois la question
 * dépliée.
 *
 * Quatre ajouts par rapport au modèle :
 *  - un vrai `tablist` navigable aux flèches, inversées en arabe, avec un seul
 *    onglet dans l'ordre de tabulation ;
 *  - un indicateur d'onglet actif qui glisse d'un onglet à l'autre (layoutId) ;
 *  - le nombre de questions affiché sur chaque onglet ;
 *  - les cartes qui réapparaissent en cascade au changement de thème.
 */
export function FaqTabs({ categories }: { categories: FaqCategory[] }) {
  const t = useTranslations('faq');
  const baseId = useId();
  const { prefersReduced, factor } = useMotionSettings();

  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const [openIndex, setOpenIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeCategory = categories.find((category) => category.id === activeId);
  const items = activeCategory?.items ?? [];

  const selectCategory = (id: string) => {
    setActiveId(id);
    // La première question du nouveau thème s'ouvre, comme au chargement.
    setOpenIndex(0);
  };

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = event.key === 'ArrowRight' ? factor : event.key === 'ArrowLeft' ? -factor : 0;
    let next = index;

    if (step !== 0) next = index + step;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = categories.length - 1;
    else return;

    event.preventDefault();
    const bounded = (next + categories.length) % categories.length;
    selectCategory(categories[bounded].id);
    tabRefs.current[bounded]?.focus();
  };

  return (
    <>
      {/* Barre d'onglets */}
      <div className="mb-10 flex justify-center">
        <div
          role="tablist"
          aria-label={t('categoriesLabel')}
          className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-secondary/10 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm"
        >
          {categories.map((category, index) => {
            const Icon = getIcon(category.icon);
            const isActive = category.id === activeId;

            return (
              <button
                key={category.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${category.id}`}
                aria-selected={isActive}
                aria-controls={`${baseId}-panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectCategory(category.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  'relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200',
                  isActive ? 'text-white' : 'text-secondary/60 hover:bg-accent/10 hover:text-primary',
                )}
              >
                {/* Indicateur qui glisse d'un onglet à l'autre */}
                {isActive && (
                  <motion.span
                    layoutId={`${baseId}-tab-indicator`}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-brand-gradient-short shadow-brand"
                    transition={
                      prefersReduced
                        ? { duration: 0.001 }
                        : { type: 'spring', stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <Icon className="relative size-4 shrink-0" aria-hidden="true" />
                <span className="relative">{category.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums',
                    isActive ? 'bg-white/20 text-white' : 'bg-secondary/8 text-secondary/50',
                  )}
                >
                  {category.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordéon des questions du thème actif */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeId}`}
        aria-labelledby={`${baseId}-tab-${activeId}`}
        className="mx-auto w-full max-w-3xl"
      >
        {items.length === 0 ? (
          <p className="py-10 text-center text-sm text-secondary/60">{t('empty')}</p>
        ) : (
          <motion.ul
            // La clé force la cascade à rejouer à chaque changement de thème.
            key={activeId}
            variants={containerVariants(0.06, 0)}
            initial="hidden"
            animate="visible"
            aria-label={t('questionsLabel', { category: activeCategory?.label ?? '' })}
            className="flex w-full flex-col gap-3"
          >
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const buttonId = `${baseId}-${activeId}-q-${index}`;
              const panelId = `${baseId}-${activeId}-a-${index}`;

              return (
                <motion.li
                  key={item.question}
                  variants={riseVariants(prefersReduced, 14)}
                  className={cn(
                    'group overflow-hidden rounded-card border transition-colors duration-300',
                    isOpen
                      ? 'border-secondary/10 border-s-2 border-s-accent bg-white shadow-brand'
                      : 'border-secondary/10 bg-white/70 hover:border-accent/40 hover:bg-white',
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-4.5 text-start sm:px-6"
                    >
                      <span
                        className={cn(
                          'text-base leading-snug font-semibold transition-colors duration-200',
                          isOpen ? 'text-primary' : 'text-secondary group-hover:text-primary',
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                          isOpen
                            ? 'bg-brand-gradient-short text-white'
                            : 'bg-secondary/8 text-secondary/50 group-hover:bg-accent/15 group-hover:text-primary',
                        )}
                      >
                        {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: prefersReduced ? 0.001 : 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6">
                          <div
                            aria-hidden="true"
                            className="mb-4 h-px bg-gradient-to-r from-accent/40 to-transparent rtl:bg-gradient-to-l"
                          />
                          <p className="text-sm leading-relaxed text-secondary/75 sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </>
  );
}

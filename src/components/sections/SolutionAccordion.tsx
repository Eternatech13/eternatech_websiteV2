'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { SolutionFeature } from '@/content/types';
import { getIcon } from '@/lib/icons';
import { useMotionSettings } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Accordéon des fonctionnalités d'une solution (§ 8.2).
 *
 * Trois écarts au modèle Features2 (§ 16.3) : disposition en colonne et non en
 * ligne, car il y a 4 fonctionnalités ; ouverture unique ; et la classe
 * inexistante `border-b-none` du modèle est remplacée par une bordure réelle.
 */
export function SolutionAccordion({
  features,
  label,
}: {
  features: SolutionFeature[];
  label: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);
  const { prefersReduced } = useMotionSettings();

  return (
    <ul aria-label={label} className="flex flex-col gap-2.5">
      {features.map((feature, index) => {
        const Icon = getIcon(feature.icon);
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li
            key={feature.title}
            className={cn(
              'overflow-hidden rounded-brand border border-secondary/10 bg-primary/6 transition-colors',
              isOpen && 'border-s-2 border-s-accent',
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-start"
              >
                <Icon
                  className={cn('size-5 shrink-0', isOpen ? 'text-accent' : 'text-primary')}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'flex-1 text-sm font-medium',
                    isOpen ? 'text-primary' : 'text-secondary',
                  )}
                >
                  {feature.title}
                </span>
                <ChevronDown
                  className={cn(
                    'size-4 shrink-0 text-primary transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
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
                  transition={{ duration: prefersReduced ? 0.001 : 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 ps-12 text-sm leading-relaxed text-secondary/70">
                    {feature.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

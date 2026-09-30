import { getTranslations } from 'next-intl/server';
import type { KeyFigure } from '@/content/types';
import { getIcon } from '@/lib/icons';
import { Counter } from '@/components/ui/Counter';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

/**
 * Cartes de chiffres clés (§ 9.3), partagées entre la Hero et la section
 * À propos. Les nombres défilent une seule fois à l'apparition et sont lus en
 * entier par les lecteurs d'écran (§ 9.6).
 */
export async function StatsGrid({
  figures,
  tone = 'dark',
}: {
  figures: KeyFigure[];
  tone?: 'dark' | 'light';
}) {
  const t = await getTranslations('about');
  const isDark = tone === 'dark';

  return (
    <RevealGroup
      as="ul"
      aria-label={t('figuresLabel')}
      stagger={0.1}
      className="grid gap-5 sm:grid-cols-3"
    >
      {figures.map((figure) => {
        const Icon = getIcon(figure.icon);
        return (
          <RevealItem
            as="li"
            key={figure.label}
            className={cn(
              'group rounded-card border p-7 text-center transition-all duration-300',
              isDark
                ? 'border-white/10 bg-white/5 hover:border-accent hover:shadow-[0_0_40px_-10px_rgb(56_140_175_/_0.5)]'
                : 'border-secondary/10 bg-white shadow-sm hover:border-accent hover:shadow-brand',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'mx-auto flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105',
                isDark ? 'bg-primary/20 text-accent' : 'bg-primary/10 text-primary',
              )}
            >
              <Icon className="size-6" />
            </span>

            <Counter
              value={figure.number}
              suffix={figure.suffix}
              screenReaderLabel={figure.screenReaderLabel}
              className={cn(
                'mt-5 block text-4xl font-bold sm:text-5xl',
                isDark ? 'text-brand-gradient-light' : 'text-brand-gradient',
              )}
            />

            <p
              aria-hidden="true"
              className={cn('mt-2 text-sm font-medium', isDark ? 'text-on-dark' : 'text-secondary/70')}
            >
              {figure.label}
            </p>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

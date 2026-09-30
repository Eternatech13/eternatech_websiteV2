import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { SolutionItem } from '@/content/types';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import { SolutionAccordion } from './SolutionAccordion';
import { SolutionDashboard } from './SolutionDashboard';

/**
 * Bloc d'une solution (§ 8.1 et § 8.3), sur le modèle Features2 : texte d'un
 * côté, tableau de bord illustratif de l'autre.
 *
 * `textSide` place le texte au début ou à la fin de la ligne. Les colonnes
 * s'inversent automatiquement en arabe puisque l'ordre est exprimé avec
 * `order`, qui suit le sens de lecture (§ 11).
 */
export async function SolutionBlock({ solution }: { solution: SolutionItem }) {
  const t = await getTranslations('solutions');
  const tCommon = await getTranslations('common');
  const textFirst = solution.textSide === 'start';

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Colonne de texte */}
      <Reveal className={cn(textFirst ? 'lg:order-1' : 'lg:order-2')}>
        {solution.logo && (
          <Image
            src={solution.logo}
            alt={solution.name}
            width={140}
            height={48}
            className="mb-5 h-11 w-auto object-contain"
          />
        )}

        <Badge tone="light">
          {t('badgePrefix')} · {solution.name}
        </Badge>

        <h3 className="mt-5 text-2xl leading-tight font-bold tracking-tight text-secondary sm:text-3xl md:text-4xl">
          {solution.title}
        </h3>

        <p className="mt-4 text-base leading-relaxed text-secondary/70">{solution.description}</p>

        <div className="mt-7">
          <SolutionAccordion
            features={solution.features}
            label={t('featuresLabel', { name: solution.name })}
          />
        </div>

        <div className="mt-8">
          <ButtonLink href={`/solutions/${solution.slug}`} variant="solid" size="lg">
            {tCommon('learnMore')}
          </ButtonLink>
        </div>
      </Reveal>

      {/* Colonne du tableau de bord */}
      <div className={cn(textFirst ? 'lg:order-2' : 'lg:order-1')}>
        <SolutionDashboard
          cards={solution.dashboard}
          altText={solution.dashboardAltText}
          caption={t('dashboardCaption')}
        />
        <p className="mt-3 text-xs text-secondary/50">{tCommon('illustrativeData')}</p>
      </div>
    </div>
  );
}

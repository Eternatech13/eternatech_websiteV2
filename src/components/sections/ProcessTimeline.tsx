import { getTranslations } from 'next-intl/server';
import type { ProcessStep } from '@/content/types';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

/**
 * Frise verticale du processus (§ 7.5).
 *
 * Ligne centrale et pastilles numérotées en dégradé #1372a2 → #388caf, cartes
 * alternées de part et d'autre sur grand écran, empilées au début de ligne sur
 * mobile. Chaque étape apparaît au défilement.
 *
 * Le nombre d'étapes est variable : les contenus réels d'eternatech.net en
 * comptent 7 pour deux services et 6 pour les onze autres.
 */
export async function ProcessTimeline({
  steps,
  title,
  subtitle,
}: {
  steps: ProcessStep[];
  title: string;
  subtitle?: string;
}) {
  const t = await getTranslations('services');

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="text-center">
          <h2 className="text-2xl leading-tight font-light tracking-tight text-secondary sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-secondary/70 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        <RevealGroup as="ol" stagger={0.12} className="relative mt-14">
          {/* Ligne : au début de ligne sur mobile, centrée sur grand écran */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-4 w-px bg-gradient-to-b from-primary via-accent to-transparent md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2"
          />

          {steps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <RevealItem
                as="li"
                key={step.title}
                className="relative ps-14 pb-10 last:pb-0 md:ps-0"
              >
                <div
                  className={cn(
                    'md:grid md:grid-cols-2 md:items-start md:gap-12',
                  )}
                >
                  {/* Pastille numérotée */}
                  <span
                    aria-hidden="true"
                    className="absolute start-0 top-0 flex size-9 items-center justify-center rounded-full bg-brand-gradient-short text-sm font-medium text-white shadow-brand md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2"
                  >
                    {index + 1}
                  </span>

                  <div
                    className={cn(
                      'rounded-card border border-secondary/10 bg-white p-6 shadow-sm',
                      isEven
                        ? 'md:col-start-2 md:ms-6'
                        : 'md:col-start-1 md:me-6 md:text-end',
                    )}
                  >
                    <p className="text-xs font-medium tracking-wide uppercase text-accent">
                      {t('stepAria', { number: index + 1, total: steps.length })}
                    </p>
                    <h3 className="mt-2 text-lg font-medium text-secondary">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-secondary/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

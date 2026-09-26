import { getSolutions } from '@/content';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExpertiseSection } from './ExpertiseSection';
import { SolutionBlock } from './SolutionBlock';

/**
 * Section Solutions (§ 8) : la solution phare développée en interne, puis les
 * 3 domaines d'expertise technologique.
 *
 * Fond blanc, entre la section Services claire et la section À propos sombre
 * (§ 9.1 — rythme de la page d'accueil).
 */
export async function SolutionsSection({ locale }: { locale: Locale }) {
  const { intro, items, expertise } = getSolutions(locale);

  return (
    <section id="solutions" className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          badge={intro.badge}
          title={intro.title}
          subtitle={intro.subtitle}
          align="center"
        />

        <div className="mt-16 space-y-24">
          {items.map((solution) => (
            <SolutionBlock key={solution.slug} solution={solution} />
          ))}
        </div>

        <ExpertiseSection expertise={expertise} />
      </div>
    </section>
  );
}

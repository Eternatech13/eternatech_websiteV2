import type { ReactNode } from 'react';
import { NetworkBackground } from '@/components/ui/NetworkBackground';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Hero des pages internes (§ 9.2 bloc 1) : fil d'Ariane, titre en dégradé de
 * marque et phrase d'accroche, sur le fond sombre de la charte.
 */
export function PageHero({
  breadcrumb,
  title,
  titleAccent,
  tagline,
  children,
  withNetwork = true,
}: {
  breadcrumb?: Crumb[];
  title: string;
  titleAccent?: string;
  tagline?: string;
  children?: ReactNode;
  withNetwork?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-secondary-900 pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgb(19_114_162_/_0.3),transparent_55%)]"
      />
      {withNetwork && <NetworkBackground className="opacity-50" />}

      <div className="relative container-page">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}

        <Reveal className="mt-6 max-w-3xl">
          <h1 className="text-3xl leading-tight font-light tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-white">{title}</span>
            {titleAccent && <span className="text-brand-gradient-light">{titleAccent}</span>}
          </h1>
          {tagline && (
            <p className="mt-5 text-base leading-relaxed text-on-dark sm:text-lg">{tagline}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

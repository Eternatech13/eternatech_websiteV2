import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Appel à l'action « Parlons de votre projet » (§ 7.5 et § 9.2 bloc 8).
 * Absent du site actuel, ajouté en bas des fiches et de la page À propos.
 */
export function CtaBand({
  title,
  body,
  cta,
  href = '/contact',
}: {
  title: string;
  body: string;
  cta: string;
  href?: string;
}) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-card bg-brand-gradient p-8 text-center sm:p-12">
          <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-60" />
          <div className="relative">
            <h2 className="text-2xl leading-tight font-bold text-white sm:text-3xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {body}
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={href} variant="ghost" size="lg">
                {cta}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

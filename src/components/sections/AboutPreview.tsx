import { Building2 } from 'lucide-react';
import { getAbout } from '@/content';
import type { Locale } from '@/i18n/routing';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { StatsGrid } from './StatsGrid';

/**
 * Aperçu À propos sur la page d'accueil (§ 9.1).
 *
 * Fond sombre #071f3b avec halo #1372a2 à 20 %, pour rythmer la page :
 * Hero sombre, Services clair, Solutions blanc, À propos sombre (§ 9.5).
 */
export async function AboutPreview({ locale }: { locale: Locale }) {
  const about = getAbout(locale);
  const { preview } = about;

  return (
    <section id="a-propos" className="relative overflow-hidden bg-secondary-900 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-1/4 size-[32rem] rounded-full bg-primary/20 blur-[120px]"
      />

      <div className="relative container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Badge tone="dark" icon={Building2}>
            {preview.badge}
          </Badge>
          <h2 className="mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-white">{preview.title}</span>
            <span className="text-brand-gradient-light">{preview.titleAccent}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-on-dark">{preview.description}</p>
        </Reveal>

        <div className="mt-14">
          <StatsGrid figures={about.figures} tone="dark" />
        </div>

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href="/a-propos" variant="outline" size="lg">
            {preview.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

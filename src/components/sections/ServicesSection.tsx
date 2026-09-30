import { getTranslations } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import { getServices } from '@/content';
import type { Locale } from '@/i18n/routing';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Badge } from '@/components/ui/Badge';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ServiceCard } from './ServiceCard';

/**
 * Section Services (§ 7), sur le modèle Blog4 recoloré.
 *
 * Fond blanc cassé teinté de bleu pour contraster avec la Hero sombre (§ 7.2).
 * En-tête sur deux colonnes, grille 1/2/3 colonnes.
 *
 * La grille des 13 services laisse une dernière rangée incomplète sur
 * ordinateur (§ 7.1). Une 14e tuile d'appel à l'action comble ce vide et sert
 * la conversion, plutôt que de laisser un trou dans la mise en page.
 */
export async function ServicesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations('services');
  const tCommon = await getTranslations('common');
  const { intro, items } = getServices(locale);

  return (
    <section id="services" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        {/* En-tête sur deux colonnes, une seule sur mobile */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge tone="light" icon={Sparkles}>
              {intro.badge}
            </Badge>
            <h2 className="mt-5 text-3xl leading-tight font-bold tracking-tight text-secondary sm:text-4xl md:text-5xl">
              {intro.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary/70">
              {intro.subtitle}
            </p>
          </Reveal>

          <Reveal className="lg:mt-16 lg:justify-self-end">
            <p className="max-w-md text-sm leading-relaxed text-secondary/70">{intro.pitch}</p>
            <ArrowLink href="/services" underline className="mt-5">
              {tCommon('viewAllServices')}
            </ArrowLink>
          </Reveal>
        </div>

        {/* Grille de cartes */}
        <RevealGroup
          as="ul"
          stagger={0.08}
          className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((service, index) => (
            <RevealItem as="li" key={service.slug} className="h-full">
              <ServiceCard service={service} priority={index < 3} />
            </RevealItem>
          ))}

          {/* Tuile d'appel à l'action, qui complète la dernière rangée */}
          <RevealItem as="li" className="h-full">
            <div className="flex h-full flex-col justify-center rounded-card border border-dashed border-accent/50 bg-accent/5 p-8 text-center">
              <h3 className="text-lg font-semibold text-secondary">{t('ctaTitle')}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-secondary/70">{t('ctaBody')}</p>
              <ArrowLink href="/contact" className="mt-5 justify-center">
                {t('ctaButton')}
              </ArrowLink>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

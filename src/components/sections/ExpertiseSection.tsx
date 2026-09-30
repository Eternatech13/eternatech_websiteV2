import { getTranslations } from 'next-intl/server';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ExpertiseContent } from '@/content/types';
import { getIcon } from '@/lib/icons';
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal';

/**
 * Bloc Expertise technologique (§ 8.8).
 *
 * Il fait le lien entre services et solutions : chaque carte renvoie vers ce
 * qui utilise cette expertise, via les étiquettes « Utilisée dans » et le lien
 * « Découvrir ».
 *
 * En arabe, la ligne fine de l'en-tête part vers la gauche et les puces passent
 * à droite du texte : les deux suivent le sens de lecture grâce aux propriétés
 * logiques.
 */
export async function ExpertiseSection({ expertise }: { expertise: ExpertiseContent }) {
  const t = await getTranslations('solutions');
  const tCommon = await getTranslations('common');
  const { intro, items } = expertise;

  return (
    <div className="mt-24 md:mt-32">
      {/* En-tête : tuile d'icône en dégradé + titre + ligne qui s'étend */}
      <Reveal className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-short text-white shadow-brand"
        >
          <Sparkles className="size-5" />
        </span>
        <h3 className="text-xl font-bold text-secondary sm:text-2xl">{intro.title}</h3>
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-gradient-to-r from-accent to-transparent md:block rtl:bg-gradient-to-l"
        />
      </Reveal>
      <Reveal as="p" className="mt-3 max-w-xl text-sm leading-relaxed text-secondary/70">
        {intro.subtitle}
      </Reveal>

      <RevealGroup as="ul" stagger={0.1} className="mt-10 grid gap-6 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <RevealItem
              as="li"
              key={item.id}
              className="group flex h-full flex-col rounded-card border border-secondary/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-brand"
            >
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
              >
                <Icon className="size-6" />
              </span>

              <h4 className="mt-5 text-lg font-semibold text-secondary">{item.title}</h4>
              <p className="mt-2.5 text-sm leading-relaxed text-secondary/70">{item.description}</p>

              <ul aria-label={t('keyPointsLabel')} className="mt-5 space-y-2">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-secondary/80">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Pied de carte : étiquettes cliquables vers les contenus liés */}
              <div className="mt-auto pt-6">
                <p className="text-xs font-medium tracking-wide uppercase text-secondary/50">
                  {t('expertiseUsedIn')}
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {item.usedIn.map((tag) => (
                    <li key={tag.href + tag.label}>
                      <Link
                        href={tag.href}
                        className="inline-block rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-accent/20"
                      >
                        {tag.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {item.discover && (
                  <Link
                    href={item.discover.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    {tCommon('discover')}
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}

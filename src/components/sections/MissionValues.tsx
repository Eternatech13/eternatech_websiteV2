import { getTranslations } from 'next-intl/server';
import { Rocket } from 'lucide-react';
import type { AboutContent } from '@/content/types';
import { getIcon } from '@/lib/icons';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * Mission et valeurs (§ 9.4) : carte Mission au début de ligne, liste des
 * valeurs à la fin. Les deux colonnes s'inversent en arabe, et le trait qui
 * précède « Nos Valeurs » passe de l'autre côté du titre (§ 9.6).
 *
 * Les 4 valeurs sont affichées partout, ce qui corrige l'incohérence du site
 * actuel où la liste en montrait 3 et les étiquettes de la carte Mission une
 * combinaison différente.
 */
export async function MissionValues({ about }: { about: AboutContent }) {
  const t = await getTranslations('about');
  const { mission, values } = about;

  return (
    <section
      aria-label={t('missionLabel')}
      className="relative overflow-hidden bg-secondary-900 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 end-1/4 size-[28rem] rounded-full bg-primary/20 blur-[120px]"
      />

      <div className="relative container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Carte Mission */}
        <Reveal className="rounded-card border border-white/10 bg-gradient-to-br from-secondary to-primary/40 p-8 sm:p-10">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-short text-white shadow-brand"
            >
              <Rocket className="size-7" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white">{mission.title}</h2>
              <p className="text-sm font-medium text-accent">{mission.subtitle}</p>
            </div>
          </div>

          <p className="mt-7 text-base leading-relaxed text-on-dark sm:text-lg">{mission.body}</p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {values.items.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <li
                  key={value.title}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-on-dark"
                >
                  <Icon className="size-4 text-accent" aria-hidden="true" />
                  {value.title}
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Liste des valeurs */}
        <div>
          <Reveal as="h2" className="flex items-center gap-3 text-xl font-bold text-white">
            <span aria-hidden="true" className="h-1 w-8 rounded-full bg-brand-gradient-short" />
            {values.title}
          </Reveal>

          <RevealGroup as="ul" stagger={0.1} className="mt-6 space-y-4">
            {values.items.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <RevealItem
                  as="li"
                  key={value.title}
                  className="group flex items-start gap-4 rounded-card border border-white/10 border-s-2 border-s-transparent bg-white/5 p-5 transition-colors hover:border-s-accent"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-accent"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white transition-colors group-hover:text-accent">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-on-dark">
                      {value.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from 'next-intl/server';
import { CookieSettingsButton } from '@/components/layout/CookieBanner';
import { Reveal } from '@/components/ui/Reveal';

/** Corps des pages légales, en colonne de lecture étroite. */
export async function LegalSections({
  sections,
  showCookieSettings = false,
}: {
  sections: { title: string; body: string }[];
  showCookieSettings?: boolean;
}) {
  const t = await getTranslations('cookies');

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section, index) => (
            <Reveal as="section" key={section.title} delay={index * 0.04}>
              <h2 className="text-xl font-medium text-secondary sm:text-2xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-secondary/75 sm:text-base">
                {section.body}
              </p>
            </Reveal>
          ))}

          {showCookieSettings && (
            <Reveal className="rounded-card border border-secondary/10 bg-surface p-6">
              <p className="text-sm text-secondary/75">{t('body')}</p>
              <div className="mt-4 font-medium text-primary">
                <CookieSettingsButton label={t('reopen')} />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

import type { SolutionDashboardCard } from '@/content/types';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

/** Couleurs des segments de la barre empilée (§ 8.4). */
const segmentTones: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  // Seule exception à la palette : l'orange d'alerte
  alert: 'bg-alert',
};

const segmentDots: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  alert: 'bg-alert',
};

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  );
}

function Card({ card, index }: { card: SolutionDashboardCard; index: number }) {
  const Icon = getIcon(card.icon);
  const isAlert = card.kind === 'alert';

  return (
    <RevealItem
      className={cn(
        'rounded-card bg-white p-5 shadow-brand-lg motion-safe:animate-float-slow',
        // Bordure de début de ligne orange pour la carte d'alerte (§ 8.4)
        isAlert && 'border-s-4 border-s-alert',
        // Décalages qui simulent des cartes superposées ; supprimés sous 480 px
        index === 1 && 'min-[480px]:ms-10',
        index === 2 && 'min-[480px]:ms-4',
      )}
      style={{ animationDelay: `${index * 1.2}s` }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg',
            isAlert ? 'bg-alert/12 text-alert' : 'bg-primary/10 text-primary',
          )}
        >
          <Icon className="size-4" />
        </span>
        <p className="text-sm font-medium text-secondary">{card.title}</p>
        {card.caption && (
          <span className="ms-auto text-xs text-secondary/50">{card.caption}</span>
        )}
      </div>

      {card.headline && (
        <p
          className={cn(
            'mt-4 text-secondary',
            card.kind === 'score' ? 'font-bold' : 'font-normal',
            card.kind === 'score' ? 'text-3xl' : 'text-sm leading-relaxed',
          )}
        >
          {card.headline}
        </p>
      )}

      {card.tags && card.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      {card.metrics && card.metrics.length > 0 && (
        <dl className="mt-4 space-y-2 border-t border-secondary/10 pt-3">
          {card.metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between gap-4">
              <dt className="text-xs text-secondary/60">{metric.label}</dt>
              <dd className="text-xs font-medium text-secondary">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {card.segments && card.segments.length > 0 && (
        <div className="mt-4">
          <div className="flex h-2 overflow-hidden rounded-full bg-secondary/10">
            {card.segments.map((segment) => (
              <span
                key={segment.label}
                className={cn('h-full', segmentTones[segment.tone] ?? 'bg-primary')}
                style={{ width: `${segment.value}%` }}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {card.segments.map((segment) => (
              <li
                key={segment.label}
                className="flex items-center gap-1.5 text-xs text-secondary/60"
              >
                <span
                  className={cn(
                    'size-1.5 rounded-full',
                    segmentDots[segment.tone] ?? 'bg-primary',
                  )}
                />
                {segment.label} {segment.value}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </RevealItem>
  );
}

/**
 * Panneau de droite du bloc solution (§ 8.1 et § 8.3) : fond #0b305a plein,
 * cartes blanches qui simulent la plateforme web.
 *
 * Le panneau entier est décoratif : il est masqué aux lecteurs d'écran, qui
 * lisent à la place le résumé `altText` (§ 8.7 — accessibilité renforcée).
 */
export function SolutionDashboard({
  cards,
  altText,
  caption,
}: {
  cards: SolutionDashboardCard[];
  altText: string;
  caption: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-card bg-secondary p-6 shadow-[inset_0_2px_30px_rgb(4_16_32_/_0.55)] sm:p-8">
      <p className="sr-only">{altText}</p>
      <p aria-hidden="true" className="mb-5 text-xs tracking-wider uppercase text-on-dark-muted">
        {caption}
      </p>
      <RevealGroup aria-hidden="true" stagger={0.15} className="flex flex-col gap-4">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </RevealGroup>
    </div>
  );
}

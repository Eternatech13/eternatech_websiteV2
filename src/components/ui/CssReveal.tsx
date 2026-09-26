import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Apparition purement CSS, sans JavaScript (§ 6.3).
 *
 * Utilisée pour la Hero, dont le contenu porte le LCP de la page : il doit
 * s'afficher sans attendre l'hydratation, et rester visible même si aucun
 * script ne s'exécute. L'échelonnement se fait par `animation-delay`, et le
 * glissement s'inverse en arabe via la variable `--reveal-direction`.
 *
 * Les sections situées plus bas dans la page utilisent `Reveal`, qui déclenche
 * l'animation au défilement et nécessite donc JavaScript.
 */
export function CssReveal({
  children,
  className,
  as: Tag = 'div',
  /** Décalage d'apparition, en secondes. */
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={cn('reveal-css', className)}
      style={{ animationDelay: delay ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}

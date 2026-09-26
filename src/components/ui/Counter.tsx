'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
  /** Formulation complète lue par les lecteurs d'écran (§ 9.6). */
  screenReaderLabel: string;
  durationMs?: number;
}

/**
 * Chiffre clé qui défile de 0 à sa valeur quand la carte apparaît, une seule
 * fois (§ 9.3).
 *
 * Le rendu serveur affiche directement la valeur finale : sans cela, un
 * visiteur dont le JavaScript ne s'exécute pas verrait « 0+ » au lieu de
 * « 25+ ». Le décompte ne démarre qu'après hydratation, et seulement si
 * l'animation est autorisée.
 *
 * Accessibilité : le nombre animé est masqué aux lecteurs d'écran, qui lisent à
 * la place la formulation complète — « Plus de 25 projets réalisés » plutôt que
 * « 25 + » (§ 9.6).
 */
export function Counter({
  value,
  suffix = '',
  className,
  screenReaderLabel,
  durationMs = 1400,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReduced || hasAnimated.current) return;

    // Avant d'entrer dans la zone visible, on repart de zéro pour que le
    // décompte soit perceptible.
    if (!isInView) {
      setDisplayed(0);
      return;
    }

    hasAnimated.current = true;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // Courbe d'arrivée douce
      const eased = 1 - (1 - progress) ** 3;
      setDisplayed(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, isInView, prefersReduced, value]);

  return (
    <span ref={ref} className={cn(className)}>
      <span aria-hidden="true">
        {displayed}
        {suffix}
      </span>
      <span className="sr-only">{screenReaderLabel}</span>
    </span>
  );
}

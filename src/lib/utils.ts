import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Fusionne des classes Tailwind en résolvant les conflits. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { BrandAccent } from '@/content/types';

/**
 * Jeux de classes par accent de marque (§ 7.2 et § 8.4).
 * Les trois accents alternent sur les cartes de services et de solutions.
 */
export const accentClasses: Record<
  BrandAccent,
  {
    text: string;
    bg: string;
    bgSoft: string;
    border: string;
    dot: string;
    iconTile: string;
    ring: string;
  }
> = {
  primary: {
    text: 'text-primary',
    bg: 'bg-primary',
    bgSoft: 'bg-primary/10',
    border: 'border-primary/30',
    dot: 'bg-primary',
    iconTile: 'bg-primary/10 text-primary',
    ring: 'group-hover:border-primary/50',
  },
  secondary: {
    text: 'text-secondary',
    bg: 'bg-secondary',
    bgSoft: 'bg-secondary/10',
    border: 'border-secondary/30',
    dot: 'bg-secondary',
    iconTile: 'bg-secondary/10 text-secondary',
    ring: 'group-hover:border-secondary/50',
  },
  accent: {
    text: 'text-accent',
    bg: 'bg-accent',
    bgSoft: 'bg-accent/10',
    border: 'border-accent/30',
    dot: 'bg-accent',
    iconTile: 'bg-accent/10 text-accent',
    ring: 'group-hover:border-accent/50',
  },
};

/** Résout un accent inconnu vers la couleur principale. */
export function resolveAccent(accent: string): BrandAccent {
  return accent in accentClasses ? (accent as BrandAccent) : 'primary';
}

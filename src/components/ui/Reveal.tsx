'use client';

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  containerVariants,
  riseVariants,
  slideInVariants,
  useMotionSettings,
  viewportOnce,
} from '@/lib/motion';
import { cn } from '@/lib/utils';

type RevealVariant = 'slide' | 'rise';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `slide` glisse depuis le début de ligne (§ 6.3), `rise` monte (§ 8.5). */
  variant?: RevealVariant;
  /** Décalage d'apparition, en secondes. */
  delay?: number;
}

/**
 * Apparition au défilement, une seule fois, avec respect de
 * prefers-reduced-motion et inversion du glissement en arabe.
 */
export function Reveal({
  children,
  className,
  as = 'div',
  variant = 'rise',
  delay = 0,
}: RevealProps) {
  const { prefersReduced, factor } = useMotionSettings();
  const variants =
    variant === 'slide' ? slideInVariants(factor, prefersReduced) : riseVariants(prefersReduced);

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      data-reveal=""
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Intervalle entre deux enfants. 0,1 s pour les cartes d'expertise (§ 8.8). */
  stagger?: number;
  delayChildren?: number;
}

/** Conteneur qui échelonne l'apparition de ses enfants `RevealItem`. */
export function RevealGroup({
  children,
  className,
  as = 'div',
  stagger = 0.12,
  delayChildren = 0.05,
}: RevealGroupProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      data-reveal=""
      className={cn(className)}
      variants={containerVariants(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: RevealVariant;
  style?: CSSProperties;
}

/** Enfant d'un `RevealGroup`. */
export function RevealItem({
  children,
  className,
  as = 'div',
  variant = 'rise',
  style,
}: RevealItemProps) {
  const { prefersReduced, factor } = useMotionSettings();
  const variants =
    variant === 'slide' ? slideInVariants(factor, prefersReduced) : riseVariants(prefersReduced);

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag data-reveal="" className={cn(className)} variants={variants} style={style}>
      {children}
    </MotionTag>
  );
}

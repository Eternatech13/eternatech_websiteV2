'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Couleurs de l'effet réseau, recolorées avec la palette (§ 6.2). */
const DOT_COLORS = ['#1372a2', '#388caf'] as const;
const LINE_COLOR = '56, 140, 175'; // #388caf en composantes RVB

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

/**
 * Fond animé de points reliés, reprenant l'effet du site actuel recoloré en
 * #1372a2 et #388caf (§ 6.1, point 7).
 *
 * Le canvas est purement décoratif : il est masqué aux lecteurs d'écran. Si
 * l'utilisateur a demandé de réduire les animations, le réseau est dessiné une
 * seule fois, sans boucle d'animation (§ 11).
 */
export function NetworkBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const init = () => {
      const { offsetWidth: width, offsetHeight: height } = canvas;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densité plafonnée pour rester performant sur mobile (§ 11 — LCP).
      const count = Math.min(Math.floor((width * height) / 14000), 90);
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.6 + 0.6,
          color: DOT_COLORS[Math.random() > 0.5 ? 0 : 1],
        };
      });
    };

    const draw = (animate: boolean) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (animate) {
          p.originX += p.vx;
          p.originY += p.vy;
          if (p.originX < 0 || p.originX > width) p.vx *= -1;
          if (p.originY < 0 || p.originY > height) p.vy *= -1;
          p.x += (p.originX - p.x) * 0.05;
          p.y += (p.originY - p.y) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${(1 - distance / 110) * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      draw(true);
      animationId = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      init();
      if (prefersReduced) draw(false);
    };

    init();
    if (prefersReduced) {
      draw(false);
    } else {
      loop();
    }

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 size-full select-none', className)}
    />
  );
}

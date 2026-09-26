import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import type { BrandAccent } from '@/content/types';
import { cn } from '@/lib/utils';

const panels: Record<BrandAccent, string> = {
  primary: 'from-primary via-primary-600 to-secondary',
  secondary: 'from-secondary via-secondary-700 to-primary',
  accent: 'from-accent via-primary to-secondary',
};

interface ServiceVisualProps {
  icon: LucideIcon;
  accent: BrandAccent;
  /** Image finale si elle a été fournie ; sinon visuel de remplacement. */
  image?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Visuel d'une carte de service (§ 7.1 — image de 240 à 256 px de haut).
 *
 * Les 13 images de services sont encore à fournir (§ 7.4). En attendant, un
 * visuel de remplacement neutre est généré aux dimensions finales, conforme à
 * l'hypothèse du § 15 : dégradé de marque, trame de points et icône du service.
 * Dès qu'une image est renseignée dans le contenu, elle est servie par
 * `next/image` en AVIF/WebP, sans autre modification.
 */
export function ServiceVisual({
  icon: Icon,
  accent,
  image,
  alt = '',
  className,
  priority = false,
}: ServiceVisualProps) {
  if (image) {
    return (
      <div className={cn('relative h-60 w-full overflow-hidden sm:h-64', className)}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative h-60 w-full overflow-hidden bg-gradient-to-br sm:h-64',
        panels[accent],
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <Icon className="size-20 text-white/30" strokeWidth={1.25} />
      </div>
    </div>
  );
}

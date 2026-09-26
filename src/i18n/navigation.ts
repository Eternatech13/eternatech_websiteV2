import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * APIs de navigation conscientes de la langue : le préfixe /fr, /en ou /ar
 * est ajouté automatiquement et conservé lors des changements de page.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

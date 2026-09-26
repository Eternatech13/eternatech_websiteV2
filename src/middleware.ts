import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf les API, les fichiers internes Next.js
  // et les fichiers statiques (qui contiennent un point).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

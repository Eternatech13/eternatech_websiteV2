import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isDev = process.env.NODE_ENV !== 'production';

/**
 * En-têtes de sécurité (cahier des charges § 11 — Sécurité).
 *
 * La CSP autorise :
 *  - Cloudflare Turnstile (anti-spam du formulaire de contact)
 *  - Google Maps embed (bloc « Où nous trouver », chargé après consentement)
 *  - Google Analytics / Tag Manager ou Plausible (suivi, chargé après consentement)
 *
 * En développement seulement, deux assouplissements sont nécessaires :
 *  - 'unsafe-eval' : le rechargement à chaud de Next.js (React Refresh) évalue
 *    du code à la volée. Sans cette directive, aucun script client ne démarre.
 *  - websockets et localhost : canal de rechargement à chaud.
 * Ces deux ajouts sont absents du build de production.
 */
const scriptSrc = [
  "'self'",
  // Next.js injecte des scripts inline pour l'hydratation.
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  'https://challenges.cloudflare.com',
  'https://www.googletagmanager.com',
  'https://plausible.io',
].join(' ');

const connectSrc = [
  "'self'",
  ...(isDev ? ['ws:', 'wss:', 'http://localhost:*'] : []),
  'https://www.google-analytics.com',
  'https://plausible.io',
].join(' ');

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://maps.gstatic.com https://maps.googleapis.com https://www.google-analytics.com",
  "font-src 'self' data:",
  `connect-src ${connectSrc}`,
  'frame-src https://www.google.com https://maps.google.com https://challenges.cloudflare.com',
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // § 11 — images en AVIF / WebP
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);

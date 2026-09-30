'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Inscription à la newsletter (§ 10.1 et § 10.5).
 *
 * Structure du modèle Footer19 : champ et bouton accolés sur une seule ligne de
 * 56 px de haut. Les coins extérieurs sont arrondis pour respecter la règle de
 * 8 à 12 px de la charte (§ 5), là où le modèle est à angles droits.
 *
 * Couleurs (§ 10.4) : champ sur fond blanc à 5 %, bordure blanc à 15 %, focus
 * #388caf ; bouton fond #1372a2, survol #388caf.
 *
 * Le formulaire du modèle se contentait d'un preventDefault : celui-ci appelle
 * une route d'API, affiche un message de succès ou d'erreur et porte une mention
 * de consentement.
 */
export function NewsletterForm({ consent }: { consent: string }) {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage(t('invalidEmail'));
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('request failed');

      setStatus('success');
      setMessage(t('success'));
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(t('error'));
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex h-14 w-full overflow-hidden rounded-brand border border-white/15 bg-white/5 focus-within:border-accent">
        <label htmlFor="newsletter-email" className="sr-only">
          {t('emailLabel')}
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t('emailPlaceholder')}
          aria-invalid={status === 'error'}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 bg-transparent px-5 text-sm text-white placeholder:text-on-dark-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex h-full shrink-0 items-center justify-center gap-2 bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-accent disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              <span className="hidden sm:inline">{t('submitting')}</span>
            </>
          ) : (
            <>
              {t('submit')}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <p id="newsletter-status" role="status" aria-live="polite" className="mt-3 min-h-5 text-sm">
        {status === 'success' && (
          <span className="inline-flex items-center gap-2 text-accent-300">
            <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
            {message}
          </span>
        )}
        {status === 'error' && (
          <span className="inline-flex items-center gap-2 text-alert">
            <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
            {message}
          </span>
        )}
      </p>

      <p className="mt-2 text-xs leading-relaxed text-on-dark-muted">{consent}</p>
    </form>
  );
}

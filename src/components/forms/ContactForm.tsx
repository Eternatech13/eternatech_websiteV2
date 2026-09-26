'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';
import { useLocale, useTranslations } from 'next-intl';
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'phone' | 'company' | 'subject' | 'message';

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClasses =
  'w-full rounded-brand border border-secondary/15 bg-white px-4 py-3 text-sm text-secondary placeholder:text-secondary/40 transition-colors focus:border-primary focus:outline-none';

function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-secondary">
      {children}
      {required ? (
        <span className="text-alert" aria-hidden="true">
          {' '}
          *
        </span>
      ) : (
        hint && <span className="ms-1.5 text-xs font-normal text-secondary/50">({hint})</span>
      )}
    </label>
  );
}

/**
 * Formulaire de contact (§ 4) : Nom complet*, Email*, Téléphone, Entreprise,
 * Sujet*, Message*.
 *
 * Deux corrections par rapport au site actuel : l'exemple du champ téléphone
 * utilise l'indicatif algérien +213 et non +212, et le sujet est une liste de
 * choix, ce qui permet au serveur d'orienter le message vers la bonne boîte.
 *
 * Protection anti-spam par Cloudflare Turnstile quand la clé publique est
 * configurée ; sinon le champ est simplement absent et le serveur ne l'exige pas.
 */
export function ContactForm({ subjects }: { subjects: string[] }) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const validate = (data: FormData) => {
    const next: Partial<Record<FieldName, string>> = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (name.length < 2) next.name = t('errors.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t('errors.email');
    if (phone && !/^[+\d][\d\s().-]{6,}$/.test(phone)) next.phone = t('errors.phone');
    if (!subject) next.subject = t('errors.subject');
    if (message.length < 20) next.message = t('errors.message');

    if (turnstileSiteKey && !String(data.get('cf-turnstile-response') ?? '')) {
      setFeedback(t('errors.captcha'));
    }

    return next;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setFeedback('');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          company: data.get('company'),
          subject: data.get('subject'),
          message: data.get('message'),
          token: data.get('cf-turnstile-response') ?? '',
          locale,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        if (payload?.error === 'rate_limit') {
          setStatus('error');
          setFeedback(t('errors.rateLimit'));
          return;
        }
        if (payload?.error === 'captcha') {
          setStatus('error');
          setFeedback(t('errors.captcha'));
          return;
        }
        throw new Error('request failed');
      }

      setStatus('success');
      setFeedback(t('success'));
      form.reset();
    } catch {
      setStatus('error');
      setFeedback(t('error', { email: 'contact@eternatech.net' }));
    }
  };

  const describedBy = (field: FieldName) => (errors[field] ? `${field}-error` : undefined);

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      <form ref={formRef} onSubmit={submit} noValidate className="space-y-5">
        <p className="text-sm text-secondary/60">{t('formIntro')}</p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" required>
              {t('fields.name')}
            </Label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder={t('placeholders.name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('name')}
              className={cn(fieldClasses, errors.name && 'border-alert')}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-alert-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" required>
              {t('fields.email')}
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              dir="ltr"
              placeholder={t('placeholders.email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
              className={cn(fieldClasses, errors.email && 'border-alert')}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-alert-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" hint={t('optional')}>
              {t('fields.phone')}
            </Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              dir="ltr"
              placeholder={t('placeholders.phone')}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy('phone')}
              className={cn(fieldClasses, errors.phone && 'border-alert')}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 text-xs text-alert-600">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="company" hint={t('optional')}>
              {t('fields.company')}
            </Label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={t('placeholders.company')}
              className={fieldClasses}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="subject" required>
            {t('fields.subject')}
          </Label>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={describedBy('subject')}
            className={cn(fieldClasses, errors.subject && 'border-alert')}
          >
            <option value="" disabled>
              {t('placeholders.subject')}
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-xs text-alert-600">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="message" required>
            {t('fields.message')}
          </Label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder={t('placeholders.message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            className={cn(fieldClasses, 'resize-y', errors.message && 'border-alert')}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-alert-600">
              {errors.message}
            </p>
          )}
        </div>

        {turnstileSiteKey && (
          <div>
            <p className="mb-2 text-sm font-medium text-secondary">{t('captchaLabel')}</p>
            <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
          </div>
        )}

        <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full sm:w-auto">
          {status === 'loading' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              {t('submitting')}
            </>
          ) : (
            <>
              <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              {t('submit')}
            </>
          )}
        </Button>

        <div role="status" aria-live="polite" className="min-h-6">
          {status === 'success' && feedback && (
            <p className="flex items-start gap-2 rounded-brand bg-primary/8 p-4 text-sm text-primary">
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {feedback}
            </p>
          )}
          {status === 'error' && feedback && (
            <p className="flex items-start gap-2 rounded-brand bg-alert/10 p-4 text-sm text-alert-600">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {feedback}
            </p>
          )}
        </div>
      </form>
    </>
  );
}

import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Réception du formulaire de contact (§ 4 et § 11).
 *
 * - validation serveur systématique, indépendante du contrôle côté client ;
 * - anti-spam Cloudflare Turnstile quand la clé secrète est configurée ;
 * - limitation du nombre d'envois par adresse IP ;
 * - routage vers deux boîtes, comme l'API actuelle d'eternatech.net : les
 *   demandes de devis et de démonstration vont à la boîte commerciale, le reste
 *   à la boîte de contact ;
 * - e-mail de confirmation au demandeur.
 *
 * Sans configuration d'envoi (SMTP ou Resend), la demande est journalisée côté
 * serveur et la réponse reste un succès : cela permet de tester le parcours en
 * développement sans exposer de secrets.
 */

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(100),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(20).max(5000),
  token: z.string().optional(),
  locale: z.string().trim().max(5).optional(),
});

/** Limitation simple par IP : 5 envois par 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);

  // Purge opportuniste pour éviter que la table ne grossisse indéfiniment.
  if (attempts.size > 500) {
    for (const [key, times] of attempts) {
      if (times.every((time) => now - time >= WINDOW_MS)) attempts.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Pas de clé configurée : vérification ignorée (développement).
  if (!secret) return true;
  if (!token) return false;

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      },
    );
    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    return false;
  }
}

/** Sujets qui partent vers la boîte commerciale. */
function isCommercialRequest(subject: string): boolean {
  const normalised = subject.toLowerCase();
  return (
    normalised.includes('devis') ||
    normalised.includes('démo') ||
    normalised.includes('demo') ||
    normalised.includes('quote') ||
    normalised.includes('عرض سعر') ||
    normalised.includes('عرض توضيحي')
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type Payload = z.infer<typeof schema>;

const fromAddress = () => process.env.CONTACT_EMAIL_FROM ?? 'site@eternatech.net';

async function sendWithResend(to: string, subject: string, html: string, replyTo?: string) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from: fromAddress(), to, subject, html, replyTo });
}

/** Voie SMTP, identique à la configuration de l'API actuelle d'eternatech.net. */
async function sendWithSmtp(to: string, subject: string, html: string, replyTo?: string) {
  const nodemailer = await import('nodemailer');
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
  });

  await transporter.sendMail({ from: fromAddress(), to, subject, html, replyTo });
}

function buildTeamEmail(data: Payload): string {
  const rows: [string, string][] = [
    ['Nom', data.name],
    ['Email', data.email],
    ['Téléphone', data.phone || '—'],
    ['Entreprise', data.company || '—'],
    ['Sujet', data.subject],
    ['Langue', data.locale ?? 'fr'],
  ];

  return `
    <h2 style="font-family:sans-serif">Nouveau message depuis eternatech.net</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#0b305a"><strong>${label}</strong></td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join('')}
    </table>
    <h3 style="font-family:sans-serif;color:#1372a2">Message</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;
}

function buildConfirmationEmail(data: Payload): string {
  return `
    <div style="font-family:sans-serif;color:#0b305a">
      <p>Bonjour ${escapeHtml(data.name)},</p>
      <p>Nous avons bien reçu votre message concernant « ${escapeHtml(data.subject)} ».
      Notre équipe vous répond sous 48 heures ouvrées.</p>
      <p>À bientôt,<br />L'équipe Eterna Tech</p>
      <hr style="border:0;border-top:1px solid #cbd5e1" />
      <p style="font-size:12px;color:#64748b">
        Eterna Tech · I2E Student Center, Université de Tlemcen · +213 659 793 110
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation' }, { status: 400 });
  }

  const data = parsed.data;

  if (!(await verifyTurnstile(data.token, ip))) {
    return NextResponse.json({ error: 'captcha' }, { status: 400 });
  }

  const recipient = isCommercialRequest(data.subject)
    ? (process.env.SERVICE_EMAIL_TO ?? 'service@eternatech.net')
    : (process.env.CONTACT_EMAIL_TO ?? 'contact@eternatech.net');

  const teamSubject = `[eternatech.net] ${data.subject} — ${data.name}`;

  try {
    const confirmationSubject = 'Eterna Tech — nous avons reçu votre message';

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendWithSmtp(recipient, teamSubject, buildTeamEmail(data), data.email);
      await sendWithSmtp(data.email, confirmationSubject, buildConfirmationEmail(data));
    } else if (process.env.RESEND_API_KEY) {
      await sendWithResend(recipient, teamSubject, buildTeamEmail(data), data.email);
      await sendWithResend(data.email, confirmationSubject, buildConfirmationEmail(data));
    } else {
      console.info('[contact] aucune configuration d\'envoi — message journalisé', {
        to: recipient,
        subject: teamSubject,
        from: data.email,
      });
    }
  } catch (error) {
    console.error('[contact] échec de l\'envoi', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

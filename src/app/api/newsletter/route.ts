import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Inscription à la newsletter (§ 10.5).
 *
 * Le service retenu n'est pas encore arrêté (§ 10.6). L'implémentation cible
 * Brevo, qui est l'une des deux options du cahier des charges : renseigner
 * BREVO_API_KEY et BREVO_LIST_ID suffit à l'activer. Sans configuration,
 * l'inscription est journalisée et la réponse reste un succès, ce qui permet de
 * tester le parcours sans compte tiers.
 */

const schema = z.object({
  email: z.string().trim().email().max(120),
});

export async function POST(request: Request) {
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

  const { email } = parsed.data;
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    console.info('[newsletter] aucun service configuré — inscription journalisée', { email });
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    // 400 avec le code duplicate_parameter signifie que le contact existe déjà :
    // pour l'utilisateur, c'est un succès.
    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { code?: string } | null;
      if (payload?.code !== 'duplicate_parameter') {
        console.error('[newsletter] échec Brevo', response.status, payload);
        return NextResponse.json({ error: 'provider_error' }, { status: 502 });
      }
    }
  } catch (error) {
    console.error('[newsletter] erreur réseau', error);
    return NextResponse.json({ error: 'provider_error' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

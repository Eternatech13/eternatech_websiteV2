'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Horloge réelle au fuseau Africa/Algiers, mise à jour chaque seconde (§ 10.3).
 * Le modèle Footer19 affichait une heure figée dans le code (§ 16.4).
 *
 * L'heure est rendue vide au premier passage pour éviter tout écart entre le
 * rendu serveur et le client, puis remplie côté client.
 */
export function LocalClock({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-DZ' : locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Africa/Algiers',
      hour12: false,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  return (
    <time suppressHydrationWarning dir="ltr" className={cn('tabular-nums', className)}>
      {time ?? '--:--:--'}
    </time>
  );
}

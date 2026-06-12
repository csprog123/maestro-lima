'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

// Switches locale by re-routing to the same pathname under the other locale.
// next-intl writes a NEXT_LOCALE cookie on navigation, so the choice persists
// across visits without ever touching localStorage.
export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: 'es' | 'en') {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname is a valid known route at runtime
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-sm font-medium shadow-sm"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => switchTo('es')}
        disabled={isPending}
        className={`rounded-full px-3 py-1 transition ${
          locale === 'es'
            ? 'bg-brand text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={locale === 'es'}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => switchTo('en')}
        disabled={isPending}
        className={`rounded-full px-3 py-1 transition ${
          locale === 'en'
            ? 'bg-brand text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}

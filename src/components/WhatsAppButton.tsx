'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Floating "Click-to-Chat" support button. Opens WhatsApp via a wa.me deep link
// with a pre-filled message — no Meta API or webhook needed, works on mobile and
// desktop the moment the site is live. The support number is configured via
// NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER (international format, digits only).
const SUPPORT_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER ?? '51999000111';

export function WhatsAppButton() {
  const t = useTranslations('support');
  const [open, setOpen] = useState(false);

  const href = `https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(
    t('prefill')
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Tooltip / prompt bubble */}
      {open && (
        <div className="max-w-[15rem] rounded-2xl border border-slate-100 bg-white p-4 shadow-lg">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t('close')}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600 hover:bg-slate-300"
          >
            ✕
          </button>
          <p className="text-sm font-semibold text-slate-900">{t('title')}</p>
          <p className="mt-1 text-xs text-slate-500">{t('subtitle')}</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-trust px-4 py-2 text-sm font-semibold text-white transition hover:bg-trust-700"
          >
            {t('cta')}
          </a>
        </div>
      )}

      {/* Floating action button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('ariaLabel')}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-trust text-white shadow-lg transition hover:scale-105 hover:bg-trust-700"
      >
        <WhatsAppGlyph />
      </button>
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.045zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

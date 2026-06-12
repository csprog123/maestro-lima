import { useTranslations } from 'next-intl';

// Green trust badge shown on verified pros, per the spec's trust-green accent.
export function VerifiedBadge() {
  const t = useTranslations('common');
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-trust-50 px-2 py-0.5 text-xs font-semibold text-trust-700">
      <span aria-hidden>✓</span>
      {t('verified')}
    </span>
  );
}

export function TrustHighlight({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-trust-50 text-xl text-trust-600">
        <span aria-hidden>{icon}</span>
      </div>
      <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

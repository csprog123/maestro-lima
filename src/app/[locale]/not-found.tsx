import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

// Localized 404 for missing resources inside a locale (unknown handyman, trade…).
export default async function LocaleNotFound() {
  const t = await getTranslations('common');
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
      <p className="text-5xl">🔧</p>
      <h1 className="text-2xl font-bold text-slate-900">404</h1>
      <Link
        href="/"
        className="mt-2 rounded-xl bg-brand px-5 py-2 font-semibold text-white"
      >
        {t('brand')}
      </Link>
    </div>
  );
}

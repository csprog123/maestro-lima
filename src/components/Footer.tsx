import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const common = useTranslations('common');

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 py-8 text-center text-sm text-slate-500">
        <p className="font-semibold text-slate-700">{common('brand')}</p>
        <p>{t('madeIn')} 🇵🇪</p>
        <p className="text-xs">{t('demo')}</p>
      </div>
    </footer>
  );
}

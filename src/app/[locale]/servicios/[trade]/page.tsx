import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  getTradeBySlug,
  getSubCategories,
  getServiceItems,
  getHandymenForTrade
} from '@/lib/data';
import { pickLocale } from '@/lib/format';
import { CatalogueView } from '@/components/CatalogueView';
import type { Locale } from '@/lib/types';

export default async function CataloguePage({
  params
}: {
  params: { locale: string; trade: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const trade = await getTradeBySlug(params.trade);
  if (!trade) {
    notFound();
  }

  const t = await getTranslations('catalogue');
  const common = await getTranslations('common');
  const [subCategories, serviceItems, handymen] = await Promise.all([
    getSubCategories(trade.id),
    getServiceItems(trade.id),
    getHandymenForTrade(trade.id)
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← {common('back')}
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          style={{ backgroundColor: `${trade.color}1A` }}
        >
          <span aria-hidden>{trade.icon}</span>
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {t('title', { trade: pickLocale(trade.name, locale) })}
          </h1>
          <p className="text-sm text-slate-500">{t('subtitle')}</p>
        </div>
      </div>

      <div className="mt-8">
        <CatalogueView
          locale={locale}
          subCategories={subCategories}
          serviceItems={serviceItems}
          handymen={handymen}
        />
      </div>
    </div>
  );
}

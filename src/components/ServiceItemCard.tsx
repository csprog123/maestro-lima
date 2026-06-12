'use client';

import { useTranslations } from 'next-intl';
import { pickLocale, formatPrice } from '@/lib/format';
import type { Locale, ServiceItem } from '@/lib/types';

export function ServiceItemCard({
  item,
  locale,
  selected,
  onSelect
}: {
  item: ServiceItem;
  locale: Locale;
  selected: boolean;
  onSelect: (item: ServiceItem) => void;
}) {
  const t = useTranslations('common');

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`flex w-full flex-col rounded-2xl border bg-white p-4 text-left shadow-sm transition ${
        selected
          ? 'border-brand ring-2 ring-brand-100'
          : 'border-slate-100 hover:border-brand-100 hover:shadow-md'
      }`}
    >
      <span className="font-semibold text-slate-900">
        {pickLocale(item.name, locale)}
      </span>
      <span className="mt-1 text-sm text-slate-500">
        {pickLocale(item.description, locale)}
      </span>
      <span className="mt-3 flex items-baseline gap-1">
        <span className="text-xs text-slate-400">{t('from')}</span>
        <span className="text-lg font-bold text-brand-600">
          {formatPrice(item.basePrice)}
        </span>
        <span className="text-xs text-slate-400">/ {t('perService')}</span>
      </span>
    </button>
  );
}

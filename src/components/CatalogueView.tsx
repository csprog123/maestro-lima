'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { pickLocale } from '@/lib/format';
import { ServiceItemCard } from './ServiceItemCard';
import { HandymanCard } from './HandymanCard';
import type {
  Handyman,
  Locale,
  ServiceItem,
  SubCategory
} from '@/lib/types';

export function CatalogueView({
  locale,
  subCategories,
  serviceItems,
  handymen
}: {
  locale: Locale;
  subCategories: SubCategory[];
  serviceItems: ServiceItem[];
  handymen: Handyman[];
}) {
  const t = useTranslations('catalogue');
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-8">
        {subCategories.map((sub) => {
          const items = serviceItems.filter(
            (s) => s.subCategoryId === sub.id
          );
          if (items.length === 0) return null;
          return (
            <section key={sub.id}>
              <h2 className="mb-3 text-lg font-bold text-slate-900">
                {pickLocale(sub.name, locale)}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <ServiceItemCard
                    key={item.id}
                    item={item}
                    locale={locale}
                    selected={selected?.id === item.id}
                    onSelect={setSelected}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">
            {selected
              ? pickLocale(selected.name, locale)
              : t('selectService')}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {t('availableHandymen')}
          </p>
          <div className="mt-4 space-y-3">
            {handymen.length === 0 && (
              <p className="text-sm text-slate-400">{t('noHandymen')}</p>
            )}
            {handymen.map((h) => (
              <HandymanCard
                key={h.id}
                handyman={h}
                locale={locale}
                serviceId={selected?.id}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

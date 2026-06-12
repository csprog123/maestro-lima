import { Link } from '@/i18n/routing';
import { pickLocale } from '@/lib/format';
import type { Locale, Trade } from '@/lib/types';

export function TradeCard({ trade, locale }: { trade: Trade; locale: Locale }) {
  return (
    <Link
      href={`/servicios/${trade.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
        style={{ backgroundColor: `${trade.color}1A` }}
      >
        <span aria-hidden>{trade.icon}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">
        {pickLocale(trade.name, locale)}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {pickLocale(trade.description, locale)}
      </p>
      <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
        →
      </span>
    </Link>
  );
}

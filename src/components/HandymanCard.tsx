import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { pickLocale } from '@/lib/format';
import { StarRating } from './StarRating';
import { VerifiedBadge } from './TrustBadge';
import type { Handyman, Locale } from '@/lib/types';

export function HandymanCard({
  handyman,
  locale,
  serviceId
}: {
  handyman: Handyman;
  locale: Locale;
  serviceId?: string;
}) {
  const t = useTranslations('common');
  const href = serviceId
    ? `/maestro/${handyman.id}?service=${serviceId}`
    : `/maestro/${handyman.id}`;

  return (
    <Link
      href={href}
      className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-brand-100 hover:shadow-md"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={handyman.avatar}
        alt={handyman.name}
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-bold text-slate-900">{handyman.name}</h3>
          {handyman.verified && <VerifiedBadge />}
        </div>
        <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">
          {pickLocale(handyman.bio, locale)}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <StarRating rating={handyman.rating} />
            {handyman.rating.toFixed(1)}
          </span>
          <span>
            {handyman.reviewCount} {t('reviews')}
          </span>
          <span>
            {handyman.jobsDone} {t('jobsDone')}
          </span>
        </div>
      </div>
    </Link>
  );
}

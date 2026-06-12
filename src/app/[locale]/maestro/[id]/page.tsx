import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  getHandyman,
  getReviews,
  getServiceItem,
  getTrades
} from '@/lib/data';
import { pickLocale, formatPrice } from '@/lib/format';
import { StarRating } from '@/components/StarRating';
import { VerifiedBadge } from '@/components/TrustBadge';
import type { Locale } from '@/lib/types';

export default async function HandymanPage({
  params,
  searchParams
}: {
  params: { locale: string; id: string };
  searchParams: { service?: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const handyman = await getHandyman(params.id);
  if (!handyman) {
    notFound();
  }

  const t = await getTranslations('handyman');
  const common = await getTranslations('common');
  const [reviews, trades] = await Promise.all([
    getReviews(handyman.id),
    getTrades()
  ]);
  const trade = trades.find((tr) => tr.id === handyman.tradeId);
  const service = searchParams.service
    ? await getServiceItem(searchParams.service)
    : undefined;

  // If we arrived with a chosen service go straight to checkout; otherwise send
  // the user to this pro's trade catalogue to pick one first.
  const bookHref = service
    ? `/checkout?handyman=${handyman.id}&service=${service.id}`
    : `/servicios/${trade?.slug ?? ''}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← {common('back')}
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={handyman.avatar}
          alt={handyman.name}
          className="h-24 w-24 rounded-2xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {handyman.name}
            </h1>
            {handyman.verified && <VerifiedBadge />}
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {trade ? pickLocale(trade.name, locale) : ''} · {handyman.district}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span className="flex items-center gap-1 font-semibold">
              <StarRating rating={handyman.rating} size="md" />
              {handyman.rating.toFixed(1)}
            </span>
            <span>
              {handyman.reviewCount} {common('reviews')}
            </span>
            <span>
              {handyman.jobsDone} {common('jobsDone')}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {t('yearsExperience', { years: handyman.yearsExperience })} ·{' '}
            {t('respondsIn', { minutes: handyman.respondsInMin })}
          </p>
        </div>
      </div>

      {/* Selected service summary */}
      {service && (
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-brand-100 bg-brand-50 p-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {pickLocale(service.name, locale)}
            </p>
            <p className="text-xs text-slate-500">
              {pickLocale(service.description, locale)}
            </p>
          </div>
          <span className="text-lg font-bold text-brand-600">
            {formatPrice(service.basePrice)}
          </span>
        </div>
      )}

      {/* About */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-900">{t('about')}</h2>
        <p className="mt-2 text-slate-600">{pickLocale(handyman.bio, locale)}</p>
      </section>

      {/* Specialties */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-900">{t('specialties')}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {handyman.specialties.map((s, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
            >
              {pickLocale(s, locale)}
            </span>
          ))}
        </div>
      </section>

      {/* Service area */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-900">{t('serviceArea')}</h2>
        <p className="mt-2 text-slate-600">
          {handyman.serviceAreas.join(' · ')}
        </p>
      </section>

      {/* Reviews */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-900">{t('reviewsTitle')}</h2>
        <div className="mt-3 space-y-3">
          {reviews.length === 0 && (
            <p className="text-sm text-slate-400">{t('noReviews')}</p>
          )}
          {reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{r.author}</span>
                <StarRating rating={r.rating} />
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {pickLocale(r.comment, locale)}
              </p>
              <p className="mt-1 text-xs text-slate-400">{r.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky book CTA */}
      <div className="sticky bottom-0 mt-8 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur">
        <Link
          href={bookHref}
          className="flex w-full items-center justify-center rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600"
        >
          {t('bookNow')}
        </Link>
      </div>
    </div>
  );
}

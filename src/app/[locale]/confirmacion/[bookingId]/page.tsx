import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getHandyman, getServiceItem } from '@/lib/data';
import { pickLocale, formatPrice, bookingTotal } from '@/lib/format';
import type { Locale } from '@/lib/types';

export default async function ConfirmationPage({
  params,
  searchParams
}: {
  params: { locale: string; bookingId: string };
  searchParams: {
    handyman?: string;
    service?: string;
    date?: string;
    time?: string;
    district?: string;
    phone?: string;
  };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  if (!searchParams.handyman || !searchParams.service) {
    notFound();
  }

  const [handyman, service] = await Promise.all([
    getHandyman(searchParams.handyman),
    getServiceItem(searchParams.service)
  ]);

  if (!handyman || !service) {
    notFound();
  }

  const t = await getTranslations('confirmation');
  const total = bookingTotal(service.basePrice);

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-3xl border border-trust-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-trust-50 text-3xl text-trust-600">
          <span aria-hidden>✓</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">{t('title')}</h1>
        <p className="mt-2 text-slate-500">
          {t('subtitle', { phone: searchParams.phone ?? '' })}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
          {t('bookingId')}: {params.bookingId}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <DetailRow
          label={t('whoTitle')}
          value={
            <span className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={handyman.avatar}
                alt={handyman.name}
                className="h-8 w-8 rounded-lg object-cover"
              />
              {handyman.name}
            </span>
          }
        />
        <DetailRow
          label={t('whenTitle')}
          value={`${searchParams.date ?? ''} · ${searchParams.time ?? ''}`}
        />
        <DetailRow
          label={t('whereTitle')}
          value={searchParams.district ?? ''}
        />
        <DetailRow
          label={pickLocale(service.name, locale)}
          value={formatPrice(service.basePrice)}
        />
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 text-base font-bold text-slate-900 shadow-sm">
          <span>{t('totalPaid')}</span>
          <span className="text-brand-600">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-trust-50 p-4 text-center text-sm text-trust-700">
        {t('whatsappNote')}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/chat/${params.bookingId}?handyman=${handyman.id}`}
          className="flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600"
        >
          {t('chatCta')}
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {t('homeCta')}
        </Link>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

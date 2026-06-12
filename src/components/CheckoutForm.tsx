'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { pickLocale, formatPrice, platformFee, bookingTotal } from '@/lib/format';
import { StarRating } from './StarRating';
import type { Handyman, Locale, ServiceItem } from '@/lib/types';

const LIMA_DISTRICTS = [
  'Miraflores',
  'San Isidro',
  'Barranco',
  'Surquillo',
  'Santiago de Surco',
  'La Molina',
  'San Borja',
  'Jesús María',
  'Lince',
  'Pueblo Libre',
  'Magdalena',
  'Los Olivos',
  'San Martín de Porres',
  'San Miguel',
  'Chorrillos'
];

export function CheckoutForm({
  locale,
  handyman,
  service
}: {
  locale: Locale;
  handyman: Handyman;
  service: ServiceItem;
}) {
  const t = useTranslations('checkout');
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState(handyman.district);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const fee = platformFee(service.basePrice);
  const total = bookingTotal(service.basePrice);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t('required');
    if (!/^\d{9}$/.test(phone.replace(/\s/g, ''))) next.phone = t('invalidPhone');
    if (!address.trim()) next.address = t('required');
    if (!date) next.date = t('required');
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceItemId: service.id,
          handymanId: handyman.id,
          customerName: name.trim(),
          customerPhone: phone.replace(/\s/g, ''),
          address: address.trim(),
          district,
          date,
          time,
          notes: notes.trim()
        })
      });

      if (!res.ok) {
        throw new Error('Booking failed');
      }

      const data = (await res.json()) as { bookingId: string };
      // Carry booking essentials in the URL so the confirmation page renders
      // reliably even on serverless platforms where the API route and the page
      // render in separate invocations (no shared in-memory store).
      const query = new URLSearchParams({
        handyman: handyman.id,
        service: service.id,
        date,
        time,
        district,
        phone: phone.replace(/\s/g, '')
      });
      router.push(`/confirmacion/${data.bookingId}?${query.toString()}`);
    } catch {
      setSubmitting(false);
      setErrors({ form: t('required') });
    }
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>

      {/* Service + pro summary */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t('service')}
            </p>
            <p className="font-semibold text-slate-900">
              {pickLocale(service.name, locale)}
            </p>
          </div>
          <span className="text-lg font-bold text-brand-600">
            {formatPrice(service.basePrice)}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={handyman.avatar}
            alt={handyman.name}
            className="h-12 w-12 rounded-xl object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t('handyman')}
            </p>
            <p className="flex items-center gap-2 font-semibold text-slate-900">
              {handyman.name}
              <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
                <StarRating rating={handyman.rating} />
                {handyman.rating.toFixed(1)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Customer details */}
      <fieldset className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <legend className="px-1 text-sm font-bold text-slate-900">
          {t('yourDetails')}
        </legend>

        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              {t('name')}
            </span>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
            />
            {errors.name && (
              <span className="text-xs text-red-600">{errors.name}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              {t('phone')}
            </span>
            <input
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('phonePlaceholder')}
              inputMode="numeric"
            />
            {errors.phone && (
              <span className="text-xs text-red-600">{errors.phone}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              {t('district')}
            </span>
            <select
              className={inputClass}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {LIMA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              {t('address')}
            </span>
            <input
              className={inputClass}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('addressPlaceholder')}
            />
            {errors.address && (
              <span className="text-xs text-red-600">{errors.address}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              {t('date')}
            </span>
            <input
              type="date"
              className={inputClass}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && (
              <span className="text-xs text-red-600">{errors.date}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              {t('time')}
            </span>
            <input
              type="time"
              className={inputClass}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              {t('notes')}
            </span>
            <textarea
              className={inputClass}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('notesPlaceholder')}
              rows={3}
            />
          </label>
        </div>
      </fieldset>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold text-slate-900">{t('summary')}</p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <dt>{t('servicePrice')}</dt>
            <dd>{formatPrice(service.basePrice)}</dd>
          </div>
          <div className="flex justify-between text-slate-600">
            <dt>{t('platformFee')}</dt>
            <dd>{formatPrice(fee)}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold text-slate-900">
            <dt>{t('total')}</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:opacity-60"
      >
        {submitting ? t('processing') : `${t('payWith')} · ${formatPrice(total)}`}
      </button>
      <p className="text-center text-xs text-slate-400">{t('confirmBooking')}</p>
    </form>
  );
}

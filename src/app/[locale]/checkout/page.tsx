import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getHandyman, getServiceItem } from '@/lib/data';
import { CheckoutForm } from '@/components/CheckoutForm';
import type { Locale } from '@/lib/types';

export default async function CheckoutPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { handyman?: string; service?: string };
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <CheckoutForm locale={locale} handyman={handyman} service={service} />
    </div>
  );
}

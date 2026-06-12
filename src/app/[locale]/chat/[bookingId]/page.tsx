import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getHandyman } from '@/lib/data';
import { ChatView } from '@/components/ChatView';
import type { Locale } from '@/lib/types';

export default async function ChatPage({
  params,
  searchParams
}: {
  params: { locale: string; bookingId: string };
  searchParams: { handyman?: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  if (!searchParams.handyman) {
    notFound();
  }

  const handyman = await getHandyman(searchParams.handyman);
  if (!handyman) {
    notFound();
  }

  return (
    <ChatView
      locale={locale}
      bookingId={params.bookingId}
      handymanName={handyman.name}
      handymanAvatar={handyman.avatar}
    />
  );
}

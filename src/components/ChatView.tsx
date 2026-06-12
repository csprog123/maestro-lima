'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/lib/types';

interface Message {
  id: number;
  sender: 'customer' | 'handyman';
  body: string;
}

export function ChatView({
  locale,
  bookingId,
  handymanName,
  handymanAvatar
}: {
  locale: Locale;
  bookingId: string;
  handymanName: string;
  handymanAvatar: string;
}) {
  const t = useTranslations('chat');

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'handyman', body: t('autoReply') }
  ]);
  const [draft, setDraft] = useState('');
  const nextId = useRef(2);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const mine: Message = { id: nextId.current++, sender: 'customer', body: text };
    setMessages((prev) => [...prev, mine]);
    setDraft('');

    // Simulated handyman acknowledgement so the thread feels alive in the demo.
    const replyBody =
      locale === 'es'
        ? '¡Perfecto! Anotado. Cualquier detalle adicional, me avisas.'
        : 'Perfect! Noted. Let me know if there is anything else.';
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, sender: 'handyman', body: replyBody }
      ]);
    }, 900);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-2xl flex-col px-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 py-4">
        <Link
          href="/"
          className="text-sm font-medium text-slate-400 hover:text-slate-700"
        >
          ←
        </Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={handymanAvatar}
          alt={handymanName}
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div>
          <p className="font-bold text-slate-900">
            {t('title', { name: handymanName })}
          </p>
          <p className="text-xs text-slate-500">
            {t('subtitle')} · {bookingId}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto py-4">
        {messages.map((m) => {
          const mine = m.sender === 'customer';
          return (
            <div
              key={m.id}
              className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  mine
                    ? 'rounded-br-sm bg-brand text-white'
                    : 'rounded-bl-sm bg-white text-slate-800'
                }`}
              >
                <p className="mb-0.5 text-xs font-semibold opacity-70">
                  {mine ? t('you') : handymanName}
                </p>
                {m.body}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={send}
        className="flex items-center gap-2 border-t border-slate-200 py-3"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t('placeholder')}
          className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <button
          type="submit"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
        >
          {t('send')}
        </button>
      </form>
    </div>
  );
}

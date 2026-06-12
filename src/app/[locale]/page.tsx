import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getTrades, getTopHandymen } from '@/lib/data';
import { TradeCard } from '@/components/TradeCard';
import { HandymanCard } from '@/components/HandymanCard';
import { TrustHighlight } from '@/components/TrustBadge';
import type { Locale } from '@/lib/types';

export default async function HomePage({
  params
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const trades = await getTrades();
  const topHandymen = await getTopHandymen(3);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{t('heroSubtitle')}</p>
            <Link
              href="/#categorias"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600"
            >
              {t('heroCta')}
            </Link>
          </div>

          {/* Trust highlights */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <TrustHighlight
              icon="🛡️"
              title={t('trustVerified')}
              description={t('trustVerifiedDesc')}
            />
            <TrustHighlight
              icon="💵"
              title={t('trustPrice')}
              description={t('trustPriceDesc')}
            />
            <TrustHighlight
              icon="✅"
              title={t('trustGuarantee')}
              description={t('trustGuaranteeDesc')}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">
          {t('categoriesTitle')}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} locale={locale} />
          ))}
        </div>
      </section>

      {/* Top handymen */}
      <section className="mx-auto max-w-5xl px-4 pb-14">
        <h2 className="text-2xl font-bold text-slate-900">
          {t('popularTitle')}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topHandymen.map((h) => (
            <HandymanCard key={h.id} handyman={h} locale={locale} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">{t('howTitle')}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              { n: '1', title: t('step1Title'), desc: t('step1Desc') },
              { n: '2', title: t('step2Title'), desc: t('step2Desc') },
              { n: '3', title: t('step3Title'), desc: t('step3Desc') }
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

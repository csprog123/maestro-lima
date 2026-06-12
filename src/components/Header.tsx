import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageToggle } from './LanguageToggle';
import { BrandMark } from './Logo';

export function Header() {
  const t = useTranslations('common');
  const nav = useTranslations('nav');

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-brand">
              {t('brand')}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              {t('brandTagline')}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/" className="hover:text-slate-900">
            {nav('home')}
          </Link>
          <Link href="/#categorias" className="hover:text-slate-900">
            {nav('services')}
          </Link>
          <Link href="/#como-funciona" className="hover:text-slate-900">
            {nav('howItWorks')}
          </Link>
        </nav>

        <LanguageToggle />
      </div>
    </header>
  );
}

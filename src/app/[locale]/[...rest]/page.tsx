import { notFound } from 'next/navigation';

// Catch-all for unknown paths inside a locale. Routing to notFound() renders the
// localized 404 under the locale layout (which owns <html>), so the app needs no
// separate root layout.
export default function CatchAllPage() {
  notFound();
}

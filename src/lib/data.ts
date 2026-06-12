import { getSupabase } from './supabase';
import {
  trades as seedTrades,
  subCategories as seedSubCategories,
  serviceItems as seedServiceItems,
  handymen as seedHandymen,
  reviews as seedReviews
} from '@/data/seed';
import type {
  Trade,
  SubCategory,
  ServiceItem,
  Handyman,
  Review
} from './types';

// Read layer with graceful fallback. Each accessor tries Supabase first when a
// client is configured; on any failure (or when unconfigured) it returns the
// in-repo seed data so the UI always renders. Supabase rows are expected to
// mirror the seed shape, including localized `name`/`description` JSON columns.

async function tryQuery<T>(
  run: (sb: NonNullable<ReturnType<typeof getSupabase>>) => Promise<T[] | null>,
  fallback: T[]
): Promise<T[]> {
  const sb = getSupabase();
  if (!sb) {
    return fallback;
  }
  try {
    const rows = await run(sb);
    if (!rows || rows.length === 0) {
      return fallback;
    }
    return rows;
  } catch {
    return fallback;
  }
}

export async function getTrades(): Promise<Trade[]> {
  return tryQuery(
    async (sb) => (await sb.from('trades').select('*')).data as Trade[] | null,
    seedTrades
  );
}

export async function getTradeBySlug(slug: string): Promise<Trade | undefined> {
  const all = await getTrades();
  return all.find((t) => t.slug === slug);
}

export async function getSubCategories(tradeId: string): Promise<SubCategory[]> {
  const all = await tryQuery(
    async (sb) =>
      (await sb.from('sub_categories').select('*')).data as SubCategory[] | null,
    seedSubCategories
  );
  return all.filter((s) => s.tradeId === tradeId);
}

export async function getServiceItems(tradeId: string): Promise<ServiceItem[]> {
  const all = await tryQuery(
    async (sb) =>
      (await sb.from('service_items').select('*')).data as ServiceItem[] | null,
    seedServiceItems
  );
  return all.filter((s) => s.tradeId === tradeId);
}

export async function getServiceItem(
  id: string
): Promise<ServiceItem | undefined> {
  const all = await tryQuery(
    async (sb) =>
      (await sb.from('service_items').select('*')).data as ServiceItem[] | null,
    seedServiceItems
  );
  return all.find((s) => s.id === id);
}

export async function getHandymen(): Promise<Handyman[]> {
  return tryQuery(
    async (sb) =>
      (await sb.from('handymen').select('*')).data as Handyman[] | null,
    seedHandymen
  );
}

export async function getHandymenForTrade(
  tradeId: string
): Promise<Handyman[]> {
  const all = await getHandymen();
  return all.filter((h) => h.tradeId === tradeId);
}

export async function getHandyman(id: string): Promise<Handyman | undefined> {
  const all = await getHandymen();
  return all.find((h) => h.id === id);
}

export async function getReviews(handymanId: string): Promise<Review[]> {
  const all = await tryQuery(
    async (sb) => (await sb.from('reviews').select('*')).data as Review[] | null,
    seedReviews
  );
  return all.filter((r) => r.handymanId === handymanId);
}

export async function getTopHandymen(limit: number): Promise<Handyman[]> {
  const all = await getHandymen();
  return [...all].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

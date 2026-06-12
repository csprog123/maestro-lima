import type { Locale, Localized } from './types';

// Currency is always Peruvian Sol, rendered as "S/ 120" per the demo spec.
export function formatPrice(amount: number): string {
  return `S/ ${amount.toLocaleString('es-PE')}`;
}

export function pickLocale(value: Localized, locale: Locale): string {
  return value[locale] ?? value.es;
}

// Platform fee model used across checkout and confirmation: 10% of service price.
export const PLATFORM_FEE_RATE = 0.1;

export function platformFee(servicePrice: number): number {
  return Math.round(servicePrice * PLATFORM_FEE_RATE);
}

export function bookingTotal(servicePrice: number): number {
  return servicePrice + platformFee(servicePrice);
}

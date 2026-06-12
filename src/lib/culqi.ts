import type { Payment } from './types';

// Culqi payments stub. A real integration would create a charge against a card
// token from Culqi.js; for the demo we synthesize a successful payment so the
// checkout flow always reaches the confirmation screen.

export async function createCharge(
  bookingId: string,
  amount: number
): Promise<Payment> {
  const reference = `culqi_demo_${Math.random().toString(36).slice(2, 10)}`;

  return {
    id: `pay_${Math.random().toString(36).slice(2, 10)}`,
    bookingId,
    amount,
    provider: 'culqi',
    status: 'paid',
    reference,
    createdAt: new Date().toISOString()
  };
}

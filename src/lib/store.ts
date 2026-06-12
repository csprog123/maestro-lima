import type { Booking, ChatMessage } from './types';

// In-memory demo store for runtime-created records (bookings, chat). This keeps
// the prototype free of localStorage and of any required database: created
// bookings live for the lifetime of the server process, which is all a VC demo
// needs. On a fresh Vercel cold start the store simply starts empty again.
const bookings = new Map<string, Booking>();
const chats = new Map<string, ChatMessage[]>();

export function saveBooking(booking: Booking): void {
  bookings.set(booking.id, booking);
}

export function getBooking(id: string): Booking | undefined {
  return bookings.get(id);
}

export function addChatMessage(message: ChatMessage): void {
  const existing = chats.get(message.bookingId) ?? [];
  existing.push(message);
  chats.set(message.bookingId, existing);
}

export function getChatMessages(bookingId: string): ChatMessage[] {
  return chats.get(bookingId) ?? [];
}

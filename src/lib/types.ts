// Domain types. Names carry both languages so data renders in the active locale
// while the message catalogs handle UI chrome only.

export type Locale = 'es' | 'en';

export interface Localized {
  es: string;
  en: string;
}

export interface Trade {
  id: string;
  slug: string;
  name: Localized;
  description: Localized;
  icon: string; // emoji glyph, font-free so it renders everywhere
  color: string; // tailwind-friendly hex accent
}

export interface SubCategory {
  id: string;
  tradeId: string;
  name: Localized;
}

export interface ServiceItem {
  id: string;
  subCategoryId: string;
  tradeId: string;
  name: Localized;
  description: Localized;
  basePrice: number; // in PEN (S/)
  durationMin: number;
}

export interface Handyman {
  id: string;
  name: string;
  tradeId: string;
  avatar: string;
  bio: Localized;
  specialties: Localized[];
  district: string;
  serviceAreas: string[];
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  jobsDone: number;
  respondsInMin: number;
  verified: boolean;
}

export interface Review {
  id: string;
  handymanId: string;
  author: string;
  rating: number;
  comment: Localized;
  date: string; // ISO date
}

export interface Booking {
  id: string;
  serviceItemId: string;
  handymanId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  district: string;
  date: string;
  time: string;
  notes: string;
  servicePrice: number;
  platformFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  sender: 'customer' | 'handyman';
  body: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  provider: 'culqi';
  status: 'paid' | 'pending' | 'failed';
  reference: string;
  createdAt: string;
}

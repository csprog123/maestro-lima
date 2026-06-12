import { NextResponse } from 'next/server';
import { getHandyman, getServiceItem } from '@/lib/data';
import { saveBooking } from '@/lib/store';
import { createCharge } from '@/lib/culqi';
import { sendBookingConfirmation, sendHandymanAlert } from '@/lib/whatsapp';
import { platformFee, bookingTotal } from '@/lib/format';
import type { Booking } from '@/lib/types';

// Demo handyman contact number used for the WhatsApp alert stub.
const DEMO_HANDYMAN_PHONE = '51999000111';

interface BookingPayload {
  serviceItemId: string;
  handymanId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  district: string;
  date: string;
  time: string;
  notes?: string;
}

function makeBookingId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `MAE-${n}`;
}

export async function POST(request: Request) {
  let payload: BookingPayload;
  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const required: (keyof BookingPayload)[] = [
    'serviceItemId',
    'handymanId',
    'customerName',
    'customerPhone',
    'address',
    'district',
    'date',
    'time'
  ];
  for (const field of required) {
    if (!payload[field]) {
      return NextResponse.json(
        { error: `Missing field: ${field}` },
        { status: 400 }
      );
    }
  }

  const [service, handyman] = await Promise.all([
    getServiceItem(payload.serviceItemId),
    getHandyman(payload.handymanId)
  ]);

  if (!service || !handyman) {
    return NextResponse.json(
      { error: 'Service or handyman not found' },
      { status: 404 }
    );
  }

  const fee = platformFee(service.basePrice);
  const total = bookingTotal(service.basePrice);

  const booking: Booking = {
    id: makeBookingId(),
    serviceItemId: service.id,
    handymanId: handyman.id,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    address: payload.address,
    district: payload.district,
    date: payload.date,
    time: payload.time,
    notes: payload.notes ?? '',
    servicePrice: service.basePrice,
    platformFee: fee,
    total,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  // Charge (stubbed) then persist, then notify both parties via WhatsApp.
  await createCharge(booking.id, booking.total);
  saveBooking(booking);

  await Promise.all([
    sendBookingConfirmation(booking, service, handyman),
    sendHandymanAlert(booking, service, handyman, DEMO_HANDYMAN_PHONE)
  ]);

  return NextResponse.json({ bookingId: booking.id });
}

import type { Booking, Handyman, ServiceItem } from './types';
import { formatPrice, pickLocale } from './format';

// Meta WhatsApp Cloud API integration. When credentials are absent the functions
// log the message they *would* send and return a stub result, so the booking
// flow completes end-to-end in the demo without any Meta setup.

const GRAPH_URL = 'https://graph.facebook.com/v21.0';

interface WhatsAppResult {
  sent: boolean;
  stubbed: boolean;
  to: string;
}

function isConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_ACCESS_TOKEN
  );
}

async function sendText(to: string, body: string): Promise<WhatsAppResult> {
  if (!isConfigured()) {
    console.log(`[whatsapp:stub] → ${to}\n${body}\n`);
    return { sent: false, stubbed: true, to };
  }

  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  const res = await fetch(`${GRAPH_URL}/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body }
    })
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error(`[whatsapp] send failed (${res.status}): ${detail}`);
    return { sent: false, stubbed: false, to };
  }

  return { sent: true, stubbed: false, to };
}

// Confirmation to the customer after a successful booking.
export async function sendBookingConfirmation(
  booking: Booking,
  service: ServiceItem,
  handyman: Handyman
): Promise<WhatsAppResult> {
  const serviceName = pickLocale(service.name, 'es');
  const body = [
    `✅ ¡Tu reserva en SmartFix está confirmada!`,
    ``,
    `Código: ${booking.id}`,
    `Servicio: ${serviceName}`,
    `Maestro: ${handyman.name}`,
    `Fecha: ${booking.date} a las ${booking.time}`,
    `Dirección: ${booking.address}, ${booking.district}`,
    `Total: ${formatPrice(booking.total)}`,
    ``,
    `${handyman.name} ya fue notificado y te contactará pronto. ¡Gracias por confiar en SmartFix!`
  ].join('\n');

  return sendText(booking.customerPhone, body);
}

// Alert to the handyman that a new job has come in.
export async function sendHandymanAlert(
  booking: Booking,
  service: ServiceItem,
  handyman: Handyman,
  handymanPhone: string
): Promise<WhatsAppResult> {
  const serviceName = pickLocale(service.name, 'es');
  const body = [
    `🔔 Nuevo trabajo en SmartFix, ${handyman.name}`,
    ``,
    `Servicio: ${serviceName}`,
    `Cliente: ${booking.customerName}`,
    `Celular: ${booking.customerPhone}`,
    `Cuándo: ${booking.date} a las ${booking.time}`,
    `Dónde: ${booking.address}, ${booking.district}`,
    booking.notes ? `Notas: ${booking.notes}` : '',
    ``,
    `Ingresa a la app para confirmar y coordinar.`
  ]
    .filter(Boolean)
    .join('\n');

  return sendText(handymanPhone, body);
}

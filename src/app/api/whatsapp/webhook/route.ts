import { NextResponse } from 'next/server';

// Meta WhatsApp Cloud API webhook.
//
// GET  — verification handshake. Meta calls this with hub.* query params during
//        setup; we echo hub.challenge when the verify token matches.
// POST — inbound message events. For the demo we acknowledge and log; a real
//        build would route inbound replies into the chat thread.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN ?? 'maestro_verify_token';

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  // Acknowledge promptly so Meta does not retry. Inbound payloads are logged for
  // the demo; wiring them into the chat store is a follow-up.
  console.log('[whatsapp:webhook] inbound', JSON.stringify(body));

  return NextResponse.json({ received: true });
}

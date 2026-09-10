import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

// Confirms a webhook payload genuinely came from Paystack.
// Paystack signs the raw request body with your secret key (HMAC SHA512)
// and sends it in the x-paystack-signature header — always verify this
// before trusting a webhook, or anyone can fake a "payment successful" call.
export function verifyPaystackSignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) return false;
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");
  return hash === signature;
}

// Initializes a transaction and returns the checkout URL to redirect to.
export async function initializePaystackTransaction(params: {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: Record<string, unknown>;
  callbackUrl?: string;
}) {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      reference: params.reference,
      metadata: params.metadata,
      callback_url: params.callbackUrl,
    }),
  });

  if (!res.ok) {
    throw new Error(`Paystack init failed: ${res.status}`);
  }

  const data = await res.json();
  return data.data as { authorization_url: string; access_code: string; reference: string };
}

// Double-checks a transaction directly with Paystack's API. Use this as a
// belt-and-braces confirmation even after signature verification — never
// unlock access on the webhook payload's `status` field alone.
export async function verifyPaystackTransaction(reference: string) {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    }
  );

  if (!res.ok) {
    throw new Error(`Paystack verify failed: ${res.status}`);
  }

  const data = await res.json();
  return data.data as {
    status: "success" | "failed" | "abandoned";
    reference: string;
    amount: number;
    customer: { email: string };
    metadata: Record<string, unknown>;
  };
}

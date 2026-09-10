import { NextResponse } from "next/server";
import {
  verifyPaystackSignature,
  verifyPaystackTransaction,
} from "@/lib/paystack";
import { createServiceClient } from "@/lib/supabase/server";

// Paystack calls this URL after every transaction event.
// Configure it in the Paystack dashboard: Settings → API Keys & Webhooks.
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  // 1. Reject anything that isn't genuinely from Paystack.
  if (!verifyPaystackSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.success") {
    // Acknowledge other event types without acting on them.
    return NextResponse.json({ received: true });
  }

  const { reference, metadata } = event.data;
  const userId = metadata?.user_id as string | undefined;
  const courseId = metadata?.course_id as string | undefined;

  if (!userId || !courseId) {
    return NextResponse.json(
      { error: "Missing user_id or course_id in metadata" },
      { status: 400 }
    );
  }

  // 2. Re-verify directly with Paystack's API — never trust the webhook
  // payload alone, even after signature verification.
  const verified = await verifyPaystackTransaction(reference);
  if (verified.status !== "success") {
    return NextResponse.json({ error: "Transaction not successful" }, { status: 400 });
  }

  // 3. Unlock access. Service client bypasses RLS — this route is the
  // only place enrollments should ever be written from.
  const supabase = createServiceClient();

  const { error } = await supabase.from("enrollments").insert({
    user_id: userId,
    course_id: courseId,
    paystack_reference: reference,
    amount_kobo: verified.amount,
  });

  if (error && error.code !== "23505") {
    // 23505 = unique violation (already enrolled) — safe to ignore,
    // anything else is a real problem worth surfacing.
    console.error("Enrollment insert failed:", error);
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
  }

  // TODO: trigger the welcome email here (Resend/Postmark) — see README.

  return NextResponse.json({ received: true });
}

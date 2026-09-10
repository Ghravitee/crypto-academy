import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { sessionId, userId, zoomLink, markSent } = await request.json();

  if (!sessionId || !userId || !zoomLink) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await admin.supabase.from("session_links").upsert(
    {
      session_id: sessionId,
      user_id: userId,
      zoom_link: zoomLink,
      sent_at: markSent ? new Date().toISOString() : null,
    },
    { onConflict: "session_id,user_id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // TODO: once Resend/Postmark is wired up, send the student an email
  // here containing their personal Zoom link when markSent is true.

  return NextResponse.json({ ok: true });
}

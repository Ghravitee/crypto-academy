import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { courseId, title, topic, sessionNumber, scheduledAt, durationMinutes } =
    await request.json();

  if (!courseId || !title || !sessionNumber || !scheduledAt) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await admin.supabase.from("class_sessions").insert({
    course_id: courseId,
    title,
    topic: topic || null,
    session_number: sessionNumber,
    scheduled_at: scheduledAt,
    duration_minutes: durationMinutes || 120,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

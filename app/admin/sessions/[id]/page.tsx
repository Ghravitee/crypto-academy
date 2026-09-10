import { redirect, notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { LinkAssignmentRow } from "@/components/admin/link-assignment-row";

export default async function SessionRosterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = await requireAdmin();
  if (!admin) redirect("/dashboard");
  const { supabase } = admin;

  const { data: session } = await supabase
    .from("class_sessions")
    .select("id, title, session_number, scheduled_at, course_id")
    .eq("id", id)
    .single();

  if (!session) notFound();

  // Everyone actively enrolled in this session's course.
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("user_id, profiles ( full_name, email )")
    .eq("course_id", session.course_id)
    .eq("status", "active");

  const { data: existingLinks } = await supabase
    .from("session_links")
    .select("user_id, zoom_link, sent_at")
    .eq("session_id", session.id);

  const linksByUser = new Map(
    (existingLinks ?? []).map((l) => [l.user_id, l])
  );

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <p className="text-sm text-slate mb-1">
        Class {session.session_number}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight mb-1">
        {session.title}
      </h1>
      <p className="text-sm text-slate mb-8">
        {new Date(session.scheduled_at).toLocaleString("en-NG", {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </p>

      {!enrollments || enrollments.length === 0 ? (
        <p className="text-sm text-slate">
          No students are enrolled in this course yet.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {enrollments.map((e) => (
            <LinkAssignmentRow
              key={e.user_id}
              sessionId={session.id}
              userId={e.user_id}
              name={e.profiles?.full_name || e.profiles?.email || "Student"}
              existingLink={linksByUser.get(e.user_id)?.zoom_link ?? ""}
              alreadySent={Boolean(linksByUser.get(e.user_id)?.sent_at)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

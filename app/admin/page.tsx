import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { NewSessionForm } from "@/components/admin/new-session-form";

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/dashboard");
  const { supabase } = admin;

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, amount_kobo, status, enrolled_at")
    .order("enrolled_at", { ascending: false });

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title")
    .order("created_at", { ascending: false });

  const { data: sessions } = await supabase
    .from("class_sessions")
    .select("id, title, session_number, scheduled_at, course_id")
    .order("scheduled_at");

  const activeEnrollments = enrollments?.filter((e) => e.status === "active") ?? [];
  const totalRevenue = activeEnrollments.reduce((sum, e) => sum + e.amount_kobo, 0);

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Admin</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-ink/10 mb-12 border border-ink/10">
        <div className="bg-paper p-5">
          <p className="text-xs text-slate">Enrolled students</p>
          <p className="text-2xl font-semibold mt-1">{activeEnrollments.length}</p>
        </div>
        <div className="bg-paper p-5">
          <p className="text-xs text-slate">Revenue</p>
          <p className="text-2xl font-semibold mt-1">
            ₦{(totalRevenue / 100).toLocaleString()}
          </p>
        </div>
        <div className="bg-paper p-5">
          <p className="text-xs text-slate">Scheduled classes</p>
          <p className="text-2xl font-semibold mt-1">{sessions?.length ?? 0}</p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-sm font-medium text-slate mb-4">Classes</h2>
        {sessions && sessions.length > 0 ? (
          <ul className="divide-y divide-ink/10 border-y border-ink/10 mb-6">
            {sessions.map((session) => (
              <li key={session.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Class {session.session_number}: {session.title}
                  </p>
                  <p className="text-sm text-slate">
                    {new Date(session.scheduled_at).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <Link
                  href={`/admin/sessions/${session.id}`}
                  className="text-sm underline"
                >
                  Manage links
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate mb-6">No classes scheduled yet.</p>
        )}

        <NewSessionForm courses={courses ?? []} />
      </section>

      <section>
        <h2 className="text-sm font-medium text-slate mb-4">
          Recent enrollments
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-ink/10 text-left text-slate">
              <th className="py-2 font-normal">Amount</th>
              <th className="py-2 font-normal">Status</th>
              <th className="py-2 font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments?.map((row) => (
              <tr key={row.id} className="border-b border-ink/5">
                <td className="py-2">₦{(row.amount_kobo / 100).toLocaleString()}</td>
                <td className="py-2">{row.status}</td>
                <td className="py-2">
                  {new Date(row.enrolled_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

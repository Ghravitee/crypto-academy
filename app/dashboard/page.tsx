import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogOut, Video, Clock } from "lucide-react";
import { splitByTime } from "@/lib/sessions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, course_id, courses ( title )")
    .eq("status", "active");

  const courseIds = enrollments?.map((e) => e.course_id) ?? [];

  const { data: sessions } = courseIds.length
    ? await supabase
        .from("class_sessions")
        .select(
          "id, title, topic, session_number, scheduled_at, duration_minutes, session_links ( zoom_link, sent_at )"
        )
        .in("course_id", courseIds)
        .order("scheduled_at")
    : { data: [] };

  const { upcoming, past } = splitByTime(sessions ?? []);

  return (
    <main className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome{user?.email ? `, ${user.email}` : ""}
        </h1>
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-slate"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </form>
      </div>

      {!enrollments || enrollments.length === 0 ? (
        <div className="border border-ink/15 p-8 text-center text-slate">
          <p>You&apos;re not enrolled in any courses yet.</p>
          <Link href="/courses" className="underline mt-2 inline-block">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="text-sm font-medium text-slate mb-4">
              Upcoming classes
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-sm text-slate">
                No upcoming classes scheduled yet — check back soon.
              </p>
            ) : (
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {upcoming.map((session) => {
                  const link = session.session_links?.[0];
                  return (
                    <li
                      key={session.id}
                      className="py-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-medium text-ink">
                          Class {session.session_number}: {session.title}
                        </p>
                        <p className="text-sm text-slate flex items-center gap-1.5 mt-1">
                          <Clock size={14} />
                          {new Date(session.scheduled_at).toLocaleString(
                            "en-NG",
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }
                          )}
                        </p>
                      </div>
                      {link?.zoom_link && link.sent_at ? (
                        <a
                          href={link.zoom_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-ink text-paper text-sm font-medium px-4 py-2 shrink-0"
                        >
                          <Video size={16} />
                          Join
                        </a>
                      ) : (
                        <span className="text-xs text-slate shrink-0">
                          Link sent closer to class time
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {past.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-slate mb-4">
                Past classes
              </h2>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {past.map((session) => (
                  <li key={session.id} className="py-4">
                    <p className="font-medium text-ink">
                      Class {session.session_number}: {session.title}
                    </p>
                    <p className="text-sm text-slate mt-1">
                      {new Date(session.scheduled_at).toLocaleDateString(
                        "en-NG",
                        { dateStyle: "medium" }
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

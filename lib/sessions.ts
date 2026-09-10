type SessionLike = { scheduled_at: string };

// Pulled out of the dashboard page component: filtering by "now" is an
// impure operation, so it lives in a plain helper rather than directly
// in component render.
export function splitByTime<T extends SessionLike>(sessions: T[]) {
  const now = Date.now();
  return {
    upcoming: sessions.filter((s) => new Date(s.scheduled_at).getTime() >= now),
    past: sessions.filter((s) => new Date(s.scheduled_at).getTime() < now),
  };
}

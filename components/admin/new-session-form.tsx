"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Course = { id: string; title: string };

export function NewSessionForm({ courses }: { courses: Course[] }) {
  const router = useRouter();
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [sessionNumber, setSessionNumber] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        title,
        topic,
        sessionNumber: Number(sessionNumber),
        scheduledAt: new Date(scheduledAt).toISOString(),
        durationMinutes: 120,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json();
      setError(body.error ?? "Something went wrong");
      return;
    }

    setTitle("");
    setTopic("");
    setSessionNumber("");
    setScheduledAt("");
    router.refresh();
  }

  if (courses.length === 0) {
    return (
      <p className="text-sm text-slate">
        Create a course row in Supabase first, then you can schedule classes
        for it here.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-ink/15 p-5 flex flex-col gap-3 max-w-md"
    >
      <p className="text-sm font-medium">Schedule a class</p>

      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="border border-ink/20 px-3 py-2 text-sm bg-paper"
      >
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Class number (e.g. 1)"
        value={sessionNumber}
        onChange={(e) => setSessionNumber(e.target.value)}
        required
        className="border border-ink/20 px-3 py-2 text-sm bg-paper"
      />
      <input
        type="text"
        placeholder="Title (e.g. Intro to Wallets)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border border-ink/20 px-3 py-2 text-sm bg-paper"
      />
      <input
        type="text"
        placeholder="Topic (optional)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border border-ink/20 px-3 py-2 text-sm bg-paper"
      />
      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
        required
        className="border border-ink/20 px-3 py-2 text-sm bg-paper"
      />

      {error && <p className="text-sm text-signal">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-ink text-paper px-4 py-2 text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Scheduling…" : "Schedule class"}
      </button>
    </form>
  );
}

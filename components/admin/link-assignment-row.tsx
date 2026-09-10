"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

export function LinkAssignmentRow({
  sessionId,
  userId,
  name,
  existingLink,
  alreadySent,
}: {
  sessionId: string;
  userId: string;
  name: string;
  existingLink: string;
  alreadySent: boolean;
}) {
  const [link, setLink] = useState(existingLink);
  const [sent, setSent] = useState(alreadySent);
  const [saving, setSaving] = useState(false);

  async function handleSend() {
    if (!link) return;
    setSaving(true);

    const res = await fetch("/api/admin/session-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, userId, zoomLink: link, markSent: true }),
    });

    setSaving(false);
    if (res.ok) setSent(true);
  }

  return (
    <div className="py-4 flex items-center gap-3">
      <p className="w-40 shrink-0 text-sm font-medium truncate">{name}</p>
      <input
        type="url"
        placeholder="Paste personal Zoom link"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
          setSent(false);
        }}
        className="flex-1 border border-ink/20 px-3 py-2 text-sm bg-paper"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!link || saving}
        className="flex items-center gap-1.5 shrink-0 text-sm font-medium px-3 py-2 bg-ink text-paper disabled:opacity-40"
      >
        {sent ? <Check size={15} /> : <Send size={15} />}
        {sent ? "Sent" : saving ? "Sending…" : "Send"}
      </button>
    </div>
  );
}

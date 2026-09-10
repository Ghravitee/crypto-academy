import { createClient } from "@/lib/supabase/server";

// Returns the signed-in user if they're an admin, otherwise null.
// The real security boundary is still the "Admins can manage X" RLS
// policies in supabase/schema.sql — this just avoids rendering admin
// pages or running admin route handlers for non-admins.
export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return null;

  return { user, supabase };
}

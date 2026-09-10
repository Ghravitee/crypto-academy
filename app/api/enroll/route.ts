import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { initializePaystackTransaction } from "@/lib/paystack";

export async function POST(request: Request) {
  const { courseId } = await request.json();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, price_kobo")
    .eq("id", courseId)
    .single();

  if (courseError || !course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const reference = `ca_${courseId.slice(0, 8)}_${Date.now()}`;

  const transaction = await initializePaystackTransaction({
    email: user.email!,
    amountKobo: course.price_kobo,
    reference,
    metadata: { user_id: user.id, course_id: course.id },
    callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  });

  return NextResponse.json({ url: transaction.authorization_url });
}

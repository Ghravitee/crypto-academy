import { createClient } from "@/lib/supabase/server";

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select("id, slug, title, description, price_kobo")
    .eq("published", true);

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Courses</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border border-neutral-200 p-5"
          >
            <h2 className="font-medium">{course.title}</h2>
            <p className="text-sm text-neutral-600 mt-1">
              {course.description}
            </p>
            <p className="mt-3 font-semibold">
              ₦{(course.price_kobo / 100).toLocaleString()}
            </p>
          </div>
        ))}

        {!courses ||
          (courses.length === 0 && (
            <p className="text-neutral-500">
              No published courses yet — add one in Supabase to see it here.
            </p>
          ))}
      </div>
    </main>
  );
}

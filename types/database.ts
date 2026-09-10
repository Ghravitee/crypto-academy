// Hand-written starter types matching supabase/schema.sql.
//
// Once your Supabase project is live, replace this file by generating
// real types from your actual schema:
//
//   npx supabase gen types typescript --project-id <your-project-id> > types/database.ts

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string;
          phone: string | null;
          role: "student" | "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email: string;
          phone?: string | null;
          role?: "student" | "admin";
        };
        Update: Partial<{
          full_name: string | null;
          phone: string | null;
          role: "student" | "admin";
        }>;
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          price_kobo: number;
          duration_weeks: number;
          sessions_per_week: number;
          session_length_minutes: number;
          cohort_start_date: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          description?: string | null;
          price_kobo?: number;
          duration_weeks?: number;
          sessions_per_week?: number;
          session_length_minutes?: number;
          cohort_start_date?: string | null;
          published?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
        Relationships: [];
      };
      class_sessions: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          topic: string | null;
          session_number: number;
          scheduled_at: string;
          duration_minutes: number;
          created_at: string;
        };
        Insert: {
          course_id: string;
          title: string;
          topic?: string | null;
          session_number: number;
          scheduled_at: string;
          duration_minutes?: number;
        };
        Update: Partial<
          Database["public"]["Tables"]["class_sessions"]["Insert"]
        >;
        Relationships: [
          {
            foreignKeyName: "class_sessions_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      session_links: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          zoom_link: string;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          session_id: string;
          user_id: string;
          zoom_link: string;
          sent_at?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["session_links"]["Insert"]
        >;
        Relationships: [
          {
            foreignKeyName: "session_links_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "class_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "session_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          status: "active" | "refunded";
          paystack_reference: string;
          amount_kobo: number;
          enrolled_at: string;
        };
        Insert: {
          user_id: string;
          course_id: string;
          status?: "active" | "refunded";
          paystack_reference: string;
          amount_kobo: number;
        };
        Update: Partial<
          Database["public"]["Tables"]["enrollments"]["Insert"]
        >;
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          position: number;
          published: boolean;
        };
        Insert: {
          question: string;
          answer: string;
          position?: number;
          published?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

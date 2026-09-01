import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ekwqaecvluybvuqntnpq.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder";

export const isSupabaseConfigured = Boolean(
  supabaseAnonKey && !supabaseAnonKey.includes("placeholder")
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ─────────────────────────────────────────────────────────────
   Database Types
   ───────────────────────────────────────────────────────────── */
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  school: string | null;
  grade: string | null;
  role: "student" | "reviewer" | "editor" | "admin";
  bio: string | null;
  avatar_url: string | null;
  verified_hours: number;
  created_at: string;
  updated_at: string;
}

export interface DbPaper {
  id: string;
  record_id: string;
  slug: string | null;
  title: string;
  abstract: string;
  field: string;
  secondary_field: string | null;
  type: string;
  difficulty: "Introductory" | "Intermediate" | "Advanced";
  reading_minutes: number;
  authors: {
    name: string;
    school?: string;
    grade?: string;
    role?: string;
    handle?: string;
  }[];
  published_at: string;
  featured: boolean;
  reads_count: number;
  citations_count: number;
  verified_hours: number;
  pdf_url: string | null;
  dataset_url: string | null;
  doi: string | null;
  tags: string[];
  created_at: string;
}

export interface DbProject {
  id: string;
  record_id: string;
  slug: string;
  title: string;
  summary: string;
  field: string;
  secondary_field: string | null;
  difficulty: "Introductory" | "Intermediate" | "Advanced";
  time_commitment: string;
  max_hours: number;
  deadline: string;
  status: "Open" | "Filling Fast" | "Waitlist" | "Closed";
  deliverable: string;
  skills: string[];
  packet_details: Record<string, unknown>;
  created_at: string;
}

export interface DbSubmission {
  id: string;
  record_id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  field: string;
  abstract: string;
  authors: unknown[];
  file_url: string | null;
  data_url: string | null;
  ai_declaration: string | null;
  status: "draft" | "submitted" | "in_review" | "revisions_requested" | "approved" | "published" | "rejected";
  requested_hours: number;
  created_at: string;
  updated_at: string;
}

export interface DbReview {
  id: string;
  submission_id: string;
  reviewer_id: string | null;
  reviewer_name: string;
  reviewer_role: string | null;
  criteria_scores: Record<string, number>;
  overall_feedback: string;
  decision: "approve" | "revise" | "reject";
  awarded_hours: number;
  created_at: string;
}

export interface DbServiceRecord {
  id: string;
  user_id: string;
  verification_code: string;
  project_title: string;
  field: string;
  hours: number;
  reviewer_name: string;
  reviewer_institution: string | null;
  approved_at: string;
  status: "verified" | "pending" | "revoked";
}

export interface DbSponsor {
  id: string;
  name: string;
  org: string;
  tagline: string;
  category: string;
  hero_image: string;
  logo: string | null;
  url: string;
  description: string;
  highlights: string[];
  location: string;
  founded: string | null;
  support_area: string;
  active: boolean;
  display_order: number;
}

export interface DbInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  status: "unread" | "in_progress" | "resolved";
  created_at: string;
}

/* ─────────────────────────────────────────────────────────────
   Backend Service Helpers
   ───────────────────────────────────────────────────────────── */

/** Authentication Services */
export const authService = {
  async signUp(email: string, password: string, metadata?: { first_name?: string; last_name?: string; school?: string; grade?: string }) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
  },

  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  async getUser() {
    return supabase.auth.getUser();
  },

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

/** Profile Services */
export const profileService = {
  async getProfile(userId: string) {
    return supabase.from("profiles").select("*").eq("id", userId).single();
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    return supabase.from("profiles").update(updates).eq("id", userId);
  },
};

/** Papers Services */
export const papersService = {
  async getPapers() {
    return supabase.from("papers").select("*").order("published_at", { ascending: false });
  },

  async getPaperByRecord(recordId: string) {
    return supabase.from("papers").select("*").eq("record_id", recordId).single();
  },
};

/** Projects / Opportunities Services */
export const projectsService = {
  async getProjects() {
    return supabase.from("projects").select("*").order("deadline", { ascending: true });
  },

  async getProjectBySlug(slug: string) {
    return supabase.from("projects").select("*").eq("slug", slug).single();
  },
};

/** Submissions Services */
export const submissionsService = {
  async createSubmission(submission: Omit<DbSubmission, "id" | "created_at" | "updated_at">) {
    return supabase.from("submissions").insert(submission).select().single();
  },

  async getUserSubmissions(userId: string) {
    return supabase.from("submissions").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  },
};

/** Inquiries / Contact Form Services */
export const inquiriesService = {
  async submitInquiry(inquiry: Omit<DbInquiry, "id" | "status" | "created_at">) {
    return supabase.from("inquiries").insert(inquiry);
  },
};

/** Service Records & Verification Services */
export const serviceRecordsService = {
  async verifyCode(code: string) {
    return supabase.from("service_records").select("*, profiles(first_name, last_name, school)").eq("verification_code", code).single();
  },

  async getUserRecords(userId: string) {
    return supabase.from("service_records").select("*").eq("user_id", userId);
  },
};

/** Sponsors Services */
export const sponsorsService = {
  async getSponsors() {
    return supabase.from("sponsors").select("*").eq("active", true).order("display_order", { ascending: true });
  },
};

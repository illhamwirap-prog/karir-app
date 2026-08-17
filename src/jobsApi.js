import { supabase } from "../lib/supabase";

export const CATEGORIES = ["Semua", "Teknologi", "Desain", "Marketing", "Keuangan", "Customer Service", "HR"];
export const TYPES = ["Semua", "Penuh Waktu", "Kontrak", "Magang", "Freelance"];

function relativeTime(isoDate) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 24) return "Hari ini";
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 hari lalu";
  if (days < 7) return `${days} hari lalu`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 minggu lalu";
  return `${weeks} minggu lalu`;
}

function mapJob(row) {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    mode: row.mode,
    type: row.type,
    category: row.category,
    min: row.min_salary,
    max: row.max_salary,
    desc: row.description,
    req: row.requirements || [],
    featured: row.featured,
    posted: relativeTime(row.created_at),
  };
}

export async function fetchJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapJob);
}

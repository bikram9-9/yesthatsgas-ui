import { createServerClient } from "@/lib/supabase/server";
import { ContentCard } from "./content-card";
import { Content, Profile } from "@/types/database";

async function getContent(): Promise<(Content & { profiles: Profile })[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("content")
    .select(
      `
      *,
      profiles:user_id(*)
    `
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(12)
    .returns<(Content & { profiles: Profile })[]>();

  if (error) throw error;
  return data || [];
}

export default async function ContentGrid() {
  const content: (Content & { profiles: Profile })[] = await getContent();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {content.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  );
}

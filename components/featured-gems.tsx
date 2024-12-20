"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerClient } from "@/lib/supabase/server";
import { Content, Profile } from "@/types/database";

async function getFeaturedGems(): Promise<(Content & { profiles: Profile })[]> {
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
    .limit(3)
    .returns<(Content & { profiles: Profile })[]>();

  if (error) throw error;
  return data || [];
}

export async function FeaturedGems() {
  const gems = await getFeaturedGems();

  return (
    <section className="container py-12 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Featured Discoveries
        </h2>
        <p className="mt-4 text-muted-foreground">
          Explore these amazing places shared by our community
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {gems.map((gem) => (
          <Card key={gem.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={gem.thumbnail_url}
                  alt={gem.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="mb-2 line-clamp-2">{gem.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {gem.location}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span>Shared by {gem.profiles.username}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

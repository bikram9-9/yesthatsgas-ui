"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import type { Content, Profile } from "@/types/database";

export default function DashboardPage() {
  const [userContent, setUserContent] = useState<Content[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [contentResponse, profileResponse] = await Promise.all([
        supabase.from("content").select("*").eq("user_id", user.id),
        supabase.from("profiles").select("*").eq("id", user.id).single(),
      ]);

      if (contentResponse.data) setUserContent(contentResponse.data);
      if (profileResponse.data) setProfile(profileResponse.data);
    }

    loadDashboardData();
  }, []);

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.total_views || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime content views
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.subscribers || 0}
            </div>
            <p className="text-xs text-muted-foreground">Total subscribers</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userContent.reduce(
                (acc, content) => acc + (content.likes || 0),
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">Across all content</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="content">My Content</TabsTrigger>
          <TabsTrigger value="likes">Liked</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userContent.map((content) => (
              <Card key={content.id} className="overflow-hidden shadow-sm">
                {content.thumbnail_url && (
                  <div className="aspect-video w-full">
                    <img
                      src={content.thumbnail_url}
                      alt={content.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="p-4">
                  <CardTitle className="line-clamp-1 text-base">
                    {content.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4 pt-0 px-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {content.location}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{content.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>{content.likes.toLocaleString()} likes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <div className="mt-4 text-sm text-muted-foreground">
            No liked content yet.
          </div>
        </TabsContent>
        <TabsContent value="playlists">
          <div className="mt-4 text-sm text-muted-foreground">
            No playlists created yet.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

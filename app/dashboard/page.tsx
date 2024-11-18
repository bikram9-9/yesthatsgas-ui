"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";

export default function DashboardPage() {
  const [userGems, setUserGems] = useState<Tables["gems"][]>([]);
  const [profile, setProfile] = useState<Tables["profiles"] | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [gemsResponse, profileResponse] = await Promise.all([
        supabase.from("gems").select("*").eq("user_id", user.id),
        supabase.from("profiles").select("*").eq("id", user.id).single(),
      ]);

      if (gemsResponse.data) setUserGems(gemsResponse.data);
      if (profileResponse.data) setProfile(profileResponse.data);
    }

    loadDashboardData();
  }, []);

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{profile?.points || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gems Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{profile?.gems_shared || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userGems.reduce((acc, gem) => acc + (gem.likes || 0), 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gems" className="mt-8">
        <TabsList>
          <TabsTrigger value="gems">My Gems</TabsTrigger>
          <TabsTrigger value="likes">Liked Gems</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        <TabsContent value="gems" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userGems.map((gem) => (
              <Card key={gem.id}>
                <CardHeader>
                  <CardTitle>{gem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {gem.location}
                  </p>
                  <p className="mt-2 text-sm">
                    {gem.likes} likes
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <p className="text-muted-foreground">No liked gems yet.</p>
        </TabsContent>
        <TabsContent value="rewards">
          <p className="text-muted-foreground">No rewards earned yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
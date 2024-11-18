import { supabase } from "@/lib/supabase";
import { GemCard } from "@/components/gem-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

async function getGems() {
  const { data } = await supabase
    .from("gems")
    .select("*, profiles(username, avatar_url)")
    .order("created_at", { ascending: false })
    .limit(12);

  return data || [];
}

export default async function ExplorePage() {
  const gems = await getGems();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Gas Locations</h1>
        <p className="text-muted-foreground">
          Discover amazing places shared by our community
        </p>
      </div>

      <div className="mb-8 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-9"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gems.map((gem) => (
          <GemCard key={gem.id} gem={gem} />
        ))}
      </div>
    </div>
  );
}
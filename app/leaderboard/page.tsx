import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

async function getLeaderboardData() {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("points", { ascending: false })
    .limit(50);

  return data || [];
}

export default async function LeaderboardPage() {
  const leaders = await getLeaderboardData();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top contributors in the Yes that&apos;s Gas community
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Gems Shared</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaders.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  {index < 3 ? (
                    <Trophy
                      className={
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-400"
                          : "text-amber-600"
                      }
                    />
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {user.username}
                </TableCell>
                <TableCell>{user.points.toLocaleString()}</TableCell>
                <TableCell>{user.gems_shared}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
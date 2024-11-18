import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase/schema";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export type Tables = {
  content: {
    id: string;
    type: "video" | "itinerary";
    title: string;
    description: string;
    thumbnail_url: string;
    video_url?: string;
    itinerary_data?: {
      days: {
        day: number;
        activities: {
          time: string;
          title: string;
          description: string;
          location: string;
        }[];
      }[];
    };
    user_id: string;
    views: number;
    likes: number;
    created_at: string;
  };
  profiles: {
    id: string;
    username: string;
    avatar_url: string;
    subscribers: number;
  };
};

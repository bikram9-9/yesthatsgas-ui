import type { Database } from "@/lib/supabase/schema";

// Table Row Types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Content = Database["public"]["Tables"]["content"]["Row"];
export type Playlist = Database["public"]["Tables"]["playlists"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Itinerary = Database["public"]["Tables"]["itineraries"]["Row"];
export type ItineraryDay =
  Database["public"]["Tables"]["itinerary_days"]["Row"];
export type ItineraryPlace =
  Database["public"]["Tables"]["itinerary_places"]["Row"];
export type MediaItem = Database["public"]["Tables"]["media_items"]["Row"];
export type DayMedia = Database["public"]["Tables"]["day_media"]["Row"];

export type ItineraryWithProfile = Itinerary & {
  profiles: Pick<Profile, "username" | "avatar_url">;
};

// Specific enum types
export type PlaceType = ItineraryPlace["place_type"];
export type ContentType = Content["type"];
export type MediaType = MediaItem["type"];
export type ContentStatus = Content["status"];

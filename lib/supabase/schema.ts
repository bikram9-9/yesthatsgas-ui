export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      content: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string;
          type: "video" | "itinerary";
          thumbnail_url: string;
          video_url?: string;
          itinerary_data?: Json;
          user_id: string;
          views: number;
          likes: number;
          location?: string;
          latitude?: number;
          longitude?: number;
          genre: string[];
          country_code: string;
          city: string;
          state?: string;
          dislikes: number;
          duration?: number;
          status: "draft" | "published" | "private";
          tags: string[];
          language: string;
          featured: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description: string;
          type: "video" | "itinerary";
          thumbnail_url: string;
          video_url?: string;
          itinerary_data?: Json;
          user_id: string;
          views?: number;
          likes?: number;
          location?: string;
          latitude?: number;
          longitude?: number;
          genre?: string[];
          country_code?: string;
          city?: string;
          state?: string;
          dislikes?: number;
          duration?: number;
          status?: "draft" | "published" | "private";
          tags?: string[];
          language?: string;
          featured?: boolean;
        };
        Update: {
          title?: string;
          description?: string;
          thumbnail_url?: string;
          video_url?: string;
          itinerary_data?: Json;
          views?: number;
          likes?: number;
          location?: string;
          latitude?: number;
          longitude?: number;
          genre?: string[];
          country_code?: string;
          city?: string;
          state?: string;
          dislikes?: number;
          duration?: number;
          status?: "draft" | "published" | "private";
          tags?: string[];
          language?: string;
          featured?: boolean;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          full_name?: string;
          avatar_url?: string;
          subscribers: number;
          website?: string;
          about?: string;
          country_code?: string;
          language?: string;
          email?: string;
          is_verified: boolean;
          total_views: number;
          joined_date: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string;
          avatar_url?: string;
          subscribers?: number;
          website?: string;
          about?: string;
          country_code?: string;
          language?: string;
          email?: string;
          is_verified?: boolean;
          total_views?: number;
          joined_date?: string;
        };
        Update: {
          username?: string;
          full_name?: string;
          avatar_url?: string;
          subscribers?: number;
          website?: string;
          about?: string;
          country_code?: string;
          language?: string;
          email?: string;
          is_verified?: boolean;
          total_views?: number;
          joined_date?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          created_at: string;
          subscriber_id: string;
          creator_id: string;
        };
        Insert: {
          id?: string;
          subscriber_id: string;
          creator_id: string;
        };
        Update: {
          subscriber_id?: string;
          creator_id?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          content_id: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_id: string;
        };
        Update: {
          user_id?: string;
          content_id?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          content_id: string;
          user_id: string;
          text: string;
          parent_comment_id?: string;
          likes: number;
        };
        Insert: {
          id?: string;
          content_id: string;
          user_id: string;
          text: string;
          parent_comment_id?: string;
          likes?: number;
        };
        Update: {
          text?: string;
          likes?: number;
        };
      };
      itineraries: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          title: string;
          description: string;
          location: string;
          latitude?: number;
          longitude?: number;
          cover_image?: string;
          duration_days: number;
          likes: number;
          views: number;
          is_public: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          location: string;
          latitude?: number;
          longitude?: number;
          cover_image?: string;
          duration_days: number;
          likes?: number;
          views?: number;
          is_public?: boolean;
        };
        Update: {
          title?: string;
          description?: string;
          location?: string;
          latitude?: number;
          longitude?: number;
          cover_image?: string;
          duration_days?: number;
          likes?: number;
          views?: number;
          is_public?: boolean;
        };
      };
      itinerary_days: {
        Row: {
          id: string;
          created_at: string;
          itinerary_id: string;
          user_id: string;
          day_number: number;
          date?: string;
          title?: string;
          description?: string;
          cover_image?: string;
        };
        Insert: {
          id?: string;
          itinerary_id: string;
          user_id: string;
          day_number: number;
          date?: string;
          title?: string;
          description?: string;
          cover_image?: string;
        };
        Update: {
          day_number?: number;
          date?: string;
          title?: string;
          description?: string;
          cover_image?: string;
        };
      };
      itinerary_places: {
        Row: {
          id: string;
          created_at: string;
          day_id: string;
          name: string;
          description?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          start_time?: string;
          end_time?: string;
          order: number;
          place_type:
            | "attraction"
            | "restaurant"
            | "hotel"
            | "transport"
            | "activity"
            | "other";
        };
        Insert: {
          id?: string;
          day_id: string;
          name: string;
          description?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          start_time?: string;
          end_time?: string;
          order: number;
          place_type:
            | "attraction"
            | "restaurant"
            | "hotel"
            | "transport"
            | "activity"
            | "other";
        };
        Update: {
          name?: string;
          description?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          start_time?: string;
          end_time?: string;
          order?: number;
          place_type?:
            | "attraction"
            | "restaurant"
            | "hotel"
            | "transport"
            | "activity"
            | "other";
        };
      };
      media_items: {
        Row: {
          id: string;
          created_at: string;
          place_id: string;
          type: "image" | "video";
          url: string;
          caption?: string;
          order: number;
        };
        Insert: {
          id?: string;
          place_id: string;
          type: "image" | "video";
          url: string;
          caption?: string;
          order: number;
        };
        Update: {
          url?: string;
          caption?: string;
          order?: number;
        };
      };
      day_media: {
        Row: {
          id: string;
          created_at: string;
          day_id: string;
          user_id: string;
          type: "image" | "video";
          url: string;
          caption?: string;
          order: number;
          thumbnail_url?: string;
        };
        Insert: {
          id?: string;
          day_id: string;
          user_id: string;
          type: "image" | "video";
          url: string;
          caption?: string;
          order: number;
          thumbnail_url?: string;
        };
        Update: {
          url?: string;
          caption?: string;
          order?: number;
          thumbnail_url?: string;
        };
      };
      content_reports: {
        Row: {
          id: string;
          created_at: string;
          content_id: string;
          reporter_id: string;
          reason: string;
          status: "pending" | "reviewed" | "resolved";
          description?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          content_id: string;
          reporter_id: string;
          reason: string;
          status?: "pending" | "reviewed" | "resolved";
          description?: string;
        };
        Update: {
          reason?: string;
          status?: "pending" | "reviewed" | "resolved";
          description?: string;
        };
      };
      playlists: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          title: string;
          description?: string;
          is_public: boolean;
          thumbnail_url?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          title: string;
          description?: string;
          is_public?: boolean;
          thumbnail_url?: string;
        };
        Update: {
          title?: string;
          description?: string;
          is_public?: boolean;
          thumbnail_url?: string;
        };
      };
      playlist_items: {
        Row: {
          id: string;
          created_at: string;
          playlist_id: string;
          content_id: string;
          order: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          playlist_id: string;
          content_id: string;
          order?: number;
        };
        Update: {
          order?: number;
        };
      };
    };
  };
}

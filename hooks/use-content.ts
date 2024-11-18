"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContentStats {
  likes: number;
  dislikes: number;
  views: number;
}

export function useContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<ContentStats | null>(null);
  const { toast } = useToast();

  const likeContent = async (contentId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content_id: contentId }),
      });

      if (!response.ok) throw new Error("Failed to like content");

      const { liked, stats: newStats } = await response.json();
      setStats(newStats);

      toast({
        title: liked ? "Added to liked content" : "Removed from liked content",
      });

      return liked;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const reportContent = async (
    contentId: string,
    reason: string,
    description?: string
  ) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content_id: contentId,
          reason,
          description,
        }),
      });

      if (!response.ok) throw new Error("Failed to report content");

      toast({
        title: "Content reported",
        description: "Thank you for helping keep our community safe",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    stats,
    likeContent,
    reportContent,
  };
}

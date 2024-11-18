"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useContentActions() {
  const [isLoading, setIsLoading] = useState(false);
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

      const { liked } = await response.json();
      toast({
        title: liked ? "Added to liked videos" : "Removed from liked videos",
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

  const subscribeToCreator = async (creatorId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator_id: creatorId }),
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      const { subscribed } = await response.json();
      toast({
        title: subscribed ? "Subscribed" : "Unsubscribed",
      });

      return subscribed;
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

      const { reported } = await response.json();
      toast({
        title: reported ? "Reported" : "Unreported",
      });

      return reported;
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
    likeContent,
    subscribeToCreator,
    reportContent,
  };
}

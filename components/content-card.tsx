"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useContent } from "@/hooks/use-content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Share2,
  ThumbsDown,
  MapPin,
  Video,
  Globe,
  MoreVertical,
  Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ReportForm } from "@/components/report-form";
import { Content, Profile } from "@/types/database";

export function ContentCard({
  content,
}: {
  content: Content & { profiles: Profile };
}) {
  const [localLikes, setLocalLikes] = useState(content.likes);
  const [localDislikes, setLocalDislikes] = useState(content.dislikes);
  const { likeContent, reportContent } = useContent();

  const handleLike = async () => {
    // Optimistic update
    setLocalLikes((prev) => prev + 1);
    const success = await likeContent(content.id);
    if (!success) {
      // Revert on failure
      setLocalLikes((prev) => prev - 1);
    }
  };

  const handleDislike = async () => {
    setLocalDislikes((prev) => prev + 1);
    const success = await likeContent(content.id);
    if (!success) {
      setLocalDislikes((prev) => prev - 1);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: content.title,
        text: content.description,
        url: `/watch/${content.id}`,
      });
    } catch (error) {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(
        window.location.origin + `/watch/${content.id}`
      );
    }
  };

  return (
    <Card className="overflow-hidden">
      <Link href={`/watch/${content.id}`}>
        <div className="relative aspect-video">
          <Image
            src={content.thumbnail_url}
            alt={content.title}
            fill
            className="object-cover"
          />
          {content.duration && (
            <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
              {Math.floor(content.duration / 60)}:
              {String(content.duration % 60).padStart(2, "0")}
            </div>
          )}
          <Badge
            variant={content.type === "video" ? "default" : "secondary"}
            className="absolute left-2 top-2"
          >
            {content.type === "video" ? (
              <Video className="mr-1 h-3 w-3" />
            ) : (
              <MapPin className="mr-1 h-3 w-3" />
            )}
            {content.type}
          </Badge>
        </div>
      </Link>

      <CardContent className="grid gap-2.5 p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={content.profiles.avatar_url} />
            <AvatarFallback>
              {content.profiles.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="line-clamp-2 font-semibold leading-tight">
              {content.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{content.profiles.username}</span>
              {content.profiles.is_verified && (
                <Badge variant="secondary" className="h-4 w-4 p-0">
                  ✓
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {content.genre.map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          {content.city}, {content.country_code}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{content.views.toLocaleString()} views</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(content.created_at))} ago</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={handleLike}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                localLikes > content.likes && "fill-current text-red-500"
              )}
            />
            {localLikes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={handleDislike}
          >
            <ThumbsDown className="h-4 w-4" />
            {localDislikes}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report Content</DialogTitle>
                  </DialogHeader>
                  <ReportForm contentId={content.id} />
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}

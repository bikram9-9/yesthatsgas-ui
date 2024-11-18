import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would normally come from your database
const MOCK_VIDEOS = [
  {
    id: "1",
    type: "video",
    title: "Hidden Gems of Bali - Secret Waterfall Adventure",
    description:
      "Join me as we explore one of Bali's most beautiful hidden waterfalls. This location is off the typical tourist path and offers an authentic experience of Bali's natural beauty.",
    thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    videoUrl: "https://example.com/video.mp4",
    creator: {
      name: "Travel with Sarah",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      subscribers: "125K",
    },
    stats: {
      views: "125K",
      likes: "12K",
      comments: 342,
    },
    createdAt: "2 days ago",
  },
  {
    id: "2",
    type: "itinerary",
    title: "Perfect 7 Days in Japan - Complete Itinerary",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    creator: {
      name: "Wanderlust Mike",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      subscribers: "89K",
    },
    stats: {
      views: "89K",
      likes: "8K",
      comments: 156,
    },
    createdAt: "5 days ago",
  },
];

export function generateStaticParams() {
  return MOCK_VIDEOS.map((video) => ({
    id: video.id,
  }));
}

interface PageProps {
  params: { id: string };
}

export default function WatchPage({ params }: PageProps) {
  const video = MOCK_VIDEOS.find((v) => v.id === params.id) || MOCK_VIDEOS[0];

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="aspect-video relative overflow-hidden rounded-lg bg-black">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Video Info */}
          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold">{video.title}</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={video.creator.avatar} />
                  <AvatarFallback>
                    {video.creator.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{video.creator.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {video.creator.subscribers} subscribers
                  </p>
                </div>
                <Button className="ml-4">Subscribe</Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="description" className="mt-6">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="comments">
                  Comments ({video.stats.comments})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">{video.description}</p>
                <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                  <span>{video.stats.views} views</span>
                  <span>{video.createdAt}</span>
                </div>
              </TabsContent>
              <TabsContent value="comments">
                <div className="flex items-center gap-4">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">Comments coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">More like this</h2>
          <div className="space-y-4">
            {MOCK_VIDEOS.filter((v) => v.id !== params.id).map(
              (recommendation) => (
                <div key={recommendation.id} className="flex gap-4">
                  <div className="relative h-24 w-40 flex-none overflow-hidden rounded-lg">
                    <Image
                      src={recommendation.thumbnail}
                      alt={recommendation.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="line-clamp-2 text-sm font-medium">
                      {recommendation.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {recommendation.creator.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {recommendation.stats.views} views
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

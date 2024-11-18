import Image from "next/image";
import { Heart, MapPin, Share2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GemCardProps {
  gem: any; // Type this properly based on your Supabase schema
}

export function GemCard({ gem }: GemCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={gem.images[0]}
            alt={gem.title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={gem.profiles.avatar_url} />
            <AvatarFallback>
              {gem.profiles.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{gem.profiles.username}</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{gem.title}</h3>
        <p className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {gem.location}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {gem.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex w-full items-center gap-2">
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <div className="ml-auto text-sm text-muted-foreground">
            {gem.likes} likes
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
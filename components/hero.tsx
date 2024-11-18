import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="container flex flex-col items-center justify-center space-y-8 pt-24 text-center">
      <div className="rounded-full bg-muted p-4">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Discover the World&apos;s
        <br />
        Hidden Gems
      </h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl">
        Join our community of explorers sharing unique and undiscovered places.
        Earn rewards for your contributions and explore amazing locations.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/explore">
            Start Exploring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/submit">Share a Location</Link>
        </Button>
      </div>
    </div>
  );
}
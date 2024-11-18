import { Camera, MapPin, Trophy } from "lucide-react";

const STEPS = [
  {
    icon: Camera,
    title: "Share Hidden Gems",
    description:
      "Upload photos and details of unique places you've discovered.",
  },
  {
    icon: MapPin,
    title: "Pin Locations",
    description:
      "Mark the exact location to help others find these amazing spots.",
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description:
      "Get rewarded when others enjoy and validate your discoveries.",
  },
];

export function HowItWorks() {
  return (
    <section className="container space-y-8 pb-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          How It Works
        </h2>
        <p className="mt-4 text-muted-foreground">
          Join our community and start sharing your discoveries
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div className="rounded-full bg-primary/10 p-4">
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
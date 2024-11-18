"use client";

import { Button } from "@/components/ui/button";

const FILTERS = [
  "All",
  "Videos",
  "Itineraries",
  "Most Viewed",
  "Recently Added",
];

export function ContentFilter() {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {FILTERS.map((filter) => (
        <Button
          key={filter}
          variant={filter === "All" ? "default" : "outline"}
          size="sm"
          className="whitespace-nowrap"
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
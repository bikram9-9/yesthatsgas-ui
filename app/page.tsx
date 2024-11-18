import { SearchBar } from "@/components/search-bar";
import ContentGrid from "@/components/content-grid";
import { ContentFilter } from "@/components/content-filter";

export default function Home() {
  return (
    <div className="container py-6">
      <div className="mb-6 flex gap-4">
        <SearchBar />
      </div>
      <ContentFilter />
      <ContentGrid />
    </div>
  );
}

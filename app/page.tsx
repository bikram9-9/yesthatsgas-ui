import { SearchBar } from "@/components/search-bar";
import ContentGrid from "@/components/content-grid";
import { ContentFilter } from "@/components/content-filter";

export default function Home() {
  return (
    <div className=" w-full mx-auto px-4 py-6">
      <div className="space-y-6">
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar />
        </div>
        <ContentFilter />
        <ContentGrid />
      </div>
    </div>
  );
}

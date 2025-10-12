import { Search } from "lucide-react";

export function SearchFormSkeleton({}: {}) {
  return (
    <form className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          disabled
          type="text"
          value={""}
          placeholder="Search for products..."
          className="w-full rounded-lg border border-border bg-background px-10 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        disabled
        type="submit"
        className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

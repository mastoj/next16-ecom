"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { type FormEvent, use, useState } from "react";

export function SearchForm({
  initialQuery,
}: {
  initialQuery: Promise<string>;
}) {
  const router = useRouter();
  const initQuery = use(initialQuery);
  const [query, setQuery] = useState(initQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
      //
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full rounded-lg border border-border bg-background px-10 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

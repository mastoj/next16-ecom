import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { SearchResultsSkeleton } from "@/components/search-results-skeleton";
import { SearchFormSkeleton } from "@/components/search-form-skeleton";
import { generatePermutations } from "flags/next";
import { flagSimulateDelay, precomputedFlags } from "@/lib/flags";

export const generateStaticParams = async () => {
  const codes = await generatePermutations(precomputedFlags);
  return codes.slice(0, 1).map((code) => ({ code }));
};

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const code = await params.then((p) => p.code);
  const simulateDelay = await flagSimulateDelay(code, precomputedFlags);
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Static Shell */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-foreground">
          Search Products
        </h1>
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchForm
            initialQuery={searchParams.then((params) => params.q || "")}
          />
        </Suspense>
      </div>
      {/* Dynamic Search Results */}
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults
          query={searchParams.then((params) => params.q || "")}
          simulateDelay={simulateDelay}
        />
      </Suspense>
    </main>
  );
}

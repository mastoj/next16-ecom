import { ProductCardSkeleton } from "./product-card-skeleton";

export function SearchResultsSkeleton() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="relative h-6 w-48 overflow-hidden rounded bg-muted">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

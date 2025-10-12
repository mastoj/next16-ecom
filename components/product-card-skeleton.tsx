interface ProductCardSkeletonProps {
  showCategory?: boolean;
}

export function ProductCardSkeleton({
  showCategory = true,
}: ProductCardSkeletonProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-muted">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="space-y-3">
        <div className="relative h-5 overflow-hidden rounded bg-muted">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="relative h-4 w-3/4 overflow-hidden rounded bg-muted">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="relative h-7 w-24 overflow-hidden rounded bg-muted">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        {showCategory && (
          <div className="relative h-3 w-16 overflow-hidden rounded bg-muted">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}

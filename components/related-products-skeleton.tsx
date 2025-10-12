import { ProductCardSkeleton } from "./product-card-skeleton";

export function RelatedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} showCategory={false} />
      ))}
    </div>
  );
}

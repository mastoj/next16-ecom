import { Suspense } from "react";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Static Hero Section */}
      <section className="mb-12 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-8 py-16 text-center text-primary-foreground">
        <h1 className="mb-4 text-4xl font-bold text-balance">
          Welcome to PPR Store
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-balance">
          Experience the power of Next.js 16 Partial Prerendering. This page
          loads instantly with a static shell while product data streams in
          dynamically.
        </p>
      </section>

      {/* Dynamic Product Grid */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Featured Products
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </section>
    </main>
  );
}

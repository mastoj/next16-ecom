import { Suspense } from "react";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { flagSimulateDelay, precomputedFlags } from "@/lib/flags";
import { generatePermutations } from "flags/next";

export const generateStaticParams = async () => {
  const codes = await generatePermutations(precomputedFlags);
  return codes.slice(0, 1).map((code) => ({ code }));
};

type HomePageProps = {
  params: Promise<{ code: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  "use cache";
  const code = await params.then((p) => p.code);
  const simulateDelay = await flagSimulateDelay(code, precomputedFlags);
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
          <ProductGrid simulateDelay={simulateDelay} />
        </Suspense>
      </section>
    </main>
  );
}

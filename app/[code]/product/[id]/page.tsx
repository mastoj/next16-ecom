import { Suspense } from "react";
import Image from "next/image";
import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import { RelatedProductsSkeleton } from "@/components/related-products-skeleton";
import { getProduct } from "@/lib/product-service";
import { generatePermutations } from "flags/next";
import { flagSimulateDelay, precomputedFlags } from "@/lib/flags";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const codes = await generatePermutations(precomputedFlags);
  return [{ code: codes[0], id: "66666" }];
  //  return codes.slice(0, 1).map((code) => ({ code, id: "1" }));
};

const ProductMainInfo = async (props: { id: Promise<string> }) => {
  "use cache";
  const product = await getProduct(await props.id);
  const timestamp = new Date().toTimeString();

  return (
    <div className="mb-12 grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain p-8"
          priority
        />
      </div>

      <ProductDetails product={product} />
      <p className="mt-4 text-sm text-muted-foreground">
        Fetched at: {timestamp}
      </p>
    </div>
  );
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; code: string }>;
}) {
  const code = await params.then((p) => p.code);
  const id = await params.then((p) => p.id);
  if (id === "66666") {
    notFound();
  }
  const simulateDelay = await flagSimulateDelay(code, precomputedFlags);
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Static Product Details Shell */}
      <ProductMainInfo id={params.then((p) => p.id)} />

      {/* Dynamic Related Products */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Related Products
        </h2>
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts
            id={params.then((p) => p.id)}
            simulateDelay={simulateDelay}
          />
        </Suspense>
      </section>
    </main>
  );
}

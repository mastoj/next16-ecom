import { Suspense } from "react";
import Image from "next/image";
import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import { RelatedProductsSkeleton } from "@/components/related-products-skeleton";
import { getProduct } from "@/lib/product-service";
import { generatePermutations } from "flags/next";
import { flagSimulateDelay, precomputedFlags } from "@/lib/flags";
import { notFound } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";

export const generateStaticParams = async () => {
  return [{ code: "notFound", id: "notfound" }];
  //  return codes.slice(0, 1).map((code) => ({ code, id: "1" }));
};

const ProductMainInfo = async (props: { id: string }) => {
  "use cache";
  const product = await getProduct(props.id);
  const timestamp = new Date().toTimeString();

  cacheTag("product-" + props.id);
  cacheLife("minutes");

  if (!product) {
    notFound();
  }
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
  const { code, id } = await params;
  if (id === "notfound") {
    notFound();
  }
  const simulateDelay = await flagSimulateDelay(code, precomputedFlags);
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Static Product Details Shell */}
      <ProductMainInfo id={id} />

      {/* Dynamic Related Products */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Related Products
        </h2>
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts id={id} simulateDelay={simulateDelay} />
        </Suspense>
      </section>
    </main>
  );
}

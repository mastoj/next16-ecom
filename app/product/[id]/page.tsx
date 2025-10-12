import { Suspense } from "react";
import Image from "next/image";
import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import { RelatedProductsSkeleton } from "@/components/related-products-skeleton";
import { getProduct } from "@/lib/product-service";

export const generateStaticParams = async () => {
  return [{ id: "1" }];
};

const ProductMainInfo = async (props: { id: Promise<string> }) => {
  "use cache";
  const product = await getProduct(await props.id);

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
    </div>
  );
};
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
          <RelatedProducts id={params.then((p) => p.id)} />
        </Suspense>
      </section>
    </main>
  );
}

import { getProduct, getRelatedProducts } from "@/lib/product-service";
import { ProductCard } from "./product-card";

export async function RelatedProducts({
  id,
  simulateDelay,
}: {
  id: Promise<string>;
  simulateDelay: boolean;
}) {
  const product = await getProduct(await id, simulateDelay);
  const products = await getRelatedProducts(
    product.category,
    product.id,
    simulateDelay
  );

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted p-8 text-center">
        <p className="text-muted-foreground">No related products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showCategory={false} />
      ))}
    </div>
  );
}

import { getProducts } from "@/lib/product-service";
import { ProductCard } from "./product-card";

export async function ProductGrid({
  simulateDelay,
}: {
  simulateDelay?: boolean;
}) {
  const products = await getProducts(simulateDelay);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

import { searchProducts } from "@/lib/product-service";
import { ProductCard } from "./product-card";

export async function SearchResults({ query }: { query: Promise<string> }) {
  const products = await searchProducts(await query);

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted p-12 text-center">
        <p className="text-muted-foreground">
          No products found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-muted-foreground">
        Found {products.length} {products.length === 1 ? "product" : "products"}{" "}
        for &quot;{query}&quot;
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

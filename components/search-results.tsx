import { ProductCard, type ProductCardData } from "./product-card";

async function searchProducts(query: string): Promise<ProductCardData[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const products: ProductCardData[] = await res.json();

  // Filter products by title match
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

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

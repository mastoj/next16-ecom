import { ProductCard, type ProductCardData } from "./product-card";

async function getRelatedProducts(
  category: string,
  currentId: number
): Promise<ProductCardData[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch related products");
  const products: ProductCardData[] = await res.json();

  // Filter out current product and limit to 4
  return products.filter((p) => p.id !== currentId).slice(0, 4);
}

export async function RelatedProducts({
  category,
  currentId,
}: {
  category: string;
  currentId: number;
}) {
  const products = await getRelatedProducts(category, currentId);

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

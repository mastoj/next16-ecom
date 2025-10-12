import { ProductCard, type ProductCardData } from "./product-card";

async function getProducts(): Promise<ProductCardData[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch("https://fakestoreapi.com/products?limit=8", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function ProductGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

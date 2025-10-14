import { ProductCardData } from "@/components/product-card";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function getProduct(
  id: string,
  simulateDelay?: boolean
): Promise<Product> {
  if (simulateDelay) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getRelatedProducts(
  category: string,
  currentId: number,
  simulateDelay?: boolean
): Promise<ProductCardData[]> {
  if (simulateDelay) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  if (!res.ok) throw new Error("Failed to fetch related products");
  const products: ProductCardData[] = await res.json();

  // Filter out current product and limit to 4
  return products.filter((p) => p.id !== currentId).slice(0, 4);
}

export async function getProducts(
  simulateDelay?: boolean
): Promise<ProductCardData[]> {
  if (simulateDelay) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function searchProducts(
  query: string,
  simulateDelay?: boolean
): Promise<ProductCardData[]> {
  if (simulateDelay) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const products: ProductCardData[] = await res.json();

  // Filter products by title match
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

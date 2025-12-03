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
): Promise<Product | null> {
  if (simulateDelay) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    console.error("Failed to fetch product", {
      statusText: res.statusText,
      status: res.status,
      url: res.url,
    });
    return null;
  }
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
  if (!res.ok) {
    console.error("Failed to fetch related products", {
      statusText: res.statusText,
      status: res.status,
      url: res.url,
    });
    return [];
  }
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
  if (!res.ok) {
    console.error("Failed to fetch products", {
      statusText: res.statusText,
      status: res.status,
      url: res.url,
    });
    return [];
  }
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
  if (!res.ok) {
    console.error("Failed to search products", {
      statusText: res.statusText,
      status: res.status,
    });
    return [];
  }
  const products: ProductCardData[] = await res.json();

  // Filter products by title match
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

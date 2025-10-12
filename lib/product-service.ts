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

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

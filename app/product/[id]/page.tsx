"use cache";
import { Suspense } from "react";
import Image from "next/image";
import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import { RelatedProductsSkeleton } from "@/components/related-products-skeleton";

export const generateStaticParams = async () => {
  return [{ id: "1" }];
};

interface Product {
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

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Static Product Details Shell */}
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

      {/* Dynamic Related Products */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Related Products
        </h2>
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts category={product.category} currentId={product.id} />
        </Suspense>
      </section>
    </main>
  );
}

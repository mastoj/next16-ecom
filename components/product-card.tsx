import Image from "next/image";
import Link from "next/link";

export interface ProductCardData {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: ProductCardData;
  showCategory?: boolean;
}

export function ProductCard({
  product,
  showCategory = true,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group rounded-lg border border-border bg-background p-4 transition-shadow hover:shadow-lg"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="mb-2 line-clamp-2 text-sm font-medium text-foreground">
        {product.title}
      </h3>
      <p className="text-lg font-bold text-primary">
        ${product.price.toFixed(2)}
      </p>
      {showCategory && product.category && (
        <p className="mt-1 text-xs capitalize text-muted-foreground">
          {product.category}
        </p>
      )}
    </Link>
  );
}

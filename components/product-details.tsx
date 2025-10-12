import { Star } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 inline-block self-start rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground capitalize">
        {product.category}
      </div>

      <h1 className="mb-4 text-3xl font-bold text-foreground text-balance">{product.title}</h1>

      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {product.rating.rate} ({product.rating.count} reviews)
        </span>
      </div>

      <p className="mb-6 text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>

      <p className="mb-8 text-muted-foreground leading-relaxed">{product.description}</p>

      <button className="rounded-lg bg-primary px-8 py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
        Add to Cart
      </button>
    </div>
  )
}

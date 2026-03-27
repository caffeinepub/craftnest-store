import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛍️`);
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col group"
      data-ocid={`products.item.${index}`}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-craftnest-peach text-white text-xs font-sans font-bold px-2.5 py-1 rounded-full">
            ✦ Featured
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="font-serif text-base font-semibold text-craftnest-charcoal leading-snug mb-1">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mb-2">
          {STAR_KEYS.map((key, i) => (
            <Star
              key={key}
              className={`h-3 w-3 ${i < 5 ? "fill-craftnest-peach text-craftnest-peach" : ""}`}
            />
          ))}
          <span className="text-xs text-muted-foreground font-sans ml-1">
            4.9
          </span>
        </div>
        <p className="font-sans text-xs text-muted-foreground line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-craftnest-peach">
            ${product.price.toFixed(2)}
          </span>
          <Button
            className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans text-sm h-9 px-4 rounded-xl"
            onClick={handleAdd}
            data-ocid={`products.primary_button.${index}`}
          >
            <ShoppingCart className="h-4 w-4 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

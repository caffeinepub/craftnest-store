import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();

  const handleCheckout = () => {
    toast.success("Order placed! 🎉 Thank you for supporting handmade crafts.");
    clearCart();
    closeCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent
        className="w-full sm:max-w-md flex flex-col bg-white"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-serif text-xl text-craftnest-charcoal flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-craftnest-peach" />
            Your Cart
            {totalCount > 0 && (
              <span className="text-sm font-sans text-muted-foreground">
                ({totalCount} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="font-serif text-lg text-muted-foreground">
              Your cart is empty
            </p>
            <p className="font-sans text-sm text-muted-foreground">
              Add something handmade to get started.
            </p>
            <Button
              onClick={closeCart}
              className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans"
              data-ocid="cart.primary_button"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 items-start"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-bold text-craftnest-charcoal leading-tight truncate">
                      {item.product.name}
                    </p>
                    <p className="font-sans text-sm text-craftnest-peach font-bold mt-0.5">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        data-ocid="cart.secondary_button"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-sans text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        data-ocid="cart.secondary_button"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive flex-shrink-0"
                    onClick={() => removeFromCart(item.product.id)}
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between items-center font-sans">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-craftnest-charcoal text-lg">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans h-12 text-base"
                onClick={handleCheckout}
                data-ocid="cart.primary_button"
              >
                Checkout — ${totalPrice.toFixed(2)}
              </Button>
              <Button
                variant="ghost"
                className="w-full font-sans text-muted-foreground"
                onClick={closeCart}
                data-ocid="cart.cancel_button"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

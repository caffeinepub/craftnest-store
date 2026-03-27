import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const { totalCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 bg-craftnest-cream/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Wordmark */}
          <Link
            to="/"
            className="font-serif text-2xl font-bold text-craftnest-charcoal tracking-tight"
            data-ocid="nav.link"
          >
            CraftNest
          </Link>

          {/* Center nav (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-sm font-400 transition-colors hover:text-craftnest-peach ${
                  location.pathname === link.to
                    ? "text-craftnest-peach font-700 border-b-2 border-craftnest-peach pb-0.5"
                    : "text-craftnest-charcoal"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-craftnest-charcoal hover:text-craftnest-peach"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/admin" data-ocid="nav.link">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-craftnest-charcoal hover:text-craftnest-peach"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-craftnest-charcoal hover:text-craftnest-peach"
                onClick={openCart}
                aria-label="Cart"
                data-ocid="cart.open_modal_button"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {totalCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-craftnest-peach text-white text-xs rounded-full border-0">
                  {totalCount}
                </Badge>
              )}
            </div>
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-craftnest-charcoal"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-craftnest-cream px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-base py-2 transition-colors hover:text-craftnest-peach ${
                  location.pathname === link.to
                    ? "text-craftnest-peach font-bold"
                    : "text-craftnest-charcoal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="font-sans text-base py-2 text-craftnest-charcoal hover:text-craftnest-peach"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              Admin
            </Link>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}

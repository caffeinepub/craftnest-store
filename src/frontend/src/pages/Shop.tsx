import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function Shop() {
  const { categories, products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchCat =
      selectedCategory === null || p.categoryId === selectedCategory;
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <main
      className="max-w-[1200px] mx-auto px-6 py-12"
      data-ocid="shop.section"
    >
      <div className="mb-10">
        <p className="font-sans text-sm tracking-widest uppercase text-craftnest-peach mb-1">
          Discover
        </p>
        <h1 className="font-serif text-4xl font-bold text-craftnest-charcoal">
          The Shop
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="md:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-card p-5 sticky top-24">
            <p className="font-serif text-base font-semibold text-craftnest-charcoal mb-4">
              Filter by
            </p>

            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-9 font-sans text-sm"
                data-ocid="shop.search_input"
              />
            </div>

            <p className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Category
            </p>
            <div className="space-y-1">
              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                className={`w-full justify-start font-sans text-sm h-9 rounded-xl ${
                  selectedCategory === null
                    ? "bg-craftnest-peach hover:bg-craftnest-peach/90 text-white"
                    : "text-craftnest-charcoal hover:bg-craftnest-blush"
                }`}
                onClick={() => setSelectedCategory(null)}
                data-ocid="shop.tab"
              >
                All Products
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "ghost"}
                  className={`w-full justify-start font-sans text-sm h-9 rounded-xl gap-2 ${
                    selectedCategory === cat.id
                      ? "bg-craftnest-peach hover:bg-craftnest-peach/90 text-white"
                      : "text-craftnest-charcoal hover:bg-craftnest-blush"
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                  data-ocid="shop.tab"
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}{" "}
              found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24" data-ocid="shop.empty_state">
              <p className="font-serif text-xl text-muted-foreground">
                No products found
              </p>
              <p className="font-sans text-sm text-muted-foreground mt-2">
                Try a different category or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} index={i + 1} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

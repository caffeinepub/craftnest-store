import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Heart, RefreshCw, Truck } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";
import { useStore } from "../context/StoreContext";

const CATEGORY_COLORS: Record<string, string> = {
  Jewelry: "bg-craftnest-blush",
  Pottery: "bg-craftnest-beige",
  Paintings: "bg-craftnest-lavender",
  "Home Decor": "bg-craftnest-sage",
};

export default function Home() {
  const { categories, products, reviews } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const approvedReviews = reviews.filter((r) => r.approved).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-crafts.dim_1400x600.jpg"
          alt="Handmade crafts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-craftnest-charcoal/50" />
        <motion.div
          className="relative z-10 text-center px-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-sans text-sm font-300 tracking-widest uppercase text-white/80 mb-4">
            Artisan Crafts Store
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Handmade with Love,
            <br />
            <span className="italic font-normal">Delivered to You</span>
          </h1>
          <p className="font-sans text-lg text-white/85 mb-10 leading-relaxed">
            Discover one-of-a-kind creations from passionate artisans — each
            piece carrying a story, a soul, and a touch of magic.
          </p>
          <Link to="/shop">
            <Button
              className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans text-base px-10 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
              data-ocid="hero.primary_button"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-y border-border py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: <Heart className="h-6 w-6 text-craftnest-peach" />,
                label: "Made with Love",
                sub: "Every piece handcrafted",
              },
              {
                icon: <Truck className="h-6 w-6 text-craftnest-peach" />,
                label: "Free Shipping",
                sub: "On orders over $75",
              },
              {
                icon: <Award className="h-6 w-6 text-craftnest-peach" />,
                label: "Artisan Quality",
                sub: "Curated & certified",
              },
              {
                icon: <RefreshCw className="h-6 w-6 text-craftnest-peach" />,
                label: "Easy Returns",
                sub: "30-day guarantee",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-craftnest-blush flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="font-serif text-sm font-semibold text-craftnest-charcoal">
                  {item.label}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="max-w-[1200px] mx-auto px-6 py-20"
        data-ocid="categories.section"
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-sm tracking-widest uppercase text-craftnest-peach mb-2">
            Browse by
          </p>
          <h2 className="font-serif text-4xl font-bold text-craftnest-charcoal">
            Our Collections
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`categories.item.${i + 1}`}
            >
              <Link
                to="/shop"
                className="group block rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow duration-300"
                data-ocid="categories.link"
              >
                <div
                  className={`${CATEGORY_COLORS[cat.name] ?? "bg-craftnest-beige"} p-0 relative`}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-white px-4 py-3 flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <p className="font-serif text-base font-semibold text-craftnest-charcoal">
                      {cat.name}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20" data-ocid="featured.section">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-sm tracking-widest uppercase text-craftnest-peach mb-2">
              Handpicked
            </p>
            <h2 className="font-serif text-4xl font-bold text-craftnest-charcoal">
              Featured Creations
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <ProductCard product={product} index={i + 1} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button
                variant="outline"
                className="border-craftnest-peach text-craftnest-peach hover:bg-craftnest-peach hover:text-white font-sans px-8 py-5 rounded-full transition-colors"
                data-ocid="featured.primary_button"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section
        className="max-w-[1200px] mx-auto px-6 py-20"
        data-ocid="about.section"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-sm tracking-widest uppercase text-craftnest-peach mb-2">
              Our Story
            </p>
            <h2 className="font-serif text-4xl font-bold text-craftnest-charcoal mb-6">
              Born from a Love of Making
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
              CraftNest began in a sunlit studio apartment with a single
              potter's wheel, a drawer of gemstones, and an unwavering belief
              that handmade objects carry something mass production never can —
              soul.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
              Today we connect hundreds of independent artisans with people who
              appreciate the beauty of things made by hand. Every purchase
              supports a real maker, a real livelihood, and a real story.
            </p>
            <Link to="/about">
              <Button
                className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans rounded-full px-8"
                data-ocid="about.primary_button"
              >
                Read Our Story
              </Button>
            </Link>
          </motion.div>
          <motion.div
            className="rounded-3xl overflow-hidden shadow-card"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/generated/cat-pottery.dim_400x300.jpg"
              alt="Artisan at work"
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section
        className="bg-craftnest-footer py-20"
        data-ocid="reviews.section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-sm tracking-widest uppercase text-craftnest-peach mb-2">
              Happy Customers
            </p>
            <h2 className="font-serif text-4xl font-bold text-craftnest-charcoal">
              What They're Saying
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedReviews.map((review, i) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`reviews.item.${i + 1}`}
              >
                <StarRating rating={review.rating} />
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-3 mb-4 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <p className="font-serif text-sm font-semibold text-craftnest-charcoal">
                  — {review.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="bg-craftnest-charcoal py-20 text-center"
        data-ocid="contact_cta.section"
      >
        <motion.div
          className="max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Have a Question?
          </h2>
          <p className="font-sans text-white/75 text-lg mb-8">
            We'd love to hear from you. Reach out and we'll get back to you
            within one business day.
          </p>
          <Link to="/contact">
            <Button
              className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans text-base px-10 py-6 rounded-full"
              data-ocid="contact_cta.primary_button"
            >
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

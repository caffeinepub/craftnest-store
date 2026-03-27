import { Globe, Heart, Leaf, Users } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <main data-ocid="about.page">
      {/* Hero */}
      <section className="bg-craftnest-footer py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-sm tracking-widest uppercase text-craftnest-peach mb-3">
              Our Story
            </p>
            <h1 className="font-serif text-5xl font-bold text-craftnest-charcoal mb-6">
              Built on the Belief That
              <br />
              <span className="italic font-normal">Handmade is Heartmade</span>
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We believe in the power of craft to connect people — maker to
              buyer, heart to home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl font-bold text-craftnest-charcoal mb-6">
              Where It All Began
            </h2>
            <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                CraftNest was born in 2019 in a small Edinburgh flat where our
                founder, Maya Chen, kept tripping over her pottery wheel, her
                grandmother's loom, and boxes of gemstones she'd collected from
                travels across India, Morocco, and Peru.
              </p>
              <p>
                Frustrated that the beautiful handmade pieces she discovered on
                her journeys had no easy path to buyers who would cherish them,
                she built CraftNest — a curated marketplace where independent
                artisans could share their work with the world without losing
                the personal touch that makes handmade special.
              </p>
              <p>
                Five years on, CraftNest works with over 200 artisans across 18
                countries. Each seller is personally vetted — we visit studios,
                meet the makers, and ensure every piece meets our quality
                standards and fair-trade principles.
              </p>
              <p>
                When you shop at CraftNest, you're not just buying a beautiful
                object. You're investing in a maker's livelihood, a traditional
                craft, and the irreplaceable warmth of something made by human
                hands.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/generated/cat-jewelry.dim_400x300.jpg"
              alt="Jewelry artisan"
              className="rounded-2xl object-cover h-52 w-full"
            />
            <img
              src="/assets/generated/cat-pottery.dim_400x300.jpg"
              alt="Pottery artisan"
              className="rounded-2xl object-cover h-52 w-full mt-8"
            />
            <img
              src="/assets/generated/cat-paintings.dim_400x300.jpg"
              alt="Painting artisan"
              className="rounded-2xl object-cover h-52 w-full"
            />
            <img
              src="/assets/generated/cat-homedecor.dim_400x300.jpg"
              alt="Home decor artisan"
              className="rounded-2xl object-cover h-52 w-full mt-8"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-craftnest-charcoal">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-7 w-7 text-craftnest-peach" />,
                title: "Crafted with Care",
                desc: "Every piece on CraftNest is made by hand, by real people who love what they do.",
                bg: "bg-craftnest-blush",
              },
              {
                icon: <Users className="h-7 w-7 text-craftnest-peach" />,
                title: "Supporting Artisans",
                desc: "We pay fair prices and give makers the visibility and respect they deserve.",
                bg: "bg-craftnest-beige",
              },
              {
                icon: <Globe className="h-7 w-7 text-craftnest-peach" />,
                title: "Global Stories",
                desc: "Our artisans span 18 countries — each piece carries a piece of its culture.",
                bg: "bg-craftnest-lavender",
              },
              {
                icon: <Leaf className="h-7 w-7 text-craftnest-peach" />,
                title: "Sustainable Choices",
                desc: "Handmade naturally uses less energy. We offset all our shipping emissions too.",
                bg: "bg-craftnest-sage",
              },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`${val.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  {val.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-craftnest-charcoal mb-2">
                  {val.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

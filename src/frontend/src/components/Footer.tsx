import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiPinterest } from "react-icons/si";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're subscribed! 🌸 Welcome to the CraftNest family.");
    setEmail("");
  };

  return (
    <footer className="bg-craftnest-footer border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo + tagline */}
          <div>
            <p className="font-serif text-2xl font-bold text-craftnest-charcoal mb-2">
              CraftNest
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Handmade with love by artisans around the world. Every piece tells
              a story.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-craftnest-peach transition-colors"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-craftnest-peach transition-colors"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="text-muted-foreground hover:text-craftnest-peach transition-colors"
              >
                <SiPinterest className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-serif text-lg font-semibold text-craftnest-charcoal mb-3">
              Stay Inspired
            </p>
            <p className="font-sans text-sm text-muted-foreground mb-4">
              Get new arrivals and craft stories in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-border"
                data-ocid="newsletter.input"
              />
              <Button
                type="submit"
                className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans"
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-serif text-lg font-semibold text-craftnest-charcoal mb-3">
              Quick Links
            </p>
            <ul className="space-y-2 font-sans text-sm">
              {[
                { label: "Shop All", to: "/shop" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Admin Panel", to: "/admin" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-craftnest-peach transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground font-sans">
          <p>© {year} CraftNest. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-craftnest-peach transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

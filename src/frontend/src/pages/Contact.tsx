import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiPinterest } from "react-icons/si";
import { toast } from "sonner";
import { useStore } from "../context/StoreContext";

export default function Contact() {
  const { submitContactMessage } = useStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    submitContactMessage(form.name, form.email, form.message);
    toast.success(
      "Message sent! We'll get back to you within one business day. 💌",
    );
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <main data-ocid="contact.page">
      <section className="bg-craftnest-footer py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="font-sans text-sm tracking-widest uppercase text-craftnest-peach mb-2">
            Say Hello
          </p>
          <h1 className="font-serif text-5xl font-bold text-craftnest-charcoal">
            Get in Touch
          </h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl font-bold text-craftnest-charcoal mb-8">
              Send us a Message
            </h2>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
              data-ocid="contact.dialog"
            >
              <div>
                <Label
                  htmlFor="contact-name"
                  className="font-sans text-sm font-bold text-craftnest-charcoal mb-1.5 block"
                >
                  Name
                </Label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="bg-white"
                  data-ocid="contact.input"
                />
                {errors.name && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="contact.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="contact-email"
                  className="font-sans text-sm font-bold text-craftnest-charcoal mb-1.5 block"
                >
                  Email
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className="bg-white"
                  data-ocid="contact.input"
                />
                {errors.email && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="contact.error_state"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="contact-message"
                  className="font-sans text-sm font-bold text-craftnest-charcoal mb-1.5 block"
                >
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="How can we help?"
                  rows={5}
                  className="bg-white resize-none"
                  data-ocid="contact.textarea"
                />
                {errors.message && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="contact.error_state"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans h-12 text-base rounded-xl"
                data-ocid="contact.submit_button"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-2xl font-bold text-craftnest-charcoal mb-8">
                Contact Info
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Mail className="h-5 w-5 text-craftnest-peach" />,
                    label: "Email",
                    value: "hello@craftnest.shop",
                  },
                  {
                    icon: <MapPin className="h-5 w-5 text-craftnest-peach" />,
                    label: "Studio",
                    value: "12 Artisan Lane, Edinburgh, EH1 2AB",
                  },
                  {
                    icon: <Clock className="h-5 w-5 text-craftnest-peach" />,
                    label: "Hours",
                    value: "Mon – Fri, 9am – 6pm GMT",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-craftnest-blush flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="font-sans text-sm font-bold text-craftnest-charcoal">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-serif text-lg font-semibold text-craftnest-charcoal mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                {[
                  {
                    icon: <SiInstagram className="h-5 w-5" />,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  {
                    icon: <SiFacebook className="h-5 w-5" />,
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    icon: <SiPinterest className="h-5 w-5" />,
                    label: "Pinterest",
                    href: "https://pinterest.com",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl bg-craftnest-blush flex items-center justify-center text-craftnest-charcoal hover:bg-craftnest-peach hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

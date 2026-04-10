import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { ContactForm } from "./form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE.name} in ${SITE.address.city}, ${SITE.address.state}. Call ${SITE.phone} or send us a message.`,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Contact", url: `${SITE.url}/contact` },
        ])}
      />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Contact Us
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Have questions about our puppies or want to schedule a visit? We
            would love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl font-bold text-cream mb-4">
                  Business Info
                </h3>
                <ul className="space-y-4 text-sm text-muted">
                  <li>
                    <span className="text-gold font-bold block mb-1">Phone</span>
                    <a
                      href={`tel:${SITE.phone}`}
                      className="hover:text-cream transition-colors"
                    >
                      {SITE.phone}
                    </a>
                  </li>
                  <li>
                    <span className="text-gold font-bold block mb-1">Email</span>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="hover:text-cream transition-colors break-all"
                    >
                      {SITE.email}
                    </a>
                  </li>
                  <li>
                    <span className="text-gold font-bold block mb-1">
                      Address
                    </span>
                    <span>
                      {SITE.address.street}
                      <br />
                      {SITE.address.city}, {SITE.address.state}{" "}
                      {SITE.address.zip}
                    </span>
                  </li>
                  <li>
                    <span className="text-gold font-bold block mb-1">Hours</span>
                    <span>{SITE.hours}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

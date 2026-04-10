import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Stud Service",
  description: `Champion European English Cream Golden Retriever stud service from ${SITE.name}. OFA health tested, proven pedigree, exceptional temperament.`,
};

const studSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "English Cream Golden Retriever Stud Service",
  description:
    "Champion European English Cream Golden Retriever stud service. OFA health tested hips, elbows, eyes, and full genetic panel. Proven pedigree with international bloodlines.",
  brand: { "@type": "Brand", name: SITE.name },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: SITE.name },
  },
};

export default function StudServicePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Stud Service", url: `${SITE.url}/stud-service` },
        ])}
      />
      <JsonLd data={studSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Stud Service
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Champion European Stud
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Our stud carries champion European bloodlines with verified health
            clearances and an exceptional temperament.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 mb-10">
            <h2 className="font-serif text-3xl font-bold text-cream mb-6">
              Meet Sammy
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Sammy is our champion-sired European English Cream Golden
                Retriever stud. He was imported from top European lines known
                for lighter coats, blocky heads, and calm, confident
                dispositions.
              </p>
              <p>
                His pedigree includes international champions with proven
                structure and temperament. Sammy passes these traits to every
                litter -- producing puppies with beautiful coats, solid builds,
                and gentle personalities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-cream mb-4">
                Health Clearances
              </h3>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">OFA Hips</span>
                  <span>-- Tested and cleared</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">OFA Elbows</span>
                  <span>-- Tested and cleared</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">CAER Eyes</span>
                  <span>-- Annual exam, cleared</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">Genetic Panel</span>
                  <span>-- Full panel, clear on all tests</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-cream mb-4">
                Temperament
              </h3>
              <ul className="space-y-3 text-sm text-muted">
                <li>Calm and confident in all environments</li>
                <li>Excellent with children and other dogs</li>
                <li>Eager to please with a gentle disposition</li>
                <li>Intelligent and easy to train</li>
                <li>Proven producer of exceptional puppies</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 mb-10">
            <h3 className="font-serif text-xl font-bold text-cream mb-4">
              Pedigree Highlights
            </h3>
            <div className="text-muted text-sm leading-relaxed space-y-3">
              <p>
                Sammy's pedigree traces back to top-producing European lines
                with multiple international champions. His bloodline is known
                for structural excellence, longevity, and the classic English
                Cream coloring that defines the breed.
              </p>
              <p>
                We are happy to share his full pedigree and health documentation
                with serious inquiries. Contact us for complete details.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-cream mb-4">
              Interested in Stud Service?
            </h3>
            <p className="text-muted mb-6 max-w-lg mx-auto">
              Contact us to discuss stud service availability, requirements, and
              pricing. We require health testing documentation from the dam
              before any breeding.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold text-navy px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

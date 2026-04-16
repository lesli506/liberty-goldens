import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { getLocationsByState } from "@/lib/locations";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "English Cream Golden Retriever Puppies Near You",
  description: `${SITE.name} delivers OFA health-tested English Cream Golden Retriever puppies across the United States. Located in Knox, Indiana with flight nanny delivery nationwide.`,
};

export default function LocationsIndexPage() {
  const byState = getLocationsByState();
  const states = Object.keys(byState).sort();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Locations", url: `${SITE.url}/english-cream-golden-retriever-puppies-in` },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knox, Indiana &middot; Nationwide Delivery
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            English Cream Golden Retriever Puppies Near You
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {SITE.name} is located in Knox, Indiana. We welcome families to
            visit in person and offer flight nanny delivery to anywhere in the
            United States. Find your city below.
          </p>
        </div>
      </section>

      {/* Locations by state */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {states.map((state) => (
              <div key={state}>
                <h2 className="font-serif text-xl font-bold text-cream mb-4 border-b border-border pb-2">
                  {state}
                </h2>
                <ul className="space-y-2">
                  {byState[state].map((loc) => (
                    <li key={loc.slug}>
                      <Link
                        href={`/english-cream-golden-retriever-puppies-in/${loc.stateSlug}/${loc.slug}`}
                        className="text-muted hover:text-gold transition-colors text-sm"
                      >
                        English Cream Golden Retriever Puppies in {loc.city}, {loc.stateAbbr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-light py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-cream mb-4">
            Do Not See Your City?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            We deliver puppies anywhere in the United States via flight nanny.
            No matter where you live, we can get a Liberty puppy to you safely.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/puppies/apply"
              className="bg-gold text-warm-white px-8 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Apply for a Puppy
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gold text-gold px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold hover:text-warm-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

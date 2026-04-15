import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { getDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Available Puppies",
  description: `English Cream Golden Retriever puppies available from ${SITE.name} in Knox, Indiana. ${SITE.priceRange} with health guarantee and lifetime support.`,
};

interface Puppy {
  id: number;
  name: string;
  sex: string;
  color: string;
  status: string;
  photo_filename: string | null;
}

const statusColors: Record<string, string> = {
  available: "bg-green-600",
  reserved: "bg-yellow-600",
  sold: "bg-gray-600",
  keeping: "bg-blue-600",
};

export default function PuppiesPage() {
  const db = getDb();
  const c = getPageContent("puppies");
  const puppies = db
    .prepare("SELECT * FROM puppies ORDER BY sort_order ASC, id ASC")
    .all() as Puppy[];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "English Cream Golden Retriever Puppy",
    description: SITE.description,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: "3000",
      priceCurrency: "USD",
      availability: puppies.some((p) => p.status === "available")
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: SITE.name },
    },
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Puppies", url: `${SITE.url}/puppies` },
        ])}
      />
      <JsonLd data={productSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            {c.hero_eyebrow || "Our Puppies"}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            {c.hero_heading || "Available Puppies"}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {c.hero_description || `Our puppies are ${SITE.priceRange} and come with OFA health-tested parents, vaccinations, microchip, health guarantee, and lifetime breeder support.`}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {puppies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {puppies.map((puppy) => (
                <div
                  key={puppy.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  {puppy.photo_filename ? (
                    <img
                      src={`/photos/${puppy.photo_filename}`}
                      alt={puppy.name || "Puppy"}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-navy-light flex items-center justify-center">
                      <span className="text-muted text-4xl">&#128054;</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-xl font-bold text-cream">
                        {puppy.name || "Unnamed Puppy"}
                      </h3>
                      <span
                        className={`${
                          statusColors[puppy.status] || "bg-gray-600"
                        } text-white text-xs font-bold px-3 py-1 rounded-full capitalize`}
                      >
                        {puppy.status}
                      </span>
                    </div>
                    <p className="text-muted text-sm">
                      {puppy.sex ? `${puppy.sex.charAt(0).toUpperCase()}${puppy.sex.slice(1)}` : ""}{" "}
                      {puppy.color ? `-- ${puppy.color}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <h2 className="font-serif text-2xl font-bold text-cream mb-4">
                No Puppies Listed Right Now
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Our puppies often sell before they are born. Join our waiting
                list to be first in line for upcoming litters.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/puppies/apply"
              className="inline-block bg-gold text-warm-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold/90 transition-colors"
            >
              Apply for a Puppy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

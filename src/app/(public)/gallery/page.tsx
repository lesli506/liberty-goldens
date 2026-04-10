import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { GalleryGrid } from "./grid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: `Browse photos of our English Cream Golden Retriever puppies and parents at ${SITE.name}.`,
};

interface Photo {
  id: number;
  filename: string;
  alt_text: string;
  category: string;
}

export default function GalleryPage() {
  const db = getDb();
  const photos = db
    .prepare("SELECT * FROM photos WHERE show_on_gallery = 1 ORDER BY sort_order ASC, id ASC")
    .all() as Photo[];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Gallery", url: `${SITE.url}/gallery` },
        ])}
      />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Photo Gallery
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Our Gallery
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A look at our beautiful English Cream Golden Retrievers.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {photos.length > 0 ? (
            <GalleryGrid
              photos={photos.map((p) => ({
                id: p.id,
                src: `/photos/${p.filename}`,
                alt: p.alt_text || "Liberty Goldens photo",
              }))}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted text-lg">
                Photos coming soon. Check back or follow us on social media.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

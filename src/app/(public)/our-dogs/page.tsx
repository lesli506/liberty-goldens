import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Dogs",
  description: `Meet the OFA health-tested parents behind ${SITE.name} puppies. Champion European bloodlines with verified health clearances.`,
};

interface Dog {
  id: number;
  name: string;
  registered_name: string | null;
  role: string;
  bio: string | null;
  photo_filename: string | null;
  ofa_hips: string | null;
  ofa_elbows: string | null;
  caer_eyes: string | null;
  genetic_panel: string | null;
  titles: string | null;
}

export default function OurDogsPage() {
  const db = getDb();
  const dogs = db
    .prepare("SELECT * FROM dogs WHERE is_active = 1 ORDER BY sort_order ASC, id ASC")
    .all() as Dog[];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Our Dogs", url: `${SITE.url}/our-dogs` },
        ])}
      />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Meet the Parents
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Our Dogs
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Every dog in our program is OFA health tested with champion
            European bloodlines. Health and temperament come first.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {dogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dogs.map((dog) => (
                <div
                  key={dog.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  {dog.photo_filename ? (
                    <img
                      src={`/photos/${dog.photo_filename}`}
                      alt={dog.name}
                      className="w-full h-72 object-cover"
                    />
                  ) : (
                    <div className="w-full h-72 bg-navy-light flex items-center justify-center">
                      <span className="text-muted text-5xl">&#128054;</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-serif text-2xl font-bold text-cream">
                        {dog.name}
                      </h3>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          dog.role === "stud"
                            ? "bg-blue-600 text-white"
                            : "bg-pink-600 text-white"
                        }`}
                      >
                        {dog.role === "stud" ? "Stud" : "Dam"}
                      </span>
                    </div>
                    {dog.registered_name && (
                      <p className="text-muted text-sm mb-2 italic">
                        {dog.registered_name}
                      </p>
                    )}
                    {dog.titles && (
                      <p className="text-gold text-sm font-bold mb-3">
                        {dog.titles}
                      </p>
                    )}
                    {dog.bio && (
                      <p className="text-muted text-sm leading-relaxed mb-4">
                        {dog.bio}
                      </p>
                    )}
                    <div className="border-t border-border pt-4">
                      <h4 className="text-cream font-bold text-sm mb-2">
                        Health Clearances
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted">
                        {dog.ofa_hips && (
                          <div>
                            <span className="text-gold">Hips:</span>{" "}
                            {dog.ofa_hips}
                          </div>
                        )}
                        {dog.ofa_elbows && (
                          <div>
                            <span className="text-gold">Elbows:</span>{" "}
                            {dog.ofa_elbows}
                          </div>
                        )}
                        {dog.caer_eyes && (
                          <div>
                            <span className="text-gold">Eyes (CAER):</span>{" "}
                            {dog.caer_eyes}
                          </div>
                        )}
                        {dog.genetic_panel && (
                          <div>
                            <span className="text-gold">Genetics:</span>{" "}
                            {dog.genetic_panel}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted text-lg">
                Our dog profiles are being updated. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

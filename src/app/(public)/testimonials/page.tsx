import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Read what families say about their ${SITE.name} puppies. Real reviews from real puppy owners.`,
};

const testimonials = [
  {
    name: "Sarah M.",
    location: "Chicago, IL",
    quote:
      "Our Liberty Goldens puppy is the sweetest, most well-adjusted dog we have ever had. You can tell so much love goes into raising these puppies. Ruth was incredible through the whole process and still checks in on us.",
  },
  {
    name: "James & Kelly T.",
    location: "Dallas, TX",
    quote:
      "We used the flight nanny service and it was seamless. Our puppy arrived calm and happy. The health testing and transparency from Ruth gave us complete confidence in our decision.",
  },
  {
    name: "Donna R.",
    location: "Nashville, TN",
    quote:
      "This is our second puppy from Liberty Goldens and we will never go anywhere else. The temperament, the coat, the health -- everything is top notch. Ruth is the real deal.",
  },
  {
    name: "Mike & Lisa P.",
    location: "Indianapolis, IN",
    quote:
      "We visited Ruth's home and saw firsthand how the puppies are raised. They are truly part of the family. Our golden is now 2 years old and still the best decision we ever made.",
  },
  {
    name: "Amanda W.",
    location: "Denver, CO",
    quote:
      "Ruth answered every single question I had, no matter how small. She genuinely cares about where her puppies go. Our boy is healthy, beautiful, and has the most amazing personality.",
  },
  {
    name: "Chris & Lauren B.",
    location: "Atlanta, GA",
    quote:
      "The early neurological stimulation really makes a difference. Our puppy came home confident, curious, and ready to learn. We could not be happier with our experience.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Testimonials", url: `${SITE.url}/testimonials` },
        ])}
      />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            What Families Say
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Testimonials
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Hear from the families who have welcomed a Liberty Goldens puppy
            into their home.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="text-gold text-3xl mb-4">&ldquo;</div>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div>
                  <p className="text-cream font-bold text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

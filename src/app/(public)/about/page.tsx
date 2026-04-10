import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About Us",
  description: `Meet ${SITE.owner}, breeder and owner of ${SITE.name}. Champion European bloodlines, OFA health tested, home-raised puppies in Knox, Indiana.`,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.owner,
  jobTitle: "Breeder & Owner",
  url: `${SITE.url}/about`,
  worksFor: {
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    addressCountry: SITE.address.country,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "About", url: `${SITE.url}/about` },
        ])}
      />
      <JsonLd data={personSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            About {SITE.name}
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            A small, family breeding program dedicated to producing healthy,
            well-tempered English Cream Golden Retrievers with champion European
            bloodlines.
          </p>
        </div>
      </section>

      {/* Ruth's Story */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-cream mb-6">
            Meet {SITE.owner}
          </h2>
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              My name is {SITE.owner}, and I am the heart behind {SITE.name}.
              What started as a deep love for Golden Retrievers grew into a
              mission -- to breed the healthiest, most beautiful English Cream
              Goldens with rock-solid temperaments and champion pedigrees.
            </p>
            <p>
              I raise every litter in my home in {SITE.address.city},{" "}
              {SITE.address.state}. There are no kennels here. From the moment
              puppies are born, they are surrounded by family, handled daily, and
              given the foundation they need to thrive in their forever homes.
            </p>
            <p>
              This is not a large-scale operation. It is a carefully managed
              breeding program where every decision -- from selecting breeding
              pairs to early neurological stimulation -- is made with intention
              and love.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-navy-light py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-cream mb-10 text-center">
            Our Breeding Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Home Raised, Never Kenneled",
                text: "Every puppy lives in our home from day one. They sleep in the house, play in the yard, and are socialized with people, sounds, and textures from birth. When they go to their new families, they are already confident and well-adjusted.",
              },
              {
                title: "Champion European Stud",
                text: "Our stud carries champion European bloodlines with exceptional structure, coat quality, and temperament. We are intentional about every breeding pairing to produce puppies that meet the highest breed standard.",
              },
              {
                title: "OFA Health Testing",
                text: "Every breeding dog is tested for hips, elbows, eyes (CAER), and a full genetic panel. We believe health testing is non-negotiable. You deserve to know your puppy comes from parents with verified health clearances.",
              },
              {
                title: "International Bloodlines",
                text: "Our breeding program draws from top European lines known for their lighter coats, blocky heads, and calm dispositions. These international bloodlines bring genetic diversity and structural excellence.",
              },
              {
                title: "Early Neurological Stimulation",
                text: "Starting at just 3 days old, we follow the Bio Sensor program (also known as Super Dog) to gently stimulate each puppy's neurological system. This produces dogs with stronger immune systems, better stress tolerance, and greater confidence.",
              },
              {
                title: "Lifetime Breeder Support",
                text: "When you get a puppy from us, you get a lifelong relationship. We are always here to answer questions, offer guidance, and celebrate milestones with you. Our commitment does not end when the puppy goes home.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <h3 className="font-serif text-xl font-bold text-cream mb-3">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flight Nanny */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-cream mb-4">
            Flight Nanny Available Worldwide
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Can not visit in person? No problem. We work with trusted flight
            nannies who hand-deliver your puppy to you -- anywhere in the
            country or around the world. Your puppy travels safely in-cabin with
            a dedicated handler the entire way.
          </p>
          <Link
            href="/puppies/apply"
            className="inline-block bg-gold text-navy px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold/90 transition-colors"
          >
            Apply for a Puppy
          </Link>
        </div>
      </section>
    </>
  );
}

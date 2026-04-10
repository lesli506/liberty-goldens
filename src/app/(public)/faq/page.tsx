import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { FaqAccordion } from "./accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Common questions about ${SITE.name} puppies -- pricing, deposits, health guarantee, shipping, and more.`,
};

const faqs = [
  {
    q: "How much do your puppies cost?",
    a: `Our English Cream Golden Retriever puppies are ${SITE.priceRange}. This includes OFA health-tested parents, early neurological stimulation, age-appropriate vaccinations, deworming, a microchip, a puppy care package, and lifetime breeder support.`,
  },
  {
    q: "How does the deposit and waitlist work?",
    a: `We require a ${SITE.deposit} non-refundable deposit to hold your spot on our waiting list. Once a litter is born, we match puppies to families based on waitlist order and preferences. The deposit is applied toward the total price.`,
  },
  {
    q: "What is included with each puppy?",
    a: "Every puppy goes home with age-appropriate vaccinations, deworming, a microchip, a health certificate from our vet, a puppy care package with food and comfort items, and a written health guarantee. You also get lifetime breeder support from us.",
  },
  {
    q: "Do you offer a health guarantee?",
    a: "Yes. We provide a written health guarantee that covers genetic health conditions. All of our breeding dogs are OFA tested for hips, elbows, eyes (CAER), and have a full genetic panel. We stand behind the health of every puppy we produce.",
  },
  {
    q: "Can you ship puppies? What is a flight nanny?",
    a: "Yes. We offer flight nanny service for families who cannot pick up in person. A flight nanny is a trusted handler who flies with your puppy in-cabin and hand-delivers them to you at your nearest airport. This service is available nationwide and internationally.",
  },
  {
    q: "What is your spay/neuter policy?",
    a: "All pet puppies are sold on a spay/neuter agreement. We require that pet puppies be spayed or neutered at the appropriate age recommended by your veterinarian. Breeding rights are not included in the standard puppy price and are evaluated on a case-by-case basis.",
  },
  {
    q: "Can we visit and meet the puppies in person?",
    a: `Absolutely. We welcome visits to our home in ${SITE.address.city}, ${SITE.address.state} by appointment. Meeting the parents and seeing how our puppies are raised is the best way to feel confident in your decision. Contact us to schedule a visit.`,
  },
  {
    q: "How long do puppies stay with you before going home?",
    a: "Puppies go home at 8 weeks of age. This gives them the critical time they need with their mother and littermates for proper socialization and development. We do not release puppies earlier than 8 weeks under any circumstances.",
  },
  {
    q: "What colors are available?",
    a: "Our puppies are English Cream Golden Retrievers, so they range from light cream to a rich golden cream. The lighter coloring is a hallmark of European-line Golden Retrievers. Every puppy is beautiful -- color shade can vary slightly within a litter.",
  },
  {
    q: "How do you socialize the puppies?",
    a: "Socialization starts on day one. We follow the Bio Sensor early neurological stimulation program starting at 3 days old. Puppies are exposed to household sounds, different surfaces, handling by adults and children, and outdoor experiences. They also begin basic potty training before going home.",
  },
  {
    q: "How do I apply for a puppy?",
    a: "Fill out our puppy application online. We review every application personally and reach out to discuss next steps. Once approved, you can place your deposit to join our waitlist for an upcoming litter.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "FAQ", url: `${SITE.url}/faq` },
        ])}
      />
      <JsonLd data={faqSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about our puppies, pricing, process, and
            what to expect.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}

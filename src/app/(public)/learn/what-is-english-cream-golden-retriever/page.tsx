import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What Is an English Cream Golden Retriever?",
  description:
    "Learn what an English Cream Golden Retriever is -- origins, coat color genetics, temperament, health profile, and how to find a reputable breeder.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is an English Cream Golden Retriever?",
  author: { "@type": "Person", name: SITE.owner },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  description:
    "Everything you need to know about English Cream Golden Retrievers -- origins, genetics, temperament, and how to identify a reputable breeder.",
  mainEntityOfPage: `${SITE.url}/learn/what-is-english-cream-golden-retriever`,
};

export default function WhatIsEnglishCreamPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Learn", url: `${SITE.url}/learn` },
          { name: "What Is an English Cream Golden Retriever?", url: `${SITE.url}/learn/what-is-english-cream-golden-retriever` },
        ])}
      />
      <JsonLd data={articleSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knowledgebase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            What Is an English Cream Golden Retriever?
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            The breed, the name, the genetics, and what separates a true
            English Cream from the rest.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Origins */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Origins and History
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The Golden Retriever breed traces back to the Scottish Highlands
                in the mid-1800s. Lord Tweedmouth developed them by crossing a
                Yellow Retriever with the now-extinct Tweed Water Spaniel,
                producing dogs built for retrieving game in rugged terrain and
                cold water.
              </p>
              <p>
                As the breed spread across Europe, breeders in England and
                Scandinavia prioritized lighter coat colors, stockier builds,
                and calmer temperaments. These European-line Golden Retrievers
                are what most people today call "English Cream" Golden
                Retrievers.
              </p>
              <p>
                Meanwhile, American breeders selected for darker gold coats,
                leaner frames, and higher energy levels. Both lines are the
                same breed -- Canis lupus familiaris, Golden Retriever -- but
                decades of selective breeding on two continents produced
                noticeable differences in appearance and temperament.
              </p>
            </div>
          </section>

          {/* The Name */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Why "English Cream"?
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                "English Cream" is not an official breed name. It is a
                descriptive label for Golden Retrievers bred from European
                bloodlines with lighter cream-colored coats. You will also
                hear "European Golden," "White Golden," "British Cream," and
                "Platinum Golden" -- all the same thing.
              </p>
              <p>
                The name signals lineage. When a breeder says "English Cream,"
                they are telling you their dogs come from European lines with
                lighter coats, blockier heads, and more extensive health
                testing traditions.
              </p>
            </div>
          </section>

          {/* Common Misconceptions */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Common Misconceptions
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The biggest misconception is that English Cream Goldens are a
                separate breed. They are not. The color variation comes from
                selective breeding within the same breed standard -- just a
                different continent's interpretation.
              </p>
              <p>
                Another misconception is that lighter color automatically means
                healthier. European-line Goldens do have lower cancer rates
                (~38% vs ~60% in American lines), but color alone does not
                guarantee health. What matters is{" "}
                <Link href="/learn/health-testing-explained" className="text-gold hover:underline">
                  comprehensive health testing
                </Link>{" "}
                of both parents.
              </p>
              <p>
                English Cream Goldens are not rare in Europe -- the lighter
                coat is the standard there. They are less common in the US
                because the AKC historically favored darker gold, but
                availability has grown as more breeders import European lines.
              </p>
            </div>
          </section>

          {/* Coat Color Genetics */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Coat Color Genetics
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                All Golden Retrievers carry the "e/e" genotype at the MC1R
                Extension locus, which produces the yellow-to-red pigment
                range. The shade -- from pale cream to deep red-gold -- is
                controlled by polygenic modifiers. European lines have been
                selectively bred for lighter expression, while American lines
                lean toward richer gold and red tones.
              </p>
              <p>
                There is no "cream gene" or "white gene." The entire color
                spectrum is a continuum within one breed. A litter from two
                cream parents will typically produce cream puppies, but shade
                variation within a litter is completely normal.
              </p>
            </div>
          </section>

          {/* AKC vs UK Kennel Club */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              AKC vs UK Kennel Club Standards
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The AKC standard calls for "rich, lustrous golden of various
                shades" and notes that "extremely pale" shades are undesirable
                in the show ring. The UK Kennel Club accepts "any shade of
                gold or cream, neither red nor mahogany" -- a broader range
                that celebrates lighter coats.
              </p>
              <p>
                Despite the AKC's color preference, English Cream Goldens are
                fully AKC registrable as "Golden Retrievers." There is no
                separate category -- it is all one breed.
              </p>
            </div>
          </section>

          {/* Temperament */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Temperament and Personality
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                English Cream Golden Retrievers are known for being calm,
                gentle, and eager to please. They tend to be slightly more
                laid-back than their American counterparts, though individual
                temperament always varies.
              </p>
              <p>
                They are excellent family dogs -- patient with children,
                friendly with strangers, and generally good with other animals.
                Their gentle nature makes them popular choices for therapy and
                service dog work.
              </p>
              <p>
                Intelligence is a hallmark of the breed. Golden Retrievers
                consistently rank in the top 5 most trainable dog breeds.
                English Cream lines tend to pair that intelligence with a
                slightly softer energy, making them highly responsive to
                positive reinforcement training.
              </p>
              <p>
                At Liberty, our puppies benefit from{" "}
                <Link href="/learn/puppy-development-stages" className="text-gold hover:underline">
                  early neurological stimulation and daily handling
                </Link>{" "}
                from birth, which builds confident, well-adjusted temperaments
                before they ever leave our home.
              </p>
            </div>
          </section>

          {/* Health */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Health Profile and Lifespan
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Golden Retrievers typically live 10 to 12 years. English Cream
                lines from well-tested European stock tend to land on the
                longer end of that range, though lifespan is influenced by
                genetics, diet, exercise, and veterinary care.
              </p>
              <p>
                The most significant health concern for Golden Retrievers is
                cancer. A landmark study by the Golden Retriever Lifetime Study
                found cancer rates as high as 60% in American-line Goldens. A
                comparable European study showed rates closer to 38% in
                European-line dogs. This difference is one reason many families
                seek out European bloodlines.
              </p>
              <p>
                Other conditions to watch for include hip dysplasia, elbow
                dysplasia, progressive retinal atrophy (PRA), and certain
                cardiac conditions. Responsible breeders screen for all of
                these through{" "}
                <Link href="/learn/health-testing-explained" className="text-gold hover:underline">
                  OFA and genetic panel testing
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Identifying a Reputable Breeder */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              How to Identify a Reputable English Cream Breeder
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Look for OFA health clearances on both parents (hips, elbows,
                eyes, genetic panel). A breeder who cannot show you OFA
                numbers is a breeder to avoid. Also look for home-raised
                puppies, not kennel-raised -- early household exposure is
                critical for temperament.
              </p>
              <p>
                Certifications like{" "}
                <a href={SITE.social.gooddog} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Good Dog
                </a>{" "}
                verify that a breeder meets rigorous standards for health
                testing, socialization, and responsible breeding. At Liberty,
                we are Good Dog Certified.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  Are English Cream Golden Retrievers rare?
                </h3>
                <p className="text-muted leading-relaxed">
                  No. They are the standard in Europe. In the United States,
                  they are less common than American-line Goldens but are
                  widely available from reputable breeders who import or breed
                  from European bloodlines.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  Are they healthier than American Golden Retrievers?
                </h3>
                <p className="text-muted leading-relaxed">
                  Studies show European-line Goldens have lower cancer rates
                  than American lines. However, color alone does not determine
                  health. What makes the difference is comprehensive health
                  testing of breeding dogs. Always ask to see OFA results.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  Are English Cream Golden Retrievers AKC registered?
                </h3>
                <p className="text-muted leading-relaxed">
                  Yes. They are registered with the AKC as Golden Retrievers.
                  There is no separate AKC registration for "English Cream" --
                  it is all one breed. Our dogs at Liberty are AKC registered.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  Do they shed a lot?
                </h3>
                <p className="text-muted leading-relaxed">
                  Yes. They have a thick double coat that sheds year-round
                  with heavier seasonal blowouts. Brush 2-3 times per week.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  How much do they cost?
                </h3>
                <p className="text-muted leading-relaxed">
                  Expect $2,000 to $4,000 from a reputable breeder. At
                  Liberty, our puppies are {SITE.priceRange} with a{" "}
                  {SITE.deposit} deposit.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border border-gold/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Our English Cream Golden Retriever puppies are raised in our home
              with love, health testing, and early neurological stimulation.
              Start your journey today.
            </p>
            <Link
              href="/puppies/apply"
              className="inline-block bg-gold text-navy px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold/90 transition-colors"
            >
              Apply for a Puppy
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}

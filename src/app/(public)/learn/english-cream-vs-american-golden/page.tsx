import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "English Cream vs American Golden Retriever: What's the Difference?",
  description:
    "Side-by-side comparison of English Cream and American Golden Retrievers -- build, coat, temperament, health, cancer rates, and which is right for your family.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "English Cream vs American Golden Retriever: What's the Difference?",
  author: { "@type": "Person", name: SITE.owner },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  description:
    "A detailed comparison of English Cream and American Golden Retrievers covering structure, temperament, health, and lifestyle fit.",
  mainEntityOfPage: `${SITE.url}/learn/english-cream-vs-american-golden`,
};

export default function EnglishCreamVsAmericanPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Learn", url: `${SITE.url}/learn` },
          { name: "English Cream vs American Golden", url: `${SITE.url}/learn/english-cream-vs-american-golden` },
        ])}
      />
      <JsonLd data={articleSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knowledgebase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            English Cream vs American Golden Retriever
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Same breed, different lines. Here is what actually separates them
            and which one fits your family.
          </p>
        </div>
      </section>

      <article className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              One Breed, Two Breeding Traditions
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                English Cream and American Golden Retrievers are the same
                breed. They share the same ancestry, the same DNA, and the same
                love for people. The differences come from decades of selective
                breeding on two continents with two different breed standards
                guiding the decisions.
              </p>
              <p>
                European breeders selected for lighter coats, stockier builds,
                and calmer energy. American breeders favored richer gold
                coloring, leaner athleticism, and higher drive. Neither is
                "better" -- they are different expressions of the same breed,
                shaped by different priorities.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-6">
              Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 text-gold font-bold text-sm uppercase tracking-wide">Trait</th>
                    <th className="py-3 pr-4 text-gold font-bold text-sm uppercase tracking-wide">English Cream</th>
                    <th className="py-3 text-gold font-bold text-sm uppercase tracking-wide">American Golden</th>
                  </tr>
                </thead>
                <tbody className="text-muted text-sm leading-relaxed">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Coat Color</td>
                    <td className="py-3 pr-4">Light cream to pale gold</td>
                    <td className="py-3">Medium gold to dark red-gold</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Build</td>
                    <td className="py-3 pr-4">Stockier, broader head and chest</td>
                    <td className="py-3">Leaner, more athletic frame</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Height (Males)</td>
                    <td className="py-3 pr-4">22 -- 24 inches</td>
                    <td className="py-3">23 -- 24 inches</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Weight (Males)</td>
                    <td className="py-3 pr-4">65 -- 75 lbs</td>
                    <td className="py-3">65 -- 75 lbs</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Temperament</td>
                    <td className="py-3 pr-4">Calm, gentle, laid-back</td>
                    <td className="py-3">Energetic, eager, driven</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Energy Level</td>
                    <td className="py-3 pr-4">Moderate</td>
                    <td className="py-3">Moderate to high</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Cancer Rate</td>
                    <td className="py-3 pr-4">~38% (European studies)</td>
                    <td className="py-3">~60% (US studies)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Lifespan</td>
                    <td className="py-3 pr-4">10 -- 12 years</td>
                    <td className="py-3">10 -- 12 years</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-bold text-cream">Breed Standard</td>
                    <td className="py-3 pr-4">UK Kennel Club (cream accepted)</td>
                    <td className="py-3">AKC (prefers rich gold)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-cream">Price Range</td>
                    <td className="py-3 pr-4">$2,000 -- $4,000</td>
                    <td className="py-3">$1,500 -- $3,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Build and Structure */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Build and Structure
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                English Cream Goldens tend to have broader skulls, more
                pronounced stops (the angle between forehead and muzzle), and
                thicker, more muscular bodies. Their overall appearance is
                blockier and more substantial.
              </p>
              <p>
                American Goldens are typically leaner with narrower heads and
                longer muzzles. They have a more streamlined, athletic build
                that reflects their field-bred heritage. American show lines
                fall somewhere in between.
              </p>
              <p>
                Both types weigh roughly the same (65 to 75 pounds for males),
                but the weight is distributed differently. An English Cream
                Golden looks heavier because of its stockier frame, even when
                it weighs the same as an American-line dog.
              </p>
            </div>
          </section>

          {/* Health Comparison */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Health Comparison
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The most talked-about health difference is cancer. A 2018 study
                published in the journal <em>Veterinary and Comparative
                Oncology</em> found that European-bred Golden Retrievers had
                cancer rates around 38%, compared to roughly 60% in American
                lines. This is a significant difference and one reason many
                families choose European bloodlines.
              </p>
              <p>
                Hip and elbow dysplasia rates are comparable between the two
                lines. Both benefit equally from{" "}
                <Link href="/learn/health-testing-explained" className="text-gold hover:underline">
                  OFA screening and genetic panel testing
                </Link>
                . A responsible breeder tests regardless of whether the dog is
                European or American.
              </p>
              <p>
                Eye conditions like progressive retinal atrophy (PRA) and
                cataracts appear at similar rates in both lines. Annual CAER
                eye exams and genetic panel testing catch these early or prevent
                them entirely when breeding dogs are properly screened.
              </p>
            </div>
          </section>

          {/* Temperament */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Temperament Differences
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                English Cream Goldens tend to mature a bit faster emotionally.
                They are often described as "old souls" -- calm, gentle, and
                content to be near their people without needing constant
                stimulation. They still love to play, but they also know how
                to settle.
              </p>
              <p>
                American Goldens, especially field-bred lines, tend to have
                higher energy and more drive. They are fantastic for active
                families who want a running partner, a hiking companion, or a
                dog sport competitor.
              </p>
              <p>
                Both types are intelligent and highly trainable. Both love
                people. The difference is more about energy and intensity than
                about willingness to learn or desire for companionship.
              </p>
            </div>
          </section>

          {/* Coat and Grooming */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Coat and Grooming
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                English Cream Goldens typically have a denser, slightly wavier
                coat. The texture can feel thicker and more plush. American
                Goldens tend to have straighter, silkier coats with more
                feathering on the legs and tail.
              </p>
              <p>
                Both shed heavily. There is no getting around it -- Golden
                Retrievers are double-coated dogs, and they blow coat twice a
                year. Regular brushing (at least 2 to 3 times per week) and
                professional grooming every 6 to 8 weeks will keep things
                manageable.
              </p>
            </div>
          </section>

          {/* Which Is Right */}
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Which Is Right for Your Family?
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Choose an English Cream Golden if you want a calm, gentle
                companion who is happy to relax at your feet but still loves
                walks and playtime. They are excellent for families with young
                children, seniors looking for a devoted companion, or anyone
                who values a lower-energy temperament.
              </p>
              <p>
                Choose an American Golden if you want a high-energy partner for
                an active lifestyle -- running, hiking, dock diving, agility,
                or hunt testing. They thrive with lots of exercise and mental
                stimulation.
              </p>
              <p>
                Either way, the most important factor is finding a breeder who
                health tests and raises puppies with intention.{" "}
                <Link href="/learn/what-is-english-cream-golden-retriever" className="text-gold hover:underline">
                  Read more about what makes an English Cream Golden Retriever
                </Link>{" "}
                and what to look for in a breeder.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border border-gold/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Our English Cream Golden Retrievers come from champion European
              bloodlines with full health testing and early neurological
              stimulation.
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

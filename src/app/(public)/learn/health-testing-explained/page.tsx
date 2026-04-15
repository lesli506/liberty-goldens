import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Health Testing for Golden Retrievers: OFA, CAER, and Genetics Explained",
  description:
    "Understand OFA hip and elbow certification, CAER eye exams, and genetic panel testing for Golden Retrievers. What reputable breeders test and why it matters.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Health Testing for Golden Retrievers: OFA, CAER, and Genetics Explained",
  author: { "@type": "Person", name: SITE.owner },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  description:
    "A complete guide to Golden Retriever health testing -- OFA hips, elbows, CAER eyes, genetic panels, and how to read the results.",
  mainEntityOfPage: `${SITE.url}/learn/health-testing-explained`,
};

export default function HealthTestingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Learn", url: `${SITE.url}/learn` },
          { name: "Health Testing Explained", url: `${SITE.url}/learn/health-testing-explained` },
        ])}
      />
      <JsonLd data={articleSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knowledgebase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Health Testing for Golden Retrievers
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            OFA hips, elbows, CAER eyes, and genetic panels -- what they are,
            why they matter, and what to look for.
          </p>
        </div>
      </section>

      <article className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Why Health Testing Matters
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Golden Retrievers are predisposed to several genetic
                conditions -- hip dysplasia, elbow dysplasia, progressive
                retinal atrophy, and certain cardiac and neurological
                disorders. Health testing identifies these conditions in
                breeding dogs before they are passed to the next generation.
              </p>
              <p>
                A puppy from untested parents is a gamble. A puppy from fully
                tested parents with passing scores is a calculated decision
                backed by science. Health testing does not guarantee a perfectly
                healthy dog, but it dramatically reduces the risk of
                preventable genetic disease.
              </p>
              <p>
                The Golden Retriever Club of America (GRCA) recommends four
                core health clearances before breeding: hips, elbows, eyes,
                and cardiac. At Liberty, we go beyond the minimum with a full
                genetic panel in addition to OFA and CAER testing.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              OFA Hip Certification
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The Orthopedic Foundation for Animals (OFA) evaluates hip
                radiographs (X-rays) to assess hip joint conformation. Dogs
                must be at least 24 months old for a final OFA rating. The
                X-rays are reviewed by three independent board-certified
                veterinary radiologists who each assign a grade.
              </p>
              <p>
                OFA hip ratings from best to worst:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4 text-gold font-bold text-sm uppercase tracking-wide">Rating</th>
                      <th className="py-3 text-gold font-bold text-sm uppercase tracking-wide">What It Means</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted text-sm leading-relaxed">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Excellent</td>
                      <td className="py-3">Superior hip conformation -- the best possible result</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Good</td>
                      <td className="py-3">Well-formed hip joints with minor irregularities</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Fair</td>
                      <td className="py-3">Acceptable hips with some deviation from ideal</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Borderline</td>
                      <td className="py-3">Inconclusive -- may need re-evaluation</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-cream">Dysplastic</td>
                      <td className="py-3">Mild, moderate, or severe hip dysplasia -- should not breed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Only dogs rated Excellent, Good, or Fair should be used for
                breeding. At Liberty, we breed dogs with Good or Excellent hip
                scores only.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              OFA Elbow Certification
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Elbow dysplasia is a developmental condition involving
                abnormal growth of the elbow joint. OFA evaluates elbow
                radiographs and assigns a grade of Normal or Dysplastic (Grade
                I, II, or III).
              </p>
              <p>
                Only dogs with Normal elbows should be bred. Elbow dysplasia
                can cause lameness and arthritis, and it has a strong genetic
                component. Testing both parents significantly reduces the
                chance of producing affected puppies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              CAER Eye Examination
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                CAER stands for Companion Animal Eye Registry. It is a clinical
                eye examination performed by a board-certified veterinary
                ophthalmologist. The exam checks for inherited eye diseases
                including cataracts, progressive retinal atrophy (PRA), retinal
                dysplasia, and other conditions.
              </p>
              <p>
                Unlike OFA hips and elbows (which are lifetime certifications),
                CAER eye exams are valid for 12 months. Breeding dogs should be
                examined annually because some eye conditions develop or
                progress over time.
              </p>
              <p>
                A passing CAER exam means no observable inherited eye disease
                was found at the time of examination. Some minor findings
                (like punctate cataracts that do not affect vision) may be
                noted as "breeder option" -- meaning the ophthalmologist leaves
                the breeding decision to the breeder's judgment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Genetic Panel Testing
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                A genetic panel is a DNA test that screens for known hereditary
                conditions. For Golden Retrievers, the most important genetic
                tests include:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4 text-gold font-bold text-sm uppercase tracking-wide">Test</th>
                      <th className="py-3 pr-4 text-gold font-bold text-sm uppercase tracking-wide">Full Name</th>
                      <th className="py-3 text-gold font-bold text-sm uppercase tracking-wide">What It Screens</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted text-sm leading-relaxed">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">PRA 1 / PRA 2</td>
                      <td className="py-3 pr-4">Progressive Retinal Atrophy</td>
                      <td className="py-3">Degenerative blindness</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">ICT</td>
                      <td className="py-3 pr-4">Ichthyosis</td>
                      <td className="py-3">Skin scaling disorder</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">DM</td>
                      <td className="py-3 pr-4">Degenerative Myelopathy</td>
                      <td className="py-3">Progressive spinal cord disease</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">NCL</td>
                      <td className="py-3 pr-4">Neuronal Ceroid Lipofuscinosis</td>
                      <td className="py-3">Fatal neurological disease</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-cream">MD</td>
                      <td className="py-3 pr-4">Muscular Dystrophy</td>
                      <td className="py-3">Progressive muscle wasting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Results come back as Clear, Carrier, or Affected. A dog that
                is Clear has no copies of the mutation. A Carrier has one copy
                and will not show symptoms but can pass it on. An Affected dog
                has two copies and will develop the condition.
              </p>
              <p>
                Responsible breeders ensure no pairing produces Affected
                puppies. Breeding a Carrier to a Clear dog is acceptable
                because no puppies can be Affected -- but breeding two Carriers
                together risks producing Affected offspring.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              How to Read an OFA Report
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Every OFA-tested dog has a public profile on the{" "}
                <a href="https://ofa.org" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  OFA website (ofa.org)
                </a>
                . You can search by the dog's registered name or OFA number.
                The profile shows every test result, the date it was performed,
                and the grade.
              </p>
              <p>
                Look for the CHIC number. A CHIC (Canine Health Information
                Center) number means the dog has completed all breed-specific
                recommended health tests. For Golden Retrievers, CHIC requires
                hips, elbows, eyes, and cardiac. A CHIC number does not mean
                all results were passing -- it only means all tests were
                completed and the results are public.
              </p>
              <p>
                Always verify. Ask the breeder for the dog's AKC registered
                name, then search OFA yourself. If a breeder is reluctant to
                share OFA numbers or makes excuses for why testing was not
                done, that is a red flag.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Red Flags -- Breeders Who Skip Testing
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Be wary of any breeder who says health testing is
                "unnecessary" or "too expensive." Testing a breeding dog
                costs roughly $500 to $800 total for hips, elbows, eyes, and a
                genetic panel. That is a small investment relative to the
                {" "}{SITE.priceRange} price of a puppy.
              </p>
              <p>
                Common excuses include: "My vet says the dog looks healthy,"
                "The parents were never tested and they were fine," or "We have
                never had a problem." A visual exam by a regular vet is not the
                same as OFA certification by board-certified specialists.
              </p>
              <p>
                Another red flag is a breeder who tests but does not publish
                results to OFA. The entire point of OFA is transparency. If
                results are not public, you cannot verify them.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              What Liberty Tests
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Every breeding dog in our program receives the following before
                they are ever bred:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>OFA hip certification (minimum Good rating)</li>
                <li>OFA elbow certification (Normal)</li>
                <li>CAER eye examination (annual, by a veterinary ophthalmologist)</li>
                <li>Full genetic panel (PRA, ICT, DM, NCL, and additional markers)</li>
                <li>Cardiac evaluation</li>
              </ul>
              <p>
                We publish all results to OFA so you can verify them yourself.
                We believe in complete transparency. When you get a puppy from
                us, you know exactly what the parents were tested for and what
                their results are. Read more about{" "}
                <Link href="/learn/what-is-english-cream-golden-retriever" className="text-gold hover:underline">
                  what makes a reputable English Cream breeder
                </Link>
                .
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border border-gold/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Every Liberty puppy comes from OFA-tested, genetically screened
              parents. No shortcuts, no exceptions.
            </p>
            <Link
              href="/puppies/apply"
              className="inline-block bg-gold text-warm-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold/90 transition-colors"
            >
              Apply for a Puppy
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}

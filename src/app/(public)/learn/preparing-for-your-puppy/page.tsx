import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Preparing for Your Golden Retriever Puppy: Complete Checklist",
  description:
    "Everything you need before your Golden Retriever puppy comes home -- supplies checklist, puppy-proofing, crate training, first vet visit, feeding schedule, and socialization plan.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Preparing for Your Golden Retriever Puppy: Complete Checklist",
  author: { "@type": "Person", name: SITE.owner },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  description:
    "A complete checklist for bringing home a Golden Retriever puppy -- supplies, puppy-proofing, vet visits, feeding, and socialization.",
  mainEntityOfPage: `${SITE.url}/learn/preparing-for-your-puppy`,
};

export default function PreparingForPuppyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Learn", url: `${SITE.url}/learn` },
          { name: "Preparing for Your Puppy", url: `${SITE.url}/learn/preparing-for-your-puppy` },
        ])}
      />
      <JsonLd data={articleSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knowledgebase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Preparing for Your Golden Retriever Puppy
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything you need to have ready before your new best friend
            walks through the door.
          </p>
        </div>
      </section>

      <article className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Supplies Checklist
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Get these before your puppy arrives. Having everything set up
                in advance means less stress for you and a smoother first day
                for your puppy.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4 text-gold font-bold text-sm uppercase tracking-wide">Item</th>
                      <th className="py-3 text-gold font-bold text-sm uppercase tracking-wide">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted text-sm leading-relaxed">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Crate</td>
                      <td className="py-3">42-inch wire crate with divider (grows with your puppy)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Puppy Food</td>
                      <td className="py-3">We send home a starter bag -- continue the same brand for 2 weeks before transitioning</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Food & Water Bowls</td>
                      <td className="py-3">Stainless steel, heavy enough not to tip</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Collar & Leash</td>
                      <td className="py-3">Adjustable collar, 6-foot leash (not retractable)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">ID Tag</td>
                      <td className="py-3">Your name, phone number, city -- get one made before pickup</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Chew Toys</td>
                      <td className="py-3">Kongs, Nylabones, rope toys -- avoid anything small enough to swallow</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Bed / Blanket</td>
                      <td className="py-3">Washable crate pad or old towels (puppies have accidents)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Enzymatic Cleaner</td>
                      <td className="py-3">Nature's Miracle or similar -- essential for accident cleanup</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-bold text-cream">Treats</td>
                      <td className="py-3">Small, soft training treats for positive reinforcement</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-cream">Grooming Basics</td>
                      <td className="py-3">Slicker brush, puppy shampoo, nail clippers or Dremel</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Puppy-Proofing Your Home
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Golden Retriever puppies are curious and they chew everything.
                Get on the floor at puppy eye level and look for hazards. If
                you can see it, they will find it.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Pick up electrical cords or cover them with cord protectors</li>
                <li>Remove shoes, socks, and small objects from the floor</li>
                <li>Secure trash cans with lids (kitchen and bathroom)</li>
                <li>Block off stairs with baby gates until your puppy is bigger</li>
                <li>Move houseplants out of reach -- many are toxic to dogs</li>
                <li>Store cleaning products, medications, and chemicals in closed cabinets</li>
                <li>Check your yard for gaps in fencing, toxic plants, and standing water</li>
              </ul>
              <p>
                Start with one puppy-proofed room or area. Expand their access
                gradually as they learn the rules. Giving a puppy full run of
                the house on day one is a recipe for chewed furniture and
                accidents in every room.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Setting Up a Safe Space
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Your puppy needs their own space -- a crate, a playpen, or a
                gated area in a quiet corner. This is not punishment. It is
                their den, their safe place, their spot to decompress.
              </p>
              <p>
                Place the crate in a common area where the family spends time
                (living room or kitchen). Put a soft pad or towel inside, a
                chew toy, and a small water bowl nearby. Leave the door open
                during the day so your puppy can go in and out freely.
              </p>
              <p>
                Crate training basics: feed meals inside the crate, toss
                treats in randomly, and praise your puppy when they go in on
                their own. Never use the crate as punishment. A crate-trained
                dog is easier to house-train, safer when unsupervised, and
                calmer during travel.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              First Vet Visit
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Schedule your first vet visit within 48 to 72 hours of
                bringing your puppy home. Most breeders' health guarantees
                require this initial exam. Bring everything we send with your
                puppy -- vaccination records, health certificate, microchip
                number, and deworming schedule.
              </p>
              <p>
                Your vet will do a full physical exam, check the puppy's
                heart, eyes, ears, and joints, and review the vaccination
                schedule going forward. This is also a great time to ask
                about heartworm prevention, flea and tick protection, and a
                feeding plan.
              </p>
              <p>
                Make the vet visit positive. Bring treats, stay calm, and let
                the staff give your puppy some love. First vet experiences set
                the tone for a lifetime of veterinary care.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Feeding Schedule
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                At 8 weeks, your puppy should eat three times per day --
                morning, midday, and evening. Measure portions according to
                the food packaging guidelines for your puppy's current weight
                and expected adult size (65 to 75 pounds for most Goldens).
              </p>
              <p>
                Stick with the food we send home for at least two weeks. If
                you want to switch brands, transition gradually over 7 to 10
                days by mixing increasing amounts of the new food with the
                old. Sudden food changes cause digestive upset.
              </p>
              <p>
                Around 4 to 6 months, you can transition to twice-daily
                feeding. Always provide fresh water. Avoid free-feeding (leaving
                food out all day) -- scheduled meals help with house training
                because you can predict when your puppy needs to go outside.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              First Night Tips
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The first night is the hardest -- for you and for your puppy.
                Your puppy just left their mother, their littermates, and the
                only home they have ever known. Some whining is completely
                normal.
              </p>
              <p>
                Place the crate next to your bed so your puppy can hear and
                smell you. Put the blanket we send home inside the crate --
                it carries the scent of mom and littermates, which provides
                comfort. A warm (not hot) water bottle wrapped in a towel can
                simulate the warmth of sleeping with siblings.
              </p>
              <p>
                Expect at least one middle-of-the-night potty break. An 8-week
                old puppy's bladder is tiny. Take them straight outside, let
                them do their business, then right back to the crate. Keep it
                boring -- no play, no fuss, no lights. They will learn that
                nighttime is for sleeping.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Socialization: The First 16 Weeks
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The socialization window closes around 16 weeks of age. After
                that, new experiences become harder for your dog to process
                without fear. We cover the first 8 weeks at Liberty with{" "}
                <Link href="/learn/puppy-development-stages" className="text-gold hover:underline">
                  ENS, ESI, and structured socialization
                </Link>
                . Weeks 8 through 16 are your responsibility.
              </p>
              <p>
                Aim to expose your puppy to 100 new experiences in their first
                month home. This includes different people (men, women,
                children, people in hats, people with beards), different
                surfaces (grass, gravel, metal grates, wet pavement), different
                sounds (traffic, construction, thunder), and different
                environments (pet stores, outdoor cafes, parking lots).
              </p>
              <p>
                Keep every experience positive. Carry treats and reward calm
                behavior. If your puppy seems overwhelmed, create distance and
                try again later. Socialization is about building confidence --
                not flooding your puppy with stimulation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              What Liberty Includes with Each Puppy
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                When your Liberty puppy comes home, you receive:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Starter bag of the puppy food they have been eating</li>
                <li>Comfort toy with mom and littermate scent</li>
                <li>Blanket with familiar scent</li>
                <li>Vaccination records and deworming schedule</li>
                <li>Health certificate from our veterinarian</li>
                <li>Microchip registration information</li>
                <li>Trupanion pet insurance trial</li>
                <li>Written health guarantee</li>
                <li>Lifetime breeder support from {SITE.owner}</li>
              </ul>
              <p>
                We want you to feel prepared and supported from day one. If
                you have questions before, during, or after bringing your puppy
                home, we are always available.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border border-gold/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              We prepare our puppies for life in your home. Now it is your
              turn to prepare your home for them.
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

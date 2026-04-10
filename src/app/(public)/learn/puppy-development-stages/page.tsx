import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Golden Retriever Puppy Development: Week by Week Guide",
  description:
    "Follow Golden Retriever puppy development from birth to 8 weeks -- neonatal, transitional, socialization stages, ENS, ESI, and what happens at Liberty before your puppy comes home.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Golden Retriever Puppy Development: Week by Week Guide",
  author: { "@type": "Person", name: SITE.owner },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  description:
    "Week-by-week Golden Retriever puppy development covering ENS, ESI, socialization, and what to expect when your puppy comes home.",
  mainEntityOfPage: `${SITE.url}/learn/puppy-development-stages`,
};

export default function PuppyDevelopmentPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Learn", url: `${SITE.url}/learn` },
          { name: "Puppy Development Stages", url: `${SITE.url}/learn/puppy-development-stages` },
        ])}
      />
      <JsonLd data={articleSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knowledgebase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Golden Retriever Puppy Development
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Week by week -- what happens from birth to 8 weeks and why this
            window shapes your puppy for life.
          </p>
        </div>
      </section>

      <article className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Weeks 1 -- 2: The Neonatal Stage
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Puppies are born blind, deaf, and completely dependent on their
                mother. Their eyes are sealed shut and their ear canals are
                closed. They spend roughly 90% of their time sleeping and the
                other 10% nursing.
              </p>
              <p>
                During this stage, puppies cannot regulate their own body
                temperature. They stay in a warm whelping box, huddled
                together with their littermates and mom. We monitor the room
                temperature carefully and check each puppy multiple times a
                day for weight gain and overall condition.
              </p>
              <p>
                This is when Early Neurological Stimulation (ENS) begins --
                starting at day 3. More on that below.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Weeks 3 -- 4: The Transitional Stage
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                This is when the world opens up. Eyes open between days 10 and
                14, and ears begin to function around day 21. Puppies start to
                see, hear, and respond to their environment for the first
                time.
              </p>
              <p>
                First teeth appear. Puppies begin standing, wobbling around
                the whelping box, and taking their first clumsy steps. They
                start to interact with their littermates -- pawing, nuzzling,
                and the earliest forms of play.
              </p>
              <p>
                We introduce soft sounds (TV, music, household noise) and
                begin gentle handling by multiple family members. This early
                exposure to different voices and touches starts building the
                foundation for a confident, well-socialized adult dog.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Weeks 5 -- 6: Socialization Begins
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                This is the critical socialization window. Puppies are now
                actively playing, wrestling, and learning bite inhibition from
                their littermates. They are eating softened puppy food in
                addition to nursing. Their personalities start to emerge.
              </p>
              <p>
                We introduce puppies to new surfaces (tile, grass, carpet,
                wood), new sounds (vacuum, doorbell, clapping), and new
                experiences (being held in different positions, gentle
                grooming, nail trimming). Early Scent Introduction (ESI)
                happens during this period as well.
              </p>
              <p>
                Puppies who miss this socialization window often grow into
                fearful or reactive adults. This is why we never rush puppies
                out the door early and why we invest so much time during weeks
                5 through 8 in structured socialization.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Weeks 7 -- 8: Ready for the World
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                By week 7, puppies have had their first vet exam, age-
                appropriate vaccinations, deworming, and microchip. They are
                eating solid food on a regular schedule and sleeping through
                longer stretches at night.
              </p>
              <p>
                We begin basic potty training by taking puppies outside after
                meals and naps. They are learning to walk on a leash, come
                when called (sort of), and sit for attention. These are not
                trained behaviors yet -- just gentle introductions.
              </p>
              <p>
                At 8 weeks, puppies are developmentally ready to bond with
                their new family. This is the ideal go-home age. Leaving
                earlier disrupts critical lessons they learn from mom and
                littermates. Leaving much later can narrow their socialization
                window with their new family.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              What Is ENS (Early Neurological Stimulation)?
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Early Neurological Stimulation is a program developed by the
                U.S. military's "Bio Sensor" research (also known as the
                "Super Dog" program). It involves five specific exercises
                performed once daily on each puppy from day 3 through day 16
                of life.
              </p>
              <p>
                The five exercises are: tactical stimulation (tickling between
                the toes with a Q-tip), head held erect, head pointed down,
                supine position (on the back), and thermal stimulation (paws
                on a cool damp cloth). Each exercise lasts 3 to 5 seconds.
              </p>
              <p>
                Research shows that puppies who receive ENS develop stronger
                immune systems, greater stress tolerance, stronger heartbeats,
                and stronger adrenal glands. They are more confident and
                adaptable as adults. It is a small investment of time that
                produces measurable benefits for the rest of the dog's life.
              </p>
              <p>
                Every single puppy at Liberty receives ENS. It is one of many
                things that separates a thoughtful breeding program from one
                that just produces puppies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              What Is ESI (Early Scent Introduction)?
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Early Scent Introduction exposes puppies to different scents
                during the critical development period. Starting around day 3,
                we introduce one new scent per day -- things like grass,
                leather, wood, fruit, spices, and essential oils.
              </p>
              <p>
                Each scent is held near the puppy's nose for a few seconds.
                We note whether the puppy shows interest, indifference, or
                avoidance. This exercise stimulates the olfactory system during
                the same window when ENS is building neurological resilience.
              </p>
              <p>
                ESI is especially valuable for dogs who may go on to work in
                scent detection, therapy, or service roles. But even family
                pets benefit from a well-developed olfactory system and the
                confidence that comes from early sensory exposure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              How Liberty Raises Puppies Differently
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Our puppies are born and raised in our home -- not a kennel,
                not a barn, not a separate building. They live with us from
                day one. That means they hear our TV, our conversations, our
                footsteps on the floor, and the doorbell ringing. By the time
                they go home with you, household life is already normal.
              </p>
              <p>
                Every puppy receives daily individual handling, ENS, ESI,
                and structured socialization. They meet adults, children, and
                other animals. They walk on grass, concrete, tile, and carpet.
                They hear thunderstorms (recorded), fireworks (recorded), and
                every sound a busy household produces.
              </p>
              <p>
                We also begin crate introduction and basic potty training
                concepts before puppies leave. None of this is forced -- it is
                gentle exposure designed to give your puppy the best possible
                start. Learn more about{" "}
                <Link href="/learn/preparing-for-your-puppy" className="text-gold hover:underline">
                  preparing for your new puppy
                </Link>{" "}
                to continue what we start.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              What to Expect When Your Puppy Comes Home
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Your puppy will arrive already comfortable with handling,
                household sounds, and basic routines. But the first few days
                in a new environment are still an adjustment. Expect some
                whining at night, a few accidents, and a lot of napping.
              </p>
              <p>
                Stick to a consistent schedule -- feeding, potty breaks, naps,
                play -- and your puppy will settle in quickly. The
                socialization foundation we build at Liberty makes the
                transition smoother than most new puppy owners expect.
              </p>
              <p>
                We are always a phone call or text away. Lifetime breeder
                support means you are never on your own. Whether your puppy is
                8 weeks or 8 years old, we are here to help.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border border-gold/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Every Liberty puppy gets ENS, ESI, daily handling, and 8 weeks
              of in-home socialization before they ever meet you.
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

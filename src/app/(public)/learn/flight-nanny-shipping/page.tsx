import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Flight Nanny Service: How We Deliver Puppies Nationwide and Worldwide",
  description:
    "Learn how our flight nanny service works -- safe in-cabin puppy delivery anywhere in the US or worldwide. Step-by-step process, costs, airport pickup, and FAQ.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Flight Nanny Service: How We Deliver Puppies Nationwide and Worldwide",
  author: { "@type": "Person", name: SITE.owner },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  description:
    "How Liberty's flight nanny service delivers puppies safely in-cabin to families across the US and worldwide.",
  mainEntityOfPage: `${SITE.url}/learn/flight-nanny-shipping`,
};

export default function FlightNannyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Learn", url: `${SITE.url}/learn` },
          { name: "Flight Nanny & Shipping", url: `${SITE.url}/learn/flight-nanny-shipping` },
        ])}
      />
      <JsonLd data={articleSchema} />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knowledgebase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Flight Nanny Service
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            How we deliver your puppy safely -- in-cabin, with a dedicated
            handler -- anywhere in the country or around the world.
          </p>
        </div>
      </section>

      <article className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              What Is a Flight Nanny?
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                A flight nanny is a real person who boards a commercial flight
                with your puppy in an airline-approved carrier, kept under the
                seat in the cabin -- not in cargo. Your puppy travels the same
                way you would, with a caring handler right there the entire
                trip.
              </p>
              <p>
                Flight nannies are experienced with puppies. They handle
                feeding, comfort, and any needs your puppy has during the
                flight. When the plane lands, they walk out of the terminal
                and hand-deliver your puppy directly to you at the airport.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Why Flight Nanny Is Better Than Cargo
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Cargo shipping puts your puppy in the luggage hold of the
                plane -- alone, in a crate, in a pressurized but unmonitored
                space. Temperature fluctuations, noise, vibration, and long
                wait times on the tarmac make cargo stressful and potentially
                dangerous for a young puppy.
              </p>
              <p>
                With a flight nanny, your puppy is in the cabin. They are
                warm, supervised, and comforted the entire flight. There are
                no tarmac waits, no cargo handling, and no separation anxiety
                from being alone in a dark hold. It is simply the safest,
                kindest way to transport a puppy by air.
              </p>
              <p>
                We do not offer cargo shipping. Every puppy that flies does so
                in-cabin with a nanny. Your puppy's safety and comfort are not
                negotiable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              How the Process Works
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Here is the step-by-step process from start to finish:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-2">
                <li>
                  <span className="font-bold text-cream">Confirm your puppy and go-home date.</span>{" "}
                  Once your puppy is selected and the go-home date is set (8
                  weeks), we coordinate with our flight nanny network.
                </li>
                <li>
                  <span className="font-bold text-cream">We book the flight.</span>{" "}
                  We find the best route from our nearest airport to yours.
                  Direct flights are preferred. If a layover is necessary, we
                  choose the shortest connection.
                </li>
                <li>
                  <span className="font-bold text-cream">Vet visit and health certificate.</span>{" "}
                  Your puppy gets a final vet exam and a USDA health
                  certificate within 10 days of travel (required by airlines).
                </li>
                <li>
                  <span className="font-bold text-cream">Travel day.</span>{" "}
                  The flight nanny picks up your puppy from us, gets them
                  settled in their carrier, and boards the flight. You will
                  receive updates and photos along the way.
                </li>
                <li>
                  <span className="font-bold text-cream">Airport pickup.</span>{" "}
                  You meet the flight nanny at baggage claim or just outside
                  security. They hand your puppy to you, give you a travel
                  report, and that is it -- your puppy is home.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Cost and Logistics
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Flight nanny costs vary depending on the destination and route.
                Typical costs range from $400 to $600 for domestic flights
                within the United States. International delivery costs more
                due to longer flights and additional documentation
                requirements.
              </p>
              <p>
                The flight nanny fee covers the handler's time, their return
                flight, the airline pet fee, and the in-cabin carrier. You pay
                the nanny fee separately from your puppy price. We coordinate
                everything -- you just show up at the airport.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Airport Pickup -- What to Expect
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                On travel day, you will know the flight number, arrival time,
                and terminal. We will text you updates from the nanny
                throughout the trip. When the flight lands, the nanny will
                text you to confirm they have arrived.
              </p>
              <p>
                Bring a leash, a small bowl, water, paper towels, and a
                potty pad or towel for the car ride home. Your puppy will
                probably need to relieve themselves immediately after the
                flight. Find a grassy area near the terminal before heading
                to your car.
              </p>
              <p>
                The nanny will hand you your puppy along with their travel
                carrier, any remaining food from the trip, and a brief update
                on how your puppy did during the flight. Most puppies sleep
                through most of the journey.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Age and Documentation Requirements
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Puppies must be at least 8 weeks old and fully weaned before
                flying. This is both our policy and an airline requirement.
                We never send puppies home earlier than 8 weeks regardless
                of the delivery method.
              </p>
              <p>
                Required documents for domestic flights include a USDA-
                accredited veterinarian health certificate issued within 10
                days of travel, proof of age-appropriate vaccinations, and
                the microchip number. For international flights, additional
                documents may include import permits, rabies titers, and
                country-specific health forms -- we handle all of this for
                you.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Delivery Area
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                We deliver puppies to any major airport in the United States.
                International delivery is also available -- we have sent
                puppies to families in Canada, Europe, and beyond. If you can
                receive a flight at an airport near you, we can get your puppy
                there.
              </p>
              <p>
                For families within driving distance of{" "}
                {SITE.address.city}, {SITE.address.state}, we also offer a
                meet-halfway option. We will drive partway to meet you at a
                convenient location. This works well for families in Indiana,
                Illinois, Michigan, Ohio, Wisconsin, and surrounding states.
              </p>
              <p>
                Of course, you are always welcome to visit us in person and
                pick up your puppy at our home. Many families make a fun road
                trip out of it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-cream mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  Is it safe for a puppy to fly?
                </h3>
                <p className="text-muted leading-relaxed">
                  Yes, when done properly. In-cabin travel with a flight nanny
                  is the safest way to transport a puppy by air. The puppy is
                  in a climate-controlled cabin, supervised the entire time,
                  and never left alone. Thousands of puppies fly safely with
                  nannies every year.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  How long can a puppy fly?
                </h3>
                <p className="text-muted leading-relaxed">
                  Most domestic flights are 2 to 5 hours. Puppies handle this
                  well -- they typically sleep for most of the flight. For
                  longer international flights, we make sure there are
                  appropriate breaks and the nanny has everything needed to
                  keep your puppy comfortable.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  What airlines do you use?
                </h3>
                <p className="text-muted leading-relaxed">
                  We use whichever airline offers the best route to your
                  airport. Common carriers include American Airlines, United,
                  Delta, and Southwest. Not all airlines allow in-cabin pets on
                  every route, so the specific airline depends on your
                  destination.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  What if my puppy gets stressed during the flight?
                </h3>
                <p className="text-muted leading-relaxed">
                  The flight nanny is trained to comfort nervous puppies. They
                  carry familiar-scented blankets, treats, and toys. Most
                  puppies settle quickly once the flight is underway. The hum
                  of the engine and gentle motion actually lull many puppies
                  to sleep within minutes of takeoff.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-2">
                  Can I pick up my puppy in person instead?
                </h3>
                <p className="text-muted leading-relaxed">
                  Absolutely. You are always welcome to visit our home in{" "}
                  {SITE.address.city}, {SITE.address.state} and take your
                  puppy home yourself. We love meeting our families in person.
                  Read more about{" "}
                  <Link href="/learn/preparing-for-your-puppy" className="text-gold hover:underline">
                    preparing for your puppy
                  </Link>{" "}
                  to make the trip smooth.
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
              No matter where you live, we can get your puppy to you safely.
              Start your application today.
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

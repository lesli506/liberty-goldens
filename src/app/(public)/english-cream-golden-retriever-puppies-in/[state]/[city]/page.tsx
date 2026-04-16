import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/constants";
import { LOCATIONS, getLocation, distanceFromKnox } from "@/lib/locations";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

interface Props {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    state: loc.stateSlug,
    city: loc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params;
  const loc = getLocation(state, city);
  if (!loc) return {};

  const title = `English Cream Golden Retriever Puppies in ${loc.city}, ${loc.stateAbbr}`;
  const description = `Looking for English Cream Golden Retriever puppies near ${loc.city}, ${loc.state}? ${SITE.name} in Knox, Indiana breeds OFA health-tested, champion-sired puppies. ${loc.driveTime ? `Only ${loc.driveTime} from ${loc.city}.` : "Flight nanny delivery available."}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE.url}/english-cream-golden-retriever-puppies-in/${state}/${city}`,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { state, city } = await params;
  const loc = getLocation(state, city);
  if (!loc) notFound();

  const miles = Math.round(distanceFromKnox(loc.lat, loc.lng));
  const isLocal = miles < 300;
  const pageUrl = `${SITE.url}/english-cream-golden-retriever-puppies-in/${loc.stateSlug}/${loc.slug}`;

  const serviceAreaSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: {
      "@type": "City",
      name: loc.city,
      containedInPlace: {
        "@type": "State",
        name: loc.state,
      },
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "English Cream Golden Retriever Puppy",
        description: `OFA health-tested English Cream Golden Retriever puppy from champion European bloodlines, delivered to ${loc.city}, ${loc.stateAbbr}`,
      },
      price: "3000",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Can I get an English Cream Golden Retriever puppy in ${loc.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${SITE.name} in Knox, Indiana ${isLocal ? `is only ${loc.driveTime || miles + " miles"} from ${loc.city}` : `delivers puppies to ${loc.city} via flight nanny`}. All puppies are OFA health tested with champion European bloodlines.`,
        },
      },
      {
        "@type": "Question",
        name: `How much do English Cream Golden Retriever puppies cost near ${loc.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Our English Cream Golden Retriever puppies are ${SITE.priceRange} with a ${SITE.deposit} deposit. This includes OFA health testing of both parents, early neurological stimulation, first vaccinations, microchip, and a 2-year health guarantee.`,
        },
      },
      {
        "@type": "Question",
        name: isLocal
          ? `How far is Knox, Indiana from ${loc.city}?`
          : `Do you ship puppies to ${loc.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isLocal
            ? `Knox, Indiana is approximately ${loc.driveTime || miles + " miles"} from ${loc.city}. Many of our ${loc.city} families drive to pick up their puppy, or we can arrange a meet-up point.`
            : `Yes. We work with trusted flight nannies who hand-deliver your puppy in-cabin to ${loc.city}. ${loc.nearby || "Your puppy travels safely with a dedicated handler the entire flight."}`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Locations", url: `${SITE.url}/english-cream-golden-retriever-puppies-in` },
          { name: `${loc.city}, ${loc.stateAbbr}`, url: pageUrl },
        ])}
      />
      <JsonLd data={serviceAreaSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            {isLocal ? `${loc.driveTime || miles + " miles"} from ${loc.city}` : `Flight Nanny to ${loc.city}`}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            English Cream Golden Retriever Puppies in {loc.city}, {loc.stateAbbr}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {isLocal
              ? `Looking for an English Cream Golden Retriever near ${loc.city}? ${SITE.name} is just ${loc.driveTime || miles + " miles"} away in Knox, Indiana. Champion European bloodlines, OFA health tested, home raised from day one.`
              : `${SITE.name} delivers OFA health-tested English Cream Golden Retriever puppies to ${loc.city}, ${loc.state} via trusted flight nanny. Champion European bloodlines, home raised in Knox, Indiana.`}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/puppies/apply"
              className="bg-gold text-warm-white px-8 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Apply for a Puppy
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="text-muted hover:text-gold transition-colors font-medium"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-cream mb-10 text-center">
            {isLocal
              ? `How to Get Your Puppy in ${loc.city}`
              : `Getting Your Puppy Delivered to ${loc.city}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="text-gold text-3xl font-bold mb-3">1</div>
              <h3 className="font-serif text-xl font-bold text-cream mb-3">
                Apply Online
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Fill out our{" "}
                <Link href="/puppies/apply" className="text-gold hover:underline">
                  puppy application
                </Link>
                . We review every application personally to make sure our puppies go to loving homes.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="text-gold text-3xl font-bold mb-3">2</div>
              <h3 className="font-serif text-xl font-bold text-cream mb-3">
                Reserve with Deposit
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Once approved, secure your puppy with a {SITE.deposit} deposit.
                You will receive regular photo and video updates as your puppy grows.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="text-gold text-3xl font-bold mb-3">3</div>
              <h3 className="font-serif text-xl font-bold text-cream mb-3">
                {isLocal ? "Pick Up Your Puppy" : "Flight Nanny Delivery"}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {isLocal
                  ? `Drive to Knox, Indiana (${loc.driveTime || "about " + miles + " miles"} from ${loc.city}) to pick up your puppy at 8 weeks old. We can also arrange a convenient meet-up point.`
                  : `Your puppy flies in-cabin with a dedicated flight nanny directly to ${loc.city}. ${loc.nearby || "Safe, stress-free, and hand-delivered to you at the airport."}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Liberty */}
      <section className="bg-navy-light py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-cream mb-4 text-center">
            Why {loc.city} Families Choose Liberty Goldens
          </h2>
          <p className="text-muted text-center max-w-2xl mx-auto mb-10">
            We are not a puppy mill or a broker. We are a small, family breeding
            program where every puppy is raised in our home with hands-on care
            from birth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Champion European Bloodlines",
                desc: "Our stud carries champion European pedigree with exceptional structure, coat quality, and temperament. Every breeding pairing is intentional.",
              },
              {
                title: "OFA Health Tested",
                desc: "Hips, elbows, eyes (CAER), and full genetic panel on every breeding dog. We test everything so your puppy starts life healthy.",
              },
              {
                title: "Home Raised, Never Kenneled",
                desc: "Puppies live in our home from day one. Daily socialization, early neurological stimulation (ENS), and potty training included.",
              },
              {
                title: "Lifetime Breeder Support",
                desc: "When you get a Liberty puppy, you get a lifelong relationship. We are always here for questions, guidance, and celebrating milestones.",
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
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-cream mb-8 text-center">
            What Is Included with Every Puppy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "OFA health-tested parents",
              "Champion European pedigree",
              "Early neurological stimulation (ENS)",
              "First round of vaccinations",
              "Deworming schedule completed",
              "Microchipped before going home",
              "2-year health guarantee",
              "Puppy starter kit and food",
              "AKC registration papers",
              "Lifetime breeder support",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-4"
              >
                <span className="text-gold text-lg">&#10003;</span>
                <span className="text-cream font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-light py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-cream mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold text-cream mb-2">
                Can I get an English Cream Golden Retriever puppy in {loc.city}?
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {isLocal
                  ? `Absolutely. ${SITE.name} is just ${loc.driveTime || miles + " miles"} from ${loc.city}. Many of our families in ${loc.state} drive to Knox to pick up their puppy. We can also arrange a convenient meet-up point closer to ${loc.city}.`
                  : `Yes. We deliver puppies to ${loc.city} via flight nanny. Your puppy travels in-cabin with a dedicated handler who hand-delivers them to you at the airport. ${loc.nearby || ""}`}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold text-cream mb-2">
                How much do English Cream Golden Retriever puppies cost?
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Our puppies are {SITE.priceRange} with a {SITE.deposit} deposit
                to reserve. This includes OFA health testing of both parents,
                early neurological stimulation, first vaccinations, microchip,
                AKC registration, and a 2-year health guarantee.
                {!isLocal && " Flight nanny fees are additional and vary by destination."}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold text-cream mb-2">
                {isLocal
                  ? `How far is Knox, Indiana from ${loc.city}?`
                  : `How does flight nanny delivery work?`}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {isLocal
                  ? `Knox is approximately ${loc.driveTime || miles + " miles"} from ${loc.city}. It is an easy drive and many of our ${loc.city} families visit to meet the parents and pick out their puppy in person.`
                  : `A flight nanny is a real person who flies with your puppy in-cabin on a commercial flight. They care for your puppy the entire trip and hand-deliver them to you at the ${loc.city} airport. It is the safest way to transport a puppy over long distances.`}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold text-cream mb-2">
                What health testing do you do?
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Every breeding dog is tested through OFA for hips, elbows, eyes
                (CAER), and a comprehensive genetic panel. We believe health
                testing is non-negotiable. You can read more on our{" "}
                <Link href="/learn/health-testing-explained" className="text-gold hover:underline">
                  health testing
                </Link>{" "}
                page.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold text-cream mb-2">
                How long is the wait for a puppy?
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Our puppies typically sell before they are born. We recommend
                applying early to get on our waiting list. Visit our{" "}
                <Link href="/puppies" className="text-gold hover:underline">
                  puppies page
                </Link>{" "}
                for current availability and upcoming litters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
            Ready to Bring Home a Golden?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            {isLocal
              ? `We are just ${loc.driveTime || miles + " miles"} from ${loc.city}. Start your application today and join our family of happy Golden Retriever owners across ${loc.state}.`
              : `We deliver puppies to ${loc.city} via flight nanny. Start your application today and we will be in touch to discuss upcoming litters and delivery options.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/puppies/apply"
              className="bg-gold text-warm-white px-8 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Apply for a Puppy
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gold text-gold px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold hover:text-warm-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Related locations */}
      <section className="bg-navy-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-cream mb-6 text-center">
            More Locations We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {LOCATIONS.filter(
              (l) => l.slug !== loc.slug || l.stateSlug !== loc.stateSlug
            )
              .sort(() => 0.5 - Math.random())
              .slice(0, 12)
              .map((l) => (
                <Link
                  key={`${l.stateSlug}-${l.slug}`}
                  href={`/english-cream-golden-retriever-puppies-in/${l.stateSlug}/${l.slug}`}
                  className="bg-card border border-border rounded-full px-4 py-2 text-sm text-muted hover:text-gold hover:border-gold transition-colors"
                >
                  {l.city}, {l.stateAbbr}
                </Link>
              ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/english-cream-golden-retriever-puppies-in"
              className="text-gold text-sm hover:underline"
            >
              View all locations &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

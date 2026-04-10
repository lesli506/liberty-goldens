import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "English Cream Golden Retriever Puppies in Indiana",
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knox, Indiana &middot; Good Dog Certified
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] mb-6">
            Put a Little Love
            <br />
            <span className="text-gold">in Your Life</span>
          </h1>
          <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Champion-sired English Cream Golden Retriever puppies, raised in our
            home with early neurological stimulation, daily socialization, and
            lifetime breeder support. OFA health tested parents. Flight nanny
            available worldwide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/puppies/apply"
              className="bg-gold text-navy px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold/90 transition-colors shadow-lg"
            >
              Apply for a Puppy
            </Link>
            <Link
              href="/videos"
              className="border-2 border-cream/30 text-cream px-8 py-3.5 rounded-full font-bold text-lg hover:border-gold hover:text-gold transition-colors"
            >
              Watch Our Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Why Liberty */}
      <section className="bg-navy-light py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
              Why Choose Liberty Goldens?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Every puppy starts life surrounded by love and family. From the
              moment they are born, our puppies are nurtured with hands-on care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Champion Bloodlines",
                desc: "European champion stud with proven pedigree. Every puppy inherits exceptional structure, temperament, and beauty.",
                icon: "&#9733;",
              },
              {
                title: "OFA Health Tested",
                desc: "Hips, elbows, eyes (CAER), and full genetic panel. We test everything so your puppy starts life healthy.",
                icon: "&#9829;",
              },
              {
                title: "Home Raised",
                desc: "Puppies live in our home from day one. Daily socialization, early neurological stimulation, and potty training before they go home.",
                icon: "&#9750;",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:border-gold/30 transition-colors"
              >
                <div
                  className="text-gold text-3xl mb-4"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
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

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
            Ready to Welcome a Golden Into Your Family?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Our puppies sell before they are born. Fill out an application to get
            on our waiting list for upcoming litters. We are happy to ship via
            flight nanny anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/puppies/apply"
              className="bg-gold text-navy px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gold/90 transition-colors"
            >
              Start Your Application
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="text-cream hover:text-gold transition-colors font-medium"
            >
              or call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Learn */}
      <section className="bg-navy-light py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
              Learn About English Cream Golden Retrievers
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explore our knowledgebase to understand what makes English Creams
              special, how we health test, and what to expect.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "What Is an English Cream Golden Retriever?",
                href: "/learn/what-is-english-cream-golden-retriever",
              },
              {
                title: "English Cream vs American Golden Retriever",
                href: "/learn/english-cream-vs-american-golden",
              },
              {
                title: "Health Testing Explained",
                href: "/learn/health-testing-explained",
              },
              {
                title: "Puppy Development Stages",
                href: "/learn/puppy-development-stages",
              },
              {
                title: "Preparing for Your Puppy",
                href: "/learn/preparing-for-your-puppy",
              },
              {
                title: "Flight Nanny & Worldwide Shipping",
                href: "/learn/flight-nanny-shipping",
              },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="bg-card border border-border rounded-xl p-5 hover:border-gold/30 transition-colors group"
              >
                <h3 className="text-cream font-bold group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <span className="text-gold text-sm mt-2 inline-block">
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Learn About English Cream Golden Retrievers",
  description: `Explore our knowledgebase about English Cream Golden Retrievers -- health testing, breed differences, puppy development, and more.`,
};

const articles = [
  {
    title: "What Is an English Cream Golden Retriever?",
    href: "/learn/what-is-english-cream-golden-retriever",
    description:
      "Understand what makes English Cream Goldens unique -- their history, characteristics, and why they are called 'English Cream' in the first place.",
  },
  {
    title: "English Cream vs American Golden Retriever",
    href: "/learn/english-cream-vs-american-golden",
    description:
      "A side-by-side comparison of European-line and American-line Golden Retrievers -- coat, temperament, structure, and health.",
  },
  {
    title: "Health Testing Explained",
    href: "/learn/health-testing-explained",
    description:
      "Learn about OFA hips, elbows, CAER eye exams, and genetic panels. Why health testing matters and what to look for in a breeder.",
  },
  {
    title: "Puppy Development Stages",
    href: "/learn/puppy-development-stages",
    description:
      "Week by week -- what happens from birth to 8 weeks and why this period is critical for your puppy's lifelong behavior.",
  },
  {
    title: "Preparing for Your Puppy",
    href: "/learn/preparing-for-your-puppy",
    description:
      "Everything you need before your puppy comes home -- supplies, puppy-proofing, vet visits, and setting up for success.",
  },
  {
    title: "Flight Nanny & Worldwide Shipping",
    href: "/learn/flight-nanny-shipping",
    description:
      "How our flight nanny service works -- safe in-cabin travel, what to expect, and how we deliver puppies anywhere in the world.",
  },
];

export default function LearnPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Learn", url: `${SITE.url}/learn` },
        ])}
      />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Knowledgebase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Learn About English Cream Goldens
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about the breed, health testing, puppy
            development, and what to expect.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="bg-card border border-border rounded-2xl p-8 hover:border-gold/30 transition-colors group"
              >
                <h2 className="font-serif text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {article.description}
                </p>
                <span className="text-gold text-sm font-bold">
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

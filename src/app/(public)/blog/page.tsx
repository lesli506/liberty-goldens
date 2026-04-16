import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { getDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: `Tips, stories, and guides from ${SITE.name}. Learn about English Cream Golden Retrievers, puppy care, training, health, and life with a Golden.`,
};

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
}

export default function BlogIndexPage() {
  const db = getDb();
  const posts = db
    .prepare(
      "SELECT id, title, slug, excerpt, featured_image, published_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC"
    )
    .all() as BlogPost[];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            From Our Family to Yours
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Blog
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Stories, tips, and guides about life with English Cream Golden
            Retrievers.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted text-lg">
                Blog posts coming soon! In the meantime, check out our{" "}
                <Link href="/learn" className="text-gold hover:underline">
                  knowledgebase
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all"
                >
                  <Link href={`/blog/${post.slug}`} className="block p-8">
                    <time className="text-gold text-xs font-bold uppercase tracking-widest">
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="font-serif text-2xl font-bold text-cream mt-2 mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="text-gold text-sm font-bold mt-4 inline-block">
                      Read more &rarr;
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-cream mb-4">
            Want a Liberty Puppy?
          </h2>
          <p className="text-muted mb-8">
            Our puppies sell before they are born. Apply early to get on our
            waiting list.
          </p>
          <Link
            href="/puppies/apply"
            className="inline-block bg-gold text-warm-white px-8 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Apply for a Puppy
          </Link>
        </div>
      </section>
    </>
  );
}

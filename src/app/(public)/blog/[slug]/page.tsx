import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/constants";
import { getDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { ShareButtons } from "@/components/share-buttons";

export const dynamic = "force-dynamic";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  featured_image: string | null;
  status: string;
  published_at: string;
  updated_at: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const db = getDb();
  const post = db
    .prepare("SELECT title, excerpt, slug FROM blog_posts WHERE slug = ? AND status = 'published'")
    .get(slug) as { title: string; excerpt: string; slug: string } | undefined;

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || `${post.title} -- ${SITE.name} blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} -- ${SITE.name} blog`,
      url: `${SITE.url}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const db = getDb();
  const post = db
    .prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'")
    .get(slug) as BlogPost | undefined;

  if (!post) notFound();

  const publishDate = new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: SITE.owner },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  // Get prev/next posts for navigation
  const prevPost = db
    .prepare(
      "SELECT title, slug FROM blog_posts WHERE status = 'published' AND published_at < ? ORDER BY published_at DESC LIMIT 1"
    )
    .get(post.published_at) as { title: string; slug: string } | undefined;
  const nextPost = db
    .prepare(
      "SELECT title, slug FROM blog_posts WHERE status = 'published' AND published_at > ? ORDER BY published_at ASC LIMIT 1"
    )
    .get(post.published_at) as { title: string; slug: string } | undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: post.title, url: `${SITE.url}/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={articleSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <time className="text-gold font-bold text-sm uppercase tracking-widest">
            {publishDate}
          </time>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mt-4 mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div
            className="prose prose-liberty text-muted leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
          </div>

          {/* Prev/Next */}
          {(prevPost || nextPost) && (
            <div className="mt-8 flex justify-between gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="text-muted hover:text-gold transition-colors text-sm"
                >
                  &larr; {prevPost.title}
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="text-muted hover:text-gold transition-colors text-sm text-right"
                >
                  {nextPost.title} &rarr;
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* CTA */}
          <section className="mt-12 bg-card border border-gold/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-cream mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Our English Cream Golden Retriever puppies are raised in our home
              with love, health testing, and early neurological stimulation.
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

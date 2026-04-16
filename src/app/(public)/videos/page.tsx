import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { YouTubeEmbed } from "@/components/youtube-embed";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Videos",
  description: `Watch videos of our English Cream Golden Retriever puppies, parents, and daily life at ${SITE.name} in Knox, Indiana.`,
};

interface Video {
  id: number;
  youtube_id: string;
  title: string;
}

export default function VideosPage() {
  const db = getDb();
  const videos = db
    .prepare("SELECT * FROM videos WHERE show_on_videos = 1 ORDER BY sort_order ASC, id ASC")
    .all() as Video[];

  const videoSchemas = videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title || "Liberty Goldens Video",
    description: `Video from ${SITE.name}`,
    thumbnailUrl: `https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${v.youtube_id}`,
    uploadDate: new Date().toISOString().split("T")[0],
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Videos", url: `${SITE.url}/videos` },
        ])}
      />
      {videoSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">
            Video Gallery
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Our Videos
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-6">
            See our puppies, parents, and daily life at Liberty Goldens.
          </p>
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#CC0000] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((v) => (
                <YouTubeEmbed
                  key={v.id}
                  videoId={v.youtube_id}
                  title={v.title || undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted text-lg">
                Videos coming soon. Check back or follow us on social media.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

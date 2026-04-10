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
          <p className="text-muted text-lg max-w-2xl mx-auto">
            See our puppies, parents, and daily life at Liberty Goldens.
          </p>
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

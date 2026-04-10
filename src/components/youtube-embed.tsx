"use client";

import { useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

/**
 * YouTube facade pattern: renders a static thumbnail image first,
 * only loads the iframe when the user clicks play.
 * This keeps page weight near zero until interaction.
 */
export function YouTubeEmbed({ videoId, title, className }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden ${className || ""}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className={`relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer ${className || ""}`}
      aria-label={`Play video: ${title || "Video"}`}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title || "Video thumbnail"}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-navy ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Title bar */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-sm font-medium">{title}</p>
        </div>
      )}
    </button>
  );
}

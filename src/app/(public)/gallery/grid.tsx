"use client";

import { useState } from "react";

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
}

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const current = lightbox !== null ? photos[lightbox] : null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightbox(i)}
            className="aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gold"
            aria-label="Close"
          >
            &times;
          </button>
          {lightbox > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox - 1);
              }}
              className="absolute left-4 text-white text-4xl hover:text-gold"
              aria-label="Previous"
            >
              &#8249;
            </button>
          )}
          {lightbox < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox + 1);
              }}
              className="absolute right-4 text-white text-4xl hover:text-gold"
              aria-label="Next"
            >
              &#8250;
            </button>
          )}
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

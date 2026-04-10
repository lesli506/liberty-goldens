/**
 * Extract YouTube video ID from various URL formats.
 * Ported from rosebull admin.php regex.
 */
export function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  if (match) return match[1];

  // Handle bare video ID (11 chars, alphanumeric + hyphen + underscore)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();

  return null;
}

export function youtubeThumbnail(
  id: string,
  quality: "default" | "mqdefault" | "hqdefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}`;
}

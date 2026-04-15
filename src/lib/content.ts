import { getDb } from "./db";

interface ContentBlock {
  id: number;
  page_slug: string;
  block_key: string;
  label: string;
  content: string;
  block_type: string;
  sort_order: number;
}

/**
 * Get a single content block value. Returns fallback if not found.
 */
export function getContent(page: string, key: string, fallback = ""): string {
  const db = getDb();
  const row = db
    .prepare("SELECT content FROM content_blocks WHERE page_slug = ? AND block_key = ?")
    .get(page, key) as { content: string } | undefined;
  return row?.content || fallback;
}

/**
 * Get all content blocks for a page, keyed by block_key.
 */
export function getPageContent(page: string): Record<string, string> {
  const db = getDb();
  const rows = db
    .prepare("SELECT block_key, content FROM content_blocks WHERE page_slug = ? ORDER BY sort_order ASC")
    .all(page) as { block_key: string; content: string }[];
  const result: Record<string, string> = {};
  for (const row of rows) {
    result[row.block_key] = row.content;
  }
  return result;
}

/**
 * Get all content blocks (for admin).
 */
export function getAllContent(): ContentBlock[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM content_blocks ORDER BY page_slug ASC, sort_order ASC")
    .all() as ContentBlock[];
}

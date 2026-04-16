import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const posts = db
    .prepare("SELECT * FROM blog_posts ORDER BY created_at DESC")
    .all();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, excerpt, body, status } = await req.json();
  if (!title)
    return NextResponse.json({ error: "Title required" }, { status: 400 });

  const db = getDb();
  const slug = toSlug(title);

  // Check for duplicate slug
  const existing = db
    .prepare("SELECT id FROM blog_posts WHERE slug = ?")
    .get(slug);
  if (existing)
    return NextResponse.json({ error: "A post with a similar title already exists" }, { status: 400 });

  const publishedAt =
    status === "published" ? new Date().toISOString() : null;

  db.prepare(
    "INSERT INTO blog_posts (title, slug, excerpt, body, status, published_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(title, slug, excerpt || "", body || "", status || "draft", publishedAt);

  return NextResponse.json({ success: true, slug });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const allowed = ["title", "slug", "excerpt", "body", "featured_image", "status"];
  const updates: string[] = ["updated_at = datetime('now')"];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (key in fields) {
      updates.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }

  // Auto-set published_at when publishing
  if (fields.status === "published") {
    const post = db.prepare("SELECT published_at FROM blog_posts WHERE id = ?").get(id) as { published_at: string | null } | undefined;
    if (post && !post.published_at) {
      updates.push("published_at = datetime('now')");
    }
  }

  values.push(id);
  db.prepare(
    `UPDATE blog_posts SET ${updates.join(", ")} WHERE id = ?`
  ).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

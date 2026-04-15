import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const blocks = db
    .prepare("SELECT * FROM content_blocks ORDER BY page_slug ASC, sort_order ASC")
    .all();
  return NextResponse.json(blocks);
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, content } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  db.prepare(
    "UPDATE content_blocks SET content = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(content ?? "", id);

  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { page_slug, block_key, label, content, block_type } = await req.json();
  if (!page_slug || !block_key || !label) {
    return NextResponse.json({ error: "page_slug, block_key, and label required" }, { status: 400 });
  }

  const db = getDb();
  const maxOrder = db
    .prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM content_blocks WHERE page_slug = ?")
    .get(page_slug) as { next: number };

  db.prepare(
    "INSERT OR REPLACE INTO content_blocks (page_slug, block_key, label, content, block_type, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))"
  ).run(page_slug, block_key, label, content ?? "", block_type ?? "text", maxOrder.next);

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  db.prepare("DELETE FROM content_blocks WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}

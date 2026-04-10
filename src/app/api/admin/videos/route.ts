import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { extractYoutubeId } from "@/lib/youtube";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const videos = db.prepare("SELECT * FROM videos ORDER BY sort_order ASC, id ASC").all();
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { url } = await req.json();
  const youtubeId = extractYoutubeId(url);
  if (!youtubeId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }
  const db = getDb();
  const maxOrder = db.prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM videos").get() as { next: number };
  db.prepare("INSERT OR IGNORE INTO videos (youtube_id, sort_order) VALUES (?, ?)").run(youtubeId, maxOrder.next);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const allowed = ["title", "sort_order", "show_on_homepage", "show_on_videos"];
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (key in fields) {
      updates.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }
  if (updates.length === 0) return NextResponse.json({ error: "No fields" }, { status: 400 });

  values.push(id);
  db.prepare(`UPDATE videos SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM videos WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

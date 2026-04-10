import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";

const PHOTO_DIR =
  process.env.NODE_ENV === "production"
    ? "/app/data/photos"
    : path.join(process.cwd(), "data", "photos");

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const photos = db.prepare("SELECT * FROM photos ORDER BY sort_order ASC, id ASC").all();
  return NextResponse.json(photos);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const altText = (formData.get("alt_text") as string) || "";
  const category = (formData.get("category") as string) || "general";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Ensure photo dir exists
  if (!fs.existsSync(PHOTO_DIR)) {
    fs.mkdirSync(PHOTO_DIR, { recursive: true });
  }

  // Generate unique filename
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filePath = path.join(PHOTO_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  const db = getDb();
  const maxOrder = db.prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM photos").get() as { next: number };
  db.prepare(
    "INSERT INTO photos (filename, alt_text, category, sort_order) VALUES (?, ?, ?, ?)"
  ).run(filename, altText, category, maxOrder.next);

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const allowed = ["alt_text", "sort_order", "show_on_homepage", "show_on_gallery"];
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
  db.prepare(`UPDATE photos SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const photo = db.prepare("SELECT filename FROM photos WHERE id = ?").get(id) as { filename: string } | undefined;

  if (photo) {
    const filePath = path.join(PHOTO_DIR, photo.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  db.prepare("DELETE FROM photos WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

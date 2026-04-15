import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const dogs = db.prepare("SELECT * FROM dogs ORDER BY sort_order ASC, id ASC").all();
  return NextResponse.json(dogs);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, registered_name, role, bio, ofa_hips, ofa_elbows, caer_eyes, genetic_panel, titles } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const db = getDb();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const maxOrder = db.prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM dogs").get() as { next: number };
  db.prepare(
    `INSERT INTO dogs (name, registered_name, slug, role, bio, ofa_hips, ofa_elbows, caer_eyes, genetic_panel, titles, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    name,
    registered_name || null,
    slug,
    role || "dam",
    bio || null,
    ofa_hips || null,
    ofa_elbows || null,
    caer_eyes || null,
    genetic_panel || null,
    titles || null,
    maxOrder.next
  );

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const allowed = ["name", "registered_name", "role", "bio", "ofa_hips", "ofa_elbows", "caer_eyes", "genetic_panel", "titles", "is_active", "sort_order", "pedigree_data", "show_pedigree"];
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (key in fields) {
      updates.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }
  if (updates.length === 0) return NextResponse.json({ error: "No fields" }, { status: 400 });

  // Update slug if name changed
  if ("name" in fields) {
    const slug = (fields.name as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    updates.push("slug = ?");
    values.push(slug);
  }

  values.push(id);
  db.prepare(`UPDATE dogs SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM dogs WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

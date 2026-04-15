import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const litters = db.prepare(
    `SELECT l.*,
       s.name as sire_name,
       d.name as dam_name,
       (SELECT COUNT(*) FROM puppies p WHERE p.litter_id = l.id) as actual_puppy_count
     FROM litters l
     LEFT JOIN dogs s ON l.sire_id = s.id
     LEFT JOIN dogs d ON l.dam_id = d.id
     ORDER BY l.created_at DESC`
  ).all();
  return NextResponse.json(litters);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, sire_id, dam_id, birth_date, expected_date, status, puppy_count, notes } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const db = getDb();
  const result = db.prepare(
    `INSERT INTO litters (name, sire_id, dam_id, birth_date, expected_date, status, puppy_count, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    name,
    sire_id || null,
    dam_id || null,
    birth_date || null,
    expected_date || null,
    status || "planned",
    puppy_count || 0,
    notes || null
  );

  return NextResponse.json({ success: true, id: result.lastInsertRowid });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const allowed = ["name", "sire_id", "dam_id", "birth_date", "expected_date", "status", "puppy_count", "notes"];
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (key in fields) {
      updates.push(`${key} = ?`);
      values.push(fields[key] ?? null);
    }
  }
  if (updates.length === 0) return NextResponse.json({ error: "No fields" }, { status: 400 });

  values.push(id);
  db.prepare(`UPDATE litters SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  // Unlink puppies from this litter before deleting
  db.prepare("UPDATE puppies SET litter_id = NULL WHERE litter_id = ?").run(id);
  db.prepare("DELETE FROM waitlist WHERE litter_id = ?").run(id);
  db.prepare("DELETE FROM litters WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

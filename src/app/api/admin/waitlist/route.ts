import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const entries = db.prepare(
    `SELECT w.*,
       l.name as litter_name,
       p.name as puppy_name
     FROM waitlist w
     LEFT JOIN litters l ON w.litter_id = l.id
     LEFT JOIN puppies p ON w.assigned_puppy_id = p.id
     ORDER BY w.position ASC, w.created_at ASC`
  ).all();
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, email, phone, preferred_sex, preferred_color, deposit_paid, deposit_amount, deposit_date, litter_id, notes } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const db = getDb();
  const maxPos = db.prepare("SELECT COALESCE(MAX(position), 0) + 1 as next FROM waitlist").get() as { next: number };

  const result = db.prepare(
    `INSERT INTO waitlist (name, email, phone, preferred_sex, preferred_color, deposit_paid, deposit_amount, deposit_date, position, litter_id, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'waiting', ?)`
  ).run(
    name,
    email || null,
    phone || null,
    preferred_sex || null,
    preferred_color || null,
    deposit_paid ? 1 : 0,
    deposit_amount || null,
    deposit_date || null,
    maxPos.next,
    litter_id || null,
    notes || null
  );

  return NextResponse.json({ success: true, id: result.lastInsertRowid });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const allowed = ["name", "email", "phone", "preferred_sex", "preferred_color", "deposit_paid", "deposit_amount", "deposit_date", "position", "litter_id", "assigned_puppy_id", "status", "notes"];
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
  db.prepare(`UPDATE waitlist SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM waitlist WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

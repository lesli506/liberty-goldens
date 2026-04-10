import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const puppies = db.prepare("SELECT * FROM puppies ORDER BY sort_order ASC, id ASC").all();
  return NextResponse.json(puppies);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, sex, color, status } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const db = getDb();
  const maxOrder = db.prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM puppies").get() as { next: number };
  db.prepare(
    "INSERT INTO puppies (name, sex, color, status, sort_order) VALUES (?, ?, ?, ?, ?)"
  ).run(name, sex || null, color || null, status || "available", maxOrder.next);

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const allowed = ["name", "sex", "color", "status", "sort_order"];
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
  db.prepare(`UPDATE puppies SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM puppies WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

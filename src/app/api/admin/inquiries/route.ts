import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendStatusEmail } from "@/lib/email";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const inquiries = db.prepare(
    `SELECT i.*, p.name as puppy_name
     FROM inquiries i
     LEFT JOIN puppies p ON i.assigned_puppy_id = p.id
     ORDER BY i.created_at DESC`
  ).all();
  return NextResponse.json(inquiries);
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();

  // Get current inquiry before update (for email triggers)
  const current = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(id) as {
    status: string; name: string; email: string; type: string;
  } | undefined;
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const allowed = ["status", "notes", "assigned_puppy_id"];
  const updates: string[] = ["updated_at = datetime('now')"];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (key in fields) {
      updates.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }

  values.push(id);
  db.prepare(`UPDATE inquiries SET ${updates.join(", ")} WHERE id = ?`).run(...values);

  // Trigger email on status change
  if ("status" in fields && fields.status !== current.status && current.email) {
    try {
      await sendStatusEmail(current.email, current.name, fields.status as string);
    } catch (e) {
      console.error("Failed to send status email:", e);
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM inquiries WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

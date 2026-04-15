import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import crypto from "crypto";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const subscribers = db
    .prepare("SELECT * FROM subscribers ORDER BY created_at DESC")
    .all();
  return NextResponse.json(subscribers);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { email, name, source } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const db = getDb();
  const token = crypto.randomBytes(32).toString("hex");

  try {
    db.prepare(
      "INSERT INTO subscribers (email, name, source, unsubscribe_token) VALUES (?, ?, ?, ?)"
    ).run(email.toLowerCase().trim(), name || null, source || "manual", token);
    return NextResponse.json({ success: true });
  } catch {
    // Duplicate email -- just update if re-subscribing
    db.prepare(
      "UPDATE subscribers SET is_subscribed = 1, name = COALESCE(?, name) WHERE email = ?"
    ).run(name || null, email.toLowerCase().trim());
    return NextResponse.json({ success: true, resubscribed: true });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM subscribers WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

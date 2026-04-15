import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get("liberty-admin")?.value === "authenticated";
}

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json([], { status: 401 });
  const db = getDb();
  const broadcasts = db
    .prepare("SELECT * FROM broadcasts ORDER BY created_at DESC")
    .all();
  return NextResponse.json(broadcasts);
}

// Create a draft broadcast
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { subject, body_html } = await req.json();
  if (!subject || !body_html) {
    return NextResponse.json({ error: "Subject and body required" }, { status: 400 });
  }

  const db = getDb();
  const result = db.prepare(
    "INSERT INTO broadcasts (subject, body_html, status) VALUES (?, ?, 'draft')"
  ).run(subject, body_html);

  return NextResponse.json({ success: true, id: result.lastInsertRowid });
}

// Send a broadcast (PUT with id and action: "send")
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, action, subject, body_html } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();

  // Update draft
  if (subject || body_html) {
    const updates: string[] = [];
    const values: unknown[] = [];
    if (subject) { updates.push("subject = ?"); values.push(subject); }
    if (body_html) { updates.push("body_html = ?"); values.push(body_html); }
    values.push(id);
    db.prepare(`UPDATE broadcasts SET ${updates.join(", ")} WHERE id = ? AND status = 'draft'`).run(...values);
  }

  // Send action
  if (action === "send") {
    const broadcast = db.prepare("SELECT * FROM broadcasts WHERE id = ?").get(id) as {
      id: number; subject: string; body_html: string; status: string;
    } | undefined;

    if (!broadcast) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (broadcast.status === "sent") return NextResponse.json({ error: "Already sent" }, { status: 400 });

    const subscribers = db.prepare(
      "SELECT * FROM subscribers WHERE is_subscribed = 1"
    ).all() as { id: number; email: string; name: string | null; unsubscribe_token: string }[];

    if (subscribers.length === 0) {
      return NextResponse.json({ error: "No subscribers" }, { status: 400 });
    }

    const resend = getResend();
    const hostname = new URL(SITE.url).hostname;
    const from = `${SITE.name} <noreply@${hostname}>`;
    let sent = 0;

    // Send in batches of 10 (Resend free tier: 100/day, 1/second)
    for (let i = 0; i < subscribers.length; i += 10) {
      const batch = subscribers.slice(i, i + 10);
      const promises = batch.map((sub) => {
        const unsubLink = `${SITE.url}/unsubscribe?token=${sub.unsubscribe_token}`;
        const firstName = sub.name ? sub.name.split(" ")[0] : "";
        const personalizedHtml = `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            ${firstName ? `<p style="color: #333; font-size: 16px;">Hi ${firstName},</p>` : ""}
            ${broadcast.body_html}
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
            <p style="color: #999; font-size: 12px; text-align: center;">
              ${SITE.name} &middot; ${SITE.address.city}, ${SITE.address.state}<br />
              <a href="${unsubLink}" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        `;

        return resend.emails.send({
          from,
          to: sub.email,
          subject: broadcast.subject,
          html: personalizedHtml,
          replyTo: process.env.BREEDER_EMAIL || SITE.email,
        }).then(() => { sent++; }).catch((err) => {
          console.error(`Failed to send to ${sub.email}:`, err);
        });
      });

      await Promise.all(promises);

      // Rate limit pause between batches
      if (i + 10 < subscribers.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    db.prepare(
      "UPDATE broadcasts SET status = 'sent', recipient_count = ?, sent_at = datetime('now') WHERE id = ?"
    ).run(sent, id);

    return NextResponse.json({ success: true, sent });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM broadcasts WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}

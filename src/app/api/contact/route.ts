import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendToRuth } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const db = getDb();

    // Rate limit -- 1 submission per 5 minutes per IP
    const recent = db
      .prepare(
        `SELECT COUNT(*) as cnt FROM inquiries
         WHERE ip_address = ? AND type = 'contact'
         AND created_at > datetime('now', '-5 minutes')`
      )
      .get(ip) as { cnt: number };

    if (recent.cnt > 0) {
      return NextResponse.json(
        { error: "Please wait a few minutes before sending another message." },
        { status: 429 }
      );
    }

    db.prepare(
      `INSERT INTO inquiries (type, name, email, phone, message, ip_address)
       VALUES ('contact', ?, ?, ?, ?, ?)`
    ).run(name, email, phone || null, message, ip);

    await sendToRuth({
      subject: `New Contact Form -- ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${escapeHtml(phone || "Not provided")}</td></tr>
        </table>
        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendToRuth } from "@/lib/email";
import { addSubscriber } from "@/lib/subscribe";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, website, _t } = data;

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Timing check
    if (typeof _t === "number" && _t < 3000) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    // Gibberish name detection
    const vowelRatio = (name.match(/[aeiouAEIOU]/g) || []).length / name.replace(/\s/g, "").length;
    if (name.length > 5 && vowelRatio < 0.15) {
      return NextResponse.json({ success: true });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const db = getDb();

    // Rate limit
    const recent = db
      .prepare(
        `SELECT COUNT(*) as cnt FROM inquiries
         WHERE ip_address = ? AND type = 'application'
         AND created_at > datetime('now', '-5 minutes')`
      )
      .get(ip) as { cnt: number };

    if (recent.cnt > 0) {
      return NextResponse.json(
        { error: "Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    db.prepare(
      `INSERT INTO inquiries (type, name, email, phone, form_data, ip_address)
       VALUES ('application', ?, ?, ?, ?, ?)`
    ).run(name, email, phone, JSON.stringify(data), ip);

    // Auto-subscribe to email list
    addSubscriber(email, name, "application");

    const h = escapeHtml;

    await sendToRuth({
      subject: `New Puppy Application -- ${name}`,
      replyTo: email,
      html: `
        <h2>New Puppy Application</h2>

        <h3>Contact Info</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px;font-weight:bold">Name</td><td style="padding:6px">${h(name)}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Email</td><td style="padding:6px">${h(email)}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Phone</td><td style="padding:6px">${h(phone)}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Location</td><td style="padding:6px">${h(data.city || "")}, ${h(data.state || "")}</td></tr>
        </table>

        <h3>Home Details</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px;font-weight:bold">Home Type</td><td style="padding:6px">${h(data.home_type || "")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Fenced Yard</td><td style="padding:6px">${h(data.has_yard || "")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Other Pets</td><td style="padding:6px">${h(data.other_pets || "None listed")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Children Ages</td><td style="padding:6px">${h(data.children_ages || "None listed")}</td></tr>
        </table>

        <h3>Experience</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px;font-weight:bold">Dog Experience</td><td style="padding:6px">${h(data.dog_experience || "")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Vet Name</td><td style="padding:6px">${h(data.vet_name || "Not provided")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Vet Phone</td><td style="padding:6px">${h(data.vet_phone || "Not provided")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Why This Breed</td><td style="padding:6px">${h(data.why_breed || "")}</td></tr>
        </table>

        <h3>Preferences</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px;font-weight:bold">Sex Preference</td><td style="padding:6px">${h(data.sex_preference || "No preference")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">Timing</td><td style="padding:6px">${h(data.timing || "")}</td></tr>
          <tr><td style="padding:6px;font-weight:bold">How Found Us</td><td style="padding:6px">${h(data.how_found || "")}</td></tr>
        </table>

        <h3>Acknowledgments</h3>
        <ul>
          <li>Price acknowledged: ${data.acknowledge_price ? "Yes" : "No"}</li>
          <li>Deposit acknowledged: ${data.acknowledge_deposit ? "Yes" : "No"}</li>
          <li>Spay/neuter agreed: ${data.acknowledge_spay_neuter ? "Yes" : "No"}</li>
        </ul>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Application form error:", err);
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

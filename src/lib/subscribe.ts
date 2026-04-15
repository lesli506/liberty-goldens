import { getDb } from "./db";
import crypto from "crypto";

/**
 * Add an email to the subscribers list. Silently skips if already subscribed.
 */
export function addSubscriber(email: string, name?: string, source = "form") {
  const db = getDb();
  const token = crypto.randomBytes(32).toString("hex");

  try {
    db.prepare(
      "INSERT INTO subscribers (email, name, source, unsubscribe_token) VALUES (?, ?, ?, ?)"
    ).run(email.toLowerCase().trim(), name || null, source, token);
  } catch {
    // Already exists -- no-op
  }
}

import { getDb } from "@/lib/db";
import { SITE } from "@/lib/constants";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  let message = "";
  let success = false;

  if (token) {
    const db = getDb();
    const sub = db
      .prepare("SELECT * FROM subscribers WHERE unsubscribe_token = ?")
      .get(token) as { id: number; email: string; is_subscribed: number } | undefined;

    if (sub) {
      if (sub.is_subscribed) {
        db.prepare("UPDATE subscribers SET is_subscribed = 0 WHERE id = ?").run(sub.id);
        message = "You have been unsubscribed. You will no longer receive emails from us.";
        success = true;
      } else {
        message = "You are already unsubscribed.";
        success = true;
      }
    } else {
      message = "Invalid unsubscribe link.";
    }
  } else {
    message = "No unsubscribe token provided.";
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-serif text-3xl font-bold text-cream mb-6">
          {success ? "Unsubscribed" : "Oops"}
        </h1>
        <p className="text-muted text-lg mb-8">{message}</p>
        <Link
          href="/"
          className="bg-gold text-warm-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
        >
          Back to {SITE.name}
        </Link>
      </div>
    </section>
  );
}

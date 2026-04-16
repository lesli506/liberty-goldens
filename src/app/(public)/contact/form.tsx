"use client";

import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [loadedAt] = useState(() => Date.now());

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _t: Date.now() - loadedAt }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-card border border-gold/30 rounded-2xl p-8 text-center">
        <h3 className="font-serif text-2xl font-bold text-cream mb-3">
          Message Sent!
        </h3>
        <p className="text-muted">
          Thank you for reaching out. We will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot -- hidden from humans, bots fill it in */}
      <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-cream mb-1">Name *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-cream mb-1">Email *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-cream mb-1">Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold"
          placeholder="(555) 123-4567"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-cream mb-1">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold resize-none"
          placeholder="Tell us what you are interested in..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-gold text-warm-white px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
    </form>
  );
}

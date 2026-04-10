"use client";

import { useState } from "react";

const STEPS = [
  "Your Info",
  "Your Home",
  "Experience",
  "Preferences",
  "Review & Submit",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  home_type: string;
  has_yard: string;
  other_pets: string;
  children_ages: string;
  dog_experience: string;
  vet_name: string;
  vet_phone: string;
  why_breed: string;
  sex_preference: string;
  timing: string;
  how_found: string;
  acknowledge_price: boolean;
  acknowledge_deposit: boolean;
  acknowledge_spay_neuter: boolean;
}

const initial: FormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  home_type: "",
  has_yard: "",
  other_pets: "",
  children_ages: "",
  dog_experience: "",
  vet_name: "",
  vet_phone: "",
  why_breed: "",
  sex_preference: "",
  timing: "",
  how_found: "",
  acknowledge_price: false,
  acknowledge_deposit: false,
  acknowledge_spay_neuter: false,
};

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const set = (key: keyof FormData, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold";
  const labelClass = "block text-sm font-bold text-cream mb-1";

  async function handleSubmit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-card border border-gold/30 rounded-2xl p-10 text-center max-w-lg">
          <h1 className="font-serif text-3xl font-bold text-cream mb-4">
            Application Submitted!
          </h1>
          <p className="text-muted leading-relaxed">
            Thank you for your interest in a Liberty Goldens puppy. We review
            every application personally and will be in touch soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-3">
            Puppy Application
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
            Apply for a Puppy
          </h1>
          <p className="text-muted">
            Step {step + 1} of {STEPS.length} -- {STEPS[step]}
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i <= step ? "bg-gold" : "bg-card"
              }`}
            />
          ))}
        </div>

        <div className="space-y-5">
          {step === 0 && (
            <>
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputClass}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputClass}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    className={inputClass}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    className={inputClass}
                    placeholder="State"
                  />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label className={labelClass}>Home Type *</label>
                <select
                  required
                  value={form.home_type}
                  onChange={(e) => set("home_type", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment / Condo</option>
                  <option value="farm">Farm / Acreage</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Do you have a fenced yard? *</label>
                <select
                  required
                  value={form.has_yard}
                  onChange={(e) => set("has_yard", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="partial">Partially fenced</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Other Pets</label>
                <input
                  type="text"
                  value={form.other_pets}
                  onChange={(e) => set("other_pets", e.target.value)}
                  className={inputClass}
                  placeholder="List any current pets (type, age)"
                />
              </div>
              <div>
                <label className={labelClass}>Children Ages</label>
                <input
                  type="text"
                  value={form.children_ages}
                  onChange={(e) => set("children_ages", e.target.value)}
                  className={inputClass}
                  placeholder="Ages of children in the home (or 'none')"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className={labelClass}>Dog Experience *</label>
                <textarea
                  required
                  rows={3}
                  value={form.dog_experience}
                  onChange={(e) => set("dog_experience", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your experience with dogs..."
                />
              </div>
              <div>
                <label className={labelClass}>Veterinarian Name</label>
                <input
                  type="text"
                  value={form.vet_name}
                  onChange={(e) => set("vet_name", e.target.value)}
                  className={inputClass}
                  placeholder="Your vet's name or clinic"
                />
              </div>
              <div>
                <label className={labelClass}>Veterinarian Phone</label>
                <input
                  type="tel"
                  value={form.vet_phone}
                  onChange={(e) => set("vet_phone", e.target.value)}
                  className={inputClass}
                  placeholder="Vet phone number"
                />
              </div>
              <div>
                <label className={labelClass}>
                  Why are you interested in this breed? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.why_breed}
                  onChange={(e) => set("why_breed", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="What draws you to English Cream Golden Retrievers?"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className={labelClass}>Sex Preference</label>
                <select
                  value={form.sex_preference}
                  onChange={(e) => set("sex_preference", e.target.value)}
                  className={inputClass}
                >
                  <option value="">No preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>When are you hoping to get a puppy? *</label>
                <input
                  type="text"
                  required
                  value={form.timing}
                  onChange={(e) => set("timing", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., As soon as possible, Summer 2026, etc."
                />
              </div>
              <div>
                <label className={labelClass}>How did you find us? *</label>
                <input
                  type="text"
                  required
                  value={form.how_found}
                  onChange={(e) => set("how_found", e.target.value)}
                  className={inputClass}
                  placeholder="Google, Facebook, referral, Good Dog, etc."
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-xl font-bold text-cream">
                  Please Acknowledge
                </h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.acknowledge_price}
                    onChange={(e) => set("acknowledge_price", e.target.checked)}
                    className="mt-1 accent-gold"
                  />
                  <span className="text-muted text-sm">
                    I understand the puppy price is $3,000.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.acknowledge_deposit}
                    onChange={(e) => set("acknowledge_deposit", e.target.checked)}
                    className="mt-1 accent-gold"
                  />
                  <span className="text-muted text-sm">
                    I understand a $500 non-refundable deposit is required to
                    hold my spot on the waiting list.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.acknowledge_spay_neuter}
                    onChange={(e) =>
                      set("acknowledge_spay_neuter", e.target.checked)
                    }
                    className="mt-1 accent-gold"
                  />
                  <span className="text-muted text-sm">
                    I agree to the spay/neuter agreement for pet puppies.
                  </span>
                </label>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="border border-cream/30 text-cream px-6 py-2.5 rounded-full font-bold hover:border-gold hover:text-gold transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-gold text-navy px-8 py-2.5 rounded-full font-bold hover:bg-gold/90 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                status === "sending" ||
                !form.acknowledge_price ||
                !form.acknowledge_deposit ||
                !form.acknowledge_spay_neuter
              }
              className="bg-gold text-navy px-8 py-2.5 rounded-full font-bold hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

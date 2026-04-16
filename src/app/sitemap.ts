import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";

const BASE = "https://libertyenglishcreamgoldenretrievers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: "/", changeFrequency: "weekly" as const, priority: 1.0 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/our-dogs", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/stud-service", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/puppies", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/puppies/apply", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/videos", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/gallery", changeFrequency: "weekly" as const, priority: 0.6 },
    { url: "/testimonials", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/faq", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/learn", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/learn/what-is-english-cream-golden-retriever", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/learn/english-cream-vs-american-golden", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/learn/health-testing-explained", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/learn/puppy-development-stages", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/learn/preparing-for-your-puppy", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/learn/flight-nanny-shipping", changeFrequency: "monthly" as const, priority: 0.6 },
    // Location index
    { url: "/english-cream-golden-retriever-puppies-in", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Location pages
  const locationPages = LOCATIONS.map((loc) => ({
    url: `/english-cream-golden-retriever-puppies-in/${loc.stateSlug}/${loc.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...locationPages].map((p) => ({
    url: `${BASE}${p.url}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}

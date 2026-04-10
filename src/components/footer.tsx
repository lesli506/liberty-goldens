import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-cream mb-3">
              Liberty English Cream Golden Retrievers
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Champion-sired, OFA health tested English Cream Golden Retriever
              puppies raised in our home in Knox, Indiana. Lifetime breeder support.
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/puppies/apply"
                  className="text-gold text-sm font-bold hover:text-gold/80 transition-colors"
                >
                  Apply for a Puppy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">&#9742;</span>
                <a
                  href={`tel:${SITE.phone}`}
                  className="hover:text-cream transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">&#9993;</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-cream transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">&#9873;</span>
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                </span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href={SITE.social.gooddog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gold hover:text-gold/80 transition-colors"
              >
                Good Dog Certified Breeder &#8599;
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-muted text-xs">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

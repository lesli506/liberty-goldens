"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { SocialLinks } from "./social-links";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-xl sm:text-2xl font-bold text-cream group-hover:text-gold transition-colors">
              Liberty Goldens
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-cream/80 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/puppies/apply"
              className="bg-gold text-navy px-5 py-2 rounded-full text-sm font-bold hover:bg-gold/90 transition-colors"
            >
              Apply for a Puppy
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-cream p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav className="lg:hidden pb-6 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-cream/80 hover:text-gold transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/puppies/apply"
                onClick={() => setOpen(false)}
                className="bg-gold text-navy px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gold/90 transition-colors text-center mt-2"
              >
                Apply for a Puppy
              </Link>
              <div className="mt-3 pt-3 border-t border-white/10">
                <SocialLinks />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

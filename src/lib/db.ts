import Database from "better-sqlite3";
import path from "path";

const DB_PATH =
  process.env.NODE_ENV === "production"
    ? "/app/data/liberty.db"
    : path.join(process.cwd(), "data", "liberty.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      youtube_id TEXT NOT NULL UNIQUE,
      title TEXT,
      category TEXT DEFAULT 'general',
      sort_order INTEGER DEFAULT 0,
      show_on_homepage INTEGER DEFAULT 1,
      show_on_videos INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      alt_text TEXT,
      category TEXT DEFAULT 'general',
      sort_order INTEGER DEFAULT 0,
      show_on_homepage INTEGER DEFAULT 0,
      show_on_gallery INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS dogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      registered_name TEXT,
      slug TEXT UNIQUE,
      role TEXT DEFAULT 'dam',
      bio TEXT,
      photo_filename TEXT,
      ofa_hips TEXT,
      ofa_elbows TEXT,
      caer_eyes TEXT,
      genetic_panel TEXT,
      titles TEXT,
      is_active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS puppies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      sex TEXT,
      color TEXT,
      status TEXT DEFAULT 'available',
      birth_date TEXT,
      litter_name TEXT,
      sire_id INTEGER REFERENCES dogs(id),
      dam_id INTEGER REFERENCES dogs(id),
      photo_filename TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS content_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_slug TEXT NOT NULL,
      block_key TEXT NOT NULL,
      label TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      block_type TEXT NOT NULL DEFAULT 'text',
      sort_order INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now')),
      UNIQUE(page_slug, block_key)
    );

    CREATE TABLE IF NOT EXISTS litters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sire_id INTEGER REFERENCES dogs(id),
      dam_id INTEGER REFERENCES dogs(id),
      birth_date TEXT,
      expected_date TEXT,
      status TEXT DEFAULT 'planned',
      puppy_count INTEGER DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      preferred_sex TEXT,
      preferred_color TEXT,
      deposit_paid INTEGER DEFAULT 0,
      deposit_amount TEXT,
      deposit_date TEXT,
      position INTEGER DEFAULT 0,
      litter_id INTEGER REFERENCES litters(id),
      assigned_puppy_id INTEGER REFERENCES puppies(id),
      status TEXT DEFAULT 'waiting',
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      source TEXT DEFAULT 'manual',
      unsubscribe_token TEXT UNIQUE,
      is_subscribed INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS broadcasts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      body_html TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      recipient_count INTEGER DEFAULT 0,
      sent_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT,
      body TEXT NOT NULL DEFAULT '',
      featured_image TEXT,
      status TEXT DEFAULT 'draft',
      published_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      form_data TEXT,
      ip_address TEXT,
      status TEXT DEFAULT 'new',
      notes TEXT,
      assigned_puppy_id INTEGER REFERENCES puppies(id),
      updated_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed original photos if table is empty
  const photoCount = (db.prepare("SELECT COUNT(*) as c FROM photos").get() as { c: number }).c;
  if (photoCount === 0) {
    const originalPhotos = [
      { filename: "20210605_072919.jpg", alt_text: "Liberty Goldens puppy", category: "puppies" },
      { filename: "Belle-on-bed.jpg", alt_text: "Belle resting", category: "dogs" },
      { filename: "Belle.jpg", alt_text: "Belle", category: "dogs" },
      { filename: "blob-0029.png", alt_text: "Liberty Goldens dog", category: "general" },
      { filename: "blob-0cb2341.png", alt_text: "Liberty Goldens dog", category: "general" },
      { filename: "blob-c2993b0.png", alt_text: "Liberty Goldens dog", category: "general" },
      { filename: "Blue.jpg", alt_text: "Blue", category: "dogs" },
      { filename: "Boone.jpg", alt_text: "Boone", category: "dogs" },
      { filename: "E311D2A0-FA1D-4825-B465-1B018486BBD9.jpeg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "fb_146016960313319_720x960.jpg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "fb_243117973936550_1759x2015.jpg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "fb_336555421259471_1440x1080.jpg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "IMG_0163-0001.jpg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "IMG_1136-b40af65.jpeg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "IMG_7023.jpg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "IMG_7025.jpg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "Indigo.jpeg", alt_text: "Indigo", category: "dogs" },
      { filename: "Lady-ultrasound.png", alt_text: "Lady ultrasound", category: "dogs" },
      { filename: "Photoroom_20240709_230653.jpeg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "Photoroom_20240709_230832-854ec3d.jpeg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "Photoroom_20240709_231036.jpeg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "Photoroom_20240709_231612.jpeg", alt_text: "Liberty Goldens photo", category: "general" },
      { filename: "Sammy.jpg", alt_text: "Sammy the stud", category: "dogs" },
    ];
    const insert = db.prepare(
      "INSERT INTO photos (filename, alt_text, category, sort_order, show_on_gallery) VALUES (?, ?, ?, ?, 1)"
    );
    originalPhotos.forEach((p, i) => insert.run(p.filename, p.alt_text, p.category, i + 1));
  }

  // Migrations for existing databases
  const dogCols = db.prepare("PRAGMA table_info(dogs)").all() as { name: string }[];
  const dogColNames = dogCols.map((c) => c.name);
  if (!dogColNames.includes("pedigree_data")) {
    db.exec(`ALTER TABLE dogs ADD COLUMN pedigree_data TEXT`);
  }
  if (!dogColNames.includes("show_pedigree")) {
    db.exec(`ALTER TABLE dogs ADD COLUMN show_pedigree INTEGER DEFAULT 0`);
  }

  const cols = db.prepare("PRAGMA table_info(inquiries)").all() as { name: string }[];
  const colNames = cols.map((c) => c.name);
  if (!colNames.includes("status")) {
    db.exec(`ALTER TABLE inquiries ADD COLUMN status TEXT DEFAULT 'new'`);
  }
  if (!colNames.includes("notes")) {
    db.exec(`ALTER TABLE inquiries ADD COLUMN notes TEXT`);
  }
  if (!colNames.includes("assigned_puppy_id")) {
    db.exec(`ALTER TABLE inquiries ADD COLUMN assigned_puppy_id INTEGER REFERENCES puppies(id)`);
  }
  if (!colNames.includes("updated_at")) {
    db.exec(`ALTER TABLE inquiries ADD COLUMN updated_at TEXT`);
  }

  // Migration: add litter_id to puppies
  const puppyCols = db.prepare("PRAGMA table_info(puppies)").all() as { name: string }[];
  const puppyColNames = puppyCols.map((c) => c.name);
  if (!puppyColNames.includes("litter_id")) {
    db.exec(`ALTER TABLE puppies ADD COLUMN litter_id INTEGER REFERENCES litters(id)`);
  }

  // Seed content blocks if table is empty
  const contentCount = (db.prepare("SELECT COUNT(*) as c FROM content_blocks").get() as { c: number }).c;
  if (contentCount === 0) {
    const blocks = [
      // Homepage
      { page: "home", key: "hero_eyebrow", label: "Hero Eyebrow Text", content: "Knox, Indiana · Good Dog Certified", type: "text", sort: 1 },
      { page: "home", key: "hero_heading", label: "Hero Heading", content: "Put a Little Love\nin Your Life", type: "text", sort: 2 },
      { page: "home", key: "hero_description", label: "Hero Description", content: "Champion-sired English Cream Golden Retriever puppies, raised in our home with early neurological stimulation, daily socialization, and lifetime breeder support. OFA health tested parents. Flight nanny available worldwide.", type: "textarea", sort: 3 },
      { page: "home", key: "why_heading", label: "Why Choose Us Heading", content: "Why Choose Liberty Goldens?", type: "text", sort: 4 },
      { page: "home", key: "why_description", label: "Why Choose Us Description", content: "We are a small, family breeding program focused on health, temperament, and the bond between dog and family.", type: "textarea", sort: 5 },
      // About
      { page: "about", key: "hero_eyebrow", label: "Hero Eyebrow Text", content: "Our Story", type: "text", sort: 1 },
      { page: "about", key: "hero_heading", label: "Hero Heading", content: "About Liberty English Cream Golden Retrievers", type: "text", sort: 2 },
      { page: "about", key: "hero_description", label: "Hero Description", content: "A small, family breeding program dedicated to producing healthy, well-tempered English Cream Golden Retrievers with champion European bloodlines.", type: "textarea", sort: 3 },
      { page: "about", key: "story", label: "Our Story", content: "I started Liberty English Cream Golden Retrievers because I fell in love with the breed and wanted to share that love with other families. Every puppy we produce is raised in our home with the care and attention they deserve.", type: "textarea", sort: 4 },
      // Puppies
      { page: "puppies", key: "hero_eyebrow", label: "Hero Eyebrow Text", content: "Current Litter", type: "text", sort: 1 },
      { page: "puppies", key: "hero_heading", label: "Hero Heading", content: "Available Puppies", type: "text", sort: 2 },
      { page: "puppies", key: "hero_description", label: "Hero Description", content: "Our puppies are raised in our home with early neurological stimulation, daily socialization, and lifetime breeder support.", type: "textarea", sort: 3 },
      { page: "puppies", key: "pricing_info", label: "Pricing Info", content: "Our English Cream Golden Retriever puppies are $3,000. A $500 non-refundable deposit is required to reserve your puppy.", type: "textarea", sort: 4 },
      // Contact
      { page: "contact", key: "hero_eyebrow", label: "Hero Eyebrow Text", content: "Get in Touch", type: "text", sort: 1 },
      { page: "contact", key: "hero_heading", label: "Hero Heading", content: "Contact Us", type: "text", sort: 2 },
      { page: "contact", key: "hero_description", label: "Hero Description", content: "Have questions about our puppies or want to schedule a visit? We would love to hear from you.", type: "textarea", sort: 3 },
    ];
    const insertBlock = db.prepare(
      "INSERT INTO content_blocks (page_slug, block_key, label, content, block_type, sort_order) VALUES (?, ?, ?, ?, ?, ?)"
    );
    for (const b of blocks) {
      insertBlock.run(b.page, b.key, b.label, b.content, b.type, b.sort);
    }
  }

  return db;
}

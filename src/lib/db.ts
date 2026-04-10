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

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      form_data TEXT,
      ip_address TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  return db;
}

"use client";

import { useState, useEffect, useCallback } from "react";

type Tab = "dogs" | "litters" | "puppies" | "waitlist" | "inquiries" | "email" | "blog" | "photos" | "videos" | "content";

interface Video {
  id: number;
  youtube_id: string;
  title: string;
  sort_order: number;
  show_on_homepage: number;
  show_on_videos: number;
}

interface Photo {
  id: number;
  filename: string;
  alt_text: string;
  category: string;
  sort_order: number;
  show_on_homepage: number;
  show_on_gallery: number;
}

interface Puppy {
  id: number;
  name: string;
  sex: string;
  color: string;
  status: string;
  sort_order: number;
}

interface Dog {
  id: number;
  name: string;
  registered_name: string;
  role: string;
  bio: string;
  ofa_hips: string;
  ofa_elbows: string;
  caer_eyes: string;
  genetic_panel: string;
  titles: string;
  is_active: number;
  sort_order: number;
  pedigree_data: string | null;
  show_pedigree: number;
}

interface Inquiry {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  form_data: string;
  status: string;
  notes: string;
  assigned_puppy_id: number | null;
  puppy_name: string | null;
  created_at: string;
  updated_at: string;
}

const btnClass =
  "px-3 py-1.5 rounded text-xs font-bold transition-colors";
const inputClass =
  "bg-navy border border-border rounded px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold";

interface Litter {
  id: number;
  name: string;
  sire_id: number | null;
  dam_id: number | null;
  sire_name: string | null;
  dam_name: string | null;
  birth_date: string | null;
  expected_date: string | null;
  status: string;
  puppy_count: number;
  actual_puppy_count: number;
  notes: string | null;
}

interface WaitlistEntry {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  preferred_sex: string | null;
  preferred_color: string | null;
  deposit_paid: number;
  deposit_amount: string | null;
  deposit_date: string | null;
  position: number;
  litter_id: number | null;
  litter_name: string | null;
  assigned_puppy_id: number | null;
  puppy_name: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

interface Subscriber {
  id: number;
  email: string;
  name: string | null;
  source: string;
  is_subscribed: number;
  created_at: string;
}

interface Broadcast {
  id: number;
  subject: string;
  body_html: string;
  status: string;
  recipient_count: number;
  sent_at: string | null;
  created_at: string;
}

interface ContentBlock {
  id: number;
  page_slug: string;
  block_key: string;
  label: string;
  content: string;
  block_type: string;
  sort_order: number;
}

const TAB_LABELS: Record<Tab, string> = {
  content: "Site Content",
  dogs: "Dogs",
  litters: "Litters",
  puppies: "Puppies",
  waitlist: "Waitlist",
  inquiries: "Inquiries",
  email: "Email",
  blog: "Blog",
  photos: "Photos",
  videos: "Videos",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("dogs");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Welcome banner */}
      <div className="bg-card border border-border rounded-2xl px-8 py-6 mb-10 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-cream">
            {getGreeting()}! Welcome back.
          </h1>
          <p className="text-muted text-sm mt-2">{today}</p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs text-muted uppercase tracking-wide font-bold">Liberty English Cream</p>
          <p className="text-xs text-muted">Golden Retrievers</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
              tab === t
                ? "bg-gold text-warm-white shadow-sm"
                : "bg-card border border-border text-muted hover:text-cream hover:border-gold"
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {tab === "content" && <ContentTab />}
      {tab === "dogs" && <DogsTab />}
      {tab === "litters" && <LittersTab />}
      {tab === "puppies" && <PuppiesTab />}
      {tab === "waitlist" && <WaitlistTab />}
      {tab === "inquiries" && <InquiriesTab />}
      {tab === "email" && <EmailTab />}
      {tab === "blog" && <BlogTab />}
      {tab === "photos" && <PhotosTab />}
      {tab === "videos" && <VideosTab />}
    </div>
  );
}

/* ============ CONTENT TAB ============ */
function ContentTab() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [activePage, setActivePage] = useState<string>("home");
  const [saving, setSaving] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [newBlock, setNewBlock] = useState({ block_key: "", label: "", block_type: "text" });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    setBlocks(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const pages = [...new Set(blocks.map((b) => b.page_slug))];
  const pageBlocks = blocks.filter((b) => b.page_slug === activePage);

  async function saveBlock(id: number, content: string) {
    setSaving(id);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, content }),
    });
    setSaving(null);
    load();
  }

  async function addBlock() {
    if (!newBlock.block_key.trim() || !newBlock.label.trim()) return;
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_slug: activePage, ...newBlock, content: "" }),
    });
    setNewBlock({ block_key: "", label: "", block_type: "text" });
    setAdding(false);
    load();
  }

  async function removeBlock(id: number) {
    if (!confirm("Delete this content block?")) return;
    await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const PAGE_LABELS: Record<string, string> = {
    home: "Homepage",
    about: "About",
    puppies: "Puppies",
    contact: "Contact",
  };

  return (
    <div>
      <p className="text-muted text-sm mb-4">
        Edit the text that appears on your website. Changes show up immediately.
      </p>

      {/* Page selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setActivePage(p)}
            className={`${btnClass} ${
              activePage === p
                ? "bg-gold text-warm-white"
                : "bg-card border border-border text-muted hover:text-cream"
            }`}
          >
            {PAGE_LABELS[p] || p}
          </button>
        ))}
      </div>

      {/* Content blocks for selected page */}
      <div className="space-y-4">
        {pageBlocks.map((block) => (
          <div key={block.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-cream">{block.label}</label>
              <div className="flex items-center gap-2">
                {saving === block.id && (
                  <span className="text-xs text-gold">Saving...</span>
                )}
                <span className="text-xs text-muted">{block.block_key}</span>
                <button
                  onClick={() => removeBlock(block.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
            {block.block_type === "textarea" ? (
              <textarea
                defaultValue={block.content}
                onBlur={(e) => {
                  if (e.target.value !== block.content) {
                    saveBlock(block.id, e.target.value);
                  }
                }}
                rows={4}
                className={`${inputClass} w-full`}
              />
            ) : (
              <input
                type="text"
                defaultValue={block.content}
                onBlur={(e) => {
                  if (e.target.value !== block.content) {
                    saveBlock(block.id, e.target.value);
                  }
                }}
                className={`${inputClass} w-full`}
              />
            )}
          </div>
        ))}

        {pageBlocks.length === 0 && (
          <p className="text-muted text-sm">No content blocks for this page yet.</p>
        )}
      </div>

      {/* Add new block */}
      <div className="mt-6 pt-4 border-t border-border">
        {adding ? (
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <p className="text-sm font-bold text-cream">Add Content Block to {PAGE_LABELS[activePage] || activePage}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                value={newBlock.label}
                onChange={(e) => setNewBlock({ ...newBlock, label: e.target.value })}
                placeholder="Label (e.g., Hero Heading)"
                className={inputClass}
              />
              <input
                value={newBlock.block_key}
                onChange={(e) => setNewBlock({ ...newBlock, block_key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_") })}
                placeholder="Key (e.g., hero_heading)"
                className={inputClass}
              />
              <select
                value={newBlock.block_type}
                onChange={(e) => setNewBlock({ ...newBlock, block_type: e.target.value })}
                className={inputClass}
              >
                <option value="text">Short Text</option>
                <option value="textarea">Long Text</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={addBlock} className={`${btnClass} bg-gold text-warm-white`}>Add Block</button>
              <button onClick={() => setAdding(false)} className={`${btnClass} bg-navy text-muted`}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className={`${btnClass} bg-navy text-muted hover:text-cream`}>
            + Add Content Block
          </button>
        )}
      </div>
    </div>
  );
}

/* ============ LITTERS TAB ============ */
const LITTER_STATUSES = ["planned", "expected", "born", "available", "placed"] as const;
const LITTER_STATUS_COLORS: Record<string, string> = {
  planned: "bg-gray-700 text-gray-300",
  expected: "bg-purple-900/50 text-purple-300",
  born: "bg-blue-900/50 text-blue-300",
  available: "bg-green-900/50 text-green-300",
  placed: "bg-gold/20 text-gold",
};

function LittersTab() {
  const [litters, setLitters] = useState<Litter[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", sire_id: "", dam_id: "", birth_date: "", expected_date: "",
    status: "planned", puppy_count: "0", notes: "",
  });

  const load = useCallback(async () => {
    const [litRes, dogRes] = await Promise.all([
      fetch("/api/admin/litters"),
      fetch("/api/admin/dogs"),
    ]);
    setLitters(await litRes.json());
    setDogs(await dogRes.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const studs = dogs.filter((d) => d.role === "stud" && d.is_active);
  const dams = dogs.filter((d) => d.role === "dam" && d.is_active);

  function resetForm() {
    setForm({ name: "", sire_id: "", dam_id: "", birth_date: "", expected_date: "", status: "planned", puppy_count: "0", notes: "" });
    setEditId(null);
    setShowForm(false);
  }

  function startEdit(l: Litter) {
    setForm({
      name: l.name, sire_id: l.sire_id?.toString() || "", dam_id: l.dam_id?.toString() || "",
      birth_date: l.birth_date || "", expected_date: l.expected_date || "",
      status: l.status, puppy_count: l.puppy_count.toString(), notes: l.notes || "",
    });
    setEditId(l.id);
    setShowForm(true);
  }

  async function save() {
    if (!form.name.trim()) return;
    const method = editId ? "PUT" : "POST";
    const body = {
      ...(editId ? { id: editId } : {}),
      name: form.name,
      sire_id: form.sire_id ? Number(form.sire_id) : null,
      dam_id: form.dam_id ? Number(form.dam_id) : null,
      birth_date: form.birth_date || null,
      expected_date: form.expected_date || null,
      status: form.status,
      puppy_count: Number(form.puppy_count) || 0,
      notes: form.notes || null,
    };
    await fetch("/api/admin/litters", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    resetForm();
    load();
  }

  async function updateStatus(id: number, status: string) {
    await fetch("/api/admin/litters", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this litter? Puppies will be unlinked but not deleted.")) return;
    await fetch("/api/admin/litters", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted text-sm">{litters.length} litter{litters.length !== 1 ? "s" : ""}</p>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className={`${btnClass} bg-gold text-warm-white`}>
          {showForm ? "Cancel" : "New Litter"}
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-4 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Litter name *" className={inputClass} />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
              {LITTER_STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select value={form.sire_id} onChange={(e) => setForm({ ...form, sire_id: e.target.value })} className={inputClass}>
              <option value="">-- Select Sire --</option>
              {studs.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <select value={form.dam_id} onChange={(e) => setForm({ ...form, dam_id: e.target.value })} className={inputClass}>
              <option value="">-- Select Dam --</option>
              {dams.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <div>
              <label className="text-xs text-muted block mb-1">Expected Date</label>
              <input type="date" value={form.expected_date} onChange={(e) => setForm({ ...form, expected_date: e.target.value })} className={inputClass + " w-full"} />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Birth Date</label>
              <input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} className={inputClass + " w-full"} />
            </div>
            <input type="number" value={form.puppy_count} onChange={(e) => setForm({ ...form, puppy_count: e.target.value })} placeholder="Puppy count" className={inputClass} />
          </div>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" rows={2} className={`${inputClass} w-full`} />
          <button onClick={save} className={`${btnClass} bg-gold text-warm-white`}>
            {editId ? "Update Litter" : "Create Litter"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {litters.map((l) => (
          <div key={l.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <span className="text-cream font-bold text-lg">{l.name}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${LITTER_STATUS_COLORS[l.status] || "bg-gray-700 text-gray-300"}`}>
                    {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                  </span>
                  {l.sire_name && <span className="text-xs text-blue-300">Sire: {l.sire_name}</span>}
                  {l.dam_name && <span className="text-xs text-pink-300">Dam: {l.dam_name}</span>}
                  <span className="text-xs text-muted">{l.actual_puppy_count} puppy/ies linked</span>
                </div>
                {l.expected_date && <p className="text-xs text-muted mt-1">Expected: {l.expected_date}</p>}
                {l.birth_date && <p className="text-xs text-muted">Born: {l.birth_date}</p>}
                {l.notes && <p className="text-xs text-muted mt-1 italic">{l.notes}</p>}
              </div>
              <select
                value={l.status}
                onChange={(e) => updateStatus(l.id, e.target.value)}
                className={inputClass + " text-xs"}
              >
                {LITTER_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
              <button onClick={() => startEdit(l)} className={`${btnClass} bg-navy text-muted hover:text-cream`}>Edit</button>
              <button onClick={() => remove(l.id)} className={`${btnClass} bg-red-900/50 text-red-300`}>Delete</button>
            </div>
          </div>
        ))}
        {litters.length === 0 && <p className="text-muted text-sm">No litters yet. Create your first litter to start tracking.</p>}
      </div>
    </div>
  );
}

/* ============ WAITLIST TAB ============ */
const WAITLIST_STATUSES = ["waiting", "matched", "deposit_paid", "completed", "cancelled"] as const;
const WAITLIST_STATUS_COLORS: Record<string, string> = {
  waiting: "bg-blue-900/50 text-blue-300",
  matched: "bg-purple-900/50 text-purple-300",
  deposit_paid: "bg-green-900/50 text-green-300",
  completed: "bg-gold/20 text-gold",
  cancelled: "bg-red-900/50 text-red-300",
};

function WaitlistTab() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [litters, setLitters] = useState<Litter[]>([]);
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", preferred_sex: "", preferred_color: "",
    deposit_paid: false, deposit_amount: "", deposit_date: "", litter_id: "", notes: "",
  });

  const load = useCallback(async () => {
    const [wRes, lRes, pRes] = await Promise.all([
      fetch("/api/admin/waitlist"),
      fetch("/api/admin/litters"),
      fetch("/api/admin/puppies"),
    ]);
    setEntries(await wRes.json());
    setLitters(await lRes.json());
    setPuppies(await pRes.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setForm({ name: "", email: "", phone: "", preferred_sex: "", preferred_color: "", deposit_paid: false, deposit_amount: "", deposit_date: "", litter_id: "", notes: "" });
    setEditId(null);
    setShowForm(false);
  }

  function startEdit(w: WaitlistEntry) {
    setForm({
      name: w.name, email: w.email || "", phone: w.phone || "",
      preferred_sex: w.preferred_sex || "", preferred_color: w.preferred_color || "",
      deposit_paid: !!w.deposit_paid, deposit_amount: w.deposit_amount || "",
      deposit_date: w.deposit_date || "", litter_id: w.litter_id?.toString() || "",
      notes: w.notes || "",
    });
    setEditId(w.id);
    setShowForm(true);
  }

  async function save() {
    if (!form.name.trim()) return;
    const method = editId ? "PUT" : "POST";
    const body = {
      ...(editId ? { id: editId } : {}),
      name: form.name, email: form.email || null, phone: form.phone || null,
      preferred_sex: form.preferred_sex || null, preferred_color: form.preferred_color || null,
      deposit_paid: form.deposit_paid ? 1 : 0, deposit_amount: form.deposit_amount || null,
      deposit_date: form.deposit_date || null, litter_id: form.litter_id ? Number(form.litter_id) : null,
      notes: form.notes || null,
    };
    await fetch("/api/admin/waitlist", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    resetForm();
    load();
  }

  async function updateField(id: number, field: string, value: unknown) {
    await fetch("/api/admin/waitlist", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
    load();
  }

  async function movePosition(id: number, direction: "up" | "down") {
    const idx = entries.findIndex((e) => e.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= entries.length) return;
    await Promise.all([
      updateField(id, "position", entries[swapIdx].position),
      updateField(entries[swapIdx].id, "position", entries[idx].position),
    ]);
  }

  async function remove(id: number) {
    if (!confirm("Remove from waitlist?")) return;
    await fetch("/api/admin/waitlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const depositsCount = entries.filter((e) => e.deposit_paid).length;
  const waitingCount = entries.filter((e) => e.status === "waiting").length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="flex gap-4 text-sm text-muted">
          <span>{entries.length} total</span>
          <span>{waitingCount} waiting</span>
          <span>{depositsCount} deposits</span>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className={`${btnClass} bg-gold text-warm-white`}>
          {showForm ? "Cancel" : "Add to Waitlist"}
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-4 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name *" className={inputClass} />
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className={inputClass} />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className={inputClass} />
            <select value={form.preferred_sex} onChange={(e) => setForm({ ...form, preferred_sex: e.target.value })} className={inputClass}>
              <option value="">No sex preference</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input value={form.preferred_color} onChange={(e) => setForm({ ...form, preferred_color: e.target.value })} placeholder="Color preference" className={inputClass} />
            <select value={form.litter_id} onChange={(e) => setForm({ ...form, litter_id: e.target.value })} className={inputClass}>
              <option value="">-- No Litter --</option>
              {litters.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input type="checkbox" checked={form.deposit_paid} onChange={(e) => setForm({ ...form, deposit_paid: e.target.checked })} className="w-4 h-4 accent-gold" />
              Deposit Paid
            </label>
            {form.deposit_paid && (
              <>
                <input value={form.deposit_amount} onChange={(e) => setForm({ ...form, deposit_amount: e.target.value })} placeholder="Amount (e.g. $500)" className={inputClass + " w-32"} />
                <input type="date" value={form.deposit_date} onChange={(e) => setForm({ ...form, deposit_date: e.target.value })} className={inputClass} />
              </>
            )}
          </div>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" rows={2} className={`${inputClass} w-full`} />
          <button onClick={save} className={`${btnClass} bg-gold text-warm-white`}>
            {editId ? "Update" : "Add to Waitlist"}
          </button>
        </div>
      )}

      <div className="space-y-2">
        {entries.map((w, i) => (
          <div key={w.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div
              className="p-4 flex flex-wrap gap-3 items-center cursor-pointer hover:bg-navy/30"
              onClick={() => setExpandedId(expandedId === w.id ? null : w.id)}
            >
              <span className="text-gold font-bold text-lg w-8">#{i + 1}</span>
              <div className="flex-1 min-w-[180px]">
                <span className="text-cream font-bold">{w.name}</span>
                {w.email && <span className="text-muted text-sm ml-2">{w.email}</span>}
              </div>
              {w.preferred_sex && (
                <span className="text-xs text-muted">Wants: {w.preferred_sex}</span>
              )}
              {w.deposit_paid ? (
                <span className="text-xs px-2 py-0.5 rounded bg-green-900/50 text-green-300">
                  Deposit {w.deposit_amount || "Paid"}
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-400">No Deposit</span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded ${WAITLIST_STATUS_COLORS[w.status] || ""}`}>
                {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
              </span>
              {w.litter_name && <span className="text-xs text-purple-300">Litter: {w.litter_name}</span>}
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => movePosition(w.id, "up")} disabled={i === 0} className={`${btnClass} bg-navy text-muted disabled:opacity-30`}>Up</button>
                <button onClick={() => movePosition(w.id, "down")} disabled={i === entries.length - 1} className={`${btnClass} bg-navy text-muted disabled:opacity-30`}>Down</button>
              </div>
            </div>
            {expandedId === w.id && (
              <div className="border-t border-border p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {w.phone && <div className="text-sm"><span className="text-muted">Phone: </span><span className="text-cream">{w.phone}</span></div>}
                  {w.preferred_color && <div className="text-sm"><span className="text-muted">Color: </span><span className="text-cream">{w.preferred_color}</span></div>}
                  {w.deposit_date && <div className="text-sm"><span className="text-muted">Deposit date: </span><span className="text-cream">{w.deposit_date}</span></div>}
                </div>
                {w.notes && <p className="text-sm text-muted italic">{w.notes}</p>}
                <div className="flex flex-wrap gap-3 items-end">
                  <div>
                    <p className="text-xs text-muted font-bold mb-1">Status</p>
                    <select
                      value={w.status}
                      onChange={(e) => updateField(w.id, "status", e.target.value)}
                      className={inputClass}
                    >
                      {WAITLIST_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.replace("_", " ").slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-muted font-bold mb-1">Assign Litter</p>
                    <select
                      value={w.litter_id || ""}
                      onChange={(e) => updateField(w.id, "litter_id", e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                    >
                      <option value="">-- None --</option>
                      {litters.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-muted font-bold mb-1">Assign Puppy</p>
                    <select
                      value={w.assigned_puppy_id || ""}
                      onChange={(e) => updateField(w.id, "assigned_puppy_id", e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                    >
                      <option value="">-- None --</option>
                      {puppies.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.color}, {p.sex})</option>)}
                    </select>
                  </div>
                  <button onClick={() => startEdit(w)} className={`${btnClass} bg-navy text-muted hover:text-cream`}>Edit</button>
                  <button onClick={() => remove(w.id)} className={`${btnClass} bg-red-900/50 text-red-300`}>Remove</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {entries.length === 0 && <p className="text-muted text-sm">No one on the waitlist yet.</p>}
      </div>
    </div>
  );
}

/* ============ EMAIL TAB ============ */
function EmailTab() {
  const [view, setView] = useState<"compose" | "subscribers" | "history">("compose");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  const load = useCallback(async () => {
    const [subRes, bcRes] = await Promise.all([
      fetch("/api/admin/subscribers"),
      fetch("/api/admin/broadcasts"),
    ]);
    setSubscribers(await subRes.json());
    setBroadcasts(await bcRes.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const activeCount = subscribers.filter((s) => s.is_subscribed).length;

  async function sendBroadcast() {
    if (!subject.trim() || !body.trim()) return;
    if (!confirm(`Send this email to ${activeCount} subscribers?`)) return;

    setSending(true);
    setSendResult(null);

    // Create draft first
    const createRes = await fetch("/api/admin/broadcasts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body_html: body }),
    });
    const { id } = await createRes.json();

    // Send it
    const sendRes = await fetch("/api/admin/broadcasts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "send" }),
    });
    const result = await sendRes.json();

    setSending(false);
    if (result.success) {
      setSendResult(`Sent to ${result.sent} subscribers`);
      setSubject("");
      setBody("");
      load();
    } else {
      setSendResult(`Error: ${result.error}`);
    }
  }

  async function addSubscriber() {
    if (!newEmail.trim()) return;
    await fetch("/api/admin/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail, name: newName || null, source: "manual" }),
    });
    setNewEmail("");
    setNewName("");
    load();
  }

  async function removeSubscriber(id: number) {
    if (!confirm("Remove this subscriber?")) return;
    await fetch("/api/admin/subscribers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  async function deleteBroadcast(id: number) {
    if (!confirm("Delete this broadcast?")) return;
    await fetch("/api/admin/broadcasts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      {/* Sub-nav */}
      <div className="flex gap-2 mb-6">
        {(["compose", "subscribers", "history"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`${btnClass} ${view === v ? "bg-gold text-warm-white" : "bg-card border border-border text-muted"}`}
          >
            {v === "compose" ? "Compose" : v === "subscribers" ? `Subscribers (${activeCount})` : `History (${broadcasts.length})`}
          </button>
        ))}
      </div>

      {/* Compose view */}
      {view === "compose" && (
        <div className="space-y-4">
          <p className="text-muted text-sm">
            Send an email to all {activeCount} active subscribers. Each email includes a personalized greeting and unsubscribe link.
          </p>
          <div>
            <label className="text-xs text-muted font-bold block mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., New Litter Announcement!"
              className={`${inputClass} w-full`}
            />
          </div>
          <div>
            <label className="text-xs text-muted font-bold block mb-1">Body (HTML supported)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email here. You can use basic HTML for formatting."
              rows={10}
              className={`${inputClass} w-full`}
            />
          </div>
          {body && (
            <div>
              <label className="text-xs text-muted font-bold block mb-2">Preview</label>
              <div
                className="bg-warm-white text-cream rounded-lg p-6 border border-border"
                style={{ fontFamily: "-apple-system, sans-serif", maxWidth: 600 }}
                dangerouslySetInnerHTML={{ __html: `<p style="color:#333">Hi [Name],</p>${body}` }}
              />
            </div>
          )}
          <div className="flex gap-3 items-center">
            <button
              onClick={sendBroadcast}
              disabled={sending || !subject.trim() || !body.trim() || activeCount === 0}
              className={`${btnClass} bg-gold text-warm-white disabled:opacity-50 px-6 py-2`}
            >
              {sending ? "Sending..." : `Send to ${activeCount} Subscribers`}
            </button>
            {sendResult && (
              <span className={`text-sm ${sendResult.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
                {sendResult}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Subscribers view */}
      {view === "subscribers" && (
        <div>
          <div className="flex flex-wrap gap-2 mb-4 items-end">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name (optional)"
              className={inputClass}
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email address"
              className={inputClass}
            />
            <button onClick={addSubscriber} className={`${btnClass} bg-gold text-warm-white`}>
              Add Subscriber
            </button>
          </div>
          <p className="text-muted text-xs mb-3">
            {activeCount} active, {subscribers.length - activeCount} unsubscribed. Subscribers are auto-added from contact and application forms.
          </p>
          <div className="space-y-2">
            {subscribers.map((s) => (
              <div key={s.id} className={`bg-card border border-border rounded-lg p-3 flex flex-wrap gap-3 items-center ${!s.is_subscribed ? "opacity-50" : ""}`}>
                <span className="text-cream font-bold flex-1 min-w-[200px]">
                  {s.email}
                  {s.name && <span className="text-muted text-sm ml-2">({s.name})</span>}
                </span>
                <span className="text-xs text-muted">{s.source}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${s.is_subscribed ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"}`}>
                  {s.is_subscribed ? "Active" : "Unsubscribed"}
                </span>
                <span className="text-xs text-muted">{new Date(s.created_at).toLocaleDateString()}</span>
                <button onClick={() => removeSubscriber(s.id)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
              </div>
            ))}
            {subscribers.length === 0 && (
              <p className="text-muted text-sm">No subscribers yet. They are added automatically when someone submits a contact or puppy application form.</p>
            )}
          </div>
        </div>
      )}

      {/* History view */}
      {view === "history" && (
        <div className="space-y-3">
          {broadcasts.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div>
                  <span className="text-cream font-bold">{b.subject}</span>
                  <div className="flex gap-3 mt-1 text-xs text-muted">
                    <span className={`px-2 py-0.5 rounded ${b.status === "sent" ? "bg-green-900/50 text-green-300" : "bg-yellow-900/50 text-yellow-300"}`}>
                      {b.status === "sent" ? "Sent" : "Draft"}
                    </span>
                    {b.recipient_count > 0 && <span>Sent to {b.recipient_count}</span>}
                    {b.sent_at && <span>{new Date(b.sent_at).toLocaleString()}</span>}
                  </div>
                </div>
                <button onClick={() => deleteBroadcast(b.id)} className={`${btnClass} bg-red-900/50 text-red-300`}>Delete</button>
              </div>
            </div>
          ))}
          {broadcasts.length === 0 && (
            <p className="text-muted text-sm">No broadcasts sent yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ VIDEOS TAB ============ */
function VideosTab() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/videos");
    const data = await res.json();
    setVideos(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addVideo() {
    if (!url.trim()) return;
    setLoading(true);
    await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    setUrl("");
    setLoading(false);
    load();
  }

  async function update(id: number, data: Partial<Video>) {
    await fetch("/api/admin/videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this video?")) return;
    await fetch("/api/admin/videos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  async function move(id: number, direction: "up" | "down") {
    const idx = videos.findIndex((v) => v.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= videos.length) return;
    await update(id, { sort_order: videos[swapIdx].sort_order });
    await update(videos[swapIdx].id, { sort_order: videos[idx].sort_order });
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube URL"
          className={`${inputClass} flex-1`}
        />
        <button
          onClick={addVideo}
          disabled={loading}
          className={`${btnClass} bg-gold text-warm-white`}
        >
          Add Video
        </button>
      </div>

      <div className="space-y-3">
        {videos.map((v, i) => (
          <div
            key={v.id}
            className="bg-card border border-border rounded-lg p-4 flex flex-wrap gap-4 items-center"
          >
            <img
              src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`}
              alt={v.title || "Video"}
              className="w-32 h-20 object-cover rounded"
            />
            <input
              type="text"
              value={v.title || ""}
              onChange={(e) => update(v.id, { title: e.target.value })}
              placeholder="Title"
              className={`${inputClass} flex-1 min-w-[200px]`}
            />
            <label className="flex items-center gap-1 text-xs text-muted">
              <input
                type="checkbox"
                checked={!!v.show_on_homepage}
                onChange={(e) =>
                  update(v.id, { show_on_homepage: e.target.checked ? 1 : 0 })
                }
              />
              Home
            </label>
            <label className="flex items-center gap-1 text-xs text-muted">
              <input
                type="checkbox"
                checked={!!v.show_on_videos}
                onChange={(e) =>
                  update(v.id, { show_on_videos: e.target.checked ? 1 : 0 })
                }
              />
              Videos
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => move(v.id, "up")}
                disabled={i === 0}
                className={`${btnClass} bg-navy text-muted disabled:opacity-30`}
              >
                Up
              </button>
              <button
                onClick={() => move(v.id, "down")}
                disabled={i === videos.length - 1}
                className={`${btnClass} bg-navy text-muted disabled:opacity-30`}
              >
                Down
              </button>
            </div>
            <button
              onClick={() => remove(v.id)}
              className={`${btnClass} bg-red-900/50 text-red-300`}
            >
              Delete
            </button>
          </div>
        ))}
        {videos.length === 0 && (
          <p className="text-muted text-sm">No videos yet.</p>
        )}
      </div>
    </div>
  );
}

/* ============ PHOTOS TAB ============ */
function PhotosTab() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [altText, setAltText] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/photos");
    const data = await res.json();
    setPhotos(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function uploadPhoto() {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt_text", altText);
    formData.append("category", category);
    await fetch("/api/admin/photos", { method: "POST", body: formData });
    setFile(null);
    setAltText("");
    setCategory("general");
    setUploading(false);
    load();
  }

  async function update(id: number, data: Partial<Photo>) {
    await fetch("/api/admin/photos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this photo?")) return;
    await fetch("/api/admin/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  async function move(id: number, direction: "up" | "down") {
    const idx = photos.findIndex((p) => p.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= photos.length) return;
    await update(id, { sort_order: photos[swapIdx].sort_order });
    await update(photos[swapIdx].id, { sort_order: photos[idx].sort_order });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 items-end">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-cream text-sm"
        />
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Alt text"
          className={inputClass}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          <option value="general">General</option>
          <option value="puppies">Puppies</option>
          <option value="parents">Parents</option>
          <option value="property">Property</option>
        </select>
        <button
          onClick={uploadPhoto}
          disabled={uploading || !file}
          className={`${btnClass} bg-gold text-warm-white disabled:opacity-50`}
        >
          Upload
        </button>
      </div>

      <div className="space-y-3">
        {photos.map((p, i) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-lg p-4 flex flex-wrap gap-4 items-center"
          >
            <img
              src={`/photos/${p.filename}`}
              alt={p.alt_text || "Photo"}
              className="w-24 h-24 object-cover rounded"
            />
            <input
              type="text"
              value={p.alt_text || ""}
              onChange={(e) => update(p.id, { alt_text: e.target.value })}
              placeholder="Alt text"
              className={`${inputClass} flex-1 min-w-[150px]`}
            />
            <label className="flex items-center gap-1 text-xs text-muted">
              <input
                type="checkbox"
                checked={!!p.show_on_homepage}
                onChange={(e) =>
                  update(p.id, { show_on_homepage: e.target.checked ? 1 : 0 })
                }
              />
              Home
            </label>
            <label className="flex items-center gap-1 text-xs text-muted">
              <input
                type="checkbox"
                checked={!!p.show_on_gallery}
                onChange={(e) =>
                  update(p.id, { show_on_gallery: e.target.checked ? 1 : 0 })
                }
              />
              Gallery
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => move(p.id, "up")}
                disabled={i === 0}
                className={`${btnClass} bg-navy text-muted disabled:opacity-30`}
              >
                Up
              </button>
              <button
                onClick={() => move(p.id, "down")}
                disabled={i === photos.length - 1}
                className={`${btnClass} bg-navy text-muted disabled:opacity-30`}
              >
                Down
              </button>
            </div>
            <button
              onClick={() => remove(p.id)}
              className={`${btnClass} bg-red-900/50 text-red-300`}
            >
              Delete
            </button>
          </div>
        ))}
        {photos.length === 0 && (
          <p className="text-muted text-sm">No photos yet.</p>
        )}
      </div>
    </div>
  );
}

/* ============ PUPPIES TAB ============ */
function PuppiesTab() {
  const [puppies, setPuppies] = useState<(Puppy & { litter_id?: number | null; litter_name?: string | null })[]>([]);
  const [litters, setLitters] = useState<Litter[]>([]);
  const [newPuppy, setNewPuppy] = useState({
    name: "",
    sex: "male",
    color: "",
    status: "available",
    litter_id: "",
  });

  const load = useCallback(async () => {
    const [pRes, lRes] = await Promise.all([
      fetch("/api/admin/puppies"),
      fetch("/api/admin/litters"),
    ]);
    setPuppies(await pRes.json());
    setLitters(await lRes.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addPuppy() {
    if (!newPuppy.name.trim()) return;
    await fetch("/api/admin/puppies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newPuppy,
        litter_id: newPuppy.litter_id ? Number(newPuppy.litter_id) : null,
      }),
    });
    setNewPuppy({ name: "", sex: "male", color: "", status: "available", litter_id: "" });
    load();
  }

  async function update(id: number, data: Record<string, unknown>) {
    await fetch("/api/admin/puppies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this puppy?")) return;
    await fetch("/api/admin/puppies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 items-end">
        <input
          type="text"
          value={newPuppy.name}
          onChange={(e) => setNewPuppy({ ...newPuppy, name: e.target.value })}
          placeholder="Puppy name"
          className={inputClass}
        />
        <select
          value={newPuppy.sex}
          onChange={(e) => setNewPuppy({ ...newPuppy, sex: e.target.value })}
          className={inputClass}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          value={newPuppy.color}
          onChange={(e) => setNewPuppy({ ...newPuppy, color: e.target.value })}
          placeholder="Color"
          className={inputClass}
        />
        <select
          value={newPuppy.status}
          onChange={(e) =>
            setNewPuppy({ ...newPuppy, status: e.target.value })
          }
          className={inputClass}
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
          <option value="keeping">Keeping</option>
        </select>
        <select
          value={newPuppy.litter_id}
          onChange={(e) => setNewPuppy({ ...newPuppy, litter_id: e.target.value })}
          className={inputClass}
        >
          <option value="">-- No Litter --</option>
          {litters.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <button onClick={addPuppy} className={`${btnClass} bg-gold text-warm-white`}>
          Add Puppy
        </button>
      </div>

      <div className="space-y-3">
        {puppies.map((p) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-lg p-4 flex flex-wrap gap-4 items-center"
          >
            <span className="text-cream font-bold min-w-[120px]">{p.name}</span>
            <span className="text-muted text-sm capitalize">{p.sex}</span>
            <span className="text-muted text-sm">{p.color}</span>
            <select
              value={p.status}
              onChange={(e) => update(p.id, { status: e.target.value })}
              className={inputClass}
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
              <option value="keeping">Keeping</option>
            </select>
            <select
              value={p.litter_id || ""}
              onChange={(e) => update(p.id, { litter_id: e.target.value ? Number(e.target.value) : null })}
              className={inputClass}
            >
              <option value="">-- No Litter --</option>
              {litters.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
            {p.litter_name && <span className="text-xs text-purple-300">{p.litter_name}</span>}
            <button
              onClick={() => remove(p.id)}
              className={`${btnClass} bg-red-900/50 text-red-300`}
            >
              Delete
            </button>
          </div>
        ))}
        {puppies.length === 0 && (
          <p className="text-muted text-sm">No puppies yet.</p>
        )}
      </div>
    </div>
  );
}

/* ============ PEDIGREE ============ */
function PedigreeCell({ slotKey, label, value, onSave }: {
  slotKey: string;
  label: string;
  value: string;
  onSave: (key: string, val: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  useEffect(() => { setDraft(value); }, [value]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onSave(slotKey, draft);
  };

  return editing ? (
    <input
      autoFocus
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && commit()}
      className="w-full bg-transparent text-xs outline-none border-b border-gold text-cream"
      placeholder={label}
    />
  ) : (
    <button onClick={() => setEditing(true)} className="w-full text-left min-h-[20px]" title={`Edit: ${label}`}>
      {value
        ? <span className="text-cream text-xs font-medium">{value}</span>
        : <span className="text-[10px] text-muted/40 hover:text-gold italic">+ {label}</span>}
    </button>
  );
}

function PedigreeEditor({ dogId, initialData, showPedigree, onUpdate }: {
  dogId: number;
  initialData: string | null;
  showPedigree: number;
  onUpdate: () => void;
}) {
  const parsed = (() => { try { return JSON.parse(initialData || "{}"); } catch { return {}; } })();
  const [slots, setSlots] = useState<Record<string, string>>(parsed);

  async function saveSlot(key: string, val: string) {
    const updated = { ...slots, [key]: val };
    setSlots(updated);
    await fetch("/api/admin/dogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: dogId, pedigree_data: JSON.stringify(updated) }),
    });
  }

  async function toggleShow(checked: boolean) {
    await fetch("/api/admin/dogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: dogId, show_pedigree: checked ? 1 : 0 }),
    });
    onUpdate();
  }

  const s = slots;
  const cb = "border border-border p-2 align-middle";
  const par = `${cb} bg-navy-light min-w-[140px]`;
  const gp  = `${cb} bg-card min-w-[130px]`;
  const ggp = `${cb} bg-navy min-w-[110px]`;

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-cream">Pedigree Chart</p>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={!!showPedigree}
            onChange={(e) => toggleShow(e.target.checked)}
            className="w-4 h-4 accent-gold"
          />
          <span className="text-muted">Show on website</span>
        </label>
      </div>
      <p className="text-[11px] text-muted mb-3">Click any cell to edit. Changes save automatically.</p>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full text-xs">
          <thead>
            <tr>
              <th className={`${cb} text-muted font-semibold text-left`}>Parents</th>
              <th className={`${cb} text-muted font-semibold text-left`}>Grandparents</th>
              <th className={`${cb} text-muted font-semibold text-left`}>Great-Grandparents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={4} className={par}>
                <div className="text-[10px] text-gold mb-1">SIRE</div>
                <PedigreeCell slotKey="sire" label="Sire's name" value={s.sire || ""} onSave={saveSlot} />
              </td>
              <td rowSpan={2} className={gp}>
                <div className="text-[10px] text-muted mb-1">Sire&apos;s Sire</div>
                <PedigreeCell slotKey="sire_sire" label="Name" value={s.sire_sire || ""} onSave={saveSlot} />
              </td>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Sire&apos;s Sire&apos;s Sire</div>
                <PedigreeCell slotKey="sire_sire_sire" label="Name" value={s.sire_sire_sire || ""} onSave={saveSlot} />
              </td>
            </tr>
            <tr>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Sire&apos;s Sire&apos;s Dam</div>
                <PedigreeCell slotKey="sire_sire_dam" label="Name" value={s.sire_sire_dam || ""} onSave={saveSlot} />
              </td>
            </tr>
            <tr>
              <td rowSpan={2} className={gp}>
                <div className="text-[10px] text-muted mb-1">Sire&apos;s Dam</div>
                <PedigreeCell slotKey="sire_dam" label="Name" value={s.sire_dam || ""} onSave={saveSlot} />
              </td>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Sire&apos;s Dam&apos;s Sire</div>
                <PedigreeCell slotKey="sire_dam_sire" label="Name" value={s.sire_dam_sire || ""} onSave={saveSlot} />
              </td>
            </tr>
            <tr>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Sire&apos;s Dam&apos;s Dam</div>
                <PedigreeCell slotKey="sire_dam_dam" label="Name" value={s.sire_dam_dam || ""} onSave={saveSlot} />
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className={`${par} border-t-2 border-t-gold/20`}>
                <div className="text-[10px] text-pink-500 mb-1">DAM</div>
                <PedigreeCell slotKey="dam" label="Dam's name" value={s.dam || ""} onSave={saveSlot} />
              </td>
              <td rowSpan={2} className={gp}>
                <div className="text-[10px] text-muted mb-1">Dam&apos;s Sire</div>
                <PedigreeCell slotKey="dam_sire" label="Name" value={s.dam_sire || ""} onSave={saveSlot} />
              </td>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Dam&apos;s Sire&apos;s Sire</div>
                <PedigreeCell slotKey="dam_sire_sire" label="Name" value={s.dam_sire_sire || ""} onSave={saveSlot} />
              </td>
            </tr>
            <tr>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Dam&apos;s Sire&apos;s Dam</div>
                <PedigreeCell slotKey="dam_sire_dam" label="Name" value={s.dam_sire_dam || ""} onSave={saveSlot} />
              </td>
            </tr>
            <tr>
              <td rowSpan={2} className={gp}>
                <div className="text-[10px] text-muted mb-1">Dam&apos;s Dam</div>
                <PedigreeCell slotKey="dam_dam" label="Name" value={s.dam_dam || ""} onSave={saveSlot} />
              </td>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Dam&apos;s Dam&apos;s Sire</div>
                <PedigreeCell slotKey="dam_dam_sire" label="Name" value={s.dam_dam_sire || ""} onSave={saveSlot} />
              </td>
            </tr>
            <tr>
              <td className={ggp}>
                <div className="text-[10px] text-muted/60">Dam&apos;s Dam&apos;s Dam</div>
                <PedigreeCell slotKey="dam_dam_dam" label="Name" value={s.dam_dam_dam || ""} onSave={saveSlot} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============ DOGS TAB ============ */
function DogsTab() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [expandedPedigreeId, setExpandedPedigreeId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", registered_name: "", role: "dam", bio: "",
    ofa_hips: "", ofa_elbows: "", caer_eyes: "", genetic_panel: "", titles: "",
  });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/dogs");
    const data = await res.json();
    setDogs(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setForm({ name: "", registered_name: "", role: "dam", bio: "", ofa_hips: "", ofa_elbows: "", caer_eyes: "", genetic_panel: "", titles: "" });
    setEditId(null);
    setShowForm(false);
  }

  function startEdit(d: Dog) {
    setForm({
      name: d.name || "", registered_name: d.registered_name || "", role: d.role || "dam",
      bio: d.bio || "", ofa_hips: d.ofa_hips || "", ofa_elbows: d.ofa_elbows || "",
      caer_eyes: d.caer_eyes || "", genetic_panel: d.genetic_panel || "", titles: d.titles || "",
    });
    setEditId(d.id);
    setShowForm(true);
  }

  async function save() {
    if (!form.name.trim()) return;
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    await fetch("/api/admin/dogs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    resetForm();
    load();
  }

  async function toggleActive(id: number, current: number) {
    await fetch("/api/admin/dogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_active: current ? 0 : 1 }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this dog? This cannot be undone.")) return;
    await fetch("/api/admin/dogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted text-sm">{dogs.length} dog{dogs.length !== 1 ? "s" : ""}</p>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className={`${btnClass} bg-gold text-warm-white`}>
          {showForm ? "Cancel" : "Add Dog"}
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-4 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Call name *" className={inputClass} />
            <input value={form.registered_name} onChange={(e) => setForm({ ...form, registered_name: e.target.value })} placeholder="Registered name" className={inputClass} />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass}>
              <option value="dam">Dam</option>
              <option value="stud">Stud</option>
            </select>
            <input value={form.titles} onChange={(e) => setForm({ ...form, titles: e.target.value })} placeholder="Titles (e.g., CH, GCH)" className={inputClass} />
          </div>
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" rows={3} className={`${inputClass} w-full`} />
          <p className="text-muted text-xs font-bold mt-2">Health Clearances</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.ofa_hips} onChange={(e) => setForm({ ...form, ofa_hips: e.target.value })} placeholder="OFA Hips" className={inputClass} />
            <input value={form.ofa_elbows} onChange={(e) => setForm({ ...form, ofa_elbows: e.target.value })} placeholder="OFA Elbows" className={inputClass} />
            <input value={form.caer_eyes} onChange={(e) => setForm({ ...form, caer_eyes: e.target.value })} placeholder="CAER Eyes" className={inputClass} />
            <input value={form.genetic_panel} onChange={(e) => setForm({ ...form, genetic_panel: e.target.value })} placeholder="Genetic Panel" className={inputClass} />
          </div>
          <button onClick={save} className={`${btnClass} bg-gold text-warm-white`}>
            {editId ? "Update Dog" : "Add Dog"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {dogs.map((d) => (
          <div key={d.id} className={`bg-card border rounded-lg p-4 ${d.is_active ? "border-border" : "border-red-900/50 opacity-60"}`}>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <span className="text-cream font-bold">{d.name}</span>
                {d.registered_name && <span className="text-muted text-sm ml-2">({d.registered_name})</span>}
                <div className="flex gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${d.role === "stud" ? "bg-blue-900/50 text-blue-300" : "bg-pink-900/50 text-pink-300"}`}>
                    {d.role === "stud" ? "Stud" : "Dam"}
                  </span>
                  {d.titles && <span className="text-xs text-gold">{d.titles}</span>}
                  {!d.is_active && <span className="text-xs text-red-400">Inactive</span>}
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                <button onClick={() => startEdit(d)} className={`${btnClass} bg-navy text-muted hover:text-cream`}>Edit</button>
                <button onClick={() => toggleActive(d.id, d.is_active)} className={`${btnClass} bg-navy text-muted hover:text-cream`}>
                  {d.is_active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => setExpandedPedigreeId(expandedPedigreeId === d.id ? null : d.id)}
                  className={`${btnClass} ${expandedPedigreeId === d.id ? "bg-gold text-warm-white" : "bg-navy text-muted hover:text-cream"}`}
                >
                  {expandedPedigreeId === d.id ? "Hide Pedigree" : "Pedigree"}
                  {d.show_pedigree ? " ✓" : ""}
                </button>
                <button onClick={() => remove(d.id)} className={`${btnClass} bg-red-900/50 text-red-300`}>Delete</button>
              </div>
            </div>
            {(d.ofa_hips || d.ofa_elbows || d.caer_eyes || d.genetic_panel) && (
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted">
                {d.ofa_hips && <span>Hips: {d.ofa_hips}</span>}
                {d.ofa_elbows && <span>Elbows: {d.ofa_elbows}</span>}
                {d.caer_eyes && <span>Eyes: {d.caer_eyes}</span>}
                {d.genetic_panel && <span>Genetics: {d.genetic_panel}</span>}
              </div>
            )}
            {expandedPedigreeId === d.id && (
              <PedigreeEditor
                dogId={d.id}
                initialData={d.pedigree_data}
                showPedigree={d.show_pedigree}
                onUpdate={load}
              />
            )}
          </div>
        ))}
        {dogs.length === 0 && <p className="text-muted text-sm">No dogs yet.</p>}
      </div>
    </div>
  );
}

/* ============ INQUIRIES TAB ============ */
const STATUSES = ["new", "reviewed", "approved", "waitlisted", "matched", "deposit_paid", "ready_for_pickup", "completed", "declined"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-900/50 text-blue-300",
  reviewed: "bg-yellow-900/50 text-yellow-300",
  approved: "bg-green-900/50 text-green-300",
  waitlisted: "bg-purple-900/50 text-purple-300",
  matched: "bg-pink-900/50 text-pink-300",
  deposit_paid: "bg-emerald-900/50 text-emerald-300",
  ready_for_pickup: "bg-orange-900/50 text-orange-300",
  completed: "bg-gold/20 text-gold",
  declined: "bg-red-900/50 text-red-300",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  reviewed: "Reviewed",
  approved: "Approved",
  waitlisted: "Waitlisted",
  matched: "Matched",
  deposit_paid: "Deposit Paid",
  ready_for_pickup: "Ready for Pickup",
  completed: "Completed",
  declined: "Declined",
};

function InquiriesTab() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [puppies, setPuppies] = useState<Puppy[]>([]);

  const load = useCallback(async () => {
    const [inqRes, pupRes] = await Promise.all([
      fetch("/api/admin/inquiries"),
      fetch("/api/admin/puppies"),
    ]);
    setInquiries(await inqRes.json());
    setPuppies(await pupRes.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: number, status: string) {
    await fetch("/api/admin/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function updateNotes(id: number, notes: string) {
    await fetch("/api/admin/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
  }

  async function assignPuppy(id: number, puppyId: number | null) {
    await fetch("/api/admin/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, assigned_puppy_id: puppyId }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this inquiry?")) return;
    await fetch("/api/admin/inquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);
  const counts = inquiries.reduce((acc, i) => {
    acc[i.status || "new"] = (acc[i.status || "new"] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setFilter("all")} className={`${btnClass} ${filter === "all" ? "bg-gold text-warm-white" : "bg-card text-muted"}`}>
          All ({inquiries.length})
        </button>
        {STATUSES.map((s) => counts[s] ? (
          <button key={s} onClick={() => setFilter(s)} className={`${btnClass} ${filter === s ? "bg-gold text-warm-white" : STATUS_COLORS[s]}`}>
            {STATUS_LABELS[s]} ({counts[s]})
          </button>
        ) : null)}
      </div>

      <div className="space-y-3">
        {filtered.map((inq) => {
          const expanded = expandedId === inq.id;
          let formData: Record<string, string> = {};
          if (inq.form_data) {
            try { formData = JSON.parse(inq.form_data); } catch {}
          }

          return (
            <div key={inq.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Header row */}
              <div
                className="p-4 flex flex-wrap gap-4 items-center cursor-pointer hover:bg-navy/30"
                onClick={() => setExpandedId(expanded ? null : inq.id)}
              >
                <div className="flex-1 min-w-[200px]">
                  <span className="text-cream font-bold">{inq.name || "Unknown"}</span>
                  <span className="text-muted text-sm ml-2">{inq.email}</span>
                  {inq.phone && <span className="text-muted text-sm ml-2">{inq.phone}</span>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${inq.type === "application" ? "bg-gold/20 text-gold" : "bg-navy text-muted"}`}>
                  {inq.type === "application" ? "Application" : "Contact"}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${STATUS_COLORS[inq.status || "new"]}`}>
                  {STATUS_LABELS[inq.status || "new"]}
                </span>
                {inq.puppy_name && <span className="text-xs text-gold">Matched: {inq.puppy_name}</span>}
                <span className="text-muted text-xs">{new Date(inq.created_at).toLocaleDateString()}</span>
                <span className="text-muted text-xs">{expanded ? "Close" : "Details"}</span>
              </div>

              {/* Expanded details */}
              {expanded && (
                <div className="border-t border-border p-4 space-y-4">
                  {/* Message */}
                  {inq.message && (
                    <div>
                      <p className="text-xs text-muted font-bold mb-1">Message</p>
                      <p className="text-cream text-sm">{inq.message}</p>
                    </div>
                  )}

                  {/* Application form data */}
                  {Object.keys(formData).length > 0 && (
                    <div>
                      <p className="text-xs text-muted font-bold mb-2">Application Details</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(formData).map(([key, val]) => (
                          <div key={key} className="text-sm">
                            <span className="text-muted capitalize">{key.replace(/_/g, " ")}: </span>
                            <span className="text-cream">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status + actions */}
                  <div className="flex flex-wrap gap-3 items-end">
                    <div>
                      <p className="text-xs text-muted font-bold mb-1">Status (email sent on change)</p>
                      <select
                        value={inq.status || "new"}
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                        className={inputClass}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="text-xs text-muted font-bold mb-1">Assign Puppy</p>
                      <select
                        value={inq.assigned_puppy_id || ""}
                        onChange={(e) => assignPuppy(inq.id, e.target.value ? Number(e.target.value) : null)}
                        className={inputClass}
                      >
                        <option value="">-- None --</option>
                        {puppies.map((p) => (
                          <option key={p.id} value={p.id}>{p.name} ({p.color}, {p.sex})</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-xs text-muted font-bold mb-1">Notes</p>
                      <input
                        type="text"
                        defaultValue={inq.notes || ""}
                        onBlur={(e) => updateNotes(inq.id, e.target.value)}
                        placeholder="Add a note..."
                        className={`${inputClass} w-full`}
                      />
                    </div>
                    <button onClick={() => remove(inq.id)} className={`${btnClass} bg-red-900/50 text-red-300`}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-muted text-sm">{filter === "all" ? "No inquiries yet." : `No ${STATUS_LABELS[filter]?.toLowerCase()} inquiries.`}</p>
        )}
      </div>
    </div>
  );
}

/* ============ BLOG TAB ============ */
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  featured_image: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function BlogTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", body: "", status: "draft" });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function createPost() {
    if (!form.title.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      setForm({ title: "", excerpt: "", body: "", status: "draft" });
      setCreating(false);
      load();
    }
    setSaving(false);
  }

  async function updatePost(id: number, fields: Partial<BlogPost>) {
    setSaving(true);
    await fetch("/api/admin/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...fields }),
    });
    load();
    setSaving(false);
  }

  async function deletePost(id: number) {
    if (!confirm("Delete this blog post?")) return;
    await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  function startEdit(post: BlogPost) {
    setEditing(post.id);
    setForm({ title: post.title, excerpt: post.excerpt || "", body: post.body || "", status: post.status });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-cream font-serif">Blog Posts</h2>
        <button
          onClick={() => { setCreating(!creating); setEditing(null); setForm({ title: "", excerpt: "", body: "", status: "draft" }); }}
          className={`${btnClass} ${creating ? "bg-red-600 text-white" : "bg-gold text-warm-white"}`}
        >
          {creating ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {/* Create/Edit form */}
      {(creating || editing) && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
          <div>
            <label className="text-xs text-muted font-bold block mb-1">Title</label>
            <input
              className={`${inputClass} w-full`}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Post title"
            />
          </div>
          <div>
            <label className="text-xs text-muted font-bold block mb-1">Excerpt (shows on blog index)</label>
            <textarea
              className={`${inputClass} w-full`}
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Short summary"
            />
          </div>
          <div>
            <label className="text-xs text-muted font-bold block mb-1">Body (HTML)</label>
            <textarea
              className={`${inputClass} w-full font-mono text-xs`}
              rows={16}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="<h2>Section heading</h2><p>Write your blog post here...</p>"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <button
              onClick={() => {
                if (editing) {
                  updatePost(editing, form);
                  setEditing(null);
                } else {
                  createPost();
                }
              }}
              disabled={saving || !form.title.trim()}
              className={`${btnClass} bg-gold text-warm-white disabled:opacity-50`}
            >
              {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
            </button>
            {editing && (
              <button
                onClick={() => { setEditing(null); setForm({ title: "", excerpt: "", body: "", status: "draft" }); }}
                className={`${btnClass} bg-card border border-border text-muted`}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Post list */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    post.status === "published"
                      ? "bg-green-900/30 text-green-400"
                      : "bg-yellow-900/30 text-yellow-400"
                  }`}
                >
                  {post.status}
                </span>
                {post.published_at && (
                  <span className="text-xs text-muted">
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-cream truncate">{post.title}</h3>
              {post.excerpt && (
                <p className="text-muted text-xs mt-1 line-clamp-2">{post.excerpt}</p>
              )}
              <p className="text-xs text-muted mt-1">/blog/{post.slug}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {post.status === "draft" && (
                <button
                  onClick={() => updatePost(post.id, { status: "published" })}
                  className={`${btnClass} bg-green-700 text-white`}
                >
                  Publish
                </button>
              )}
              {post.status === "published" && (
                <button
                  onClick={() => updatePost(post.id, { status: "draft" })}
                  className={`${btnClass} bg-yellow-700 text-white`}
                >
                  Unpublish
                </button>
              )}
              <button
                onClick={() => startEdit(post)}
                className={`${btnClass} bg-card border border-gold text-gold`}
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className={`${btnClass} bg-red-900/30 text-red-400`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && !creating && (
          <p className="text-muted text-sm">No blog posts yet. Click &quot;+ New Post&quot; to create one.</p>
        )}
      </div>
    </div>
  );
}

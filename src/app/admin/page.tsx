"use client";

import { useState, useEffect, useCallback } from "react";

type Tab = "videos" | "photos" | "puppies";

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

const btnClass =
  "px-3 py-1.5 rounded text-xs font-bold transition-colors";
const inputClass =
  "bg-navy border border-border rounded px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("videos");

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(["videos", "photos", "puppies"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-bold text-sm capitalize ${
              tab === t
                ? "bg-gold text-navy"
                : "bg-card text-muted hover:text-cream"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "videos" && <VideosTab />}
      {tab === "photos" && <PhotosTab />}
      {tab === "puppies" && <PuppiesTab />}
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
          className={`${btnClass} bg-gold text-navy`}
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
          className={`${btnClass} bg-gold text-navy disabled:opacity-50`}
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
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [newPuppy, setNewPuppy] = useState({
    name: "",
    sex: "male",
    color: "",
    status: "available",
  });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/puppies");
    const data = await res.json();
    setPuppies(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addPuppy() {
    if (!newPuppy.name.trim()) return;
    await fetch("/api/admin/puppies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPuppy),
    });
    setNewPuppy({ name: "", sex: "male", color: "", status: "available" });
    load();
  }

  async function update(id: number, data: Partial<Puppy>) {
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
        <button onClick={addPuppy} className={`${btnClass} bg-gold text-navy`}>
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

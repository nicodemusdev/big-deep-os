"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Plus, ExternalLink, Trash2, Edit3, X, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

type CalEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  allDay: boolean;
  colorId: string;
  htmlLink: string;
};

type FormData = {
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  allDay: boolean;
  colorId: string;
};

const BLANK_FORM: FormData = {
  title: "",
  description: "",
  location: "",
  start: "",
  end: "",
  allDay: true,
  colorId: "7",
};

const COLOR_OPTIONS = [
  { id: "11", label: "🔴 Major / Reveal", hex: "#d50000" },
  { id: "9",  label: "🔵 Show / Live Event", hex: "#3f51b5" },
  { id: "7",  label: "🩵 Press / Interview", hex: "#039be5" },
  { id: "6",  label: "🟠 Content Drop", hex: "#ef6c00" },
  { id: "5",  label: "🟡 Teaser / Pre-launch", hex: "#f6bf26" },
  { id: "2",  label: "🟢 Ad Campaign", hex: "#33b679" },
  { id: "8",  label: "⚫ Internal / Admin", hex: "#616161" },
];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + (dateStr.length === 10 ? "T12:00:00" : ""));
  return d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
}

function colorDot(colorId: string) {
  const c = COLOR_OPTIONS.find((o) => o.id === colorId);
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: c?.hex || "#616161" }}
    />
  );
}

export default function CalendarAdmin() {
  const [events, setEvents]     = useState<CalEvent[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<CalEvent | null>(null);
  const [form, setForm]         = useState<FormData>(BLANK_FORM);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState<{ msg: string; ok: boolean } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();
      setEvents(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  function openNew() {
    setEditing(null);
    setForm(BLANK_FORM);
    setShowForm(true);
  }

  function openEdit(ev: CalEvent) {
    setEditing(ev);
    setForm({
      title: ev.title,
      description: ev.description,
      location: ev.location,
      start: ev.start,
      end: ev.end,
      allDay: ev.allDay,
      colorId: ev.colorId || "7",
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.title || !form.start || !form.end) {
      showToast("Title, start date, and end date are required.", false);
      return;
    }
    setSaving(true);
    try {
      const url    = editing ? `/api/events/${editing.id}` : "/api/events";
      const method = editing ? "PATCH" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      showToast(editing ? "Event updated ✓" : "Event added to Google Calendar ✓");
      setShowForm(false);
      await fetchEvents();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Save failed", false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event from Google Calendar?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showToast("Event deleted.");
      await fetchEvents();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Delete failed", false);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-neutral-900 mb-1 flex items-center gap-2">
            <Calendar size={30} className="text-primary-500" />
            Calendar
          </h2>
          <p className="text-neutral-500 text-sm">Synced with Google Calendar — bigdeepbiz@gmail.com</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={fetchEvents}
            className="btn-retro flex items-center gap-1.5 px-3 py-2 text-sm bg-white border-neutral-300 text-neutral-600"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button
            onClick={openNew}
            className="btn-retro flex items-center gap-1.5 px-4 py-2 text-sm bg-primary-500 text-white border-primary-600"
          >
            <Plus size={15} />
            Add Event
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          toast.ok ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {toast.ok ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <div className="card-retro p-5 bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-neutral-900">
              {editing ? "Edit Event" : "New Event"}
            </h3>
            <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-neutral-700">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3">
            {/* Title */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase block mb-1">Event Title *</label>
              <input
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="e.g. 🎸 Eclipse Single Drop"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* All-day toggle */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.allDay}
                  onChange={(e) => setForm({ ...form, allDay: e.target.checked })}
                  className="w-4 h-4 accent-primary-500"
                />
                <span className="text-sm text-neutral-700">All-day event</span>
              </label>
            </div>

            {/* Start / End */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-500 uppercase block mb-1">Start *</label>
                <input
                  type={form.allDay ? "date" : "datetime-local"}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={form.start}
                  onChange={(e) => setForm({ ...form, start: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 uppercase block mb-1">End *</label>
                <input
                  type={form.allDay ? "date" : "datetime-local"}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={form.end}
                  onChange={(e) => setForm({ ...form, end: e.target.value })}
                />
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase block mb-1">Category / Color</label>
              <select
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
                value={form.colorId}
                onChange={(e) => setForm({ ...form, colorId: e.target.value })}
              >
                {COLOR_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase block mb-1">Location</label>
              <input
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="e.g. Utopia Studios, Bearsville Theatre"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            {/* Description / Notes */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase block mb-1">Notes / Action Items</label>
              <textarea
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                rows={3}
                placeholder="What needs to happen this day? Who's responsible?"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-retro flex items-center gap-1.5 px-5 py-2 text-sm bg-primary-500 text-white border-primary-600 disabled:opacity-50"
              >
                {saving ? "Saving..." : editing ? "Save Changes" : "Add to Google Calendar"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="btn-retro px-4 py-2 text-sm bg-white border-neutral-300 text-neutral-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event List */}
      {loading ? (
        <div className="text-center py-12 text-neutral-400 text-sm">Loading from Google Calendar…</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-700">
          <p className="font-bold mb-1">Could not connect to Google Calendar</p>
          <p className="text-xs">{error}</p>
          <p className="text-xs mt-2 text-red-500">Make sure your environment variables are set in Vercel. See the setup guide.</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-neutral-400 text-sm">No events found. Add your first event above.</div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">{events.length} events synced</p>
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white border border-neutral-200 rounded-xl px-4 py-3 flex items-start gap-3 group hover:border-primary-300 transition-colors"
            >
              <div className="mt-1">{colorDot(ev.colorId)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-neutral-900 leading-tight">{ev.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {formatDate(ev.start)}
                  {ev.location && <span className="ml-2 text-neutral-400">📍 {ev.location}</span>}
                </p>
                {ev.description && (
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{ev.description.split("\n")[0]}</p>
                )}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={() => openEdit(ev)}
                  className="p-1.5 rounded-lg hover:bg-primary-50 text-neutral-400 hover:text-primary-600 transition-colors"
                  title="Edit"
                >
                  <Edit3 size={13} />
                </button>
                <a
                  href={ev.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-primary-50 text-neutral-400 hover:text-primary-600 transition-colors"
                  title="Open in Google Calendar"
                >
                  <ExternalLink size={13} />
                </a>
                <button
                  onClick={() => handleDelete(ev.id)}
                  disabled={deleting === ev.id}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-40"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Color legend */}
      <div className="border-t border-neutral-100 pt-4">
        <p className="text-xs font-bold text-neutral-400 uppercase mb-2">Color Key</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {COLOR_OPTIONS.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.hex }} />
              <span className="text-xs text-neutral-500">{c.label.replace(/^[^ ]+ /, "")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

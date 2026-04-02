"use client";

import { Music, CheckCircle, AlertCircle, Camera, Film, Mic, Image } from "lucide-react";

const assetLibraries = [
  {
    name: "Inception Session",
    icon: "🎙️",
    subtitle: "2-day recording session",
    status: "raw",
    statusLabel: "Raw — Needs edit",
    assets: [
      { label: "Short clips (phone)", ready: true },
      { label: "GoPro footage", ready: true },
      { label: "2-day audio recordings", ready: true },
      { label: "2-day photos", ready: true },
      { label: "Eclipse — full audio (usable as-is)", ready: true },
      { label: "Forget.Remember — jam segment", ready: true },
      { label: "Whisper of Wings — jam segment", ready: true },
    ],
    platforms: ["TikTok clips", "IG Stories BTS", "YouTube BTS"],
    note: "Eclipse audio is the gem — usable for pre-save campaign and TikTok teaser clips.",
  },
  {
    name: "Utopia Studios",
    icon: "🏠",
    subtitle: "Multi-day studio sessions",
    status: "editing",
    statusLabel: "In Edit",
    assets: [
      { label: "Full album — in edit", ready: false },
      { label: "Phone footage (raw)", ready: true },
      { label: "Individual member camera dumps", ready: true },
      { label: "3 days of photos", ready: true },
      { label: "Osmo gimbal footage", ready: true },
    ],
    platforms: ["YouTube long-form", "TikTok BTS", "IG Stories", "Meet Big Deep carousel"],
    note: "Osmo footage + individual dumps = strong BTS content stack. Prioritize pulling short clips for TikTok.",
  },
  {
    name: "April 21 — The Show Before The Show",
    icon: "🎸",
    subtitle: "Live-in-studio — 60-70 guests — UPCOMING",
    status: "upcoming",
    statusLabel: "Upcoming Apr 21",
    assets: [
      { label: "Full album performance (live-in-studio)", ready: false },
      { label: "Extended improv sets", ready: false },
      { label: "3 covers", ready: false },
      { label: "3 photographers on-site", ready: false },
      { label: "60-70 person crowd (fan energy)", ready: false },
      { label: "6-camera video setup", ready: false },
      { label: "Full professional video crew", ready: false },
    ],
    platforms: ["YouTube premiere", "TikTok performance clips", "IG Reels", "Press features"],
    note: "This is the single biggest content capture event. Plan shots in advance — assign each camera a role.",
  },
  {
    name: "@VicBrazen — Photos",
    icon: "📸",
    subtitle: "Approved press-ready assets",
    status: "ready",
    statusLabel: "Approved + Ready",
    assets: [
      { label: "Jordan headshots — approved", ready: true },
      { label: "Band shots (full lineup) — approved", ready: true },
      { label: "Press photos — approved", ready: true },
    ],
    platforms: ["L4LM feature", "Relix Daily Dose", "JamBase interview", "All social bios"],
    note: "Hold all band photos until April 16 reveal. Share approved shots with press as needed pre-reveal.",
  },
  {
    name: "@SarahDavida — Branding",
    icon: "🎨",
    subtitle: "Logo + full brand package",
    status: "in-progress",
    statusLabel: "In Progress",
    assets: [
      { label: "Logo — in progress", ready: false },
      { label: "Color system", ready: false },
      { label: "Type system", ready: false },
      { label: "Full brand guidelines", ready: false },
    ],
    platforms: ["All platforms", "Website", "Press materials", "Merch"],
    note: "Must be locked before April 8 teaser posts. Follow up with Sarah this week.",
  },
];

const musicVideo = {
  single: "Eclipse — Music Video 1",
  status: "urgent",
  deadline: "Must shoot in April",
  shootWindow: "April — No concept decided yet",
  deliverables: [
    "YouTube version (1080p+)",
    "Instagram Reel version (vertical crop)",
    "TikTok version (mobile optimized)",
    "BTS making-of footage",
    "30-60 sec teaser clip",
  ],
  blockers: [
    "No concept decided",
    "No crew confirmed",
    "No location locked",
  ],
};

const statusColors: Record<string, string> = {
  raw: "bg-yellow-100 text-yellow-700 border-yellow-200",
  editing: "bg-blue-100 text-blue-700 border-blue-200",
  upcoming: "bg-purple-100 text-purple-700 border-purple-200",
  ready: "bg-green-100 text-green-700 border-green-200",
  "in-progress": "bg-orange-100 text-orange-700 border-orange-200",
};

export default function ContentInventory() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Music size={32} className="text-primary-500" />
          Content Inventory
        </h2>
        <p className="text-neutral-500 text-sm">What you have, what's in progress, what needs to happen.</p>
      </div>

      {/* URGENT — Music Video */}
      <section>
        <div className="bg-red-600 text-white rounded-xl p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">🔴 Urgent — Action Required</p>
              <h3 className="text-xl font-bold">{musicVideo.single}</h3>
              <p className="text-sm opacity-90 mt-1">{musicVideo.shootWindow}</p>
            </div>
            <span className="text-xs font-bold bg-white text-red-600 px-3 py-1 rounded-full flex-shrink-0">
              {musicVideo.deadline}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs font-bold uppercase opacity-70 mb-2">Blockers — Decide This Week</p>
              <div className="space-y-1.5">
                {musicVideo.blockers.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded border-2 border-red-300 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase opacity-70 mb-2">Deliverables Needed</p>
              <div className="space-y-1">
                {musicVideo.deliverables.map((d, i) => (
                  <p key={i} className="text-xs opacity-80 flex items-center gap-1.5">
                    <CheckCircle size={10} className="flex-shrink-0" />
                    {d}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs opacity-70 mt-4 border-t border-red-500 pt-3">
            Mid-May Eclipse drop requires an April shoot. Concept + crew must be decided <strong className="text-white">this week</strong>.
          </p>
        </div>
      </section>

      {/* Asset Libraries */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Asset Libraries</h3>
        <div className="space-y-4">
          {assetLibraries.map((lib, idx) => (
            <div key={idx} className="card-retro p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lib.icon}</span>
                    <h4 className="text-lg font-bold text-neutral-900">{lib.name}</h4>
                  </div>
                  <p className="text-sm text-neutral-500 mt-0.5">{lib.subtitle}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${statusColors[lib.status]}`}>
                  {lib.statusLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase mb-2">Assets</p>
                  <div className="space-y-1">
                    {lib.assets.map((a, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle
                          size={12}
                          className={`flex-shrink-0 ${a.ready ? "text-green-500" : "text-neutral-300"}`}
                        />
                        <span className={`text-xs ${a.ready ? "text-neutral-700" : "text-neutral-400"}`}>
                          {a.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase mb-2">Use For</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lib.platforms.map((p, i) => (
                      <span key={i} className="text-xs bg-primary-50 text-primary-700 border border-primary-100 px-2 py-0.5 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {lib.note && (
                <div className="bg-neutral-50 border-l-4 border-primary-300 pl-3 py-2 rounded-r-lg">
                  <p className="text-xs text-neutral-600 italic">{lib.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Content Gap Summary */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Open Gaps</h3>
        <div className="space-y-2">
          {[
            { gap: "Music Video 1 — concept + crew", why: "Mid-May Eclipse drop requires April shoot", by: "This week 🔴", urgent: true },
            { gap: "@SarahDavida branding package locked", why: "All April 8 teaser posts need final logo", by: "Before Apr 8", urgent: true },
            { gap: "Music Video 2 + 3 planned", why: "Singles 2 + 3 Summer/Fall 2026", by: "Q3 planning", urgent: false },
            { gap: "Album artwork", why: "Summer album announce", by: "June 2026", urgent: false },
            { gap: "April 21 shot list finalized", why: "6-cam shoot needs roles assigned per camera", by: "Before Apr 21", urgent: false },
          ].map((item, idx) => (
            <div key={idx} className={`rounded-xl p-4 flex items-start gap-3 border ${item.urgent ? "bg-red-50 border-red-200" : "bg-white border-neutral-200"}`}>
              <AlertCircle size={16} className={`flex-shrink-0 mt-0.5 ${item.urgent ? "text-red-500" : "text-neutral-400"}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${item.urgent ? "text-red-800" : "text-neutral-800"}`}>{item.gap}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{item.why}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${item.urgent ? "bg-red-100 text-red-700" : "bg-neutral-100 text-neutral-500"}`}>
                {item.by}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

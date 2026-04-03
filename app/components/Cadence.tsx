"use client";

import { Radio, CheckCircle } from "lucide-react";

const platforms = [
  {
    name: "Instagram Feed",
    handle: "@BigDeepBand",
    role: "Credibility anchor — major events only",
    icon: "📷",
    color: "bg-pink-50 border-pink-200",
    badge: "bg-pink-100 text-pink-700",
    rules: [
      "Feed stays SILENT April 8–15 (wall up — only teaser image)",
      "Feed WAKES UP April 16 with Inklines animated reveal",
      "After reveal: band shots, major milestones, press moments",
      "Do NOT flood. Every feed post is a statement.",
    ],
    frequency: "1–2x/week post-reveal",
    preLaunch: "Silent Apr 8–15 — one teaser image only",
    postLaunch: "Reveal + major moments only",
  },
  {
    name: "Instagram Stories",
    handle: "@BigDeepBand + Jordan personal",
    role: "Daily pulse — behind the scenes, press drops",
    icon: "⭕",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    rules: [
      "Jordan personal Stories go active April 9 (L4LM drops)",
      "@BigDeepBand Stories active April 9 onward",
      "Daily Stories from April 9 through launch week",
      "Reshare all press drops to Stories immediately",
      "Archive April 8 teaser image night of April 15",
    ],
    frequency: "Daily from Apr 9",
    preLaunch: "Jordan personal active Apr 9. @BigDeepBand Stories Apr 9.",
    postLaunch: "Daily — reshare press, BTS, behind-the-curtain moments",
  },
  {
    name: "TikTok",
    handle: "@BigDeepBand",
    role: "Discovery engine — volume lab",
    icon: "🎵",
    color: "bg-neutral-50 border-neutral-200",
    badge: "bg-neutral-100 text-neutral-700",
    rules: [
      "TikTok is a sandbox — test hooks, clips, moments",
      "4–6x per week minimum (more = more discovery)",
      "All At Once clips, jam moments, BTS, personality",
      "Pull 30-60 sec clips from Wook+ interview day of publish",
      "Clip from Utopia BTS dumps, Inception session, April 21 live",
      "Don't overthink it — consistency beats perfection here",
    ],
    frequency: "4–6x/week",
    preLaunch: "Sandbox begins Apr 9 — low-stakes testing",
    postLaunch: "Clip from every press moment, every session, every show",
  },
  {
    name: "YouTube",
    handle: "Big Deep",
    role: "Long-form archive + premieres",
    icon: "▶️",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    rules: [
      "Wook+ interview publishes April 13 — reshare to Stories",
      "Eclipse music video premieres here — set premiere time",
      "April 21 live performance footage → YouTube long-form",
      "Utopia BTS footage → YouTube long-form after reveal",
      "Quality matters here — don't publish raw/unedited",
    ],
    frequency: "1–2x/month (major drops only)",
    preLaunch: "Wook+ Apr 13 (they publish, you reshare)",
    postLaunch: "Music Video 1, April 21 live footage, BTS features",
  },
  {
    name: "Facebook",
    handle: "@BigDeepBand",
    role: "Auto cross-post from Instagram",
    icon: "👥",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    rules: [
      "Link Facebook to Instagram — auto cross-post everything",
      "Don't create separate Facebook content",
      "Telegram community link should be pinned to Facebook page",
      "Facebook is a bonus reach layer — not a primary focus",
    ],
    frequency: "Auto (mirrors IG)",
    preLaunch: "Link accounts — ensure auto-post is working",
    postLaunch: "Passive — mirrors IG, Telegram link pinned",
  },
  {
    name: "Telegram",
    handle: "t.me/+fesIFdrjEqxkZmEx",
    role: "Super-fan community — direct access",
    icon: "💬",
    color: "bg-sky-50 border-sky-200",
    badge: "bg-sky-100 text-sky-700",
    rules: [
      "Telegram is the inner circle — treat it like a VIP list",
      "Push the Telegram link everywhere post-reveal",
      "Early access, first to know, direct communication",
      "JamFam IG Q&A Apr 15 should drive people to Telegram",
      "Grow this list — it becomes the presale audience",
    ],
    frequency: "As needed — major news + exclusive drops",
    preLaunch: "Telegram link live — start seeding to warm audience",
    postLaunch: "Push for Bearsville presale, exclusive content, fan updates",
  },
];

const aprilCadenceByPhase = [
  {
    phase: "Apr 8–15",
    label: "Silent Wall",
    items: [
      { platform: "IG Feed", action: "One teaser image — then silence" },
      { platform: "IG Stories (Jordan)", action: "Active from Apr 9 — reshare press drops" },
      { platform: "IG Stories (@BigDeepBand)", action: "Active from Apr 9" },
      { platform: "TikTok", action: "Sandbox — 4–6 clips/week" },
      { platform: "YouTube", action: "Wook+ interview Apr 13 (they publish)" },
      { platform: "Telegram", action: "Seed link to warm audience" },
    ],
  },
  {
    phase: "Apr 16",
    label: "🎸 Reveal Day",
    items: [
      { platform: "IG Feed", action: "Inklines animated video — this is the moment" },
      { platform: "IG Stories", action: "All day — every reshare, every reaction" },
      { platform: "TikTok", action: "Clip from Inklines video immediately" },
      { platform: "YouTube", action: "Reshare Wook+ if not already" },
      { platform: "Facebook", action: "Auto cross-post from IG" },
      { platform: "Telegram", action: "Push to community" },
    ],
  },
  {
    phase: "Apr 17–22",
    label: "Launch Week",
    items: [
      { platform: "IG Feed", action: "Polaroid carousel Apr 20 (Meet Big Deep)" },
      { platform: "IG Stories", action: "Reshare Relix Daily Dose, JamBase blast" },
      { platform: "TikTok", action: "Eclipse clips, BTS, introduce each member" },
      { platform: "YouTube", action: "April 21 show — full-length footage post-show" },
      { platform: "Telegram", action: "VIP updates + Bearsville hint" },
    ],
  },
  {
    phase: "Apr 23 — May",
    label: "Build Phase",
    items: [
      { platform: "IG Feed", action: "1–2x/week — quality over quantity" },
      { platform: "IG Stories", action: "Daily — BTS, studio, journey content" },
      { platform: "TikTok", action: "4–6x/week — music, personality, Eclipse + All At Once teaser clips" },
      { platform: "YouTube", action: "Utopia BTS long-form, music video BTS" },
      { platform: "Telegram", action: "Pre-save campaign drops here first" },
    ],
  },
];

export default function Cadence() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Radio size={32} className="text-primary-500" />
          Posting Cadence
        </h2>
        <p className="text-neutral-500 text-sm">Platform roles, rules, and April launch sequence.</p>
      </div>

      {/* Platform Roles */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Platform Roles</h3>
        <div className="space-y-4">
          {platforms.map((p, idx) => (
            <div key={idx} className={`rounded-xl border p-5 ${p.color}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.icon}</span>
                    <h4 className="font-bold text-neutral-900">{p.name}</h4>
                    <span className="text-xs font-mono text-neutral-500">{p.handle}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-0.5 ml-8">{p.role}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${p.badge}`}>
                  {p.frequency}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-7">
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase mb-1.5">Rules</p>
                  <div className="space-y-1">
                    {p.rules.map((r, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle size={10} className="text-primary-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-neutral-700">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white bg-opacity-70 rounded-lg p-2.5">
                    <p className="text-xs font-bold text-neutral-500 uppercase mb-0.5">Pre-Launch</p>
                    <p className="text-xs text-neutral-700">{p.preLaunch}</p>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-lg p-2.5">
                    <p className="text-xs font-bold text-neutral-500 uppercase mb-0.5">Post-Reveal</p>
                    <p className="text-xs text-neutral-700">{p.postLaunch}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* April Phase Cadence */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">April by Phase</h3>
        <div className="space-y-4">
          {aprilCadenceByPhase.map((phase, idx) => (
            <div key={idx} className={`rounded-xl border p-4 ${phase.label.includes("🎸") ? "bg-accent-50 border-accent-200" : "bg-white border-neutral-200"}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">{phase.phase}</span>
                <h4 className={`font-bold ${phase.label.includes("🎸") ? "text-accent-700" : "text-neutral-900"}`}>
                  {phase.label}
                </h4>
              </div>
              <div className="space-y-1.5">
                {phase.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-primary-600 w-28 flex-shrink-0 mt-0.5">{item.platform}</span>
                    <p className="text-xs text-neutral-700">{item.action}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Core Rule */}
      <div className="bg-neutral-900 text-white rounded-xl p-5">
        <h3 className="font-bold mb-3 text-sm uppercase tracking-wide opacity-70">The Core Rule</h3>
        <div className="space-y-2 text-sm">
          {[
            ["IG Feed", "Statement only. Every post counts. Never post just to post."],
            ["IG Stories", "Daily. Fast, raw, real. The pulse of the band."],
            ["TikTok", "Volume. Sandbox. Consistency over perfection."],
            ["YouTube", "Archive. Long-form. Quality first."],
            ["Facebook", "Auto-pilot. Mirrors IG. Don't touch."],
            ["Telegram", "VIP list. First access. Build it like a presale machine."],
          ].map(([platform, rule], i) => (
            <div key={i} className="flex gap-3">
              <span className="text-accent-400 font-bold flex-shrink-0 w-20">{platform}</span>
              <span className="text-neutral-300">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

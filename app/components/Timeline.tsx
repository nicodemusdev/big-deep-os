"use client";

import { Calendar, CheckCircle } from "lucide-react";

const timeline = [
  {
    month: "April 2026 — Week 1",
    phase: "Phase 1: Pre-Reveal",
    key: "Apr 8: Teaser image posts. Apr 9: L4LM drops. Wall stays silent.",
    milestones: ["Apr 8: Logo + 'April 16.' posts to @BigDeepBand", "Apr 9: L4LM interview + Jordan personal post", "Apr 9: Stories go active (Jordan only)", "TikTok sandbox begins"],
    status: "active",
  },
  {
    month: "April 2026 — Week 2",
    phase: "Phase 1 cont.: Press Cascade",
    key: "Apr 13: Wook+ YouTube interview. Apr 15: JamFam Q&A. Apr 15: Archive teaser.",
    milestones: ["Apr 13: Wook+ exclusive (Jordan + Luke)", "Apr 15: JamFam IG Q&A", "Apr 15: Archive Apr 8 image tonight", "Apr 15: Countdown Story"],
    status: "active",
  },
  {
    month: "April 16, 2026",
    phase: "🎸 BAND REVEAL — The Moment",
    key: "Inklines animated video drops. All 4 members revealed. Ad campaign launches. Website goes live.",
    milestones: ["Inklines animated reveal video", "Full lineup: Jordan, Luke, Kevin, Brendan", "Meta Video Views ad launches within 1 hr", "BigDeep.Band full site goes live", "Relix Stories coverage"],
    status: "upcoming-major",
  },
  {
    month: "April 17–22, 2026",
    phase: "Phase 2: Launch Week",
    key: "Apr 17: Relix Daily Dose + JamBase email blast. Apr 20: Meet Big Deep. Apr 21: Utopia show.",
    milestones: ["Apr 17: Relix Daily Dose headline", "Apr 17: JamBase email blast", "Apr 20: Polaroid carousel (Meet Big Deep)", "Apr 20: JamBase interview publishes", "Apr 21: Utopia — The Show Before The Show (60-70 guests)"],
    status: "upcoming",
  },
  {
    month: "April 23 — May 2026",
    phase: "Phase 3: Build Phase",
    key: "Sustained content cadence. Music Video 1 shoot (must happen in April). Pre-save campaign launches.",
    milestones: ["TikTok 4–6x/week (Eclipse clips, jams, BTS)", "IG Stories daily", "Music Video 1 shoot — April", "Pre-save link goes live 3 wks before single", "Telegram community grows"],
    status: "planned",
  },
  {
    month: "Mid-May 2026",
    phase: "Phase 4: Single 1 Drop — Eclipse",
    key: "First single release. Music video launch. Full activation campaign.",
    milestones: ["Eclipse single drops on all DSPs", "Music video premieres on YouTube", "Meta Traffic ad to pre-save/stream page", "Full press push (JamBase, Relix follow-up)", "Spotify editorial pitch"],
    status: "planned",
  },
  {
    month: "Summer 2026",
    phase: "Phase 5: Album Announce + Singles 2 & 3",
    key: "Full album announced. Singles 2 and 3 drop. First show announced.",
    milestones: ["Single 2 release", "Single 3 release", "Album title, artwork, track listing reveal", "First show announced (Bearsville Theatre)"],
    status: "planned",
  },
  {
    month: "August 2026",
    phase: "Phase 6: First Show — Bearsville Theatre",
    key: "Sell out Bearsville. Live documentation. Touring cascade begins.",
    milestones: ["Bearsville Theatre — SELL OUT", "Ticket sales push begins 6 weeks before", "Pre-show rehearsal content", "Full live video documentation", "Touring announcement follows"],
    status: "planned",
  },
  {
    month: "Fall 2026 — Spring 2027",
    phase: "Phase 7: Touring Cascade + Year 2",
    key: "Venue booking, sustained touring, festival season, Album 2 direction.",
    milestones: ["Additional venues booked", "Festival submissions (2027 season)", "Year-in-review content (Apr 26, 2027 — 2yr anniversary)", "Album 2 direction clear"],
    status: "planned",
  },
];

const statusConfig: Record<string, { dot: string; card: string; badge: string; label: string }> = {
  active:         { dot: "bg-primary-500 ring-4 ring-primary-100", card: "bg-primary-50 border-primary-200", badge: "bg-primary-100 text-primary-700", label: "Active" },
  "upcoming-major": { dot: "bg-accent-500 ring-4 ring-accent-100", card: "bg-accent-50 border-accent-300", badge: "bg-accent-100 text-accent-700", label: "Launch Day" },
  upcoming:       { dot: "bg-blue-400", card: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-700", label: "Upcoming" },
  planned:        { dot: "bg-neutral-300", card: "bg-white border-neutral-200", badge: "bg-neutral-100 text-neutral-500", label: "Planned" },
};

export default function Timeline() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Calendar size={32} className="text-primary-500" />
          Big Deep Launch Sequence
        </h2>
        <p className="text-neutral-500 text-sm">April 2026 → Beyond — all confirmed dates and milestones</p>
      </div>

      <div className="relative pl-3">
        <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-neutral-200" />
        <div className="space-y-4">
          {timeline.map((item, idx) => {
            const cfg = statusConfig[item.status];
            return (
              <div key={idx} className="flex gap-4 relative">
                <div className={`w-5 h-5 rounded-full flex-shrink-0 z-10 mt-4 ${cfg.dot}`} />
                <div className={`flex-1 rounded-xl border p-5 ${cfg.card}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">{item.month}</p>
                      <h3 className="font-bold text-neutral-900 mt-0.5">{item.phase}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-neutral-700 mb-3 border-l-4 border-current pl-3 py-1 border-opacity-30" style={{ borderColor: "currentColor", opacity: 1 }}>
                    {item.key}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.milestones.map((m, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs bg-white border border-neutral-200 rounded-lg px-2.5 py-1 text-neutral-700">
                        <CheckCircle size={10} className="text-primary-400 flex-shrink-0" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical dependencies */}
      <div className="bg-neutral-900 text-white rounded-xl p-5">
        <h3 className="font-bold mb-4 text-sm uppercase tracking-wide opacity-70">Critical Dependencies</h3>
        <div className="space-y-2 text-sm">
          {[
            ["Music Video 1", "Concept + crew must be decided this week — mid-May drop requires an April shoot"],
            ["Meta Pixel + Email Form", "Must be live before Apr 9 — L4LM article drives press traffic to BigDeep.Band"],
            ["Meta Ad Campaign", "Must be built and ready to launch the moment Inklines video goes live Apr 16"],
            ["Bearsville Theatre", "August is the goal. Sell out is non-negotiable."],
            ["Singles Sequence", "Each single teaches what to do with the next. Don't skip or reorder."],
          ].map(([dep, desc], i) => (
            <div key={i} className="flex gap-3">
              <span className="text-accent-400 font-bold flex-shrink-0">→</span>
              <span><strong className="text-white">{dep}:</strong> <span className="text-neutral-300">{desc}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

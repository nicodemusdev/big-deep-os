"use client";

import { CheckSquare, CheckCircle, Circle } from "lucide-react";
import { useState, useEffect } from "react";

type Task = {
  id: string;
  phase: number;
  title: string;
  owner: string;
  due: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
};

const tasks: Task[] = [
  // ── THIS WEEK — Urgent pre-launch ──────────────────────────────────────────
  {
    id: "t-mv1-concept",
    phase: 0,
    title: "Music Video 1 — decide concept + crew",
    owner: "Jordan",
    due: "This week 🔴",
    priority: "CRITICAL",
    description: "Mid-May Eclipse drop requires an April shoot. No concept, no crew, no location decided yet. Blocking everything downstream.",
  },
  {
    id: "t-branding",
    phase: 0,
    title: "Lock @SarahDavida branding package",
    owner: "Jordan → Sarah",
    due: "Before Apr 8",
    priority: "CRITICAL",
    description: "Logo, color system, type system must be final before the Apr 8 teaser image posts go live.",
  },
  {
    id: "t-pixel",
    phase: 0,
    title: "Meta Pixel live on BigDeep.Band",
    owner: "Jordan",
    due: "Before Apr 9 🔴",
    priority: "CRITICAL",
    description: "L4LM article drives press traffic Apr 9. Pixel must be installed BEFORE that or we lose the data forever. No second chance.",
  },
  {
    id: "t-email-form",
    phase: 0,
    title: "Email capture form live on BigDeep.Band",
    owner: "Jordan",
    due: "Before Apr 9 🔴",
    priority: "CRITICAL",
    description: "Same window as Meta Pixel — L4LM drives traffic Apr 9. Email list starts here.",
  },
  {
    id: "t-ad-build",
    phase: 0,
    title: "Build Meta ad campaign in Ads Manager",
    owner: "Jordan",
    due: "Before Apr 15",
    priority: "HIGH",
    description: "Build the Video Views campaign now (Inklines video as creative, jam scene targeting). Do NOT launch — just have it ready to go the moment Apr 16 hits.",
  },
  {
    id: "t-reveal-caption",
    phase: 0,
    title: "Write + lock April 16 reveal caption",
    owner: "Jordan",
    due: "Before Apr 15",
    priority: "HIGH",
    description: "Write the reveal post caption before reveal day. No last-minute copy on the biggest moment. Write it, sleep on it, lock it.",
  },
  {
    id: "t-apr21-shotlist",
    phase: 0,
    title: "April 21 shot list finalized",
    owner: "Jordan + Video crew",
    due: "Before Apr 21",
    priority: "HIGH",
    description: "6-camera shoot requires roles assigned to each camera in advance. Coordinate with full video crew. Assign photographers their focus areas.",
  },
  {
    id: "t-telegram-seed",
    phase: 0,
    title: "Seed Telegram link to warm audience",
    owner: "Jordan",
    due: "This week",
    priority: "MEDIUM",
    description: "Start building the VIP community before the reveal. Send the link to Spafford fans, close contacts, warm audience now.",
  },

  // ── Apr 8–15 — Silent Wall ─────────────────────────────────────────────────
  {
    id: "t-apr8-teaser",
    phase: 1,
    title: "Post teaser image to @BigDeepBand IG Feed",
    owner: "Jordan",
    due: "Apr 8",
    priority: "CRITICAL",
    description: "One image. Wall goes silent after this. Nothing else until April 16. Then archive this post the night of Apr 15.",
  },
  {
    id: "t-apr9-stories",
    phase: 1,
    title: "Jordan + @BigDeepBand Stories go active",
    owner: "Jordan",
    due: "Apr 9 (L4LM drops)",
    priority: "CRITICAL",
    description: "Stories launch the moment L4LM article drops. Reshare immediately. Jordan personal + @BigDeepBand both active from this point daily.",
  },
  {
    id: "t-apr9-tiktok",
    phase: 1,
    title: "TikTok sandbox begins — first post",
    owner: "Jordan",
    due: "Apr 9",
    priority: "HIGH",
    description: "First TikTok goes live Apr 9 — Eclipse teaser clip or backstory. 4-6x/week from here. Volume over perfection.",
  },
  {
    id: "t-apr13-wook",
    phase: 1,
    title: "Wook+ YouTube interview drops — clip for TikTok",
    owner: "Jordan",
    due: "Apr 13",
    priority: "HIGH",
    description: "Confirm Wook+ published. Reshare to all Stories. Pull 30-60 sec clip for TikTok same day. Post link to Telegram.",
  },
  {
    id: "t-apr15-jamfam",
    phase: 1,
    title: "JamFam IG Q&A — archive teaser image after",
    owner: "Jordan",
    due: "Apr 15",
    priority: "HIGH",
    description: "Answer JamFam IG questions live. Reshare to Stories. Archive the Apr 8 teaser image from the feed tonight — wall is blank for reveal tomorrow.",
  },

  // ── Apr 16 — Reveal Day ────────────────────────────────────────────────────
  {
    id: "t-apr16-reveal",
    phase: 2,
    title: "Post Inklines animated reveal video to IG Feed",
    owner: "Jordan",
    due: "Apr 16 — morning",
    priority: "CRITICAL",
    description: "This is THE moment. Post with locked caption. Tag @Inklines. All Stories coverage all day — reshare every reaction, every comment.",
  },
  {
    id: "t-apr16-ad",
    phase: 2,
    title: "Launch Meta Video Views campaign",
    owner: "Jordan",
    due: "Apr 16 — within 1hr of post",
    priority: "CRITICAL",
    description: "$50-75 budget, Apr 16-22. Video Views objective. Inklines video as creative. Jam scene targeting. Launch within one hour of the reveal post going live.",
  },
  {
    id: "t-apr16-tiktok",
    phase: 2,
    title: "Clip Inklines video for TikTok — post same day",
    owner: "Jordan",
    due: "Apr 16",
    priority: "HIGH",
    description: "Pull a 30-60 sec clip from Inklines video and post to TikTok same day as reveal. Strike while momentum is live.",
  },
  {
    id: "t-apr16-telegram",
    phase: 2,
    title: "Push reveal to Telegram community",
    owner: "Jordan",
    due: "Apr 16",
    priority: "HIGH",
    description: "Message the Telegram community — they hear it here. Begin driving new followers to Telegram via Stories CTA.",
  },

  // ── Apr 17–22 — Launch Week ────────────────────────────────────────────────
  {
    id: "t-apr17-relix",
    phase: 3,
    title: "Reshare Relix Daily Dose + JamBase blast",
    owner: "Jordan",
    due: "Apr 17",
    priority: "CRITICAL",
    description: "Relix Daily Dose is the biggest credibility stamp. Reshare to all Stories the moment it drops. Same for JamBase email blast mention.",
  },
  {
    id: "t-apr20-carousel",
    phase: 3,
    title: "Post Meet Big Deep polaroid carousel",
    owner: "Jordan",
    due: "Apr 20",
    priority: "HIGH",
    description: "Polaroid-style carousel introducing each band member. Timed with JamBase interview publish. This is the band's formal introduction to the world.",
  },
  {
    id: "t-apr23-ad",
    phase: 3,
    title: "Transition to Profile Visit ad campaign",
    owner: "Jordan",
    due: "Apr 23",
    priority: "HIGH",
    description: "Video Views campaign ends Apr 22. Launch Profile Visit campaign Apr 23 ($30-40, run through Apr 30). Targeting: people who viewed the Inklines video.",
  },
  {
    id: "t-apr21-show",
    phase: 3,
    title: "April 21 — The Show Before The Show",
    owner: "Full team",
    due: "Apr 21",
    priority: "CRITICAL",
    description: "6-cam video crew, 3 photographers, 60-70 guests. Capture everything. Assign camera roles before arrival. Pull TikTok clips same night if possible.",
  },

  // ── Pre-Memorial Day — Eclipse Live Single ────────────────────────────────
  {
    id: "t-eclipse-youtube",
    phase: 4,
    title: "Post Eclipse (live version) to YouTube — Apr 24",
    owner: "Jordan",
    due: "Apr 24 (Thursday) 🔴",
    priority: "CRITICAL",
    description: "Drop the 12-minute live version on YouTube first. Jam fans live here — YouTube gets the organic algorithm lift before the DSP release. Treat it as a live event document, not a single.",
  },
  {
    id: "t-eclipse-distro",
    phase: 4,
    title: "Submit Eclipse to DistroKid — target Spotify drop ~May 1",
    owner: "Jordan",
    due: "Before Apr 17 🔴",
    priority: "CRITICAL",
    description: "YouTube drops Apr 24 (Friday). Spotify/DSPs drop May 1 (Friday) for a second wave of mileage. DistroKid needs ~2 weeks — submit by approximately Apr 17.",
  },
  {
    id: "t-eclipse-savethedate",
    phase: 4,
    title: "Save the Date announcement — Apr 30",
    owner: "Jordan",
    due: "May 7 (Thursday)",
    priority: "HIGH",
    description: "Drop the Save the Date on May 7 (Thursday). Eclipse has been on Spotify for 6 days — momentum is warm. 2-week runway into All At Once drop May 21. Big Deep owns Thursdays.",
  },
  {
    id: "t-presave-campaign",
    phase: 4,
    title: "All At Once — pre-save campaign + Traffic ad",
    owner: "Jordan",
    due: "3 weeks before Memorial Day",
    priority: "HIGH",
    description: "Build pre-save landing page for All At Once. Launch $30 Traffic ad driving to pre-save link. Push pre-save via Telegram community first. All At Once drops May 21 (Thursday).",
  },
  {
    id: "t-allAtOnce-spotify",
    phase: 4,
    title: "Pitch All At Once to Spotify editorial",
    owner: "Jordan",
    due: "7 days before Memorial Day drop",
    priority: "HIGH",
    description: "Pitch window opens 7 days before release. Pitch All At Once on May 14 for the May 21 drop. Lead with the energy and the jam-band backstory. Target Fresh Finds, New Music Friday, live/jam playlists.",
  },
  {
    id: "t-mv1-shoot",
    phase: 4,
    title: "All At Once — Music Video shoot complete",
    owner: "Jordan + crew",
    due: "April (before Memorial Day drop)",
    priority: "CRITICAL",
    description: "All At Once is Single 1 — drops May 21 (Thursday). Shoot must be complete in April and in edit by early May. Deliver: YouTube cut, IG Reel cut, TikTok cut, BTS footage.",
  },
];

const phaseConfig: Record<number, { label: string; color: string; bg: string; border: string }> = {
  0: { label: "🔴 This Week — Pre-Launch (Before Apr 8)", color: "text-red-700",    bg: "bg-red-50",    border: "border-red-300" },
  1: { label: "📵 Apr 8–15 — Silent Wall",               color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-300" },
  2: { label: "🎸 Apr 16 — Reveal Day",                  color: "text-accent-700", bg: "bg-accent-50", border: "border-accent-300" },
  3: { label: "🚀 Apr 17–22 — Launch Week",              color: "text-primary-700",bg: "bg-primary-50",border: "border-primary-300" },
  4: { label: "🎵 Apr 24 + Memorial Day — Eclipse Drop + All At Once Single", color: "text-green-700",  bg: "bg-green-50",  border: "border-green-300" },
};

const priorityStyle: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700 border border-red-200",
  HIGH:     "bg-orange-100 text-orange-700 border border-orange-200",
  MEDIUM:   "bg-neutral-100 text-neutral-600 border border-neutral-200",
};

export default function Tasks() {
  const [filter, setFilter]   = useState("all");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bigdeep-tasks-checked");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bigdeep-tasks-checked", JSON.stringify(checked));
  }, [checked]);

  const toggleTask = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered   = filter === "all" ? tasks : tasks.filter(t => t.priority === filter);
  const doneCount  = tasks.filter(t => checked[t.id]).length;
  const pct        = Math.round((doneCount / tasks.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-neutral-900 mb-1 flex items-center gap-2">
            <CheckSquare size={30} className="text-primary-500" />
            Task Tracker
          </h2>
          <p className="text-neutral-500 text-sm">Click any task to check it off. Progress saves automatically.</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-bold text-primary-500">{doneCount}<span className="text-neutral-300">/{tasks.length}</span></p>
          <p className="text-xs text-neutral-400 mb-1">{pct}% complete</p>
          <div className="w-28 bg-neutral-100 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "CRITICAL", "HIGH", "MEDIUM"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              filter === f
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            {f === "all" ? "All Tasks" : f}
            <span className="ml-1.5 opacity-60">
              {f === "all"
                ? tasks.length
                : tasks.filter(t => t.priority === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Tasks by Phase */}
      {([0, 1, 2, 3, 4] as const).map(phase => {
        const phaseTasks = filtered.filter(t => t.phase === phase);
        if (phaseTasks.length === 0) return null;
        const cfg = phaseConfig[phase];

        return (
          <section key={phase}>
            <div className={`rounded-xl px-4 py-2.5 mb-3 border ${cfg.bg} ${cfg.border}`}>
              <h3 className={`font-bold text-sm ${cfg.color}`}>{cfg.label}</h3>
            </div>
            <div className="space-y-2">
              {phaseTasks.map(task => {
                const done = !!checked[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`rounded-xl border p-4 cursor-pointer select-none transition-all ${
                      done
                        ? "bg-green-50 border-green-200 opacity-60"
                        : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {done
                          ? <CheckCircle size={18} className="text-green-500" />
                          : <Circle size={18} className="text-neutral-300" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h4 className={`font-semibold text-sm ${done ? "line-through text-neutral-400" : "text-neutral-900"}`}>
                            {task.title}
                          </h4>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${priorityStyle[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className={`text-xs mb-2 leading-relaxed ${done ? "text-neutral-400" : "text-neutral-600"}`}>
                          {task.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span>Owner: <strong className="text-neutral-600">{task.owner}</strong></span>
                          <span>Due: <strong className="text-neutral-600">{task.due}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

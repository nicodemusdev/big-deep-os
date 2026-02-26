"use client";

import { CheckSquare, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Tasks() {
  const [filter, setFilter] = useState("all");

  const tasks = [
    {
      phase: 0,
      title: "Lock L4LM publish date (March 28)",
      owner: "Jordan",
      due: "ASAP",
      priority: "CRITICAL",
      status: "pending",
      description: "Confirm with L4LM contact that March 28 is locked for feature publish",
    },
    {
      phase: 0,
      title: "Organize content inventory",
      owner: "Team",
      due: "Mar 14",
      priority: "CRITICAL",
      status: "pending",
      description: "Tag and organize all Inception, Utopia, and Inkline footage for platform use",
    },
    {
      phase: 0,
      title: "Claim all social handles",
      owner: "Jordan",
      due: "Mar 27",
      priority: "HIGH",
      status: "pending",
      description: "Instagram, TikTok, YouTube, X, Spotify, Apple Music, Facebook",
    },
    {
      phase: 0,
      title: "Professional photo shoot",
      owner: "Photographer",
      due: "Mar 12",
      priority: "HIGH",
      status: "pending",
      description: "Band photos, Jordan headshots, studio moments (all formats)",
    },
    {
      phase: 0,
      title: "Finalize mix/master timeline",
      owner: "Producer",
      due: "ASAP",
      priority: "CRITICAL",
      status: "pending",
      description: "Confirm dates for Singles 1 (Apr 20), 2 (May 18), 3 (Jun 15)",
    },
    {
      phase: 0,
      title: "Write brand bios",
      owner: "Jordan",
      due: "This week",
      priority: "HIGH",
      status: "pending",
      description: "Short (100w), medium (300w), long (500+w) versions for partners",
    },
    {
      phase: 1,
      title: "Draft Phase 1 posts",
      owner: "Jordan",
      due: "Mar 27",
      priority: "HIGH",
      status: "pending",
      description: "First week of posts ready to go live March 28 (story + intro)",
    },
    {
      phase: 1,
      title: "Set up posting infrastructure",
      owner: "Jordan",
      due: "Mar 20",
      priority: "MEDIUM",
      status: "pending",
      description: "Buffer/Later/Metricool/native scheduling tool - ready to use",
    },
    {
      phase: 2,
      title: "Brand reveal content",
      owner: "Inkline",
      due: "Early April",
      priority: "HIGH",
      status: "pending",
      description: "Band member introductions, brand identity videos, full band narrative",
    },
    {
      phase: 3,
      title: "Single 1 music video shoot",
      owner: "Inkline",
      due: "Mar 31",
      priority: "CRITICAL",
      status: "pending",
      description: "Complete and export all platform versions (YouTube, IG, TikTok)",
    },
    {
      phase: 3,
      title: "April 21 in-studio live shoot",
      owner: "Inkline",
      due: "Apr 21",
      priority: "HIGH",
      status: "pending",
      description: "Record live-in-studio versions for all 3 singles (or at least Single 1)",
    },
    {
      phase: 3,
      title: "DSP account setup",
      owner: "Team",
      due: "Apr 1",
      priority: "MEDIUM",
      status: "pending",
      description: "Spotify for Artists, Apple Music, Amazon, YouTube Music creator accounts",
    },
  ];

  const filteredTasks = filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-primary-500 text-white";
      case "HIGH":
        return "bg-accent-500 text-neutral-900";
      default:
        return "bg-neutral-300 text-neutral-900";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <CheckSquare size={32} className="text-primary-500" />
          Task Tracker
        </h2>
        <p className="text-neutral-600">All tasks organized by phase and priority</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "CRITICAL", "HIGH", "MEDIUM"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-sm border-2 font-semibold transition-all ${
              filter === f
                ? "bg-primary-500 border-primary-500 text-white shadow-retro"
                : "bg-white border-neutral-900 text-neutral-900 hover:bg-cream"
            }`}
          >
            {f === "all" ? "All Tasks" : f}
          </button>
        ))}
      </div>

      {/* Tasks by Phase */}
      {[0, 1, 2, 3].map((phase) => {
        const phaseTasks = filteredTasks.filter((t) => t.phase === phase);
        if (phaseTasks.length === 0) return null;

        const phaseNames: Record<number, string> = {
          0: "Phase 0: Pre-Launch (Now → Mar 27)",
          1: "Phase 1: The Story (Mar 28)",
          2: "Phase 2: Brand Reveal (Early April)",
          3: "Phase 3: First Single (Apr 20)",
        };

        return (
          <section key={phase}>
            <h3 className="text-xl font-serif font-bold text-neutral-900 mb-4 pb-2 border-b-2 border-primary-500">
              {phaseNames[phase]}
            </h3>
            <div className="space-y-3">
              {phaseTasks.map((task, idx) => (
                <div key={idx} className="card-retro p-4 hover:shadow-retro-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-semibold text-neutral-900 flex-1">{task.title}</h4>
                    <span className={`badge-retro ${priorityColor(task.priority)} whitespace-nowrap`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 mb-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-600">
                    <span>Owner: <strong>{task.owner}</strong></span>
                    <span>Due: <strong>{task.due}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

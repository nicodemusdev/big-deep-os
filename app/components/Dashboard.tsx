"use client";

import { AlertCircle, CheckCircle, Clock, Calendar } from "lucide-react";

export default function Dashboard() {
  const phases = [
    {
      id: 0,
      name: "Pre-Launch",
      period: "Now → Mar 27",
      status: "In Progress",
      color: "bg-primary-500",
      milestone: "Handles claimed, inventory done",
    },
    {
      id: 1,
      name: "The Story",
      period: "Mar 28",
      status: "Ready",
      color: "bg-accent-500",
      milestone: "L4LM feature + socials live",
    },
    {
      id: 2,
      name: "Brand Reveal",
      period: "Early April",
      status: "Planned",
      color: "bg-primary-400",
      milestone: "Identity clear, audience established",
    },
    {
      id: 3,
      name: "First Single",
      period: "Apr 20",
      status: "Planned",
      color: "bg-primary-400",
      milestone: "Music video + single drop",
    },
    {
      id: 4,
      name: "Singles Wave",
      period: "May–Jun",
      status: "Planned",
      color: "bg-neutral-400",
      milestone: "Three singles, proven momentum",
    },
    {
      id: 5,
      name: "Album Announce",
      period: "Summer",
      status: "Planned",
      color: "bg-neutral-400",
      milestone: "Title, art, track listing revealed",
    },
    {
      id: 6,
      name: "First Show",
      period: "Aug",
      status: "Planned",
      color: "bg-neutral-400",
      milestone: "Bearsville sold out",
    },
    {
      id: 7,
      name: "Touring Cascade",
      period: "Fall+",
      status: "Planned",
      color: "bg-neutral-400",
      milestone: "Venue booking momentum",
    },
  ];

  const criticalTasks = [
    {
      title: "Lock L4LM publish date (March 28)",
      owner: "Jordan",
      priority: "CRITICAL",
      due: "ASAP",
    },
    {
      title: "Organize content inventory",
      owner: "Team",
      priority: "CRITICAL",
      due: "Mar 14",
    },
    {
      title: "Claim all social handles",
      owner: "Jordan",
      priority: "HIGH",
      due: "Mar 27",
    },
    {
      title: "Professional photo shoot",
      owner: "Photographer",
      priority: "HIGH",
      due: "Mar 12",
    },
    {
      title: "Finalize mix/master timeline",
      owner: "Producer",
      priority: "HIGH",
      due: "ASAP",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-retro p-6 bg-gradient-to-br from-primary-50 to-cream">
          <div className="flex items-center gap-4">
            <Clock className="text-primary-500" size={32} />
            <div>
              <p className="text-sm text-neutral-600 font-semibold">Timeline</p>
              <p className="text-2xl font-serif">12 Months</p>
              <p className="text-xs text-neutral-500">Mar 2026 → Mar 2027</p>
            </div>
          </div>
        </div>

        <div className="card-retro p-6 bg-gradient-to-br from-accent-50 to-cream">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-accent-500" size={32} />
            <div>
              <p className="text-sm text-neutral-600 font-semibold">Phases</p>
              <p className="text-2xl font-serif">8 Total</p>
              <p className="text-xs text-neutral-500">1 active, 7 planned</p>
            </div>
          </div>
        </div>

        <div className="card-retro p-6 bg-gradient-to-br from-primary-50 to-cream">
          <div className="flex items-center gap-4">
            <AlertCircle className="text-primary-500" size={32} />
            <div>
              <p className="text-sm text-neutral-600 font-semibold">Blockers</p>
              <p className="text-2xl font-serif">3 Critical</p>
              <p className="text-xs text-neutral-500">Need resolution now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Overview */}
      <section>
        <h2 className="text-2xl font-serif text-neutral-900 mb-4 flex items-center gap-2">
          <Calendar size={28} className="text-primary-500" />
          Phase Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phases.map((phase) => (
            <div key={phase.id} className="card-retro p-4 hover:shadow-retro-lg transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-serif text-lg text-neutral-900">Phase {phase.id}: {phase.name}</h3>
                  <p className="text-sm text-neutral-600">{phase.period}</p>
                </div>
                <span className={`badge-retro ${phase.color} text-white text-xs`}>
                  {phase.status}
                </span>
              </div>
              <p className="text-sm text-neutral-700">{phase.milestone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Tasks */}
      <section>
        <h2 className="text-2xl font-serif text-neutral-900 mb-4 flex items-center gap-2">
          <AlertCircle size={28} className="text-primary-500" />
          Critical Path Items
        </h2>
        <div className="space-y-3">
          {criticalTasks.map((task, idx) => (
            <div key={idx} className="card-retro p-4 flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold text-neutral-900">{task.title}</p>
                <p className="text-sm text-neutral-600">Owner: {task.owner}</p>
              </div>
              <div className="text-right">
                <span className={`badge-retro ${
                  task.priority === "CRITICAL" ? "bg-primary-500" : "bg-accent-500"
                } text-white`}>
                  {task.priority}
                </span>
                <p className="text-xs text-neutral-500 mt-1">Due: {task.due}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <h2 className="text-2xl font-serif text-neutral-900 mb-4">Marketing Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Content Pillars", value: "5" },
            { label: "Platforms", value: "4" },
            { label: "Singles", value: "3" },
            { label: "Partners", value: "3" },
          ].map((stat, idx) => (
            <div key={idx} className="card-retro p-4 text-center">
              <p className="text-3xl font-serif font-bold text-primary-500">{stat.value}</p>
              <p className="text-sm text-neutral-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

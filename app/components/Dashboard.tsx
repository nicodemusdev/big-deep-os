"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Calendar, Zap, Users, Radio, Music } from "lucide-react";

const LAUNCH_EVENTS = [
  { date: new Date("2026-04-08"), label: "Teaser Image Posts — Wall Goes Silent", phase: "pre" },
  { date: new Date("2026-04-09"), label: "L4LM Interview Drops", phase: "pre" },
  { date: new Date("2026-04-13"), label: "Wook+ YouTube Interview", phase: "pre" },
  { date: new Date("2026-04-15"), label: "JamFam IG Q&A", phase: "pre" },
  { date: new Date("2026-04-16"), label: "🎸 BAND REVEAL — Inklines Video + Ad Launch", phase: "reveal" },
  { date: new Date("2026-04-17"), label: "Relix Daily Dose + JamBase Email Blast", phase: "launch" },
  { date: new Date("2026-04-20"), label: "Meet Big Deep Carousel + JamBase Interview", phase: "launch" },
  { date: new Date("2026-04-21"), label: "Utopia — The Show Before The Show", phase: "launch" },
];

function getDaysUntil(date: Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getCurrentPhase() {
  const now = new Date();
  if (now < new Date("2026-04-08")) return { name: "Pre-Launch", color: "bg-yellow-500", desc: "Final prep — 6 days until the wall goes up" };
  if (now < new Date("2026-04-16")) return { name: "Pre-Reveal", color: "bg-blue-500", desc: "Silent wall active — press drops incoming" };
  if (now < new Date("2026-04-23")) return { name: "🔴 LAUNCH WEEK", color: "bg-red-500", desc: "All hands on deck" };
  if (now < new Date("2026-05-15")) return { name: "Build Phase", color: "bg-green-500", desc: "Sustaining momentum into the single" };
  return { name: "Single Activation", color: "bg-accent-500", desc: "Single drop incoming" };
}

export default function Dashboard() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const phase = getCurrentPhase();
  const daysUntilReveal = getDaysUntil(new Date("2026-04-16"));
  const nextEvent = LAUNCH_EVENTS.find(e => getDaysUntil(e.date) >= 0) || null;
  const daysUntilNext = nextEvent ? getDaysUntil(nextEvent.date) : 0;

  const urgentItems = [
    { task: "Email capture form live on BigDeep.Band", due: "Before Apr 9" },
    { task: "Meta Pixel installed on BigDeep.Band", due: "Before Apr 9" },
    { task: "All @BigDeepBand handles claimed & locked", due: "Before Apr 8" },
    { task: "Meta ad campaign built in Ads Manager — NOT live until Apr 16", due: "Before Apr 16" },
    { task: "Music Video 1 — concept + crew decided", due: "This week 🔴" },
    { task: "April 16 caption written & ready to paste", due: "Apr 15" },
  ];

  const pressPartners = [
    { name: "L4LM", date: "Apr 9", type: "Interview drops", eventLabel: "L4LM" },
    { name: "Wook+", date: "Apr 13", type: "YouTube interview", eventLabel: "Wook+" },
    { name: "JamFam", date: "Apr 15", type: "IG Q&A", eventLabel: "JamFam" },
    { name: "Relix", date: "Apr 17", type: "Daily Dose feature", eventLabel: "Relix" },
    { name: "JamBase", date: "Apr 17/20", type: "Email blast + interview", eventLabel: "JamBase" },
  ];

  return (
    <div className="space-y-8">

      {/* Phase Banner */}
      <div className={`${phase.color} rounded-xl p-5 text-white`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Campaign Mode</p>
            <h2 className="text-2xl font-bold">{phase.name}</h2>
            <p className="text-sm opacity-90 mt-1">{phase.desc}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80 mb-1">Days Until Band Reveal</p>
            <p className="text-6xl font-bold leading-none">{daysUntilReveal < 0 ? "Live" : daysUntilReveal}</p>
            <p className="text-xs opacity-80 mt-1">April 16, 2026</p>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nextEvent && (
          <div className="card-retro col-span-2 md:col-span-1">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-lg flex-shrink-0">
                <Zap className="text-red-500" size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Next Event</p>
                <p className="font-bold text-neutral-900 text-sm leading-tight">{nextEvent.label.replace("🎸 ", "")}</p>
                <p className="text-primary-600 font-bold text-lg mt-1">
                  {daysUntilNext === 0 ? "TODAY" : daysUntilNext === 1 ? "Tomorrow" : `${daysUntilNext} days`}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="card-retro">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
              <Users className="text-primary-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Band</p>
              <p className="text-2xl font-bold text-neutral-900">4</p>
              <p className="text-xs text-neutral-500 mt-0.5">Revealed Apr 16</p>
            </div>
          </div>
        </div>
        <div className="card-retro">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-accent-50 rounded-lg flex-shrink-0">
              <Radio className="text-accent-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Press Partners</p>
              <p className="text-2xl font-bold text-neutral-900">5</p>
              <p className="text-xs text-neutral-500 mt-0.5">All confirmed April</p>
            </div>
          </div>
        </div>
        <div className="card-retro">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
              <Music className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Hero Asset</p>
              <p className="text-sm font-bold text-neutral-900">Inklines Video</p>
              <p className="text-xs text-neutral-500 mt-0.5">Live Apr 16</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Urgent Items */}
        <section>
          <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            Urgent — Must Complete Before Apr 8
          </h3>
          <div className="space-y-2">
            {urgentItems.map((item, idx) => (
              <div key={idx} className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-3">
                <div className="w-4 h-4 rounded border-2 border-red-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-800">{item.task}</p>
                  <p className="text-xs text-red-600 mt-0.5 font-semibold">{item.due}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Press Calendar */}
        <section>
          <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-primary-500" />
            April Press Calendar — All Confirmed
          </h3>
          <div className="space-y-2">
            {pressPartners.map((p, idx) => {
              const matched = LAUNCH_EVENTS.find(e => e.label.includes(p.eventLabel));
              const days = matched ? getDaysUntil(matched.date) : 99;
              const isPast = days < 0;
              return (
                <div key={idx} className={`rounded-xl p-3 flex items-center justify-between border ${isPast ? "bg-neutral-50 border-neutral-200 opacity-60" : "bg-white border-neutral-200"}`}>
                  <div className="flex items-center gap-3">
                    {isPast
                      ? <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-primary-300 flex-shrink-0" />
                    }
                    <div>
                      <p className="font-bold text-sm text-neutral-800">{p.name}</p>
                      <p className="text-xs text-neutral-500">{p.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary-600">{p.date}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">confirmed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* April Event Timeline */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-primary-500" />
          April Launch Sequence
        </h3>
        <div className="relative pl-3">
          <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-neutral-200" />
          <div className="space-y-2">
            {LAUNCH_EVENTS.map((event, idx) => {
              const days = getDaysUntil(event.date);
              const isPast = days < 0;
              const isNext = !isPast && LAUNCH_EVENTS.filter(e => getDaysUntil(e.date) >= 0)[0] === event;
              return (
                <div key={idx} className="flex items-center gap-3 relative">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${
                    event.phase === "reveal" ? "bg-accent-500 border-accent-500" :
                    isPast ? "bg-green-500 border-green-500" :
                    isNext ? "bg-primary-500 border-primary-500 ring-4 ring-primary-100" :
                    "bg-white border-neutral-300"
                  }`}>
                    {isPast && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <div className={`flex-1 rounded-xl p-3 border flex items-center justify-between ${
                    event.phase === "reveal" ? "bg-accent-50 border-accent-200" :
                    isPast ? "bg-neutral-50 border-neutral-100 opacity-60" :
                    isNext ? "bg-primary-50 border-primary-200" :
                    "bg-white border-neutral-200"
                  }`}>
                    <div>
                      <p className={`font-semibold text-sm ${event.phase === "reveal" ? "text-accent-700" : "text-neutral-800"}`}>
                        {event.label}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {event.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                      isPast ? "bg-green-100 text-green-700" :
                      days === 0 ? "bg-yellow-100 text-yellow-700" :
                      isNext ? "bg-primary-100 text-primary-700" :
                      "bg-neutral-100 text-neutral-500"
                    }`}>
                      {isPast ? "✓" : days === 0 ? "TODAY" : `${days}d`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-3">The Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {[
            { name: "Jordan Fairless", role: "Lead Singer · CMO", public: true },
            { name: "Luke Schwartz", role: "Co-Founder · Interviews", public: true },
            { name: "Kevin Cooper", role: "Revealed Apr 16", public: false },
            { name: "Brendan Dillon", role: "Revealed Apr 16", public: false },
          ].map((m, i) => (
            <div key={i} className={`rounded-xl border p-3 text-center ${m.public ? "bg-primary-50 border-primary-200" : "bg-neutral-50 border-neutral-200"}`}>
              <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold ${m.public ? "bg-primary-500" : "bg-neutral-300"}`}>
                {m.public ? m.name[0] : "?"}
              </div>
              <p className={`text-xs font-bold ${m.public ? "text-neutral-800" : "text-neutral-400"}`}>{m.public ? m.name : "Secret"}</p>
              <p className="text-xs text-neutral-500 mt-0.5 leading-tight">{m.role}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { handle: "@Inklines", name: "Michael Arthur", role: "Animated reveal video" },
            { handle: "@VicBrazen", name: "Vic", role: "Photography + media" },
            { handle: "@SarahDavida", name: "Sarah", role: "Logo + branding" },
          ].map((c, i) => (
            <div key={i} className="bg-accent-50 border border-accent-200 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-accent-700">{c.handle}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{c.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

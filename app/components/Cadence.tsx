"use client";

import { Radio } from "lucide-react";

export default function Cadence() {
  const cadence = [
    {
      platform: "Instagram/Facebook",
      frequency: "4–5 posts/week",
      content: "40% Reels, 30% Carousels, 20% Single image, 10% Stories",
      timing: "Weekdays: 10 AM or 6 PM",
      focus: "Lifestyle, community, behind-the-scenes",
    },
    {
      platform: "TikTok",
      frequency: "6–7 clips/week (daily or near-daily)",
      content: "40% Short clips, 30% Original BTS, 20% Trends, 10% Community",
      timing: "Morning 9–10 AM, Afternoon 2–3 PM, Evening 7–9 PM",
      focus: "Discovery, hooks in 1 sec, authentic quick moments",
    },
    {
      platform: "YouTube",
      frequency: "1–2 uploads/week",
      content: "40% Music videos, 30% Behind-the-scenes, 20% Full performances, 10% Interviews",
      timing: "Premieres: Set time (e.g., 10 AM). Regular uploads: Maximize reach.",
      focus: "Long-form home base, production quality matters",
    },
    {
      platform: "X/Twitter",
      frequency: "3–4 posts/week",
      content: "50% Conversation, 30% Announcements, 15% Partner amp, 5% Fun",
      timing: "Morning + evening (when audience is online)",
      focus: "Direct, conversational, community engagement",
    },
  ];

  const weeklySchedule = [
    { day: "Monday", ig: "BTS post", tk: "Clip #1", yt: "Hold", x: "Post + RT" },
    { day: "Tuesday", ig: "Stories", tk: "Clip #2", yt: "Hold", x: "RT/engagement" },
    { day: "Wednesday", ig: "Reel/carousel", tk: "Clip #3", yt: "Upload", x: "Thread" },
    { day: "Thursday", ig: "Stories", tk: "Clip #4", yt: "Hold", x: "Engagement" },
    { day: "Friday", ig: "Community/thanks", tk: "Clip #5", yt: "Hold", x: "Weekend vibe" },
    { day: "Saturday", ig: "BTS/stories", tk: "Clip #6", yt: "Hold", x: "Weekend chat" },
    { day: "Sunday", ig: "Hold/stories", tk: "Clip #7 (opt)", yt: "Hold", x: "Week preview" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Radio size={32} className="text-primary-500" />
          Posting Cadence
        </h2>
        <p className="text-neutral-600">Weekly and platform-specific posting schedule</p>
      </div>

      {/* Platform Cadence */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Platform Strategy</h3>
        <div className="grid grid-cols-1 gap-4">
          {cadence.map((platform, idx) => (
            <div key={idx} className="card-retro p-6 hover:shadow-retro-lg transition-shadow">
              <h4 className="text-lg font-serif font-bold text-neutral-900 mb-3">{platform.platform}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="font-semibold text-primary-600 uppercase text-xs">Frequency</p>
                  <p className="text-neutral-900 font-bold text-base">{platform.frequency}</p>
                </div>
                <div>
                  <p className="font-semibold text-accent-600 uppercase text-xs">Best Times</p>
                  <p className="text-neutral-900">{platform.timing}</p>
                </div>
              </div>

              <div className="mb-3 bg-cream p-3 rounded border border-neutral-300">
                <p className="text-xs font-semibold text-neutral-600 uppercase mb-1">Content Mix</p>
                <p className="text-neutral-700 text-sm">{platform.content}</p>
              </div>

              <p className="text-sm text-neutral-700 border-l-4 border-primary-500 pl-3">
                <span className="font-semibold">Focus:</span> {platform.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Template */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Weekly Template</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-neutral-900 text-cream">
                <th className="border border-neutral-700 p-3 text-left font-serif">Day</th>
                <th className="border border-neutral-700 p-3 text-left font-serif">Instagram</th>
                <th className="border border-neutral-700 p-3 text-left font-serif">TikTok</th>
                <th className="border border-neutral-700 p-3 text-left font-serif">YouTube</th>
                <th className="border border-neutral-700 p-3 text-left font-serif">X</th>
              </tr>
            </thead>
            <tbody>
              {weeklySchedule.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-cream" : "bg-warmGray"}>
                  <td className="border border-neutral-300 p-3 font-semibold text-neutral-900">{row.day}</td>
                  <td className="border border-neutral-300 p-3 text-sm text-neutral-700">{row.ig}</td>
                  <td className="border border-neutral-300 p-3 text-sm text-neutral-700">{row.tk}</td>
                  <td className="border border-neutral-300 p-3 text-sm text-neutral-700">{row.yt}</td>
                  <td className="border border-neutral-300 p-3 text-sm text-neutral-700">{row.x}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Release Week Override */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Release Week (Singles, Album, Shows)</h3>
        <div className="card-retro p-6 bg-accent-50">
          <p className="text-neutral-700 mb-4">
            During release weeks, posting cadence increases and all platforms focus on the release:
          </p>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Release Day (e.g., Apr 20)</p>
              <p className="text-sm text-neutral-700 ml-4">
                • Pre-release posts (all platforms) → 10 AM YouTube premiere → Noon DSPs live → Afternoon TikTok/IG → Evening X thread
              </p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Days 1–3 Post-Release</p>
              <p className="text-sm text-neutral-700 ml-4">
                • IG/FB: 2 posts/day (clips + captions) → TikTok: 2–3 clips/day (max exposure) → YouTube: Behind-the-scenes Day 3 → X: Engagement
              </p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Days 4–7 Post-Release</p>
              <p className="text-sm text-neutral-700 ml-4">
                • Back to normal cadence, but release content still featured. BTS content releases. Playlist push continues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Posting Tools (Choose One)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Buffer", pros: "Simple, affordable, good analytics" },
            { name: "Later", pros: "Visual calendar, team collaboration" },
            { name: "Metricool", pros: "All platforms, detailed insights" },
          ].map((tool, idx) => (
            <div key={idx} className="card-retro p-4">
              <p className="font-semibold text-neutral-900 mb-1">{tool.name}</p>
              <p className="text-sm text-neutral-600">{tool.pros}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-neutral-600 mt-4">
          Set up and test by Mar 20 so posting infrastructure is ready for Phase 1 (Mar 28).
        </p>
      </section>
    </div>
  );
}

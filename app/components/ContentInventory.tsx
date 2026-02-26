"use client";

import { Music, CheckCircle, AlertCircle } from "lucide-react";

export default function ContentInventory() {
  const inventory = [
    {
      project: "Inception Sessions (4-day)",
      status: "Recorded",
      files: "TBD",
      description: "Complete session footage, multiple angles",
      readyFor: ["TikTok", "Instagram Reels", "YouTube BTS"],
      priority: "Organize ASAP",
    },
    {
      project: "Utopia Sessions (6-day)",
      status: "Recorded",
      files: "TBD",
      description: "Complete session footage, editing needed",
      readyFor: ["YouTube long-form", "TikTok clips", "Behind-the-scenes"],
      priority: "Tag and transcode",
    },
    {
      project: "Inkline Production (Ongoing)",
      status: "In Production",
      files: "TBD",
      description: "Professional band photos, studio moments, performance captures",
      readyFor: ["All platforms", "Partner features"],
      priority: "Coordinate delivery schedule",
    },
    {
      project: "Professional Photos",
      status: "To Schedule",
      files: "0",
      description: "Band photos, Jordan headshots, studio environment",
      readyFor: ["L4LM feature", "Social bios", "Partner materials"],
      priority: "Schedule by Mar 12",
    },
    {
      project: "April 21 In-Studio Live",
      status: "Planned",
      files: "0",
      description: "Live-in-studio performances of singles for release",
      readyFor: ["YouTube premieres", "Music videos alternate versions"],
      priority: "Confirm recording plan",
    },
  ];

  const musicVideo = {
    single: "Single 1 (April 20)",
    status: "To Schedule",
    shooter: "Inkline",
    deadline: "Mar 31",
    deliverables: [
      "YouTube version (1080p+)",
      "Instagram Reel version (vertical)",
      "TikTok version (mobile optimized)",
      "BTS making-of footage",
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Music size={32} className="text-primary-500" />
          Content Inventory
        </h2>
        <p className="text-neutral-600">What you have, what's ready, what's needed</p>
      </div>

      {/* Existing Footage */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Existing Footage</h3>
        <div className="space-y-3">
          {inventory.map((item, idx) => (
            <div key={idx} className="card-retro p-4 hover:shadow-retro-lg transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-neutral-900">{item.project}</h4>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
                <span className={`badge-retro ${
                  item.status === "Recorded" ? "bg-accent-500" :
                  item.status === "In Production" ? "bg-primary-400" :
                  "bg-neutral-400"
                } text-neutral-900`}>
                  {item.status}
                </span>
              </div>
              <div className="mt-2 text-sm space-y-1">
                <p className="text-neutral-700">
                  <span className="font-semibold">Ready for:</span> {item.readyFor.join(", ")}
                </p>
                <p className="bg-primary-50 p-2 rounded text-neutral-900 font-semibold">
                  ⚠ {item.priority}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Music Videos */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Music Videos</h3>
        <div className="card-retro p-6 bg-accent-50">
          <h4 className="text-xl font-serif font-bold text-neutral-900 mb-3">{musicVideo.single}</h4>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-neutral-600 uppercase">Shooter</p>
              <p className="text-neutral-900 font-semibold">{musicVideo.shooter}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-600 uppercase">Deadline</p>
              <p className="text-neutral-900 font-semibold">{musicVideo.deadline}</p>
            </div>
          </div>

          <p className="font-semibold text-neutral-900 mb-2">Platform Deliverables</p>
          <div className="space-y-1">
            {musicVideo.deliverables.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle size={16} className="text-primary-500" />
                {d}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-300">
            <p className="text-sm text-neutral-700">
              <span className="font-semibold">Note:</span> Coordinated with April 21 in-studio live shoot for maximum content capture
            </p>
          </div>
        </div>
      </section>

      {/* Content Gap Analysis */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">What's Missing</h3>
        <div className="space-y-3">
          {[
            { gap: "Professional band photo shoot", why: "Partner materials, social bios, L4LM feature", by: "Mar 12" },
            { gap: "Single 2 + 3 music video shoots", why: "April 20 + May 18 + June 15 releases", by: "Coordinate timing" },
            { gap: "Album artwork", why: "Summer album announce", by: "June 1" },
            { gap: "Rehearsal footage (ongoing)", why: "Daily BTS content for TikTok/IG", by: "Start now" },
          ].map((item, idx) => (
            <div key={idx} className="card-retro p-4 flex items-start gap-4">
              <AlertCircle className="text-primary-500 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">{item.gap}</h4>
                <p className="text-sm text-neutral-600">{item.why}</p>
                <p className="text-xs text-primary-600 font-semibold mt-1">Target: {item.by}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { Users, Mail, Calendar } from "lucide-react";

export default function Partners() {
  const partners = [
    {
      name: "L4LM",
      role: "Recovery narrative + band announcement",
      activation: "March 28",
      status: "Confirmed",
      description: "Feature article: 'Jordan Fairless: The Road Back'",
      materials: ["Photos", "Bio", "Interview/narrative"],
      deadline: "Mar 20",
      contact: "[Name] - [Email]",
      nextStep: "Confirm publish date ASAP",
    },
    {
      name: "JamBase",
      role: "Band story + musicianship",
      activation: "May–June (post-Single 1)",
      status: "Interest confirmed",
      description: "Interview + coverage of band story and first single",
      materials: ["Photos", "Interview", "Bio update"],
      deadline: "May 8–15",
      contact: "[Name] - [Email]",
      nextStep: "Warm outreach early May",
    },
    {
      name: "Relix",
      role: "Deep narrative + community credibility",
      activation: "May–June or Summer",
      status: "Interest confirmed",
      description: "In-studio feature, recovery arc, album deep-dive",
      materials: ["Studio access", "1–2hr interview", "Album materials"],
      deadline: "Late May–Early June",
      contact: "[Name] - [Email]",
      nextStep: "Warm outreach late April",
    },
  ];

  const handles = [
    { platform: "Instagram", handle: "@big-deep", priority: "ASAP", status: "TBD" },
    { platform: "TikTok", handle: "@bigdeepband", priority: "ASAP", status: "TBD" },
    { platform: "YouTube", handle: "Big Deep", priority: "ASAP", status: "TBD" },
    { platform: "X/Twitter", handle: "@big-deep", priority: "ASAP", status: "TBD" },
    { platform: "Spotify", handle: "Big Deep (artist)", priority: "ASAP", status: "TBD" },
    { platform: "Apple Music", handle: "Big Deep (artist)", priority: "ASAP", status: "TBD" },
    { platform: "Facebook", handle: "Big Deep Band", priority: "ASAP", status: "TBD" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Users size={32} className="text-primary-500" />
          Partner Coordination
        </h2>
        <p className="text-neutral-600">Strategic partnerships and social platform setup</p>
      </div>

      {/* Partners */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Media Partners</h3>
        <div className="space-y-4">
          {partners.map((partner, idx) => (
            <div key={idx} className="card-retro p-6 hover:shadow-retro-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-xl font-serif font-bold text-neutral-900">{partner.name}</h4>
                  <p className="text-sm text-neutral-600">{partner.role}</p>
                </div>
                <span className="badge-retro bg-accent-500 text-neutral-900">{partner.status}</span>
              </div>

              <p className="text-neutral-700 mb-3">{partner.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="font-semibold text-neutral-900">Materials Needed</p>
                  <ul className="list-disc list-inside text-neutral-700">
                    {partner.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Timeline</p>
                  <p className="text-neutral-700">Activation: <strong>{partner.activation}</strong></p>
                  <p className="text-neutral-700">Deadline: <strong>{partner.deadline}</strong></p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-300 text-sm space-y-1">
                <p className="text-neutral-700">
                  <span className="font-semibold">Contact:</span> {partner.contact}
                </p>
                <p className="bg-primary-50 p-2 rounded border-l-4 border-primary-500 text-neutral-900 font-semibold">
                  Next: {partner.nextStep}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Handles */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Social Media Handles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {handles.map((h, idx) => (
            <div key={idx} className="card-retro p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-900">{h.platform}</p>
                <p className="text-sm text-primary-500 font-mono">{h.handle}</p>
              </div>
              <span className="badge-retro bg-primary-500 text-white text-xs">Claim by {h.priority}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Action */}
      <section className="bg-primary-500 text-white rounded-sm border-2 border-neutral-900 p-6 shadow-retro">
        <h3 className="text-xl font-serif font-bold mb-3 flex items-center gap-2">
          <Calendar size={24} />
          Priority: Lock L4LM Date
        </h3>
        <p className="mb-3">
          This is the domino that triggers everything. March 28 is the 2-year anniversary of the car accident—the natural narrative hook for the recovery story. Confirm with L4LM contact that this date is locked.
        </p>
        <div className="bg-white bg-opacity-20 p-3 rounded border border-white">
          <p className="font-semibold">If L4LM can't do March 28:</p>
          <p className="text-sm mt-1">What's the fallback date? Phase 1 can shift, but it needs to be locked NOW, not in March.</p>
        </div>
      </section>
    </div>
  );
}

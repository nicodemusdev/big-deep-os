"use client";

import { BookOpen, ExternalLink } from "lucide-react";

export default function Research() {
  const resources = [
    {
      category: "Partner Contacts",
      items: [
        { title: "L4LM", contact: "[Name] - [Email] - [Phone]", note: "CRITICAL: Confirm Mar 28 date" },
        { title: "JamBase", contact: "[Name] - [Email] - [Phone]", note: "Warm outreach by May 1" },
        { title: "Relix", contact: "[Name] - [Email] - [Phone]", note: "Warm outreach by late April" },
      ],
    },
    {
      category: "DSP Resources",
      items: [
        { title: "Spotify for Artists", contact: "https://artists.spotify.com", note: "Editorial pitching, analytics" },
        { title: "Apple Music for Artists", contact: "https://artists.apple.com", note: "A-List picks, analytics" },
        { title: "TuneCore/DistroKid", contact: "Depends on distributor", note: "Playlist pitching, delivery" },
      ],
    },
    {
      category: "Brand Guidelines",
      items: [
        { title: "Logo Files", contact: "TBD", note: "Horizontal, vertical, icon variations" },
        { title: "Color Palette", contact: "Warm primaries (rust, mustard, cream)", note: "40s/50s matchbook aesthetic" },
        { title: "Typography", contact: "Georgia (serif) + System (sans)", note: "Retro elegance" },
      ],
    },
    {
      category: "Analytics & Tools",
      items: [
        { title: "Google Analytics", contact: "Set up for website/links", note: "Track L4LM traffic attribution" },
        { title: "Linktree or Beacons", contact: "Single link to all platforms", note: "Bio link for all social platforms" },
        { title: "Instagram Insights", contact: "Native app analytics", note: "Weekly engagement review" },
      ],
    },
  ];

  const guides = [
    { title: "Markdown Plan Files", location: "/home/ubuntu/contxta-vault/big-deep/marketing/", note: "Source of truth for this dashboard" },
    { title: "Content Calendar Template", location: "content-calendar.md", note: "12-month monthly themes, weekly guides" },
    { title: "Singles Strategy", location: "singles-strategy.md", note: "Detailed rollout for Singles 1, 2, 3 with learning loops" },
    { title: "Voice Principles", location: "strategy.md", note: "Authentic, community-first, emotional honesty" },
  ];

  const notes = [
    {
      title: "Content Inventory Status",
      status: "TBD",
      note: "Where is Inception/Utopia/Inkline footage? Is it backed up, organized, ready for transcode?",
    },
    {
      title: "Creative Timeline",
      status: "Confirm",
      note: "Are April 20, May 18, June 15 singles release dates locked? When is mix/master actually done?",
    },
    {
      title: "Social Media Operator",
      status: "Assign",
      note: "Daily TikTok posting, comment responses, metric reviews. Who owns this 10–15 hrs/week?",
    },
    {
      title: "Budget",
      status: "Define",
      note: "Paid promotion? Professional photography? Merchandise? What's the marketing spend?",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <BookOpen size={32} className="text-primary-500" />
          Research Hub
        </h2>
        <p className="text-neutral-600">Partner contacts, DSP guides, brand resources, and reference materials</p>
      </div>

      {/* Resources by Category */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Resource Library</h3>
        <div className="space-y-6">
          {resources.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-semibold text-primary-600 uppercase text-sm mb-3 pb-2 border-b-2 border-primary-500">
                {section.category}
              </h4>
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <div key={i} className="card-retro p-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="font-semibold text-neutral-900">{item.title}</p>
                      {item.contact.startsWith("http") && (
                        <a
                          href={item.contact}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-700 flex-shrink-0"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-neutral-700 font-mono">{item.contact}</p>
                    <p className="text-xs text-neutral-600 mt-1 italic">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Documentation */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Documentation</h3>
        <div className="space-y-3">
          {guides.map((guide, idx) => (
            <div key={idx} className="card-retro p-4">
              <h4 className="font-semibold text-neutral-900">{guide.title}</h4>
              <p className="text-sm text-neutral-700 font-mono mt-1">{guide.location}</p>
              <p className="text-sm text-neutral-600 mt-2">{guide.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Questions */}
      <section>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Open Questions & Decisions</h3>
        <div className="space-y-3">
          {notes.map((note, idx) => (
            <div key={idx} className="card-retro p-4 border-l-4 border-primary-500">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-semibold text-neutral-900">{note.title}</h4>
                <span className="badge-retro bg-primary-500 text-white text-xs whitespace-nowrap">
                  {note.status}
                </span>
              </div>
              <p className="text-sm text-neutral-700">{note.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Update This Dashboard */}
      <section className="bg-neutral-900 text-cream rounded-sm border-2 border-neutral-900 p-6 shadow-retro">
        <h3 className="text-xl font-serif font-bold mb-3">How to Update This Dashboard</h3>
        <div className="space-y-2 text-sm">
          <p>
            This dashboard reads from the markdown files in your contxta-vault. To update:
          </p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Edit the markdown files in <code className="bg-neutral-800 px-2 py-1 rounded">/big-deep/marketing/</code></li>
            <li>Push changes to GitHub</li>
            <li>Refresh the dashboard (it will pull the latest data)</li>
          </ol>
          <p className="mt-3 italic">
            Currently, the dashboard is using static data. We can add real-time sync to markdown files later if needed.
          </p>
        </div>
      </section>
    </div>
  );
}

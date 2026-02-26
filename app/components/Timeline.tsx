"use client";

import { Calendar } from "lucide-react";

export default function Timeline() {
  const timeline = [
    {
      month: "March 2026",
      phase: "Phase 1: The Story",
      key: "March 28: L4LM feature publishes, socials go live",
      milestones: ["Handles claimed", "Brand finalized", "Content inventory ready"],
    },
    {
      month: "April 2026",
      phase: "Phase 2 + 3: Brand Reveal & First Single",
      key: "April 20: Single 1 drops (studio + video)",
      milestones: ["Brand reveal", "Single 1 music video", "April 21 in-studio live shoot"],
    },
    {
      month: "May 2026",
      phase: "Phase 4: Singles Wave",
      key: "May 18: Single 2 drops (refined based on Single 1)",
      milestones: ["Single 2 release", "Live version releases May 5", "JamBase engagement begins"],
    },
    {
      month: "June 2026",
      phase: "Phase 4 + 5: Singles Complete & Album Announce",
      key: "June 15: Single 3 drops (most refined cascade)",
      milestones: ["Single 3 release", "Album ready for announce", "Momentum proof point"],
    },
    {
      month: "July 2026",
      phase: "Phase 5 + 6: Album & First Show Announce",
      key: "Early/Mid-July: Album announce, 2 weeks later: Bearsville announced",
      milestones: ["Album title & art", "Track listing revealed", "First show announced"],
    },
    {
      month: "August 2026",
      phase: "Phase 7: First Show",
      key: "Bearsville Theatre: SELL OUT",
      milestones: ["Ticket sales push", "Pre-show rehearsal content", "Live documentation"],
    },
    {
      month: "Sept–Dec 2026",
      phase: "Phase 8: Touring Cascade",
      key: "Venue booking, tour announcement, sustained touring",
      milestones: ["Additional venues booked", "Tour content strategy", "Album sustained"],
    },
    {
      month: "Jan–Mar 2027",
      phase: "Year 2: Momentum Reset & Festival Season",
      key: "March 28: 2-year recovery anniversary",
      milestones: ["Year-in-review content", "Festival submissions", "Album 2 direction clear"],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Calendar size={32} className="text-primary-500" />
          12-Month Launch Sequence
        </h2>
        <p className="text-neutral-600">Eight phases, each building on the previous one</p>
      </div>

      <div className="space-y-4">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Timeline connector */}
            {idx < timeline.length - 1 && (
              <div className="absolute left-8 top-20 w-1 h-8 bg-primary-500"></div>
            )}

            <div className="card-retro p-6 hover:shadow-retro-lg transition-shadow">
              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary-500 border-4 border-neutral-900 flex items-center justify-center text-white font-serif font-bold text-lg shadow-retro">
                    {idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary-500 uppercase tracking-wide">{item.month}</p>
                  <h3 className="text-xl font-serif font-bold text-neutral-900 mt-1">{item.phase}</h3>
                  <p className="text-base font-semibold text-neutral-700 mt-2 bg-accent-50 border-l-4 border-accent-500 pl-3 py-2">
                    {item.key}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.milestones.map((milestone, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 bg-cream border border-neutral-600 rounded-sm text-sm text-neutral-700"
                      >
                        ✓ {milestone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Dependencies */}
      <section className="bg-neutral-900 text-cream rounded-sm border-2 border-neutral-900 p-6 shadow-retro">
        <h3 className="text-xl font-serif font-bold mb-4">Critical Dependencies</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-accent-500 font-bold">→</span>
            <span><strong>L4LM date:</strong> March 28 must be locked (recovery anniversary narrative hook)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-500 font-bold">→</span>
            <span><strong>Bearsville:</strong> August is the goal. Sell out is non-negotiable.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-500 font-bold">→</span>
            <span><strong>Singles sequence:</strong> Each single teaches us what to do with the next one. Don't skip or reorder.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-500 font-bold">→</span>
            <span><strong>Album timing:</strong> Depends on creative completion. Decide announce date by early June.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

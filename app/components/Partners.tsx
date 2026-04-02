"use client";

import { Users, CheckCircle, ExternalLink } from "lucide-react";

const pressPartners = [
  {
    name: "L4LM",
    fullName: "Live For Live Music",
    role: "Recovery narrative + band introduction",
    date: "April 9",
    status: "confirmed",
    type: "Written interview + feature article",
    who: "Jordan + Luke",
    description: "First press to break the Big Deep story. Jordan's comeback narrative, introducing Luke and the Big Deep concept.",
    materials: ["Photos from @VicBrazen", "Short bio", "Jordan + Luke interview conducted"],
    nextStep: "Confirm article is live on Apr 9. Review before publish if possible.",
    followUp: "Apr 17 — L4LM follow-up article after reveal",
  },
  {
    name: "Wook+",
    fullName: "Wook+",
    role: "Exclusive YouTube interview — in-depth band story",
    date: "April 13",
    status: "confirmed",
    type: "YouTube video interview",
    who: "Jordan + Luke",
    description: "Exclusive YouTube interview published April 13. Jordan and Luke go deeper on the story, the music, and what Big Deep means.",
    materials: ["Interview recorded", "Thumbnail assets", "Bio + social handles for description"],
    nextStep: "Reshare to Stories when it drops. Pull a 30-60 sec clip for TikTok.",
    followUp: "Clip goes on TikTok day of publish",
  },
  {
    name: "JamFam",
    fullName: "JamFam Instagram",
    role: "Community activation — IG Q&A",
    date: "April 15",
    status: "confirmed",
    type: "Instagram Q&A / takeover",
    who: "Jordan",
    description: "JamFam Instagram Q&A on April 15 — the last major community touchpoint before the reveal. Builds anticipation with the jam scene.",
    materials: ["@BigDeepBand handle confirmed", "Jordan ready to answer live"],
    nextStep: "Reshare JamFam Q&A to all Stories. This is the last night before reveal — archive teaser image tonight.",
    followUp: "Archive Apr 8 teaser image night of Apr 15",
  },
  {
    name: "Relix",
    fullName: "Relix Magazine",
    role: "Credibility — Daily Dose headline feature",
    date: "April 16 (Stories) + April 17 (Daily Dose)",
    status: "confirmed",
    type: "Stories coverage + Daily Dose email feature",
    who: "Jordan Fairless",
    description: "Relix covers the reveal on April 16 in Stories, then the Daily Dose headline feature drops April 17. This is the biggest credibility stamp in the jam world.",
    materials: ["Band reveal photo from @VicBrazen", "Official caption + band bio", "Song: Eclipse info"],
    nextStep: "Reshare Relix Daily Dose on Apr 17. This is a major amplification moment.",
    followUp: "In-studio feature possible later (Summer/Fall)",
  },
  {
    name: "JamBase",
    fullName: "JamBase",
    role: "Email blast + Meet Big Deep interview",
    date: "April 17 (email blast) + April 20 (interview)",
    status: "confirmed",
    type: "Email newsletter blast + published interview",
    who: "Jordan",
    description: "JamBase email blast on April 17 goes to their full subscriber list. April 20, the 'Meet Big Deep' interview publishes alongside the polaroid carousel.",
    materials: ["Band photo set", "Meet Big Deep writeup", "Song info", "Website link"],
    nextStep: "Reshare JamBase email blast Apr 17. Post polaroid carousel Apr 20 timed with interview publish.",
    followUp: "Ongoing relationship — JamBase is the long-term jam press home",
  },
];

const collaborators = [
  {
    handle: "@Inklines",
    name: "Michael Arthur",
    role: "Animated reveal video",
    deliverable: "Hand-animated video for April 16 band reveal",
    status: "confirmed",
    notes: "Hero asset. Post to his channels on Apr 16 simultaneously. Credit in every caption.",
  },
  {
    handle: "@VicBrazen",
    name: "Vic",
    role: "Photography + media",
    deliverable: "Band shots, headshots, press photos — all approved and ready",
    status: "delivered",
    notes: "Hold all band photos until April 16. Share approved shots with press as needed pre-reveal.",
  },
  {
    handle: "@SarahDavida",
    name: "Sarah",
    role: "Logo + branding package",
    deliverable: "Full branding package — logo, colors, type system",
    status: "in-progress",
    notes: "Branding package underway. Lock all brand assets before April 8 teaser posts.",
  },
];

const socialHandles = [
  { platform: "Instagram", handle: "@BigDeepBand", status: "claimed" },
  { platform: "TikTok", handle: "@BigDeepBand", status: "claimed" },
  { platform: "YouTube", handle: "Big Deep", status: "claimed" },
  { platform: "Facebook", handle: "@BigDeepBand", status: "claimed" },
  { platform: "Website", handle: "BigDeep.Band", status: "claimed" },
  { platform: "Website (alt)", handle: "BigDeepBand.com", status: "claimed" },
  { platform: "Telegram", handle: "t.me/+fesIFdrjEqxkZmEx", status: "live" },
];

export default function Partners() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Users size={32} className="text-primary-500" />
          Partners & Collaborators
        </h2>
        <p className="text-neutral-500 text-sm">5 press partners confirmed for April. All locked in sequence.</p>
      </div>

      {/* Press Partners */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Press Partners — April Sequence</h3>
        <div className="space-y-4">
          {pressPartners.map((p, idx) => (
            <div key={idx} className="card-retro p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-neutral-900">{p.name}</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ {p.status}</span>
                  </div>
                  <p className="text-sm text-neutral-500">{p.role}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-wide">{p.date}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{p.type}</p>
                </div>
              </div>

              <p className="text-sm text-neutral-700 mb-3">{p.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Who</p>
                  <p className="text-sm text-neutral-800">{p.who}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Materials Needed</p>
                  <div className="space-y-0.5">
                    {p.materials.map((m, i) => (
                      <p key={i} className="text-xs text-neutral-600 flex items-center gap-1">
                        <CheckCircle size={10} className="text-primary-400 flex-shrink-0" />
                        {m}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="bg-primary-50 border-l-4 border-primary-400 pl-3 py-2 rounded-r-lg">
                  <p className="text-xs font-bold text-primary-700">Next Step</p>
                  <p className="text-sm text-neutral-700">{p.nextStep}</p>
                </div>
                {p.followUp && (
                  <p className="text-xs text-neutral-500 pl-3">↳ Follow-up: {p.followUp}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Collaborators */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Creative Collaborators</h3>
        <div className="space-y-3">
          {collaborators.map((c, idx) => (
            <div key={idx} className="card-retro p-4 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 border border-accent-200 flex items-center justify-center">
                <span className="text-xs font-bold text-accent-700">{c.name[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-neutral-900">{c.handle}</p>
                    <p className="text-xs text-neutral-500">{c.name} · {c.role}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    c.status === "delivered" ? "bg-green-100 text-green-700" :
                    c.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>{c.status}</span>
                </div>
                <p className="text-sm text-neutral-700 mt-1.5">{c.deliverable}</p>
                <p className="text-xs text-neutral-500 mt-1 italic">{c.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Handles */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Social Handles + Web</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {socialHandles.map((h, idx) => (
            <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase">{h.platform}</p>
                <p className="text-sm font-mono font-bold text-primary-600 mt-0.5">{h.handle}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                h.status === "live" ? "bg-green-100 text-green-700" : "bg-primary-100 text-primary-700"
              }`}>{h.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

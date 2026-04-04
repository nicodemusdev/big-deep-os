"use client";

import { BookOpen, ExternalLink } from "lucide-react";

const pressContacts = [
  {
    name: "L4LM",
    fullName: "Live For Live Music",
    url: "https://liveforlivemusic.com",
    status: "confirmed",
    relationship: "First press — broke the Big Deep story",
    coverage: "Apr 9: Interview drops. Apr 17: Follow-up article after reveal.",
    notes: "First relationship. Jordan + Luke interviewed. Confirm article live Apr 9.",
  },
  {
    name: "Wook+",
    fullName: "Wook+",
    url: "https://wookplus.com",
    status: "confirmed",
    relationship: "Exclusive YouTube interview",
    coverage: "Apr 13: YouTube interview publishes.",
    notes: "Pull 30-60 sec clip for TikTok day it drops. Reshare to Stories.",
  },
  {
    name: "JamFam",
    fullName: "JamFam Instagram",
    url: "https://instagram.com/jamfam",
    status: "confirmed",
    relationship: "Jam scene community — IG Q&A",
    coverage: "Apr 15: IG Q&A — last touchpoint before reveal.",
    notes: "Jordan answers live. Reshare to all Stories. Archive Apr 8 teaser image that night.",
  },
  {
    name: "Relix",
    fullName: "Relix Magazine",
    url: "https://relix.com",
    status: "confirmed",
    relationship: "Biggest credibility stamp in jam world",
    coverage: "Apr 16: Stories coverage. Apr 17: Daily Dose headline feature.",
    notes: "Reshare Daily Dose Apr 17. In-studio feature possible Summer/Fall.",
  },
  {
    name: "JamBase",
    fullName: "JamBase",
    url: "https://jambase.com",
    status: "confirmed",
    relationship: "Long-term jam press home",
    coverage: "Apr 17: Email blast to full list. Apr 20: Meet Big Deep interview.",
    notes: "Post polaroid carousel Apr 20 timed with interview. Long-term relationship.",
  },
];

const tools = [
  {
    category: "Website + Email",
    items: [
      { name: "BigDeep.Band", url: "https://bigdeep.band", note: "Primary site — must be live before Apr 9. Meta Pixel + email capture required.", status: "must be live" },
      { name: "BigDeepBand.com", url: "https://bigdeepband.com", note: "Alt domain — redirect to BigDeep.Band.", status: "redirect" },
      { name: "Email capture form", url: "", note: "Live on site before L4LM article drops Apr 9. L4LM drives press traffic here.", status: "urgent" },
    ],
  },
  {
    category: "Distribution + DSPs",
    items: [
      { name: "DistroKid", url: "https://distrokid.com", note: "Release order: Eclipse (Apr 24 YouTube, May 1 Spotify) → All At Once (May 21) → Keep Asking (Jun 26) → Something Alive (Jul 24). Submit Eclipse by ~Apr 17.", status: "confirmed" },
      { name: "Spotify for Artists", url: "https://artists.spotify.com", note: "Eclipse hits Spotify May 1. Pitch All At Once (Single 1, drops May 21) for Fresh Finds / New Music Friday / jam playlists — pitch window opens May 14.", status: "active" },
      { name: "Apple Music for Artists", url: "https://artists.apple.com", note: "A-List picks, analytics.", status: "active" },
    ],
  },
  {
    category: "Paid Ads",
    items: [
      { name: "Meta Ads Manager", url: "https://adsmanager.facebook.com", note: "Campaign built before Apr 16 — NOT live until reveal. Video Views campaign (Inklines video) first.", status: "build now" },
      { name: "Meta Pixel", url: "", note: "Must be installed on BigDeep.Band before Apr 9. Tracks press traffic from L4LM article.", status: "urgent" },
    ],
  },
  {
    category: "Community",
    items: [
      { name: "Telegram", url: "https://t.me/+fesIFdrjEqxkZmEx", note: "VIP community — grow post-reveal. Presale audience for Bearsville.", status: "live" },
    ],
  },
  {
    category: "Social Platforms",
    items: [
      { name: "Instagram @BigDeepBand", url: "https://instagram.com/BigDeepBand", note: "Feed silent Apr 8–15. Stories active Apr 9.", status: "claimed" },
      { name: "TikTok @BigDeepBand", url: "https://tiktok.com/@BigDeepBand", note: "Sandbox active Apr 9. 4–6x/week.", status: "claimed" },
      { name: "X / Twitter @BigDeepBand", url: "https://x.com/BigDeepBand", note: "Press amplification + industry engagement. Reshare coverage immediately when it drops. 3–4x/week.", status: "claimed" },
      { name: "YouTube Big Deep", url: "https://youtube.com", note: "Wook+ Apr 13. Music Video 1 premiere TBD.", status: "claimed" },
      { name: "Facebook @BigDeepBand", url: "https://facebook.com/BigDeepBand", note: "Auto cross-post from IG.", status: "claimed" },
    ],
  },
];

const openDecisions = [
  {
    title: "Music Video — All At Once (Single 1) — concept + crew",
    priority: "🔴 This week",
    note: "All At Once drops Memorial Day Weekend. Requires April shoot. No concept decided, no crew confirmed, no location locked. Blocking everything downstream.",
    urgent: true,
  },
  {
    title: "Submit Eclipse to DistroKid — before Apr 17",
    priority: "🔴 This week",
    note: "YouTube drops Apr 24. Spotify/DSPs follow ~May 1. DistroKid needs ~2 weeks — submit by ~Apr 17 to hit the May 1 DSP date.",
    urgent: true,
  },
  {
    title: "@SarahDavida branding package",
    priority: "🔴 Before Apr 8",
    note: "Branding package must be locked before the Apr 8 teaser image posts. Logo, colors, type system all needed.",
    urgent: true,
  },
  {
    title: "Meta Pixel + Email Form live on BigDeep.Band",
    priority: "🔴 Before Apr 9",
    note: "L4LM article drives press traffic Apr 9. If Pixel and email form aren't live, we lose that data forever.",
    urgent: true,
  },
  {
    title: "Meta Ad Campaign built in Ads Manager",
    priority: "Before Apr 16",
    note: "Campaign must be built and ready to launch the moment Inklines video goes live. Video Views objective, targeting jam scene audience.",
    urgent: false,
  },
  {
    title: "April 16 caption written + approved",
    priority: "Before Apr 15",
    note: "Write and lock the reveal caption before reveal day. No last-minute copy on the biggest moment.",
    urgent: false,
  },
  {
    title: "Bearsville Theatre — confirm August date",
    priority: "Q2 2026",
    note: "Late summer / early fall — August or September. Sell out is non-negotiable. Booking conversation should start now.",
    urgent: false,
  },
];

const statusBadge: Record<string, string> = {
  "must be live": "bg-red-100 text-red-700",
  urgent: "bg-red-100 text-red-700",
  "build now": "bg-orange-100 text-orange-700",
  confirmed: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  claimed: "bg-primary-100 text-primary-700",
  redirect: "bg-neutral-100 text-neutral-500",
  live: "bg-green-100 text-green-700",
};

export default function Research() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <BookOpen size={32} className="text-primary-500" />
          Research Hub
        </h2>
        <p className="text-neutral-500 text-sm">Press contacts, tools, links, and open decisions.</p>
      </div>

      {/* Press Contacts */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Press Contacts — All Confirmed</h3>
        <div className="space-y-3">
          {pressContacts.map((contact, idx) => (
            <div key={idx} className="card-retro p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-neutral-900">{contact.name}</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ {contact.status}</span>
                    <a href={contact.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-600">
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{contact.relationship}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-700 mb-2">{contact.coverage}</p>
              <div className="bg-primary-50 border-l-4 border-primary-300 pl-3 py-1.5 rounded-r-lg">
                <p className="text-xs text-neutral-600 italic">{contact.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools + Links */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Tools + Links</h3>
        <div className="space-y-5">
          {tools.map((group, idx) => (
            <div key={idx}>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-2">{group.category}</p>
              <div className="space-y-2">
                {group.items.map((item, i) => (
                  <div key={i} className="bg-white border border-neutral-200 rounded-xl p-3 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm text-neutral-900">{item.name}</p>
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-600">
                            <ExternalLink size={11} />
                          </a>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[item.status] || "bg-neutral-100 text-neutral-500"}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Decisions */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg">Open Decisions</h3>
        <div className="space-y-2">
          {openDecisions.map((item, idx) => (
            <div key={idx} className={`rounded-xl border p-4 flex items-start gap-3 ${item.urgent ? "bg-red-50 border-red-200" : "bg-white border-neutral-200"}`}>
              <div className="w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 border-neutral-300" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className={`text-sm font-semibold ${item.urgent ? "text-red-800" : "text-neutral-800"}`}>{item.title}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.urgent ? "bg-red-100 text-red-700" : "bg-neutral-100 text-neutral-500"}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs text-neutral-600">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Album Tracklist */}
      <div className="bg-neutral-900 text-white rounded-xl p-5">
        <h3 className="font-bold mb-1 text-sm uppercase tracking-wide opacity-70">The Album</h3>
        <p className="text-white font-serif text-xl mb-4">Big Deep <span className="text-neutral-400 text-sm font-sans font-normal">— self-titled · 15 tracks</span></p>
        <div className="grid grid-cols-1 gap-1 text-sm">
          {[
            [1,  "Signal Drift",              ""],
            [2,  "Whisper of Wings",           ""],
            [3,  "Eclipse",                    "live version → Apr 24 (YouTube) / May 1 (Spotify)"],
            [4,  "Signposts and Side Quests",  ""],
            [5,  "All At Once",                "Single 1 → May 21"],
            [6,  "Ran In Resonance",           ""],
            [7,  "Who's to Say?",              ""],
            [8,  "Keep Asking",                "Single 2 → Jun 26"],
            [9,  "Back at the Start",          ""],
            [10, "Something Alive",            "Single 3 → Jul 24"],
            [11, "Everything is Fine",         ""],
            [12, "Forget.Remember",            ""],
            [13, "Spin Cycle",                 ""],
            [14, "Do Our Time",                ""],
            [15, "I Could Be Wrong",           ""],
          ].map(([num, title, note]) => (
            <div key={num as number} className="flex items-baseline gap-3 py-1 border-b border-neutral-800 last:border-0">
              <span className="text-neutral-500 font-mono text-xs w-5 flex-shrink-0 text-right">{num}</span>
              <span className={`flex-shrink-0 ${note ? "text-white font-medium" : "text-neutral-300"}`}>{title as string}</span>
              {note && <span className="text-accent-400 text-xs font-mono">{note as string}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Reference */}
      <div className="bg-neutral-900 text-white rounded-xl p-5">
        <h3 className="font-bold mb-3 text-sm uppercase tracking-wide opacity-70">Key Reference Numbers</h3>
        <div className="space-y-2 text-sm">
          {[
            ["Band Reveal",             "April 16, 2026"],
            ["Eclipse — YouTube",       "Apr 24, 2026 (Friday)"],
            ["Eclipse — Spotify",       "May 1, 2026 (Friday)"],
            ["Save the Date",           "May 7, 2026 (Thursday)"],
            ["All At Once — Single 1",  "May 21, 2026 (Thursday)"],
            ["Keep Asking — Single 2",  "Jun 26, 2026 (Friday)"],
            ["Something Alive — S3",    "Jul 24, 2026 (Friday)"],
            ["First Show",              "Bearsville Theatre — August or September 2026"],
            ["Ad Budget — Launch",      "$50–75 (Video Views, Apr 16-22)"],
            ["Ad Budget — Profile",     "$30–40 (Profile Visit, Apr 23-30)"],
            ["Telegram Community",      "t.me/+fesIFdrjEqxkZmEx"],
          ].map(([label, value], i) => (
            <div key={i} className="flex gap-3">
              <span className="text-accent-400 font-bold flex-shrink-0 w-36">{label}</span>
              <span className="text-neutral-300 font-mono">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
